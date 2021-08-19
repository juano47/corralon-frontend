import axios from "axios";
import {axiosAuth} from "./AuthService";

const EMPLOYEE_API_BASE_URL = "http://localhost:8084/api/empleados";

class EmployeeService {


    async getEmployees() {
        return axiosAuth.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee){
        return axiosAuth.post(EMPLOYEE_API_BASE_URL, employee);
    }

    getEmployeeById(employeeId){
        return axiosAuth.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId){
        return axiosAuth.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axiosAuth.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }
}

export default new EmployeeService()
