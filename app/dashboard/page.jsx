"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [reviewRequirement, setReviewRequirement] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { data: session } = useSession();
  const router = useRouter()
  const username = session?.user?.username || "";
  const baseUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : '';
  const profileUrl = `${baseUrl}/u/${username}`;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setResumeFile(file);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setSaved(false);
    setSaving(true);
    if (!resumeFile || !jobDescription.trim() || !reviewRequirement.trim()) {
      setError("All fields are required");
      setSaving(false);
      return;
    }
    try {
      const form = new FormData();
      if (resumeFile) form.append("resume", resumeFile);
      form.append("jobDescription", jobDescription);
      form.append("reviewRequirements", reviewRequirement);

      const res = await fetch("/api/saveDashboard", {
        method: "POST",
        body: form,
      });
      if (!res.ok) throw new Error("Failed to save");
      setSaved(true);
      setGeneratedLink(profileUrl);
    } catch (err) {
      console.error(err);
      setSaved(false);
    } finally {
      setSaving(false);
    }
  };

  const allFieldsFilled = resumeFile && jobDescription.trim() && reviewRequirement.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 text-slate-900">
      <Navbar />
      
      <main className="mx-auto max-w-4xl px-6 py-8 sm:py-12">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 text-sm font-semibold shadow-lg">
                🚀 Dashboard
              </div>
              <div className="text-sm text-slate-500">
                Welcome back, <span className="font-semibold text-orange-600">{session?.user?.name || session?.user?.username}</span>
              </div>
            </div>
            <Link 
              href="/messages" 
              className="inline-flex items-center gap-3 rounded-xl bg-white border border-orange-200 text-orange-600 font-semibold px-6 py-3 hover:bg-orange-50 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
            >
              <span className="text-xl">📬</span>
              View Messages
            </Link>
          </div>
          
          <div className="text-center sm:text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Create Your Resume Review
            </h1>
            <p className="mt-4 text-lg text-slate-700 max-w-2xl">
              Upload your resume, add job details, and get ready to receive honest feedback from our community.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-md border border-orange-100">
            <div className="text-2xl mb-2">📄</div>
            <div className="text-sm text-slate-500">Resume Status</div>
            <div className="text-xl font-bold text-orange-600">
              {resumeFile ? "Uploaded" : "Not Uploaded"}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-md border border-orange-100">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-sm text-slate-500">Job Description</div>
            <div className="text-xl font-bold text-orange-600">
              {jobDescription ? "Added" : "Not Added"}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-md border border-orange-100">
            <div className="text-2xl mb-2">🔗</div>
            <div className="text-sm text-slate-500">Shareable Link</div>
            <div className="text-xl font-bold text-orange-600">
              {generatedLink ? "Ready" : "Not Generated"}
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-orange-200 p-6 sm:p-8">
          <form onSubmit={handleGenerate} className="space-y-8">
            {/* File Upload Section */}
            <div className="group">
              <label className="block text-lg font-semibold text-slate-800 mb-4 flex items-center gap-3">
                <span className="text-2xl">📄</span>
                Upload Your Resume
              </label>
              <div className="border-2 border-dashed border-orange-300 rounded-2xl p-8 text-center hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 group-hover:scale-[1.02]">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer block">
                  <div className="text-4xl mb-4">📤</div>
                  <p className="text-lg font-semibold text-slate-800 mb-2">
                    {resumeFile ? "Change Resume File" : "Click to Upload Resume"}
                  </p>
                  <p className="text-sm text-slate-500 mb-4">
                    Supports PDF, DOC, DOCX, TXT files
                  </p>
                  <div className="inline-flex items-center gap-2 rounded-lg bg-orange-100 text-orange-700 px-4 py-2 text-sm font-medium">
                    <span>Choose File</span>
                  </div>
                </label>
                {resumeFile && (
                  <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">✅</span>
                      <div>
                        <p className="font-semibold text-green-800">File Selected</p>
                        <p className="text-sm text-green-700">{resumeFile.name}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Job Description Section */}
            <div className="group">
              <label htmlFor="jd" className="block text-lg font-semibold text-slate-800 mb-4 flex items-center gap-3">
                <span className="text-2xl">💼</span>
                Job Description
              </label>
              <textarea
                id="jd"
                rows={5}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the complete job description here including role summary, responsibilities, requirements, and qualifications..."
                className="w-full rounded-2xl border-2 border-orange-200 bg-white px-6 py-4 text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 group-hover:border-orange-300 resize-none"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-slate-500">
                  {jobDescription.length} characters
                </span>
                {jobDescription.length > 0 && (
                  <span className="text-sm text-green-600 font-medium">
                    ✓ Ready for analysis
                  </span>
                )}
              </div>
            </div>

            {/* Review Requirements Section */}
            <div className="group">
              <label htmlFor="req" className="block text-lg font-semibold text-slate-800 mb-4 flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                Review Requirements
              </label>
              <textarea
                id="req"
                rows={3}
                value={reviewRequirement}
                onChange={(e) => setReviewRequirement(e.target.value)}
                placeholder="What specific feedback are you looking for? Examples: 
• Check if my skills match the job requirements
• Review the clarity of my project descriptions
• Suggest better action verbs
• Evaluate my resume layout and design..."
                className="w-full rounded-2xl border-2 border-orange-200 bg-white px-6 py-4 text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 group-hover:border-orange-300 resize-none"
              />
              <div className="text-sm text-slate-500 mt-2">
                Be specific about what you want reviewers to focus on
              </div>
            </div>

            {/* Generated Link Section */}
            {generatedLink && (
              <div className="group">
                <label htmlFor="genlink" className="block text-lg font-semibold text-slate-800 mb-4 flex items-center gap-3">
                  <span className="text-2xl">🔗</span>
                  Your Shareable Link
                </label>
                <div className="relative">
                  <input
                    id="genlink"
                    type="text"
                    value={generatedLink}
                    readOnly
                    className="w-full rounded-2xl border-2 border-green-200 bg-green-50 px-6 py-4 text-green-800 font-medium shadow-sm focus:outline-none focus:ring-4 focus:ring-green-500/20 pr-32"
                  />
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(generatedLink)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors"
                  >
                    Copy Link
                  </button>
                </div>
                <div className="text-sm text-green-600 mt-2 flex items-center gap-2">
                  <span>✅</span>
                  Share this link to get anonymous feedback on your resume
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <button 
                type="submit" 
                disabled={saving||saved||!allFieldsFilled}
                className={`inline-flex items-center gap-3 rounded-2xl font-bold px-8 py-4 text-lg shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed w-full sm:w-auto justify-center ${
                  allFieldsFilled
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
                    : "bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:from-orange-700 hover:to-amber-700"
                }`}
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : saved ? (
                  <>
                    <span>✅</span>
                    Successfully Saved!
                  </>
                ) : allFieldsFilled ? (
                  <>
                    <span>🚀</span>
                    Save & Generate Link
                  </>
                ) : (
                  <>
                    <span>📝</span>
                    Complete All Fields
                  </>
                )}
              </button>
              {error && <p className="text-red-500">{error}</p>}
              
              {generatedLink && (
                <Link href="/messages" className="w-full sm:w-auto">
                  <button className="inline-flex items-center gap-3 rounded-2xl border-2 border-orange-400 bg-white text-orange-600 font-bold px-8 py-4 text-lg hover:bg-orange-50 transition-all duration-300 hover:scale-105 w-full justify-center">
                    <span>📬</span>
                    View Reviews
                  </button>
                </Link>
              )}
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <span>💡</span>
            Pro Tips for Better Feedback
          </h3>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>• Upload a PDF resume for best text extraction results</li>
            <li>• Include the complete job description for targeted feedback</li>
            <li>• Be specific about what aspects you want reviewed</li>
            <li>• Share your link with people in your target industry</li>
          </ul>
        </div>
      </main>
    </div>
  );
}