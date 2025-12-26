"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiFeedbackLoading, setAiFeedbackLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState(null);
  const { data: session } = useSession();

  // Fetch messages from API
  useEffect(() => {
    const fetchMessages = async () => {
      if (!session?.user?.username) return;
      
      try {
        const res = await fetch(`/api/u/${encodeURIComponent(session.user.username)}/reviews`);
        if (res.ok) {
          const data = await res.json();
          setMessages(data.reviews || []);
        } else {
          // Fallback to mock data for demonstration
          setMessages([
            {
              _id: 1,
              content: "Your resume looks great! The formatting is clean and professional. Consider adding more quantifiable achievements in your experience section.",
              createdAt: new Date("2024-01-15T10:30:00Z"),
              rating: 4
            },
            {
              _id: 2,
              content: "I noticed a few typos in the skills section. Also, your summary could be more specific about your unique value proposition. Overall solid foundation though!",
              createdAt: new Date("2024-01-14T16:45:00Z"),
              rating: 3
            },
            {
              _id: 3,
              content: "The layout is excellent and easy to read. Your project descriptions are detailed and show real impact. Maybe consider reordering sections to highlight your strongest achievements first.",
              createdAt: new Date("2024-01-13T09:15:00Z"),
              rating: 5
            },
            {
              _id: 4,
              content: "Your technical skills are impressive! Consider adding a section about your soft skills and how they complement your technical abilities. The resume could benefit from more industry-specific keywords.",
              createdAt: new Date("2024-01-12T14:20:00Z"),
              rating: 4
            }
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [session]);

  const handleGetAIFeedback = async () => {
    setAiFeedbackLoading(true);
    try {
      const res = await fetch(`/api/u/${encodeURIComponent(session.user.username)}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to generate AI feedback");
      }
      
      const data = await res.json();
      console.log(data)
      setAiFeedback(data.aiFeedback);
    } catch (error) {
      console.error("Error generating AI feedback:", error);
      // Fallback to mock data if API fails
      setAiFeedback({
        overallScore: 0,
        strengths: [
          "Failed To Generate"
        ],
        improvements: [
          "Failed to Generate"
        ],
        suggestions: [
          "Failed to Generate"
        ],
        summary: "Failed to Generate"
      });
    } finally {
      setAiFeedbackLoading(false);
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-green-600 bg-green-50 border-green-200";
    if (rating >= 3) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getRatingStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 text-slate-900">
        <Navbar />
        <main className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 text-slate-900">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-6 py-8 sm:py-12">
        {/* Header Section */}
                {/* Header Section - Fixed for mobile responsiveness */}
        <div className="mb-8">
          {/* Top row with back button and badge */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard" 
                className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors font-semibold hover:scale-105"
              >
                <span>←</span>
                Back to Dashboard
              </Link>
            </div>
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 text-sm font-semibold shadow-lg">
              📬 Messages
            </div>
          </div>
          
          {/* Main header content with title and stats card */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
            {/* Title and description */}
            <div className="text-center lg:text-left lg:flex-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Your Resume Feedback
              </h1>
            </div>
            
            {/* Stats Card - Now properly responsive */}
            <div className="rounded-2xl shadow-lg border border-orange-200 bg-white/80 backdrop-blur-lg p-4 lg:p-3 w-full lg:w-auto lg:min-w-xs">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <span>📊</span>
                Review Statistics
              </h3>
              <div className="space-y-2 sm:space-y-1 text-sm sm:text-xs">
                <div className="flex justify-between items-center p-2 sm:p-2 bg-orange-50 rounded-lg">
                  <span className="text-slate-700 font-medium">Total Reviews</span>
                  <span className="font-bold text-orange-600">{messages.length}</span>
                </div>
                <div className="flex justify-between items-center p-2 sm:p-2 bg-green-50 rounded-lg">
                  <span className="text-slate-700 font-medium">Average Rating</span>
                  <span className="font-bold text-green-600">
                    {messages.length > 0 
                      ? (messages.reduce((sum, msg) => sum + msg.rating, 0) / messages.length).toFixed(1)
                      : "0.0"
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 sm:p-2 bg-blue-50 rounded-lg">
                  <span className="text-slate-700 font-medium">Latest Review</span>
                  <span className="font-bold text-blue-600">
                    {messages.length > 0 
                      ? new Date(Math.max(...messages.map(m => new Date(m.createdAt)))).toLocaleDateString()
                      : "N/A"
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Left Sidebar - AI Feedback (Now fixed position) */}
          <div className="xl:col-span-2 space-y-6">
            {/* AI Feedback Card - Sticky */}
            <div className="sticky top-6">
              <div className="rounded-2xl shadow-xl border border-orange-200 bg-white/80 backdrop-blur-lg p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">🤖</span>
                  AI Resume Analysis
                </h2>
                
                {!aiFeedback ? (
                  <div className="text-center">
                    <div className="text-4xl mb-4">🔍</div>
                    <p className="text-slate-600 mb-4">
                      Get comprehensive AI-powered feedback on your resume
                    </p>
                    <button
                      onClick={handleGetAIFeedback}
                      disabled={aiFeedbackLoading}
                      className="w-full rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold px-4 py-3 hover:from-orange-700 hover:to-amber-700 transition-all shadow-lg hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {aiFeedbackLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Analyzing...
                        </div>
                      ) : (
                        "Get AI Feedback"
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {/* Overall Score */}
                    <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                      <div className="text-2xl font-bold text-orange-600 mb-1">
                        {aiFeedback.overallScore}/10
                      </div>
                      <div className="text-sm text-slate-600 font-medium">Overall Score</div>
                    </div>

                    {/* Summary */}
                    {aiFeedback.summary && (
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <h3 className="font-semibold text-blue-700 mb-2 flex items-center gap-1 text-sm">
                          <span>📋</span> Summary
                        </h3>
                        <p className="text-xs text-slate-700 leading-relaxed">{aiFeedback.summary}</p>
                      </div>
                    )}

                    {/* Strengths */}
                    <div>
                      <h3 className="font-semibold text-green-700 mb-2 flex items-center gap-1 text-sm">
                        <span>✅</span> Strengths
                      </h3>
                      <ul className="space-y-2">
                        {aiFeedback.strengths?.map((strength, index) => (
                          <li key={index} className="text-xs text-slate-700 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Improvements */}
                    <div>
                      <h3 className="font-semibold text-yellow-700 mb-2 flex items-center gap-1 text-sm">
                        <span>🔧</span> Improvements
                      </h3>
                      <ul className="space-y-2">
                        {aiFeedback.improvements?.map((improvement, index) => (
                          <li key={index} className="text-xs text-slate-700 bg-yellow-50 px-3 py-2 rounded-lg border border-yellow-200">
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Suggestions2 */}
                    <div>
                      <h3 className="font-semibold text-blue-700 mb-2 flex items-center gap-1 text-sm">
                        <span>💡</span> Based on Anonymous Reviews
                      </h3>
                      <ul className="space-y-2">
                        {aiFeedback.suggestions2?.map((suggestion2, index) => (
                          <li key={index} className="text-xs text-slate-700 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                            {suggestion2}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Suggestions */}
                    <div>
                      <h3 className="font-semibold text-blue-700 mb-2 flex items-center gap-1 text-sm">
                        <span>💡</span> Suggestions
                      </h3>
                      <ul className="space-y-2">
                        {aiFeedback.suggestions?.map((suggestion, index) => (
                          <li key={index} className="text-xs text-slate-700 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => setAiFeedback(null)}
                      className="w-full mt-4 rounded-xl border-2 border-orange-300 text-orange-600 font-medium px-4 py-2 hover:bg-orange-50 transition-all hover:scale-105"
                    >
                      New Analysis
                    </button>
                  </div>
                )}
              </div>
            </div>

            
          </div>

          {/* Main Content - Messages */}
          <div className="xl:col-span-3">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-orange-200 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <span className="text-3xl">👥</span>
                  Anonymous Reviews
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {messages.length} reviews
                  </span>
                </h2>
                
                {messages.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                      {messages.filter(m => m.rating >= 4).length} Positive
                    </span>
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                      {messages.filter(m => m.rating === 3).length} Neutral
                    </span>
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded">
                      {messages.filter(m => m.rating < 3).length} Critical
                    </span>
                  </div>
                )}
              </div>

              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-6">📝</div>
                  <h3 className="text-2xl font-semibold text-slate-800 mb-3">No reviews yet</h3>
                  <p className="text-slate-600 mb-6 max-w-md mx-auto">
                    Share your resume link with others to start receiving anonymous feedback and improve your resume.
                  </p>
                  <Link 
                    href="/dashboard"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold px-6 py-3 hover:from-orange-700 hover:to-amber-700 transition-all hover:scale-105"
                  >
                    <span>🔗</span>
                    Get Your Shareable Link
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div 
                      key={message._id} 
                      className="rounded-2xl border-2 border-orange-100 bg-white p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-orange-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border-2 font-semibold ${getRatingColor(message.rating)}`}>
                          <span className="text-lg">{getRatingStars(message.rating)}</span>
                          <span className="text-sm">{message.rating}/5</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                          <span>🕒</span>
                          <span>{new Date(message.createdAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}</span>
                        </div>
                      </div>
                      <p className="text-slate-800 leading-relaxed text-lg">
                        {message.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tips Section */}
            {messages.length > 0 && (
              <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <span>💡</span>
                  Making the Most of Your Feedback
                </h3>
                <ul className="text-sm text-blue-700 space-y-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <li className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Look for recurring themes across multiple reviews</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Prioritize feedback that aligns with your target role</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Combine AI insights with human feedback for best results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Update your resume and track improvements over time</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}