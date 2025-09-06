import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { UserDashboard } from "./pages/UserDashboard";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <UserDashboard />
            </ProtectedRoutes>
          }
        ></Route>
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
