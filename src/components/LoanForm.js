// src/components/LoanForm.js
import React from "react";
import "./LoanForm.css"; // スタイルシートをインポート

const LoanForm = ({
  loanAmount,
  setLoanAmount,
  loanDuration,
  setLoanDuration,
  interestRate,
  setInterestRate,
  repaymentType,
  setRepaymentType,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="loan-form">
      <div className="form-group">
        <label htmlFor="loanAmount">借入金額（万）:</label>
        <input
          id="loanAmount"
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          placeholder="例: 500"
        />
      </div>
      <div className="form-group">
        <label htmlFor="loanDuration">借入期間（年）:</label>
        <input
          id="loanDuration"
          type="number"
          value={loanDuration}
          onChange={(e) => setLoanDuration(e.target.value)}
          placeholder="例: 20"
        />
      </div>
      <div className="form-group">
        <label htmlFor="interestRate">金利（%）:</label>
        <input
          id="interestRate"
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          placeholder="例: 2.5"
        />
      </div>
      <div className="form-group">
        <label htmlFor="repaymentType">返済タイプ:</label>
        <select
          id="repaymentType"
          value={repaymentType}
          onChange={(e) => setRepaymentType(e.target.value)}
        >
          <option value="equal-principal">元金均等返済</option>
          <option value="equal-total">元利均等返済</option>
        </select>
      </div>
      <button type="submit" className="submit-button">
        計算
      </button>
    </form>
  );
};

export default LoanForm;
