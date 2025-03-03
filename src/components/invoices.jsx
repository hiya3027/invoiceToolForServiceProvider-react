import React, { useState } from "react";

export default function Invoices() {
  const [invoices, setInvoices] = useState([
    { id: 1, customer: "Hiya", amount: 150.0, status: "Pending" },
    { id: 2, customer: "Krishna", amount: 250.0, status: "Completed" },
    { id: 3, customer: "Khushi", amount: 100.0, status: "Pending" },
  ]);

  const [editInvoice, setEditInvoice] = useState(null);
  const [formData, setFormData] = useState({
    customer: "",
    amount: "",
    status: "Pending",
  });

  const handleEditClick = (invoice) => {
    setEditInvoice(invoice.id);
    setFormData({
      customer: invoice.customer,
      amount: invoice.amount,
      status: invoice.status,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice) =>
        invoice.id === editInvoice
          ? { ...invoice, ...formData, amount: parseFloat(formData.amount) }
          : invoice
      )
    );
    setEditInvoice(null);
  };

  const handleAddCustomer = () => {
    if (formData.customer && formData.amount) {
      const newInvoice = {
        id: invoices.length + 1,
        customer: formData.customer,
        amount: parseFloat(formData.amount),
        status: formData.status,
      };
      setInvoices([...invoices, newInvoice]);
      setFormData({ customer: "", amount: "", status: "Pending" });
    } else {
      alert("Please fill in all fields.");
    }
  };

  const totalAmount = invoices.reduce(
    (sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="invoice-page">
      <div className="invoice-container">
        <h2 className="invoice-title">Invoices</h2>

        {/* Customer Form */}
        <div className="add-customer-form">
          <input type="text" name="customer" placeholder="Customer Name" 
          value={formData.customer} onChange={handleChange}/>
          <input type="number" name="amount" placeholder="Amount"
            value={formData.amount} onChange={handleChange}/>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <button className="add-btn" onClick={handleAddCustomer}>Add</button>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Amount (₹)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>
                  {editInvoice === invoice.id ? (
                    <input type="text" name="customer" value={formData.customer}
                      onChange={handleChange}/>
                  ) : (
                    invoice.customer
                  )}
                </td>
                <td>
                  {editInvoice === invoice.id ? (
                    <input type="number" name="amount" value={formData.amount}
                      onChange={handleChange} />) : (`₹${invoice.amount.toFixed(2)}`)}
                </td>
                <td>
                  {editInvoice === invoice.id ? (
                    <select name="status"value={formData.status}onChange={handleChange}>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                  ) : (
                    <span className={`status ${invoice.status.toLowerCase()}`}>
                      {invoice.status}
                    </span>
                  )}
                </td>
                <td>
                  {editInvoice === invoice.id ? (
                    <button className="save-btn" onClick={handleSave}>Save</button>
                  ) : (
                    <button className="edit-btn"onClick={() => handleEditClick(invoice)}>
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="total-row">
              <td colSpan="3">Total</td>
              <td colSpan="2" className="total-amount">
                ₹{totalAmount.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
