"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      
      if (res?.error) {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
        return;
      }
      
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-orange-200 p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-2xl font-bold">
          🔥
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Welcome Back!</h2>
        <p className="text-slate-600 mt-2">Sign in to continue your resume improvement journey</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="group">
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
            <span className="text-orange-500">📧</span>
            Email Address
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-2xl border-2 border-orange-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 group-hover:border-orange-300"
            />
            {email && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                ✓
              </div>
            )}
          </div>
        </div>

        {/* Password Field */}
        <div className="group">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span className="text-orange-500">🔒</span>
              Password
            </label>
            <Link 
              href="/forgot-password" 
              className="text-sm text-orange-600 hover:text-orange-700 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full rounded-2xl border-2 border-orange-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 group-hover:border-orange-300"
            />
            {password && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                ✓
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <span className="text-red-500 text-xl">⚠️</span>
              <div>
                <p className="font-semibold text-red-800">Sign in failed</p>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !email || !password}
          className="w-full rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold py-4 hover:from-orange-700 hover:to-amber-700 transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Signing In...
            </>
          ) : (
            <>
              <span>🚀</span>
              Sign In to Your Account
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-orange-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-slate-500">New to Roast-My-Resume?</span>
        </div>
      </div>

      {/* Sign Up Link */}
      <div className="text-center">
        <Link 
          href="/signup"
          className="inline-flex items-center gap-2 rounded-2xl border-2 border-orange-300 bg-white text-orange-600 font-semibold px-6 py-3 hover:bg-orange-50 transition-all duration-300 hover:scale-105 w-full justify-center"
        >
          <span>✨</span>
          Create New Account
        </Link>
      </div>

      
    </div>
  );
};