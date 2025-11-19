"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !email || !password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/userExists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username }),
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.exists) {
          setError("User with this email or username already exists");
          setLoading(false);
          return;
        }
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      
      if (response.ok) {
        setUsername("");
        setEmail("");
        setPassword("");
        setError("");
        console.log("User created successfully");
        router.push("/signin");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: 0, text: "" };
    if (password.length < 6) return { strength: 1, text: "Weak" };
    if (password.length < 8) return { strength: 2, text: "Fair" };
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) return { strength: 3, text: "Good" };
    return { strength: 4, text: "Strong" };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-orange-200 p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-2xl font-bold">
          🚀
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Start Your Journey</h2>
        <p className="text-slate-600 mt-2">Create your account and transform your resume</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username Field */}
        <div className="group">
          <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
            <span className="text-orange-500">👤</span>
            Username
          </label>
          <div className="relative">
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. dev_ash"
              required
              className="w-full rounded-2xl border-2 border-orange-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 group-hover:border-orange-300"
            />
            {username && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                ✓
              </div>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">This will be visible in your public profile URL</p>
        </div>

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
          <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
            <span className="text-orange-500">🔒</span>
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              required
              className="w-full rounded-2xl border-2 border-orange-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 group-hover:border-orange-300"
            />
            {password && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                ✓
              </div>
            )}
          </div>
          
          {/* Password Strength Meter */}
          {password && (
            <div className="mt-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-slate-700">Password strength:</span>
                <span className={`text-xs font-bold ${
                  passwordStrength.strength === 1 ? "text-red-500" :
                  passwordStrength.strength === 2 ? "text-orange-500" :
                  passwordStrength.strength === 3 ? "text-yellow-500" : "text-green-500"
                }`}>
                  {passwordStrength.text}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    passwordStrength.strength === 1 ? "bg-red-500 w-1/4" :
                    passwordStrength.strength === 2 ? "bg-orange-500 w-1/2" :
                    passwordStrength.strength === 3 ? "bg-yellow-500 w-3/4" : "bg-green-500 w-full"
                  }`}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className={`rounded-2xl p-4 ${
            error.includes("successfully") 
              ? "bg-green-50 border-2 border-green-200" 
              : "bg-red-50 border-2 border-red-200"
          }`}>
            <div className="flex items-center gap-3">
              <span className={`text-xl ${
                error.includes("successfully") ? "text-green-500" : "text-red-500"
              }`}>
                {error.includes("successfully") ? "✅" : "⚠️"}
              </span>
              <div>
                <p className={`font-semibold ${
                  error.includes("successfully") ? "text-green-800" : "text-red-800"
                }`}>
                  {error.includes("successfully") ? "Success!" : "Registration failed"}
                </p>
                <p className={`text-sm ${
                  error.includes("successfully") ? "text-green-700" : "text-red-700"
                }`}>
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !username || !email || !password}
          className="w-full rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold py-4 hover:from-orange-700 hover:to-amber-700 transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Creating Account...
            </>
          ) : (
            <>
              <span>✨</span>
              Create My Account
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
          <span className="px-4 bg-white text-slate-500">Already have an account?</span>
        </div>
      </div>

      {/* Sign In Link */}
      <div className="text-center">
        <Link 
          href="/signin"
          className="inline-flex items-center gap-2 rounded-2xl border-2 border-orange-300 bg-white text-orange-600 font-semibold px-6 py-3 hover:bg-orange-50 transition-all duration-300 hover:scale-105 w-full justify-center"
        >
          <span>🔐</span>
          Sign In to Existing Account
        </Link>
      </div>

      {/* Benefits List */}
      <div className="mt-8 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200">
        <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <span className="text-orange-500">🎯</span>
          What you'll get:
        </h4>
        <ul className="text-sm text-slate-700 space-y-2">
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            Anonymous resume feedback from real people
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            AI-powered resume analysis and scoring
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            Shareable resume review links
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            Track your resume improvement over time
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            Completely free forever
          </li>
        </ul>
      </div>
    </div>
  );
};