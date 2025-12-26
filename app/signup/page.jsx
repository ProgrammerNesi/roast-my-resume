import Navbar from "../components/Navbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { SignUpForm } from "../components/SignUpForm";

export default async function SignupPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 text-slate-900">
      <Navbar />
      
      <main className="mx-auto max-w-xl px-6 py-8 sm:py-16">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 text-sm font-semibold shadow-lg mb-6">
            <span>🎉</span>
            Join Today!
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            Start your journey to a better resume with AI-powered feedback and community insights
          </p>
        </div>

        {/* Sign Up Form */}
        <SignUpForm />

        
      </main>

      {/* Background Decoration */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-100/50 to-transparent pointer-events-none"></div>
    </div>
  );
}