import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "../../Pages/Home";
import TopBar from '../TopBar/index'
import CreateQoute from '../../Pages/CreateQoute'
const App = () => {
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/Home" element={<Home />} />
        <Route path="/admin/createQoute" element={<CreateQoute />} />
      </Routes>
    </Router>
  );
};
export default App;
