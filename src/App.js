import React from "react";
import Weather from "./Weather";
import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      {<Weather defaultCity="Berlin" />}
      
    </div>
  );
}
