import React, { useState } from "react";
import "../styles/customers.css";
import { FaEdit, FaTrash, FaBuilding, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser } from "react-icons/fa";

export default function Customers() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Hiya",
      email: "hiya@email.com",
      phone: "1234567890",
      company: "ABCD Ltd.",
      address: "123 Street",
      city: "XYZ",
      state: "GUJ",
      country: "IND",
      pincode: "123654",
    },
    {
      id: 2,
      name: "Krishna",
      email: "krishna@email.com",
      phone: "9876543210",
      company: "ASDF Corp.",
      address: "456 Avenue",
      city: "ASD",
      state: "GUJ",
      country: "IND",
      pincode: "654789",
    },
  ]);

  const handleDeleteCustomer = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setCustomers(customers.filter((customer) => customer.id !== id));
    }
  };

  return (
    <div className="customer-container">
      <h2 className="title">Our Customers</h2>

      <div className="customer-grid">
        {customers.map((customer) => (
          <div key={customer.id} className="customer-card">
            <span className="customer-country">{customer.country}</span>

            {/* Card Title */}
            <h3 className="card-title">Customer Info</h3>

            {/* Customer Name */}
            <div className="customer-header">
              <FaUser className="customer-icon" />
              <h3>{customer.name}</h3>
            </div>

            {/* Customer Details */}
            <p><FaEnvelope className="icon" /> <strong>Email:</strong> {customer.email}</p>
            <p><FaPhone className="icon" /> <strong>Phone:</strong> {customer.phone}</p>
            <p><FaBuilding className="icon" /> <strong>Company:</strong> {customer.company}</p>
            <p>
              <FaMapMarkerAlt className="icon" /> <strong>Address:</strong> 
              {customer.address}, {customer.city}, {customer.state}, {customer.pincode}
            </p>

            {/* Action Buttons */}
            <div className="card-actions">
              <button className="btn-edit">
                <FaEdit className="btn-icon" /> Edit
              </button>
              <button className="btn-delete" onClick={() => handleDeleteCustomer(customer.id)}>
                <FaTrash className="btn-icon" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
