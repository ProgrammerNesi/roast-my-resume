import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

const validateRequiredFields = (formData) => {
  const requiredFields = {
    jobDescription: formData.get("jobDescription"),
    reviewRequirements: formData.get("reviewRequirements"),
    resume: formData.get("resume")
  };

  const missingFields = [];

  // Check each required field
  if (!requiredFields.jobDescription || requiredFields.jobDescription.trim() === '') {
    missingFields.push("job description");
  }

  if (!requiredFields.reviewRequirements || requiredFields.reviewRequirements.trim() === '') {
    missingFields.push("review requirements");
  }

  if (!requiredFields.resume || requiredFields.resume === "null" || requiredFields.resume.size === 0) {
    missingFields.push("resume file");
  }

  if (missingFields.length > 0) {
    return {
      isValid: false,
      error: `Missing required fields: ${missingFields.join(', ')}`
    };
  }

  return { isValid: true };
};


// OCR.space API text extraction function
async function extractTextWithOCRSpace(buffer, filename) {
  try {
    // Get API key from environment variables
    const apiKey = process.env.OCR_SPACE_API_KEY;
    
    if (!apiKey) {
      throw new Error('OCR.space API key not configured');
    }

    // Convert buffer to base64
    const base64File = buffer.toString('base64');
    
    const formData = new URLSearchParams();
    formData.append('apikey', apiKey);
    formData.append('base64Image', `data:application/pdf;base64,${base64File}`);
    formData.append('filetype', 'PDF');
    formData.append('OCREngine', '2'); // Engine 2 is better for documents
    formData.append('scale', 'true');
    formData.append('isTable', 'true');
    formData.append('isCreateSearchablePdf', 'false');
    formData.append('isSearchablePdfHideTextLayer', 'false');
    formData.append('language', 'eng');

    const response = await fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error(`OCR.space API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.IsErroredOnProcessing) {
      throw new Error(`OCR.space error: ${data.ErrorMessage}`);
    }

    // Extract text from all parsed results
    let extractedText = '';
    if (data.ParsedResults && data.ParsedResults.length > 0) {
      extractedText = data.ParsedResults.map(result => result.ParsedText || '').join('\n\n');
    }
    
    return extractedText.trim();
  } catch (error) {
    console.error('OCR.space extraction failed:', error);
    throw error;
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const contentType = req.headers.get("content-type") || "";
    let payload = {};
    let resume = undefined;

    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const validation = validateRequiredFields(form);
      if (!validation.isValid) {
        return NextResponse.json(
          { message: validation.error },
          { status: 400 }
        );
      }
      const jobDescription = form.get("jobDescription") || "";
      const reviewRequirements = form.get("reviewRequirements") || "";
      const clientExtractedText = form.get("extractedText") || "";
      const file = form.get("resume");



      if (file && typeof file === "object" && "arrayBuffer" in file) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        let extractedText = clientExtractedText;
        let extractionMethod = "client";
        
        try {
          // If no client extraction but it's a PDF, use OCR.space API
          if (!extractedText && file.type === "application/pdf") {
            
            extractedText = await extractTextWithOCRSpace(buffer, file.name);
            extractionMethod = "ocr_space";
            
            // Log first 200 characters for debugging
            
          } else if (!extractedText && file.type === "text/plain") {
            // For text files, extract on server
            extractedText = buffer.toString('utf-8');
            extractionMethod = "server_text";
          }
          
          // If still no text content after all attempts
          if (!extractedText || extractedText.length < 5) {
            extractedText = `File stored: ${file.name}. ${
              file.type === "application/pdf" 
                ? "PDF text extraction returned minimal content." 
                : "No text content available."
            }`;
            extractionMethod = "minimal";
          }
        } catch (extractionError) {
          console.error("Text extraction failed:", extractionError);
          extractedText = `Text extraction failed for ${file.name}. Error: ${extractionError.message}. File stored for manual review.`;
          extractionMethod = "failed";
        }
        
        resume = {
          filename: file.name,
          mimetype: file.type,
          data: buffer,
          text: extractedText,
          extractionMethod: extractionMethod,
          uploadedAt: new Date()
        };
      }

      payload = { jobDescription, reviewRequirements };
    } else {
      const body = await req.json();
      payload = {
        jobDescription: body?.jobDescription || "",
        reviewRequirements: body?.reviewRequirements || "",
      };
    }

    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (resume) {
      user.resume = resume;
    }
    if (payload.jobDescription !== undefined) {
      user.jobDescription = payload.jobDescription;
    }
    if (payload.reviewRequirements !== undefined) {
      user.reviewRequirements = payload.reviewRequirements;
    }

    await user.save();

    return NextResponse.json({ 
      success: true,
      message: "Data saved successfully",
      extractionMethod: resume?.extractionMethod || "none",
      textLength: resume?.text?.length || 0
    });
  } catch (err) {
    console.error("saveDashboard error", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}