import React, { useState } from "react";
import "../styles/invoices.css"; 
import { FaEdit, FaSave } from "react-icons/fa";  // Use FaEdit icon

export default function Invoices() {
  const [invoices, setInvoices] = useState([
    { id: 1, invoiceNumber: "INV001", customer: "Hiya", amount: 150, status: "Paid", date: "2025-03-31" },
    { id: 2, invoiceNumber: "INV002", customer: "Krishna", amount: 250, status: "Overdue", date: "2025-03-30" },
    { id: 3, invoiceNumber: "INV003", customer: "Khushi", amount: 650, status: "Pending", date: "2025-03-29" }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);

  // Open the modal and set the current invoice
  const openEditModal = (invoice) => {
    setCurrentInvoice(invoice);
    setIsEditing(true);
  };

  // Close the modal
  const closeEditModal = () => {
    setIsEditing(false);
    setCurrentInvoice(null);
  };

  // Handle form submission
  const handleEditSubmit = (e) => {
    e.preventDefault();

    const updatedInvoices = invoices.map((inv) =>
      inv.id === currentInvoice.id ? currentInvoice : inv
    );

    setInvoices(updatedInvoices);
    closeEditModal();
  };

  // Handle input changes in the modal form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentInvoice((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Paid": return "status-paid";
      case "Overdue": return "status-overdue";
      case "Pending": return "status-pending";
      default: return "status-default";
    }
  };

  // Format date with day of the week
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="invoice-page">
      <div className="container">
        <h2 className="title">Invoices</h2>

        <div className="card-grid">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="card">
              <div className="card-header">
                <h3>{invoice.customer}</h3>
                <span className={`badge ${getStatusColor(invoice.status)}`}>
                  {invoice.status}
                </span>
              </div>

              <div className="card-content">
                <p>Invoice: {invoice.invoiceNumber}</p>
                <p>Amount: ₹{invoice.amount}</p>
                <p>Date: {formatDate(invoice.date)}</p> 
              </div>

              <div className="card-footer">
                <button
                  className="btn-edit"
                  onClick={() => openEditModal(invoice)}
                >
                  <FaEdit className="icon" /> Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeEditModal}>&times;</span>
            <h2>Edit Invoice</h2>

            <form onSubmit={handleEditSubmit}>
              <label>Customer Name:</label>
              <input
                type="text"
                name="customer"
                value={currentInvoice.customer}
                onChange={handleChange}
                required
              />

              <label>Amount (₹):</label>
              <input
                type="number"
                name="amount"
                value={currentInvoice.amount}
                onChange={handleChange}
                required
              />

              <label>Status:</label>
              <select
                name="status"
                value={currentInvoice.status}
                onChange={handleChange}
                required
              >
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
                <option value="Pending">Pending</option>
              </select>

              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={currentInvoice.date}
                onChange={handleChange}
                required
              />

              <button type="submit" className="btn-save">
                <FaSave className="icon" /> Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 
