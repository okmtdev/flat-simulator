import React, { useState } from "react";
import PaymentInfo from "./PaymentInfo";
import LoanForm from "./LoanForm";
import "./LoanCalculator.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [loanDuration, setLoanDuration] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [repaymentType, setRepaymentType] = useState("equal-principal");
  const [paymentSchedule, setPaymentSchedule] = useState([]);

  const [interestRateType, setInterestRateType] = useState("fixed");
  const [interestRatePattern, setInterestRatePattern] = useState("maintain");

  function calculateEqualPrincipalRepayment(
    principal,
    monthlyInterestRate,
    totalPayments
  ) {
    let schedule = [];
    let remainingBalance = principal;
    let totalRepaid = 0;

    for (let month = 1; month <= totalPayments; month++) {
      const principalPayment = principal / totalPayments;
      const interestPayment = remainingBalance * monthlyInterestRate;
      const totalPayment = principalPayment + interestPayment;

      remainingBalance -= principalPayment;
      totalRepaid += totalPayment;

      schedule.push({
        month,
        year: Math.ceil(month / 12),
        totalPayment,
        interestPayment,
        remainingBalance,
        totalRepaid,
      });
    }

    return schedule;
  }

  function calculateEqualTotalRepayment(
    principal,
    monthlyInterestRate,
    totalPayments
  ) {
    let schedule = [];
    let remainingBalance = principal;
    let totalRepaid = 0;
    const totalPayment =
      (principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));

    for (let month = 1; month <= totalPayments; month++) {
      const interestPayment = remainingBalance * monthlyInterestRate;
      const principalPayment = totalPayment - interestPayment;

      remainingBalance -= principalPayment;
      totalRepaid += totalPayment;

      schedule.push({
        month,
        year: Math.ceil(month / 12),
        totalPayment,
        interestPayment,
        remainingBalance,
        totalRepaid,
      });
    }

    return schedule;
  }

  function calculateMonthlyInterestRate(annualRate, month, pattern) {
    switch (pattern) {
      case "maintain":
        return annualRate / 12;
      case "mini":
        // 年間 0.05%ペース
        return (annualRate + ((month - 1) / 12) * 0.0005) / 12;
      case "minor":
        // 年間 0.10%ペース
        return (annualRate + ((month - 1) / 12) * 0.001) / 12;
      case "incremental":
        // 年間 0.25%ペース
        return (annualRate + ((month - 1) / 12) * 0.0025) / 12;
      case "maximum":
        // 年間 0.5%ペース
        return (annualRate + ((month - 1) / 12) * 0.005) / 12;
      default:
        return annualRate / 12;
    }
  }

  function calculateRepaymentSchedule() {
    const principal = parseFloat(loanAmount) * 10000;
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12;
    const totalPayments = parseInt(loanDuration) * 12;

    let schedule = [];
    let remainingBalance = principal;
    let totalRepaid = 0;
    if (interestRateType === "variable") {
      // 変動金利の場合
      const lifetimeCap = 0.05;
      let adjustedInterestRate = parseFloat(interestRate) / 100;
      let cappedInterestRate = adjustedInterestRate + lifetimeCap;
      for (let month = 1; month <= totalPayments; month++) {
        let monthlyInterestRate = calculateMonthlyInterestRate(
          adjustedInterestRate,
          month,
          interestRatePattern
        );
        monthlyInterestRate = Math.min(
          monthlyInterestRate,
          cappedInterestRate / 12
        );
        let totalPayment, principalPayment, interestPayment;
        if (repaymentType === "equal-principal") {
          principalPayment = principal / totalPayments;
          interestPayment = remainingBalance * monthlyInterestRate;
          totalPayment = principalPayment + interestPayment;
        } else {
          // "equal-total" の場合
          if (month === 1) {
            totalPayment = calculateEqualTotalPayment(
              principal,
              monthlyInterestRate,
              totalPayments
            );
          }
          interestPayment = remainingBalance * monthlyInterestRate;
          principalPayment = totalPayment - interestPayment;
        }

        totalRepaid += totalPayment;
        remainingBalance -= principalPayment;

        schedule.push({
          month,
          year: Math.ceil(month / 12),
          totalPayment,
          interestPayment,
          remainingBalance,
          totalRepaid,
        });
      }
    } else {
      if (repaymentType === "equal-principal") {
        schedule = calculateEqualPrincipalRepayment(
          principal,
          monthlyInterestRate,
          totalPayments
        );
      } else {
        schedule = calculateEqualTotalRepayment(
          principal,
          monthlyInterestRate,
          totalPayments
        );
      }
    }

    setPaymentSchedule(schedule);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    calculateRepaymentSchedule();
  };

  const formatToMan = (value) => {
    return `${Math.floor(value / 10000)}`;
  };

  const calculateTotalRepaid = (schedule) => {
    return schedule.reduce((acc, cur) => acc + cur.totalPayment, 0);
  };

  function calculateEqualTotalPayment(
    principal,
    monthlyInterestRate,
    totalPayments
  ) {
    return (
      (principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -totalPayments))
    );
  }

  const displayTotalRepaid = () => {
    const totalRepaid = calculateTotalRepaid(paymentSchedule);
    return formatToMan(totalRepaid);
  };

  const getMaxYear = (schedule) => {
    if (schedule.length === 0) return [];
    const lastEntry = schedule[schedule.length - 1];
    return [lastEntry.year];
  };

  return (
    <div className="container">
      <div className="form-container">
        <LoanForm
          loanAmount={loanAmount}
          setLoanAmount={setLoanAmount}
          loanDuration={loanDuration}
          setLoanDuration={setLoanDuration}
          interestRate={interestRate}
          setInterestRate={setInterestRate}
          repaymentType={repaymentType}
          setRepaymentType={setRepaymentType}
          interestRateType={interestRateType}
          setInterestRateType={setInterestRateType}
          interestRatePattern={interestRatePattern}
          setInterestRatePattern={setInterestRatePattern}
          handleSubmit={handleSubmit}
        />
        <div className="total-repaid-container">
          <h3>総返済金額: {displayTotalRepaid()} 万円</h3>
        </div>
      </div>

      <div className="chart-container">
        <LineChart
          width={500}
          height={300}
          data={paymentSchedule}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            label={{ value: "年", position: "insideBottomRight", offset: -10 }}
            ticks={getMaxYear(paymentSchedule)}
          />
          <YAxis
            label={{ value: "金額 (万円)", angle: -90, position: "insideLeft" }}
            tickFormatter={formatToMan}
            domain={[0, "dataMax"]}
            allowDataOverflow={true}
          />
          <Tooltip formatter={(value) => formatToMan(value)} />
          <Legend />
          <Line
            type="monotone"
            dataKey="remainingBalance"
            name="残元金"
            stroke="#82ca9d"
          />
          <Line
            type="monotone"
            dataKey="totalRepaid"
            name="累計返済額"
            stroke="#8884d8"
          />
        </LineChart>
      </div>
      <div className="payment-info-container">
        <PaymentInfo />
      </div>
    </div>
  );
}

export default LoanCalculator;
