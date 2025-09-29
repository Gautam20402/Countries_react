import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CountryList from "./components/CountryList";
import DetailPage from "./components/DetailPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CountryList />} />
        <Route path="/detail/:code" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}
export default App;
