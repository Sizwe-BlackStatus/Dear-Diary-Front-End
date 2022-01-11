import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./Components/RegisterPage.js";
import LoginPage from "./Components/LoginPage.js";
import DearDiary from "./Components/DearDiary";

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/" exact element={<RegisterPage />} />
            <Route
              path="/login"
              exact
              element={<LoginPage  />}
            />
            <Route path="/home" exact element={<DearDiary />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
