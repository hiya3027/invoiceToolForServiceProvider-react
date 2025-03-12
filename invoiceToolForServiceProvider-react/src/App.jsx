import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home.jsx'
import Navbar from './components/navbar.jsx'
import Invoices from './components/invoices.jsx'
import Customers from './components/customers.jsx'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import ForgotPassword from './pages/forgotPassword.jsx';


export default function App() {
  return (
    <Router>
      <Navbar /> 
      <div className="container-fluite mt-4">
        <Routes> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path='/' element={<Home/>}/>
          <Route path="/invoices" element={<Invoices />} />
          <Route path='/customers' element={<Customers/>}/>
        </Routes>
      </div>
    </Router>
  )
}
