import React from "react";
import BackImage from "../images/bg-img.png";

export default function Home() {
  return (
    <div className="homepage">
      <header className="header-box">
        <div className="box-content">
          <h1>Smart Invoicing for Service Providers</h1>
          <p>Manage invoices, track payments, and grow your business with ease.</p>
          <button className="btn-create-invoice">Create Invoice</button>
        </div>
        <div className="image-container">
          <img src={BackImage} alt="Invoice Dashboard" className="back-image" />
        </div>
      </header>

      <section className="dashboard">
        <div className="stats-card">
          <h3>Total Balance</h3>
          <h2>₹30,500</h2>
          <p>Last updated: 5 min ago</p>
        </div>
        <div className="stats-card">
          <h3>Pending Invoices</h3>
          <h2>₹7,200</h2>
          <p>3 invoices pending</p>
        </div>
        <div className="stats-card">
          <h3>Clients</h3>
          <h2>15</h2>
          <p>Active clients</p>
        </div>
      </section>

      <section className="transactions">
        <h2>Recent Transactions</h2>
        <ul>
          <li>✅ Web Development - ₹12,500 (Paid)</li>
          <li>⚠️ SEO Services - ₹3,200 (Pending)</li>
          <li>✅ Logo Design - ₹1,500 (Paid)</li>
        </ul>
      </section>

      <section className="actions">
        <button className="action-btn">Generate Report</button>
        <button className="action-btn">View All Invoices</button>
      </section>
    </div>
  );
}
