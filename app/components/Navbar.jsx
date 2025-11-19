"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-lg supports-[backdrop-filter]:bg-white/90 bg-white/80 border-b border-orange-200/60 shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-105 transition-transform">
              R
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Roast-My-Resume
              </span>
              <div className="text-xs text-orange-500 font-medium -mt-1">Get Hired Faster</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6 text-sm font-medium">
              <Link 
                href="/" 
                className="text-slate-700 hover:text-orange-600 transition-colors hover:scale-105 flex items-center gap-1"
              >
                
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-slate-700 hover:text-orange-600 transition-colors hover:scale-105 flex items-center gap-1"
              >
                
                How it works
              </Link>
              <a 
                href="https://github.com" 
                target="_blank" 
                className="text-slate-700 hover:text-orange-600 transition-colors hover:scale-105 flex items-center gap-1"
                rel="noreferrer"
              >
                
                GitHub
              </a>
            </div>

            {session ? (
              <div className="flex items-center gap-4 pl-4 border-l border-orange-200">
                <div className="flex items-center gap-3">
                  <div className="text-sm text-slate-600">
                    Welcome, <span className="font-semibold text-orange-600">{session.user?.name || session.user?.username}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link 
                      href="/dashboard" 
                      className="px-4 py-2 rounded-xl bg-orange-50 text-orange-700 font-semibold hover:bg-orange-100 transition-all hover:scale-105 flex items-center gap-2"
                    >
                     
                      Dashboard
                    </Link>
                    <Link 
                      href="/messages" 
                      className="px-4 py-2 rounded-xl border border-orange-200 text-slate-700 font-semibold hover:bg-orange-50 transition-all hover:scale-105 flex items-center gap-2"
                    >
                      
                      Messages
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold hover:from-orange-700 hover:to-amber-700 transition-all hover:scale-105 flex items-center gap-2"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  href="/signin" 
                  className="px-4 py-2 rounded-xl border border-orange-300 text-slate-700 font-semibold hover:bg-orange-50 transition-all hover:scale-105"
                >
                  Sign In
                </Link>
                <Link 
                  href="/signup" 
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold hover:from-orange-700 hover:to-amber-700 transition-all hover:scale-105 shadow-lg flex items-center gap-2"
                >
                  <span>🔥</span>
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <span className="text-lg">✕</span>
              ) : (
                <span className="text-lg">☰</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-orange-200 bg-white/95 backdrop-blur-lg py-4">
            <div className="space-y-4">
              <Link 
                href="/" 
                className="block px-4 py-3 text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>🏠</span>
                Home
              </Link>
              <Link 
                href="/about" 
                className="block px-4 py-3 text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>🤔</span>
                How it works
              </Link>
              <a 
                href="https://github.com" 
                target="_blank" 
                className="block px-4 py-3 text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors flex items-center gap-2"
                rel="noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>💻</span>
                GitHub
              </a>

              {session ? (
                <>
                  <div className="px-4 py-2 border-t border-orange-200 pt-4">
                    <div className="text-sm text-slate-500 mb-3">
                      Signed in as <span className="font-semibold text-orange-600">{session.user?.name || session.user?.username}</span>
                    </div>
                    <Link 
                      href="/dashboard" 
                      className="block px-4 py-3 bg-orange-50 text-orange-700 font-semibold rounded-xl mb-2 flex items-center gap-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>🚀</span>
                      Dashboard
                    </Link>
                    <Link 
                      href="/messages" 
                      className="block px-4 py-3 border border-orange-200 text-slate-700 font-semibold rounded-xl mb-2 flex items-center gap-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>📬</span>
                      Messages
                    </Link>
                    <button 
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold rounded-xl flex items-center gap-2"
                    >
                      <span>👋</span>
                      Log Out
                    </button>
                  </div>
                </>
              ) : (
                <div className="px-4 border-t border-orange-200 pt-4 space-y-2">
                  <Link 
                    href="/signin" 
                    className="block px-4 py-3 border border-orange-300 text-slate-700 font-semibold rounded-xl text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/signup" 
                    className="block px-4 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold rounded-xl text-center flex items-center justify-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>🔥</span>
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}