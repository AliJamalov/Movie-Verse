import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/layout/Header";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import { useAuthStore } from "./stores/authStore";
import { CgSpinner } from "react-icons/cg";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { chekingAuthLoading, getMe, user } = useAuthStore();

  useEffect(() => {
    getMe();
  }, [getMe]);

  if (chekingAuthLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CgSpinner size={35} className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:endpoint?/:subEndpoint?" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
