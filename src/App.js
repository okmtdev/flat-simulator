import React from "react";
import "./App.css";
import LoanCalculator from "./components/LoanCalculator";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>住宅ローン シュミレーター</h1>
      </header>
      <LoanCalculator />
    </div>
  );
}

export default App;
