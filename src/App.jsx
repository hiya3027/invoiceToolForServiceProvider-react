import './index.css'
export default function App() {
  return (
    <>
      <div class="container">
        <aside class="sidebar">
          <h2>Invoice Mate</h2><hr/>
          <ul>
            <li>Dashboard</li>
            <li>Activity</li>
            <li>Contacts</li>
            <li>Invoice</li>
            <li>Logout</li>
          </ul>
        </aside>
        <main class="main-content">
          <header>
            <h1>Hello, Hiya 👋</h1>
            <input type="text" class="btn-search" placeholder="Search activity or invoices" />
          </header>
          <section class="stats">
            <div class="card">
              <p>Total Balance</p>
              <h2>₹30,500</h2>
              <button class="btn-download-report">Download Report</button>
            </div>
            <div class="card">
              <p>Top Countries</p>
              <h2>India</h2>
            </div>
          </section>
          <section class="activity">
            <h3>Recent Activity</h3>
            <ul>
              <li>Brochure Design - ₹320</li>
              <li>Ecommerce Design - ₹1320</li>
              <li>Digital Marketing - ₹980</li>
            </ul>
          </section>
          <section class="invoices">
            <h3>Pending Invoices</h3>
            <ul>
              <li>Responsive Design - Remind</li>
              <li>Responsive Design - Remind</li>
              <li>Responsive Design - Remind</li>
            </ul>
          </section>
        </main>
      </div>
    </>
  )
}
