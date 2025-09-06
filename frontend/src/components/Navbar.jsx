import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


export const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
  Swal.fire({
    title: 'Are you sure you want to logout?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, logout',
    cancelButtonText: 'Cancel',
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('token');
      Swal.fire({
        title: 'Logged out!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
      navigate('/login'); // redirect to login page
    }
  });
};


  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-teal-700 cursor-pointer hover:text-green-600 transition"
      >
        🌿 TaskManager
      </h1>

      <div className="flex gap-4">
        {!token ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold hover:scale-105 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold hover:scale-105 transition"
            >
              Register
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold hover:scale-105 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};
