import React from "react";
import "./PaymentInfo.css";

function PaymentInfo() {
  return (
    <div className="payment-info-container">
      <div className="payment-info">
        <h2>用語解説</h2>
        <div className="info-item">
          <h3>総返済金額</h3>
          <p>返済期間内で支払う全ての金額の合計のこと</p>
        </div>
        <div className="info-item">
          <h3>元金均等返済</h3>
          <p>
            借入れた元金をローン期間で均等に分割し、毎月同じ額の元金を返済する返済方法です。
            利息は残っている元金に対して計算されるため、返済する元金が減るにつれて支払う利息も減少していきます。
            その結果、毎月の返済額は徐々に減少していく特徴があります。
            元利均等返済よりも累計返済金額が少なくなるため、元利均等返済と迷ったらこちらを選択することをお勧めします。
          </p>
        </div>
        <div className="info-item">
          <h3>元利均等返済</h3>
          <p>
            元金と利息を合わせた総返済額をローン期間で均等に分割し、毎月同じ額を返済する返済方法です。
            初期の返済では利息の割合が高く、時間が経つにつれて元金の割合が高くなっていきます。
            毎月の返済額は一定であるため、元金均等返済より予算管理がしやすいという特徴があります。
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentInfo;
