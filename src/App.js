import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Navbar from './layouts/Navbar';
import Login from "./components/userauth/Login";

import RegisterUser from "./components/settings/user-management/RegisterUser";
import Customers from "./components/customer/Customer";
import Dashboard from "./components/dashboard/Dashboard";
import Enumeration from './components/enumeration/Enumeration';
import BillDistribution from './components/bill/BillDistribution';
import MeterReading from './components/meter/MeterReading';
import DtMeterReading from './components/dtmeter/DtMeterReading';
import Disconnection from './components/disconnection/Disconnection';
import Reconnection from './components/reconnection/Reconnection';
import CroRouteMap from './components/cro/CroRouteMap';
import Cro from './components/cro/Cro';
import Dss from './components/dss/Dss';
import CustomerEngagement from './components/cro/CustomerEngagement';
import DtComplaint from './components/dtcomplaint/DtComplaint';
import Performance from './components/Performance/Performance';
import MdAudit from './components/md/MdAudit';
import Evaluation from './components/evaluation/Evaluation';
import { AuthProvider } from './components/userauth/AuthContext';
import ProtectedRoute from './components/userauth/ProtectedRoute';
import UserManagement from './components/settings/user-management/UserManagement';


function App() {


  return (
    <AuthProvider>
      <Router>

        <Routes>
          <Route path="/login" element={< Login />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route element={<Layout />} >
              <Route index element={< Dashboard />} />
              <Route path="/register-user" element={< RegisterUser />} />
              <Route path="customers" element={< Customers />} />
              <Route path="enumeration" element={< Enumeration />} />
              <Route path="meter-reading" element={< MeterReading />} />
              <Route path="dt-meter-reading" element={< DtMeterReading />} />
              <Route path="disconnection" element={< Disconnection />} />
              <Route path="reconnection" element={< Reconnection />} />
              <Route path="cro-map" element={< CroRouteMap />} />
              <Route path="cro" element={< Cro />} />
              <Route path="dss" element={< Dss />} />
              <Route path="bill-distribution" element={< BillDistribution />} />
              <Route path="customer-engagement" element={< CustomerEngagement />} />
              <Route path="dt-complaint" element={< DtComplaint />} />
              <Route path="performance" element={< Performance />} />
              <Route path="md-audit" element={< MdAudit />} />
              <Route path="evaluation" element={< Evaluation />} />
              <Route path="user-management" element={< UserManagement />} />
              <Route path="register" element={< RegisterUser />}/>
            </Route>
          </Route>

        </Routes>

      </Router>
    </AuthProvider>
  );
};

export default App;
