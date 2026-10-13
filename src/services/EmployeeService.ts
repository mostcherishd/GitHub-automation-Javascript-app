import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8082/api/v1/employees";
const ATTENDANCE_API_BASE_URL = "http://localhost:8082/api/v1/attendance";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  emailId: string;
}

export interface AttendanceRecord {
  employeeId: number;
  employeeName: string;
  employeeEmail: string;
  checkInTime?: string;
  checkOutTime?: string;
  date: string;
}

class EmployeeService {
  saveEmployee(employee: Omit<Employee, 'id'>) {
    return axios.post(EMPLOYEE_API_BASE_URL, employee);
  }

  getEmployee() {
    return axios.get<Employee[]>(EMPLOYEE_API_BASE_URL);
  }

  deleteEmployee(id: number) {
    return axios.delete(`${EMPLOYEE_API_BASE_URL}/${id}`);
  }

  getEmployeeById(id: number) {
    return axios.get<Employee>(`${EMPLOYEE_API_BASE_URL}/${id}`);
  }

  updateEmployee(employee: Employee, id: number) {
    return axios.put(`${EMPLOYEE_API_BASE_URL}/${id}`, employee);
  }

  // Attendance methods
  checkIn(employeeId: number) {
    return axios.post(`${ATTENDANCE_API_BASE_URL}/checkin`, { employeeId });
  }

  checkOut(employeeId: number) {
    return axios.post(`${ATTENDANCE_API_BASE_URL}/checkout`, { employeeId });
  }

  getAttendanceByEmployee(employeeId: number) {
    return axios.get<AttendanceRecord[]>(`${ATTENDANCE_API_BASE_URL}/employee/${employeeId}`);
  }

  getTodayAttendance() {
    return axios.get<AttendanceRecord[]>(`${ATTENDANCE_API_BASE_URL}/today`);
  }

  getAttendanceReport(startDate: string, endDate: string) {
    return axios.get(`${ATTENDANCE_API_BASE_URL}/report?start=${startDate}&end=${endDate}`);
  }
}

export default new EmployeeService();