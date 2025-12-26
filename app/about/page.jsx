import Link from "next/link";
import Navbar from "../components/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 text-slate-900">
      <Navbar />
      
      <main className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            About <span className="text-orange-500">Roast-My-Resume</span>
          </h1>
        </div>

        {/* The Problem Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">The Problem Solved</h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  <span className="font-semibold text-orange-600">Traditional resume feedback is broken.</span> Friends are too nice, 
                  professional services are expensive, and you never know if your resume actually stands out to recruiters.
                </p>
                <p>
                  Most job seekers send out dozens of applications without understanding why they're not getting interviews. 
                  The feedback loop is non-existent, leaving you guessing about what needs improvement.
                </p>
                <p>
                  That's where Roast-My-Resume comes in -  <span className="font-semibold"> get candid, actionable feedback </span> 
                  you need to transform your resume into a job-winning document.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-orange-200">
              <div className="text-6xl mb-4 text-center">😫</div>
              <h3 className="text-xl font-bold text-center mb-4">The Resume Struggle</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>No feedback on why applications get rejected</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Friends are too polite to give real criticism</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Professional services cost hundreds of dollars</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>AI tools alone lack human perspective</span>
                </li>
              </ul>
            </div>
          </div>
        </section>


        {/* How It Works */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">How Roast-My-Resume Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Upload & Analyze",
                description: "Upload your resume and our AI instantly provides detailed analysis on structure, keywords, and impact.",
                icon: "📄"
              },
              {
                step: "2",
                title: "Get Roasted",
                description: "Receive anonymous feedback by sharing the link generated to your friends and colleagues + comprehensive AI suggestions for improvement.",
                icon: "🔥"
              },
              {
                step: "3",
                title: "Improve & Succeed",
                description: "Implement the feedback, track your progress, and start landing more interviews.",
                icon: "💼"
              }
            ].map((item, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 text-2xl font-bold border-2 border-orange-200">
                  {item.step}
                </div>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        

        

        {/* Final CTA */}
        <section className="text-center bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-12 border border-orange-200">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Resume?</h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who've improved their resumes and landed more interviews.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/signup" 
              className="inline-flex items-center rounded-xl bg-orange-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:bg-orange-700 transition-all duration-300 hover:scale-105"
            >
              🚀 Start Your Free Roast
            </Link>
            <Link 
              href="/" 
              className="inline-flex items-center rounded-xl border-2 border-orange-300 bg-white text-slate-900 px-8 py-4 text-lg font-medium hover:bg-orange-100 transition-all duration-300 hover:scale-105"
            >
              ← Back to Home
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}