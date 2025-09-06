import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        username,
        password,
      });

      if (res.data.error) {
        return alert(res.data.error);
      }

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);

        Swal.fire({
          icon: "success",
          title: "Welcome Back! 🎉",
          text: "Logged in Successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/dashboard");
      }
    } catch (error) {
      Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Login failed. Please try again.",
    });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-100 via-teal-100 to-blue-100">
      

      <div className="flex flex-1 items-center justify-center px-4">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-teal-700 mb-6">
            🔑 Login
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter Password"
              className="border border-teal-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-2 rounded-lg shadow-md hover:scale-105 transition"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Don’t have an account?
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
