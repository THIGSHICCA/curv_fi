"use client";
import React from "react";

export const InlineLoader: React.FC<{ label?: string }> = ({ label }) => {
  return (
    <div className="inline-flex items-center gap-4 bg-white/8 backdrop-blur-md border border-white/20 px-4 py-3 rounded-xl shadow-md">
      {/* Rotating gradient ring */}
      <svg
        className="w-10 h-10 -ml-1"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>

        <g fill="none" strokeWidth="4" strokeLinecap="round">
          <circle
            cx="25"
            cy="25"
            r="18"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="4"
          />
          <path
            d="M25 7 a18 18 0 0 1 0 36"
            stroke="url(#g1)"
            strokeWidth="4"
            strokeDasharray="85"
            strokeDashoffset="30"
            style={{
              transformOrigin: "center",
              animation: "spin 1.2s linear infinite",
            }}
          />
        </g>
      </svg>

      {/* Bouncing dots */}
      <div className="flex items-center gap-1">
        <span className="loader-dot" style={{ animationDelay: "0s" }} />
        <span className="loader-dot" style={{ animationDelay: "0.12s" }} />
        <span className="loader-dot" style={{ animationDelay: "0.24s" }} />
      </div>

      {/* Shimmer label (optional) */}
      <div className="relative overflow-hidden">
        <div className="text-sm font-medium text-viridian-50">
          {label ?? "Processing..."}
        </div>
        <div className="absolute inset-0 -skew-x-6 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 animate-shimmer" />
      </div>

      {/* Inline styles for animations */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .loader-dot {
          width: 8px;
          height: 8px;
          background: linear-gradient(180deg, #10B981, #059669);
          border-radius: 9999px;
          display: inline-block;
          transform: translateY(0);
          animation: bounce 0.9s cubic-bezier(.2,.8,.2,1) infinite;
          box-shadow: 0 6px 14px rgba(5,150,105,0.12);
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.9; }
          40% { transform: translateY(-8px); opacity: 1; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-120%); opacity: 0; }
          50% { transform: translateX(0); opacity: 0.5; }
          100% { transform: translateX(120%); opacity: 0; }
        }
        .animate-shimmer { animation: shimmer 1.6s linear infinite; }
      `}</style>
    </div>
  );
};

export const FullscreenLoader: React.FC<{ message?: string }> = ({
  message,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dim background */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Glass card */}
      <div className="relative z-10 max-w-md w-full mx-4 bg-white/8 backdrop-blur-lg border border-white/20 rounded-3xl p-8 flex flex-col items-center gap-6 shadow-xl">
        {/* Animated blob */}
        <svg width="120" height="120" viewBox="0 0 200 200" className="block">
          <defs>
            <linearGradient id="lg" x1="0" x2="1">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
          </defs>

          <g transform="translate(100 100)">
            <path fill="url(#lg)">
              <animate
                attributeName="d"
                dur="2.8s"
                repeatCount="indefinite"
                values="
                  M44.7,-55.9C57.5,-46.6,66.9,-33.7,71.7,-18.3C76.5,-2.9,76.8,14.9,69.2,30.2C61.6,45.5,46.1,58.3,29.1,63.9C12.1,69.5,-7.6,67.9,-24.6,61.9C-41.6,55.9,-56,45.6,-61.8,31.4C-67.5,17.2,-64.6,-0.9,-57.1,-17.4C-49.6,-33.9,-37.5,-48.8,-22.6,-57.9C-7.7,-67.1,9.9,-70.5,26.8,-66.9C43.7,-63.3,60,-55.2,44.7,-55.9Z;

                  M53.3,-51.3C68.3,-36.3,84.2,-22.6,86.1,-6.9C88,8.8,75.9,25.6,61.3,36.4C46.6,47.2,29.6,52.1,13.6,57.7C-2.4,63.4,-18.6,69.8,-29.9,64.6C-41.1,59.4,-47.5,42.6,-56.2,25.9C-64.9,9.2,-76.8,-7.2,-73.8,-20.4C-70.9,-33.6,-53.9,-43.7,-36.4,-51.6C-18.9,-59.4,-9.5,-65.1,6.8,-74.7C23.1,-84.3,46.3,-97.4,53.3,-51.3Z;

                  M44.7,-55.9C57.5,-46.6,66.9,-33.7,71.7,-18.3C76.5,-2.9,76.8,14.9,69.2,30.2C61.6,45.5,46.1,58.3,29.1,63.9C12.1,69.5,-7.6,67.9,-24.6,61.9C-41.6,55.9,-56,45.6,-61.8,31.4C-67.5,17.2,-64.6,-0.9,-57.1,-17.4C-49.6,-33.9,-37.5,-48.8,-22.6,-57.9C-7.7,-67.1,9.9,-70.5,26.8,-66.9C43.7,-63.3,60,-55.2,44.7,-55.9Z
                "
              />
            </path>
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur="9s"
              from="0"
              to="360"
              repeatCount="indefinite"
            />
          </g>
        </svg>

        {/* Loading text */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-viridian-50 mb-2">
            {message ?? "Generating your plan"}
          </h3>
          <p className="text-sm text-viridian-200/90">
            This might take a few seconds — preparing a smart, tailored budget.
          </p>
        </div>

        {/* Dots bar */}
        <div className="flex items-center gap-2 mt-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{
              background: "linear-gradient(180deg,#10B981,#059669)",
              animation: "pulseDot 1s infinite",
              animationDelay: "0s",
            }}
          />
          <span
            className="w-3 h-3 rounded-full"
            style={{
              background: "linear-gradient(180deg,#10B981,#059669)",
              animation: "pulseDot 1s infinite",
              animationDelay: "0.2s",
            }}
          />
          <span
            className="w-3 h-3 rounded-full"
            style={{
              background: "linear-gradient(180deg,#10B981,#059669)",
              animation: "pulseDot 1s infinite",
              animationDelay: "0.4s",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes pulseDot {
          0% { transform: translateY(0); opacity: 0.6;}
          50% { transform: translateY(-8px); opacity: 1;}
          100% { transform: translateY(0); opacity: 0.6;}
        }
      `}</style>
    </div>
  );
};
