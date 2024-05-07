import axios from "axios";
import BaseService from "../Base/BaseService";

class EmpService {
    constructor() {
        BaseService.getBaseURL();
        this.GET_EMPLOYEE = "employee/getEmployee";
        this.GET_ALL_EMPLOYEES = "employee/getAllEmployees";
        this.ADD_EMPLOYEE = "employee/addEmployee";
        this.UPDATE_EMPLOYEE = "employee/updateEmployee";
        this.DELETE_EMPLOYEE = "employee/deleteEmployee";
    }

    getAllEmployees() {
        return axios.get(this.GET_ALL_EMPLOYEES,BaseService.getHeader());
    }

    getEmployee(input) {
        let data = {
            id: input
        };
        return axios.post(this.GET_EMPLOYEE, data,BaseService.getHeader());
    }

    addEmployee(input) {
        let data = {
            name: input.name,
            age: input.age,
            salary: input.salary,
            nic: input.nic,
            role: input.role,
            gender: input.gender,
            increment: input.increment
        };
        return axios.post(this.ADD_EMPLOYEE, data, BaseService.getHeader());
    }

    updateEmployee(id,input) {
        let data = {
            id: id,
            name: input.name,
            age: input.age,
            salary: input.salary,
            nic: input.nic,
            role: input.role,
            gender: input.gender,
            increment: input.increment
        };
        return axios.put(this.UPDATE_EMPLOYEE, data, BaseService.getHeader());
    }

    deleteEmployee(input) {
        console.log(BaseService.getHeader())
        let data = {
            id: input
        };
        return axios.delete(this.DELETE_EMPLOYEE, { ...BaseService.getHeader(), data: data });
    }
}

export default EmpService = new EmpService();
