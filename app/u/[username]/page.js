import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import ClientReviewForm from "@/app/components/clientReviewForm";
import Link from "next/link";
export const dynamic = "force-dynamic";

async function getUserByUsername(username) {
  await dbConnect();
  const user = await UserModel.findOne({ username }).lean();
  if (!user) return null;
  return {
    username: user.username,
    jobDescription: user.jobDescription || "",
    reviewRequirements: user.reviewRequirements || "",
    hasResume: Boolean(user.resume && user.resume.data && user.resume.data.length),
    resumeMimetype: user.resume?.mimetype || null,
    reviews: Array.isArray(user.review) ? user.review : [],
  };
}

export default async function PublicProfilePage({ params }) {
  const { username } = params || {};
  const user = await getUserByUsername(username);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 text-slate-900">
        <main className="mx-auto max-w-3xl px-6 py-16">
          <div className="rounded-2xl border border-orange-200 bg-white/80 backdrop-blur-lg p-8 text-center shadow-lg">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-3xl font-bold text-slate-800 mb-3">User Not Found</h1>
            <p className="text-lg text-slate-600 mb-6">
  The resume page you&apos;re looking for doesn&apos;t exist or has been moved.
</p>

            <Link 
              href="/" 
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold px-6 py-3 hover:from-orange-700 hover:to-amber-700 transition-all hover:scale-105"
            >
              🏠 Back to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const resumeUrl = user.hasResume ? `/api/u/${encodeURIComponent(username)}/resume` : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 text-slate-900">
      {/* Branding Header */}
      <div className="bg-white border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                R
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Roast-My-Resume
              </span>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-orange-300 bg-white text-orange-600 font-semibold px-4 py-2 hover:bg-orange-50 transition-all hover:scale-105"
            >
              🚀 Get Your Resume Roasted
            </Link>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-8 space-y-8">
        {/* Header Section */}
        <header className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 text-sm font-semibold shadow-lg mb-4">
            <span>👤</span>
            Public Resume Review
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Help {username} Improve Their Resume
          </h1>
          <p className="mt-4 text-xl text-slate-700 max-w-2xl mx-auto">
            Provide anonymous, constructive feedback to help them land their dream job
          </p>
        </header>

        <section className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content - Resume & Review Form */}
          <div className="xl:col-span-3 space-y-8">
            {/* Resume Section */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-orange-200 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                  <span className="text-2xl">📄</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Resume Preview</h2>
                  <p className="text-slate-600">Review their resume before providing feedback</p>
                </div>
              </div>
              
              {resumeUrl ? (
                user.resumeMimetype === "application/pdf" ? (
                  <div className="mt-4 w-full h-[70vh] overflow-hidden rounded-2xl border-2 border-orange-200 shadow-lg">
                    <object
                      data={`${resumeUrl}#toolbar=0&navpanes=0&zoom=40`}
                      type="application/pdf"
                      className="w-full h-full"
                    >
                      <div className="flex flex-col items-center justify-center h-full bg-orange-50 rounded-2xl p-8 text-center">
                        <div className="text-4xl mb-4">📄</div>
                        <p className="text-lg font-semibold text-slate-800 mb-2">PDF Preview Not Available</p>
                        <p className="text-slate-600 mb-4">Click Here to view the resume.</p>
                        <a 
                          href={resumeUrl} 
                          target="_blank" 
                          className="inline-flex items-center gap-2 rounded-xl bg-orange-600 text-white font-semibold px-6 py-3 hover:bg-orange-700 transition-all hover:scale-105"
                        >
                          <span>⬇️</span>
                          Download Resume
                        </a>
                      </div>
                    </object>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-orange-50 rounded-2xl border-2 border-orange-200">
                    <div className="text-4xl mb-4">📄</div>
                    <p className="text-lg font-semibold text-slate-800 mb-4">Resume Available for Download</p>
                    <a
                      href={resumeUrl}
                      target="_blank"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold px-6 py-3 hover:from-orange-700 hover:to-amber-700 transition-all hover:scale-105"
                    >
                      <span>👀</span>
                      View / Download Resume
                    </a>
                  </div>
                )
              ) : (
                <div className="text-center py-8 bg-orange-50 rounded-2xl border-2 border-orange-200">
                  <div className="text-4xl mb-4">📝</div>
                  <p className="text-lg font-semibold text-slate-800">No Resume Available</p>
                  <p className="text-slate-600 mt-2">This user hasn&apos;t uploaded a resume yet.</p>
                </div>
              )}
            </div>

            {/* Review Form Section */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-orange-200 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Provide Your Feedback</h2>
                  <p className="text-slate-600">Your review will be completely anonymous</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 mb-6">
                <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                  <span>💡</span>
                  How to Give Great Feedback
                </h3>
                <ul className="text-sm text-green-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Be specific and constructive - mention what works well and what could be improved</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Focus on the resume content, layout, and alignment with the job description</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Consider the review requirements mentioned by the user</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Your feedback will help someone improve their career prospects!</span>
                  </li>
                </ul>
              </div>

              <ClientReviewForm username={username} />
            </div>
          </div>

          {/* Sidebar - Job Info & Branding */}
          <div className="xl:col-span-1 space-y-6">
            {/* Job Description */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-orange-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">💼</span>
                <h2 className="text-xl font-bold text-slate-800">Target Job</h2>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <p className="text-slate-800 whitespace-pre-wrap text-sm leading-relaxed">
                  {user.jobDescription || "No specific job description provided."}
                </p>
              </div>
            </div>

            {/* Review Requirements */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-orange-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🎯</span>
                <h2 className="text-xl font-bold text-slate-800">Review Focus</h2>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <p className="text-slate-800 whitespace-pre-wrap text-sm leading-relaxed">
                  {user.reviewRequirements || "General feedback on the resume is appreciated."}
                </p>
              </div>
            </div>

            {/* Branding Card */}
            <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl shadow-xl p-6 text-white">
              <div className="text-center">
                <div className="text-4xl mb-4">🔥</div>
                <h3 className="text-xl font-bold mb-2">Get Your Resume Roasted</h3>
                <a 
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-xl bg-white text-orange-600 font-bold px-6 py-3 hover:scale-105 transition-transform w-full justify-center"
                >
                  <span>🚀</span>
                  Start for Free
                </a>
              </div>
            </div>

            {/* Features Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-orange-200 p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span>⭐</span>
                Why Roast-My-Resume?
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-slate-700">Anonymous, honest feedback</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-slate-700">AI-powered resume analysis</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-slate-700">Track improvement over time</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-slate-700">Completely free to use</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl p-8 border border-orange-200">
          <h3 className="text-2xl font-bold text-slate-800 mb-3">Ready to Improve Your Own Resume?</h3>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold px-8 py-4 hover:from-orange-700 hover:to-amber-700 transition-all hover:scale-105"
            >
              <span>🚀</span>
              Create Your Free Account
            </a>
            <a 
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-orange-300 bg-white text-orange-600 font-semibold px-8 py-4 hover:bg-orange-50 transition-all hover:scale-105"
            >
              <span>🤔</span>
              Learn How It Works
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}