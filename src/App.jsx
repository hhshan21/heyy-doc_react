import { Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Footer from "../src/components/partials/footer/Footer";
import SiteHeader from "./components/partials/siteHeader/SiteHeader";

function App() {
  return (
    <div className="App">
      <SiteHeader />
      <h1>Hello</h1>
      <Footer />
    </div>
  );
}

export default App;
