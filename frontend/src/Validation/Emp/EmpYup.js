import * as yup from 'yup';

const roleType = ['security', 'saleman', 'manager', 'employee'];
const genderType = ['male', 'female'];
const incrementType = ['bonus', 'worker', 'attendance'];
class EmpYup {
    // Validation schema for adding a new employee
    addEmployee = yup.object({
        name: yup.string().required(),
        age: yup.number().required().positive().integer(),
        salary: yup.number().required().positive(),
        nic: yup.string().required(),
        role: yup.string().oneOf(roleType).required(),
        gender: yup.string().oneOf(genderType).required(),
        increment: yup.string().oneOf(incrementType).required()
    });

    // Validation schema for updating Employee
    updateEmployee = yup.object({
        name: yup.string(),
        age: yup.number().positive().integer(),
        salary: yup.number().positive(),
        nic: yup.string(),
        role: yup.string().oneOf(roleType),
        gender: yup.string().oneOf(genderType),
        increment: yup.string().oneOf(incrementType)
    });

    // Validation schema for deleting Employee
    dltEmp = yup.object({
        id: yup.string().required()
    });

    // Validation schema for getting Employee
    getEmp = yup.object({
        id: yup.string().required()
    });
}

export default new EmpYup();
