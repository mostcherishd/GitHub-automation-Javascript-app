import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const AddEmployee: React.FC = () => {
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const saveEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await EmployeeService.saveEmployee(employee);
      navigate('/employees');
    } catch (error) {
      console.error('Error saving employee:', error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setEmployee({
      firstName: '',
      lastName: '',
      emailId: '',
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Add New Employee</h1>
          <p className="text-gray-600">Fill in the details to add a new team member</p>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-8">
          <form onSubmit={saveEmployee}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input 
                  type="text" 
                  name="firstName"
                  value={employee.firstName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter first name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input 
                  type="text" 
                  name="lastName"
                  value={employee.lastName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter last name"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input 
                type="email"
                name="emailId"
                value={employee.emailId} 
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter email address"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button 
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition duration-200 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Employee'}
              </button>
              <button 
                type="button"
                onClick={reset}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-md transition duration-200"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;