import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function POST(request, { params }) {
  try {
    const { username } = await params || {};
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated and authorized
    if (!session?.user?.username) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session.user.username !== username) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    if (!username) return NextResponse.json({ message: "Username required" }, { status: 400 });

    await dbConnect();
    const user = await UserModel.findOne({ username }).lean();
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    // Check if user has resume and reviews
    if (!user.resume || !user.resume.data || !user.resume.data.length) {
      return NextResponse.json({ message: "No resume found" }, { status: 404 });
    }

    const reviews = user.review || [];
    if (reviews.length === 0) {
      return NextResponse.json({ message: "No reviews found" }, { status: 404 });
    }

    // Initialize Gemini AI
    const ai = new GoogleGenAI({});
    

    // Extract resume text from the stored text field
    const resumeText = user.resume.text || "Resume text not available";

    
    // Check if we have valid resume text
    if (!user.resume.text || user.resume.text.includes("Error extracting") || user.resume.text.includes("Text extraction not supported")) {
      return NextResponse.json({ 
        message: "Resume text extraction failed. Please re-upload your resume as a PDF file for AI analysis." 
      }, { status: 400 });
    }
    // Prepare job description and review requirements
    const jobDescription = user.jobDescription || "No job description provided";
    const reviewRequirements = user.reviewRequirements || "No specific review requirements";
    
    // Format reviews for AI analysis
    const reviewsText = reviews.map((review, index) => 
      `Review ${index + 1} (Rating: ${review.rating}/5): ${review.content}`
    ).join('\n\n');

    // Create comprehensive prompt for Gemini
    const prompt = `
You are an expert resume reviewer and career advisor. Analyze the following resume, job description, and anonymous reviews to provide comprehensive feedback.

RESUME TEXT:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

REVIEW REQUIREMENTS:
${reviewRequirements}

ANONYMOUS REVIEWS:
${reviewsText}

Please provide a detailed analysis in the following JSON format:
{
  "overallScore": 8.5,
  "strengths": [
    "List 3-5 key strengths based on the resume and reviews"
  ],
  "improvements": [
    "List 3-5 areas that need improvement based on the analysis"
  ],
  "suggestions": [
    "List 3-5 actionable suggestions for improvement"
  ],
  "suggestions2": [
    "List 3-5 actionable suggestions after analysing the anonymous reviews and also tell what users are generally saying"
  ],
  "summary": "A brief 2-3 sentence summary of the overall assessment"
}

Focus on:
1. How well the resume matches the job description
2. Common themes from the anonymous reviews
3. Specific actionable improvements
4. Overall professional presentation
5. Technical and soft skills alignment

Provide constructive, specific feedback that will help improve the resume for the target role.
`;

    // Generate AI feedback
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: prompt
    });
    // const result = await model.generateContent(prompt);
    // const response = await result.response;
    // const aiFeedbackText = response.text();

    const aiFeedbackText = response.text;
    // Parse the JSON response
    let aiFeedback;
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = aiFeedbackText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        aiFeedback = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No valid JSON found in response");
      }
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      // Fallback response if parsing fails
      aiFeedback = {
        overallScore: 7.0,
        strengths: [
          "Professional formatting and structure",
          "Relevant experience highlighted",
          "Good use of action verbs"
        ],
        improvements: [
          "Add more quantifiable achievements",
          "Include industry-specific keywords",
          "Expand on leadership experience"
        ],
        suggestions: [
          "Tailor resume for specific job applications",
          "Add relevant certifications",
          "Include volunteer experience if applicable"
        ],
        summary: "The resume shows good potential but could benefit from more specific achievements and better alignment with the target role."
      };
    }

    return NextResponse.json({ 
      success: true, 
      aiFeedback 
    });

  } catch (err) {
    console.error("AI generation error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}