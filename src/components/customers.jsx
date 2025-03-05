import React, { useState } from "react";

export default function Customers() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Hiya",
      email: "hiya@email.com",
      phone: "1234567890",
      company: "abcd",
      address: "ABC",
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
      company: "asdf",
      address: "xyz",
      city: "ASD",
      state: "GUJ",
      country: "IND",
      pincode: "654789",
    },
  ]);

  const [formData, setFormData] = useState({
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

  //edit customer
  const [editingCustomerId, setEditingCustomerId] = useState(null);

  //both adding and editing
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  //Add-Update Customer while submitting form
  const handleSubmit = () => {
    if (Object.values(formData).some((field) => field.trim() === "")) {
      alert("All fields are required!");
      return;
    }

    if (editingCustomerId !== null) {
      // Update existing customer
      setCustomers(customers.map((customer) => (customer.id === editingCustomerId ? { ...formData, id: editingCustomerId } : customer)));
      setEditingCustomerId(null);
    } else {

      // Add new customer duplicate emails
      if (customers.some((customer) => customer.email === formData.email)) {
        alert("This email is already registered!");
        return;
      }
      setCustomers([...customers, { id: customers.length + 1, ...formData }]);
    }

    // Clear form
    setFormData({ name: "", email: "", phone: "", company: "", address: "", city: "", state: "", country: "", pincode: "" });
  };

  //edit customer
  const handleEditCustomer = (customer) => {
    setEditingCustomerId(customer.id);
    setFormData(customer);
  };

  //delete customer
  const handleDeleteCustomer = (id) => {
    const conformDelete=window.confirm("Sure you want to Delete ?")
    if (conformDelete){
      setCustomers(customers.filter((customer) => customer.id !== id));
    }
  };

  return (
    <div className="customer-container">
      <h2>Customers</h2>

      {/* Customer Form */}
      <div className="customer-form">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <input type="text" name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
        <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />

        {/* Button Add or Update */}
        <button onClick={handleSubmit}>{editingCustomerId !== null ? "Update Customer" : "Add Customer"}</button>

        {/* cancel button for editing */}
        {editingCustomerId !== null && <button onClick={() => setEditingCustomerId(null)}>Cancel</button>}
      </div>

      
      <div className="customer-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th>Pincode</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.company}</td>
                <td>{customer.address}</td>
                <td>{customer.city}</td>
                <td>{customer.state}</td>
                <td>{customer.country}</td>
                <td>{customer.pincode}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEditCustomer(customer)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
