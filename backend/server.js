const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();  

const app = express();
const PORT = 8000;
const SECRET_KEY = process.env.SECRET_KEY;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// SQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "invoice_tool",
  password: "hiya3027",
  port: 5432,
});

// Register route
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Register Server error" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Login Server error" });
  }
});

// get list of all customers
app.get('/customers', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM customers");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ message: "Error fetching customers" });
  }
});

// edit customer 

app.put('/edit-customer/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, company, address, city, state, country, pincode } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Name, email, and phone are required!" });
  }

  try {
    const existingCustomer = await pool.query("SELECT * FROM customers WHERE id = $1", [id]);
    
    if (existingCustomer.rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    await pool.query(
      `UPDATE customers 
       SET name = $1, email = $2, phone = $3, company = $4, address = $5, 
           city = $6, state = $7, country = $8, pincode = $9 
       WHERE id = $10`,
      [name, email, phone, company, address, city, state, country, pincode, id]
    );

    const updatedCustomer = await pool.query("SELECT * FROM customers WHERE id = $1", [id]);
    res.status(200).json({
      message: "Customer updated successfully",
      customer: updatedCustomer.rows[0]
    });

  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ message: "Server error while updating customer" });
  }
});

// Add customer route
app.post('/add-customer', async (req, res) => {
  const { name, email, phone, company, address, city, state, country, pincode } = req.body;

  // Validate input
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Name, email, and phone are required!" });
  }

  try {
    // Insert new customer into the database
    const result = await pool.query(
      `INSERT INTO customers (name, email, phone, company, address, city, state, country, pincode) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [name, email, phone, company, address, city, state, country, pincode]
    );

    res.status(201).json({
      message: "Customer added successfully",
      customer: result.rows[0]
    });

  } catch (error) {
    console.error("Error adding customer:", error);
    res.status(500).json({ message: "Server error while adding customer" });
  }
});

//delete customer by id
// Delete customer route
app.delete('/delete-customer/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the customer exists
    const customerCheck = await pool.query("SELECT * FROM customers WHERE id = $1", [id]);

    if (customerCheck.rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Delete the customer
    await pool.query("DELETE FROM customers WHERE id = $1", [id]);

    res.status(200).json({ message: "Customer deleted successfully" });

  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ message: "Server error while deleting customer" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});