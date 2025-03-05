import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home.jsx'
import Navbar from './components/navbar.jsx'
import Invoices from './components/invoices.jsx';
import Customers from './components/customers.jsx'


export default function App() {
  return (
    <>
      <Navbar /> 
      <div className="container-fluite mt-4">
        <Routes> 
          <Route path='/' element={<Home/>}/>
          <Route path="/invoices" element={<Invoices />} />
          <Route path='/customers' element={<Customers/>}/>
        </Routes>
      </div>
    </>
  )
}
