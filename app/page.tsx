"use client";

import DemoLoginButton from "@/components/demo-login-button";

export default function LandingPage() {
  const dashboardAbsolute =
    typeof window !== "undefined"
      ? `${window.location.origin}/dashboard`
      : "/dashboard";

  const goToSignIn = () => {
    window.location.href = `/sign-in?redirect_url=${encodeURIComponent(
      dashboardAbsolute
    )}`;
  };

  const goToSignUp = () => {
    window.location.href = `/sign-up?redirect_url=${encodeURIComponent(
      dashboardAbsolute
    )}`;
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-500">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-400 opacity-30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400 opacity-30 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-lg w-full text-center space-y-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-10 border border-white/20">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg animate-fade-in">
          Welcome to <span className="text-indigo-200">Finance</span>
        </h1>
        <p className="text-base text-indigo-100 animate-fade-in-slow">
          Experience the platform instantly with a demo account, or sign in /
          sign up to get started.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-slower">
          <button
            onClick={goToSignIn}
            className="px-6 py-2 rounded-lg bg-white/80 text-indigo-700 font-semibold shadow hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Sign in"
          >
            Sign in
          </button>

          <button
            onClick={goToSignUp}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Sign up"
          >
            Sign up
          </button>

          <DemoLoginButton />
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease 0.1s both;
        }
        .animate-fade-in-slow {
          animation: fadeIn 1.5s ease 0.3s both;
        }
        .animate-fade-in-slower {
          animation: fadeIn 2s ease 0.5s both;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </main>
  );
}
