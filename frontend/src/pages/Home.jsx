import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-100 via-teal-100 to-blue-100">
      <div className="flex flex-1 flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-teal-700 mb-4 drop-shadow-sm">
          Organize Your Tasks, Boost Your Productivity 🚀
        </h2>
        <p className="text-gray-700 max-w-2xl mb-6 text-lg">
          A simple, clean, and powerful task manager for individuals and teams.
          Stay on top of your goals and achieve more every day.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white font-bold shadow-lg hover:scale-110 transition"
        >
          Get Started
        </button>
      </div>

      <footer className="bg-white text-center py-4 mt-6 shadow-inner">
        <p className="text-gray-600 text-sm">
          © 2025 TaskManager. Farsana Serin.
        </p>
      </footer>
    </div>
  );
};
