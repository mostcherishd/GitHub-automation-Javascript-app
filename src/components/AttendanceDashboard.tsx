import React, { useState, useEffect } from 'react';
import EmployeeService, { AttendanceRecord } from '../services/EmployeeService';

const AttendanceDashboard: React.FC = () => {
  const [todayAttendance, setTodayAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodayAttendance();
  }, []);

  const fetchTodayAttendance = async () => {
    try {
      const response = await EmployeeService.getTodayAttendance();
      setTodayAttendance(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async (employeeId: number) => {
    try {
      await EmployeeService.checkIn(employeeId);
      fetchTodayAttendance();
    } catch (error) {
      console.error('Check-in failed:', error);
    }
  };

  const handleCheckOut = async (employeeId: number) => {
    try {
      await EmployeeService.checkOut(employeeId);
      fetchTodayAttendance();
    } catch (error) {
      console.error('Check-out failed:', error);
    }
  };

  const formatTime = (timeString?: string) => {
    return timeString ? new Date(timeString).toLocaleTimeString() : '-';
  };

  const calculateWorkingHours = (checkIn?: string, checkOut?: string) => {
    if (!checkIn || !checkOut) return '-';
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  if (loading) return <div className="flex justify-center p-8">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Attendance Dashboard</h1>
        <p className="text-gray-600">Today's attendance overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800">Present Today</h3>
          <p className="text-2xl font-bold text-green-600">
            {todayAttendance.filter(a => a.checkInTime).length}
          </p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800">Still Working</h3>
          <p className="text-2xl font-bold text-blue-600">
            {todayAttendance.filter(a => a.checkInTime && !a.checkOutTime).length}
          </p>
        </div>
        <div className="bg-orange-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-orange-800">Completed</h3>
          <p className="text-2xl font-bold text-orange-600">
            {todayAttendance.filter(a => a.checkInTime && a.checkOutTime).length}
          </p>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Employee Attendance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Working Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {todayAttendance.map((attendance) => (
                <tr key={attendance.employeeId} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {attendance.employeeName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {attendance.employeeEmail}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatTime(attendance.checkInTime)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatTime(attendance.checkOutTime)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {calculateWorkingHours(attendance.checkInTime, attendance.checkOutTime)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      !attendance.checkInTime 
                        ? 'bg-red-100 text-red-800' 
                        : attendance.checkOutTime 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {!attendance.checkInTime ? 'Absent' : 
                       attendance.checkOutTime ? 'Completed' : 'Working'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    {!attendance.checkInTime ? (
                      <button
                        onClick={() => handleCheckIn(attendance.employeeId)}
                        className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
                      >
                        Check In
                      </button>
                    ) : !attendance.checkOutTime ? (
                      <button
                        onClick={() => handleCheckOut(attendance.employeeId)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                      >
                        Check Out
                      </button>
                    ) : (
                      <span className="text-gray-400 text-xs">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDashboard;