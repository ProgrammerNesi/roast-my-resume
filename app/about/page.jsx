import Link from "next/link";
import Navbar from "../components/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 text-slate-900">
      <Navbar />
      
      <main className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-orange-100 border border-orange-200 text-orange-700 px-4 py-2 text-sm mb-6">
            🤔 Our Story & Mission
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            About <span className="text-orange-500">Roast-My-Resume</span>
          </h1>
          <p className="mt-6 text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to help job seekers land their dream roles through 
            <span className="font-semibold text-orange-600"> honest feedback</span>, 
            <span className="font-semibold text-orange-600"> AI-powered insights</span>, and 
            <span className="font-semibold text-orange-600"> community support</span>.
          </p>
        </div>

        {/* The Problem Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">The Problem We Solve</h2>
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
                  That's where Roast-My-Resume comes in - we provide the <span className="font-semibold">candid, actionable feedback</span> 
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

        {/* Our Solution */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Revolutionary Approach</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We combine the best of both worlds: AI precision and human insight
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            

            <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl p-8 text-white">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-2xl font-bold mb-4">Community Feedback</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1">✅</span>
                  <span>Anonymous, honest reviews</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">✅</span>
                  <span>Industry-specific insights</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">✅</span>
                  <span>Real recruiter perspectives</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">✅</span>
                  <span>Cultural fit assessment</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-8 text-white">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold mb-4">AI-Powered Analysis</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1">✅</span>
                  <span>Instant structural analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">✅</span>
                  <span>Keyword optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">✅</span>
                  <span>ATS compatibility scoring</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">✅</span>
                  <span>Impact measurement</span>
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
                description: "Receive anonymous feedback from our community + comprehensive AI suggestions for improvement.",
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

        {/* Our Values */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🎯",
                title: "Honest Feedback",
                description: "We believe in candid, constructive criticism that drives real improvement"
              },
              {
                icon: "🛡️",
                title: "Privacy First",
                description: "Your identity and resume are protected through anonymous feedback systems"
              },
              {
                icon: "🚀",
                title: "Accessibility",
                description: "Quality resume feedback should be available to everyone, regardless of budget"
              },
              {
                icon: "❤️",
                title: "Community Driven",
                description: "We grow together by helping each other succeed in career journeys"
              }
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md border border-orange-100 hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="font-bold text-lg mb-3">{value.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team/Founder Message */}
        <section className="bg-white rounded-2xl shadow-lg p-8 border border-orange-200 mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="text-6xl mb-6">👋</div>
            <h2 className="text-3xl font-bold mb-6">From Our Founder</h2>
            <blockquote className="text-xl text-slate-700 italic leading-relaxed mb-6">
              "After struggling with resume feedback myself and watching friends face the same challenges, 
              I knew there had to be a better way. Roast-My-Resume was born from the belief that everyone 
              deserves access to honest, actionable feedback to advance their career."
            </blockquote>
            <div className="font-semibold text-orange-600">
              — The Roast-My-Resume Team
            </div>
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