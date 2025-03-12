import React, { useState } from "react";

export default function Invoices() {
  const CGST_RATE = 9;
  const SGST_RATE = 9;

  const [invoices, setInvoices] = useState([
    {
      id: 1,
      invoiceNumber: "INV001",
      date: "2025-03-10",
      customer: "Hiya",
      amountWithoutGST: 150.0,
      cgst: (150 * CGST_RATE) / 100,
      sgst: (150 * SGST_RATE) / 100,
      grandTotal: 150 + (150 * CGST_RATE) / 100 + (150 * SGST_RATE) / 100,
      status: "Paid",
    },
    {
      id: 2,
      invoiceNumber: "INV002",
      date: "2025-03-09",
      customer: "Krishna",
      amountWithoutGST: 250.0,
      cgst: (250 * CGST_RATE) / 100,
      sgst: (250 * SGST_RATE) / 100,
      grandTotal: 250 + (250 * CGST_RATE) / 100 + (250 * SGST_RATE) / 100,
      status: "Overdue",
    },
    {
      id: 3,
      invoiceNumber: "INV003",
      date: "2025-03-09",
      customer: "Khushi",
      amountWithoutGST: 650.0,
      cgst: (650 * CGST_RATE) / 100,
      sgst: (650 * SGST_RATE) / 100,
      grandTotal: 650 + (650 * CGST_RATE) / 100 + (650 * SGST_RATE) / 100,
      status: "Pending",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [editInvoice, setEditInvoice] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    customer: "",
    amountWithoutGST: "",
    cgst: "",
    sgst: "",
    grandTotal: "",
    status: "Pending",
  });

  const generateInvoiceNumber = () => {
    if (invoices.length === 0) return "INV001";
    const lastInvoiceNumber = invoices[invoices.length - 1].invoiceNumber;
    const lastNumber = parseInt(lastInvoiceNumber.replace("INV", ""), 10);
    return `INV${String(lastNumber + 1).padStart(3, "0")}`;
  };

  const handleEditClick = (invoice) => {
    setEditInvoice(invoice.id);
    setFormData({ ...invoice });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    if (name === "amountWithoutGST") {
      const amount = parseFloat(value) || 0;
      const cgst = (amount * CGST_RATE) / 100;
      const sgst = (amount * SGST_RATE) / 100;
      updatedData.cgst = cgst;
      updatedData.sgst = sgst;
      updatedData.grandTotal = amount + cgst + sgst;
    }

    setFormData(updatedData);
  };

  const handleSave = () => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice) =>
        invoice.id === editInvoice
          ? { ...invoice, ...formData, amountWithoutGST: parseFloat(formData.amountWithoutGST), cgst: (parseFloat(formData.amountWithoutGST) * CGST_RATE) / 100, sgst: (parseFloat(formData.amountWithoutGST) * SGST_RATE) / 100, grandTotal: parseFloat(formData.amountWithoutGST) + (parseFloat(formData.amountWithoutGST) * CGST_RATE) / 100 + (parseFloat(formData.amountWithoutGST) * SGST_RATE) / 100 }
          : invoice
      )
    );
    setFormData({
      date: "",
      customer: "",
      amountWithoutGST: "",
      cgst: "",
      sgst: "",
      grandTotal: "",
      status: "Pending",
    });
    setEditInvoice(null);
  };
  

  const handleCancel = () => {
    setEditInvoice(null);
    setFormData({
      date: "",
      customer: "",
      amountWithoutGST: "",
      cgst: "",
      sgst: "",
      grandTotal: "",
      status: "Pending",
    });
  };

  const handleAddCustomer = () => {
    if (formData.customer && formData.amountWithoutGST && formData.date) {
      const amount = parseFloat(formData.amountWithoutGST) || 0;
      const cgst = (amount * CGST_RATE) / 100;
      const sgst = (amount * SGST_RATE) / 100;
      const newInvoice = {
        id: invoices.length + 1,
        invoiceNumber: generateInvoiceNumber(),
        date: formData.date,
        customer: formData.customer,
        amountWithoutGST: amount,
        cgst,
        sgst,
        grandTotal: amount + cgst + sgst,
        status: formData.status,
      };
      setInvoices([...invoices, newInvoice]);
      setFormData({
        date: "",
        customer: "",
        amountWithoutGST: "",
        cgst: "",
        sgst: "",
        grandTotal: "",
        status: "Pending",
      });
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="invoice-page">
      <div className="invoice-container">
        <h2 className="invoice-title">Invoices</h2>

        <input type="text" placeholder="Search Customer!" value={searchTerm}       onChange={handleSearch} className="search-box"/>

        <div className="add-customer-form">
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
          <input type="text" name="customer" placeholder="Customer Name" value={formData.customer} onChange={handleChange} />
          <input type="number" name="amountWithoutGST" placeholder="Amount Without GST" value={formData.amountWithoutGST} onChange={handleChange} />
          <input type="number" name="cgst" placeholder="CGST" value={formData.cgst} readOnly />
          <input type="number" name="sgst" placeholder="SGST" value={formData.sgst} readOnly />
          <input type="number" name="grandTotal" placeholder="Grand Total" value={formData.grandTotal} readOnly />
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
          </select>
          <button className="add-btn" onClick={handleAddCustomer} disabled={editInvoice !== null}>Add</button>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Invoice No.</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Amount (₹)</th>
              <th>CGST (9%)</th>
              <th>SGST (9%)</th>
              <th>Grand Total (₹)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.invoiceNumber}</td>
                <td>{new Date(invoice.date).toLocaleDateString("en-GB")}</td>
                <td>{invoice.customer}</td>
                <td>{invoice.amountWithoutGST.toFixed(2)}</td>
                <td>{invoice.cgst.toFixed(2)}</td>
                <td>{invoice.sgst.toFixed(2)}</td>
                <td>{invoice.grandTotal.toFixed(2)}</td>
                <td>
                  <span className={`status ${invoice.status.toLowerCase()}`}>{invoice.status}</span>
                </td>
                <td>
                  {editInvoice === invoice.id ? (
                    <>
                      <button className="save-btn" onClick={handleSave}>Save</button>
                      <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                    </>
                  ) : (
                    <button className="edit-btn" onClick={() => handleEditClick(invoice)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
