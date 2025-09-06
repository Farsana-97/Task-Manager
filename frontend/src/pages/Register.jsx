import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const api = import.meta.env.VITE_API_URL

export const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${api}/api/auth/register`, {
        username,
        email,
        password,
      });


      if (!res.data.error) {
        Swal.fire({
          icon: "success",
          title: "Account Created 🎉",
          text: "Your new account has been created successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
        
        navigate("/login");
      }
    } catch (error) {
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-100 via-teal-100 to-blue-100">
    

      <div className="flex flex-1 items-center justify-center px-4">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-teal-700 mb-6">
            🌱 Register New Account
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder="Enter Username"
              className="border border-teal-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
            />

            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter Email"
              className="border border-teal-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter Password"
              className="border border-teal-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />

            <button
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-2 rounded-lg shadow-md hover:scale-105 transition"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
