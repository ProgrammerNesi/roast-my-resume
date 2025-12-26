import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 text-slate-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-10 sm:py-20 lg:py-13">
        <div className="text-center">
          <div className="inline-flex items-center rounded-full bg-orange-100 border border-orange-200 text-orange-700 px-4 py-2 text-sm mb-8 animate-pulse">
            🚀 Get Hired Faster with AI-Powered Resume Feedback
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
            Get Your Resume
            <span className="block text-orange-500 mt-2">Roasted &amp; Improved</span>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-700 leading-relaxed">
            Upload your resume, get <span className="font-semibold text-orange-600">anonymous feedback</span> from real people, 
            and <span className="font-semibold text-orange-600">AI-powered analysis</span> to transform your resume into a job-winning document.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/signup" 
              className="inline-flex items-center rounded-xl bg-orange-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:bg-orange-700 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
               Start Your Resume Roast - It&apos;s Free
            </Link>
            <Link 
              href="/about" 
              className="inline-flex items-center rounded-xl border-2 border-orange-300 bg-white text-slate-900 px-8 py-4 text-lg font-medium hover:bg-orange-50 transition-all duration-300 hover:scale-105"
            >
               How It Works
            </Link>
          </div>

          <div className="mt-8 text-sm text-slate-500">
            100% anonymous feedback • AI analysis included
          </div>
          <div className="mt-3 text-sm text-slate-500">
            This is an early-stage project :
Feedback is anonymous and currently unmoderated.
          </div>
          <div className="mt-1 text-sm text-slate-500">
            Do not upload sensitive personal information.
          </div>
          <div className="mt-1 text-sm text-slate-500">
            Some features are not yet implemented
          </div>
        </div>
      </section>

      {/* How It Works - Visual Steps */}
      <section className="mx-auto max-w-7xl px-6 py-16 bg-white/50 rounded-3xl m-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
          Transform Your Resume in 3 Simple Steps
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Step 1 */}
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="relative">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                1
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                📄
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">Upload Your Resume</h3>
            <p className="text-slate-600 leading-relaxed">
              Upload your current resume (PDF or DOCX). AI instantly analyzes structure, keywords, and impact.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="relative">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                2
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                🔥
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">Get Honest Roasts</h3>
            <p className="text-slate-600 leading-relaxed">
              Receive anonymous, candid feedback from real people + detailed AI analysis with specific improvements.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="relative">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                3
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                💼
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">Land More Interviews</h3>
            <p className="text-slate-600 leading-relaxed">
              Implement suggestions, track your progress, and watch your interview invitations increase.
            </p>
          </div>
        </div>
      </section>

      {/* Live Demo Preview */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            See the Magic in Action
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Real feedback. Real improvements. Real results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Before Resume */}
          <div className="bg-white rounded-2xl shadow-xl border border-orange-200 p-6 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
              <div>
                <p className="text-sm text-slate-500">Before Roast</p>
                <p className="font-bold text-lg">Average Resume</p>
              </div>
              <div className="ml-auto bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                65/100
              </div>
            </div>
            
            <div className="space-y-4 text-sm text-slate-600">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="font-semibold text-red-700 mb-2">❌ Common Issues Found:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Generic bullet points without metrics</li>
                  <li>Missing industry keywords</li>
                  <li>Weak action verbs</li>
                  <li>No quantifiable achievements</li>
                </ul>
              </div>
            </div>
          </div>

          {/* After Resume */}
          <div className="bg-white rounded-2xl shadow-xl border border-green-200 p-6 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
              <div>
                <p className="text-sm text-slate-500">After Roast</p>
                <p className="font-bold text-lg">Job-Winning Resume</p>
              </div>
              <div className="ml-auto bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                92/100
              </div>
            </div>
            
            <div className="space-y-4 text-sm text-slate-600">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="font-semibold text-green-700 mb-2">✅ Improvements Made:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Added metrics: &quot;Increased revenue by 40%&quot;</li>
                  <li>Optimized with 15+ industry keywords</li>
                  <li>Used powerful action verbs</li>
                  <li>Highlighted quantifiable achievements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      

      
    </div>
  );
}