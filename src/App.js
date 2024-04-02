import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Navbar from './layouts/Navbar';
import Login from "./components/userauth/Login";
import RegisterUser from "./components/userauth/RegisterUser";
import Customers from "./components/customer/Customer";
import Dashboard from "./components/dashboard/Dashboard";
import Enumeration from './components/enumeration/Enumeration';
import BillDistribution from './components/bill/BillDistribution';
import MeterReading from './components/meter/MeterReading';


function App() {


  return (
    <Router>

        <Routes>
          <Route path="/login" element={< Login />} />
          <Route path="/" element={<Layout />} >
            <Route index element={< Dashboard />} />
            <Route path="/register-user" element={< RegisterUser />} />
            <Route path="customers" element={< Customers />} />
            <Route path="enumeration" element={< Enumeration />} />
            <Route path="meter-reading" element={< MeterReading />} />
            <Route path="bill-distribution" element={< BillDistribution />} />
          </Route>

        </Routes>
      
    </Router>
  );
};

export default App;
