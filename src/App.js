import React from "react";
import "./App.css";
import LoanCalculator from "./components/LoanCalculator"; // LoanCalculator コンポーネントをインポート

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <title> タグはここではなく、<head> 内に配置するか、react-helmet を使用 */}
        <h1>住宅ローン シュミレーター</h1>
      </header>
      <LoanCalculator />
    </div>
  );
}

export default App;
