import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import SignUp from "../../Pages/SignUp";
import Login from "../../Pages/Login/Login";
import NavBar from '../Navbar/navbar'
const AuthApp = () => {
  return (
    <>
    <Router>
    <NavBar />
      <Routes>
        <Route path="/CreateAccount" element={<SignUp />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
    </>
  );
};
export default AuthApp;
