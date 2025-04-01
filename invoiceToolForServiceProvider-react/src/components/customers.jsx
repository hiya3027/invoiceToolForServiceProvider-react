import React, { useState } from "react";
import "../styles/customers.css";
import {
  FaEdit,
  FaTrash,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUser,
  FaTimes,
  FaPlus,
} from "react-icons/fa";

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

  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editedCustomer, setEditedCustomer] = useState({});
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const handleClose = () => {
    setIsEditing(false);
    setSelectedCustomer(null);
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setEditedCustomer({ ...customer });
    setIsEditing(true);
  };

  const handleUpdateCustomer = () => {
    if (!editedCustomer.name || !editedCustomer.email) {
      alert("Name and Email are required!");
      return;
    }

    setCustomers(
      customers.map((cust) =>
        cust.id === editedCustomer.id ? { ...cust, ...editedCustomer } : cust
      )
    );
    setIsEditing(false);
    setSelectedCustomer(null);
  };

  const handleDeleteCustomer = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setCustomers(customers.filter((customer) => customer.id !== id));
    }
  };

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email) {
      alert("Name and Email are required!");
      return;
    }

    // Generate unique ID
    const newId =
      customers.length > 0 ? Math.max(...customers.map((c) => c.id)) + 1 : 1;
    const customerToAdd = { id: newId, ...newCustomer };

    setCustomers([...customers, customerToAdd]);
    setIsAdding(false);
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      company: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    });
  };

  return (
    <div className="customer-container">
      <h2 className="title">Our Customers</h2>

      {/* Floating Add Button */}
      <button className="btn-add-fab" onClick={() => setIsAdding(true)}>
        <FaPlus />
      </button>

      <div className="customer-grid">
        {customers.map((customer) => (
          <div key={customer.id} className="customer-card">
            <span className="customer-country">{customer.country}</span>

            <h3 className="card-title">Customer Info</h3>

            <div className="customer-header">
              <FaUser className="customer-icon" />
              <h3>{customer.name}</h3>
            </div>

            <p>
              <FaEnvelope className="icon" /> <strong>Email:</strong>{" "}
              {customer.email}
            </p>
            <p>
              <FaPhone className="icon" /> <strong>Phone:</strong>{" "}
              {customer.phone}
            </p>
            <p>
              <FaBuilding className="icon" /> <strong>Company:</strong>{" "}
              {customer.company}
            </p>
            <p>
              <FaMapMarkerAlt className="icon" /> <strong>Address:</strong>
              {customer.address}, {customer.city}, {customer.state},{" "}
              {customer.pincode}
            </p>

            <div className="card-actions">
              <button
                className="btn-edit"
                onClick={() => handleEditCustomer(customer)}
              >
                <FaEdit className="btn-icon" /> Edit
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDeleteCustomer(customer.id)}
              >
                <FaTrash className="btn-icon" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Customer Modal */}
      {isAdding && (
        <div className="edit-customer-overlay">
          <div className="edit-customer-form">
            <button className="close-btn" onClick={() => setIsAdding(false)}>
              <FaTimes />
            </button>

            <h2>Add New Customer</h2>

            <label>* Name :</label>
            <input
              type="text"
              value={newCustomer.name}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, name: e.target.value })
              }
            />

            <label>* Email :</label>
            <input
              type="email"
              value={newCustomer.email}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, email: e.target.value })
              }
            />

            <label>Phone:</label>
            <input
              type="text"
              value={newCustomer.phone}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, phone: e.target.value })
              }
            />

            <label>Company:</label>
            <input
              type="text"
              value={newCustomer.company}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, company: e.target.value })
              }
            />

            <label>Address:</label>
            <input
              type="text"
              value={newCustomer.address}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, address: e.target.value })
              }
            />

            <label>City:</label>
            <input
              type="text"
              value={newCustomer.city}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, city: e.target.value })
              }
            />

            <label>State:</label>
            <input
              type="text"
              value={newCustomer.state}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, state: e.target.value })
              }
            />

            <label>Country:</label>
            <input
              type="text"
              value={newCustomer.country}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, country: e.target.value })
              }
            />

            <div className="edit-buttons">
              <button className="btn-update" onClick={handleAddCustomer}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {isEditing && selectedCustomer && (
        <div className="edit-customer-overlay">
          <div className="edit-customer-form">
            <button className="close-btn" onClick={handleClose}>
              <FaTimes />
            </button>

            <h2>Edit Customer</h2>

            <label>Name:</label>
            <input
              type="text"
              value={editedCustomer.name}
              onChange={(e) =>
                setEditedCustomer({ ...editedCustomer, name: e.target.value })
              }
            />

            <label>Email:</label>
            <input
              type="email"
              value={editedCustomer.email}
              onChange={(e) =>
                setEditedCustomer({ ...editedCustomer, email: e.target.value })
              }
            />

            <label>Phone:</label>
            <input
              type="text"
              value={editedCustomer.phone}
              onChange={(e) =>
                setEditedCustomer({ ...editedCustomer, phone: e.target.value })
              }
            />

            <label>Company:</label>
            <input
              type="text"
              value={editedCustomer.company}
              onChange={(e) =>
                setEditedCustomer({
                  ...editedCustomer,
                  company: e.target.value,
                })
              }
            />

            <label>Address:</label>
            <input
              type="text"
              value={editedCustomer.address}
              onChange={(e) =>
                setEditedCustomer({
                  ...editedCustomer,
                  address: e.target.value,
                })
              }
            />

            <label>City:</label>
            <input
              type="text"
              value={editedCustomer.city}
              onChange={(e) =>
                setEditedCustomer({ ...editedCustomer, city: e.target.value })
              }
            />

            <label>State:</label>
            <input
              type="text"
              value={editedCustomer.state}
              onChange={(e) =>
                setEditedCustomer({ ...editedCustomer, state: e.target.value })
              }
            />

            <label>Country:</label>
            <input
              type="text"
              value={editedCustomer.country}
              onChange={(e) =>
                setEditedCustomer({
                  ...editedCustomer,
                  country: e.target.value,
                })
              }
            />

            <label>Pincode:</label>
            <input
              type="text"
              value={editedCustomer.pincode}
              onChange={(e) =>
                setEditedCustomer({
                  ...editedCustomer,
                  pincode: e.target.value,
                })
              }
            />

            <div className="edit-buttons">
              <button className="btn-update" onClick={handleUpdateCustomer}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
