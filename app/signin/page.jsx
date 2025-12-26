import Navbar from "../components/Navbar";
import { SignInForm } from "../components/SignInForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function SigninPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 text-slate-900">
      <Navbar />
      
      <main className="mx-auto max-w-xl px-6 py-8 sm:py-16">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 text-sm font-semibold shadow-lg mb-6">
            <span>👋</span>
            Welcome Back!
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Sign In
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            Continue your journey to a better resume with AI-powered feedback
          </p>
        </div>

        {/* Sign In Form */}
        <SignInForm />

      
      </main>

      {/* Background Decoration */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-100/50 to-transparent pointer-events-none"></div>
    </div>
  );
}