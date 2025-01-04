import React from "react";
import "./LoanForm.css";

const LoanForm = ({
  loanAmount,
  setLoanAmount,
  loanDuration,
  setLoanDuration,
  interestRate,
  setInterestRate,
  repaymentType,
  setRepaymentType,
  interestRateType,
  setInterestRateType,
  interestRatePattern,
  setInterestRatePattern,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="loan-form">
      <div className="form-group">
        <label htmlFor="interestRateType">金利タイプ:</label>
        <select
          id="interestRateType"
          value={interestRateType}
          onChange={(e) => setInterestRateType(e.target.value)}
        >
          <option value="fixed">固定金利</option>
          <option value="variable">変動金利</option>
        </select>
      </div>
      {interestRateType === "variable" && (
        <div className="form-group">
          <label htmlFor="interestRatePattern">金利変動パターン:</label>
          <select
            id="interestRatePattern"
            value={interestRatePattern}
            onChange={(e) => setInterestRatePattern(e.target.value)}
          >
            <option value="maintain">金利変動なしパターン</option>
            <option value="mini">金利上昇パターン（年間 0.05%）</option>
            <option value="minor">金利上昇パターン（年間 0.10%）</option>
            <option value="incremental">金利上昇パターン（年間 0.25%）</option>
            <option value="maximum">金利上昇パターン（年間 0.5%）</option>
          </select>
        </div>
      )}
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
          disabled={interestRateType === "variable"}
        >
          <option value="equal-principal">元金均等返済</option>
          <option
            value="equal-total"
            disabled={interestRateType === "variable"}
          >
            元利均等返済
          </option>
        </select>
      </div>
      <button type="submit" className="submit-button">
        計算
      </button>
    </form>
  );
};

export default LoanForm;
