import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AttendanceDashboard from './components/AttendanceDashboard';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<AttendanceDashboard />} />
          <Route path="/attendance" element={<AttendanceDashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/add-employee" element={<AddEmployee />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;