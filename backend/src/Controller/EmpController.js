import Employee from "../Modal/Employee.js";
import response from "../Utils/ResponseHandler/ResponseHandler.js";
import ResTypes from "../Utils/ResponseHandler/ResTypes.js";

class EmployeeController {
    // Method to add a new employee
    addEmployee = async (req, res) => {
        try {
            const { name, age, salary, nic, role, gender, increment } = req.body;

            // Create a new employee object
            const newEmployee = new Employee({
                name,
                age,
                salary,
                nic,
                role,
                gender,
                increment
            });

            // Save the new employee to the database
            const savedEmployee = await newEmployee.save();
            if (savedEmployee)
                return response(res, 200, ResTypes.successMessages.created_success);
        } catch (error) {
            console.log(error);
            return response(res, 500, error);
        }
    }

    // Method to get an employee by ID
    getEmployee = async (req, res) => {
        const { id } = req.body;
        try {
            const employee = await Employee.findOne({ _id: id });
            if (!employee) return response(res, 404, ResTypes.errors.not_found);
            return response(res, 200, { ...ResTypes.successMessages.success, employee });
        } catch (error) {
            console.log(error);
            return response(res, 500, error);
        }
    }

    // Method to get all employees
    getAllEmployees = async (req, res) => {
        try {
            const employees = await Employee.find({});
            if (!employees)
                return response(res, 404, ResTypes.errors.not_found);

            return response(res, 200, { ...ResTypes.successMessages.success, employees });

        } catch (error) {
            console.log(error);
            return response(res, 500, error);
        }
    }

    // Method to delete an employee by ID
    deleteEmployee = async (req, res) => {
        const { id } = req.body;
        try {
            const deletedEmployee = await Employee.findOneAndDelete({ _id: id });
            if (!deletedEmployee) return response(res, 404, ResTypes.errors.not_found);
            return response(res, 200, ResTypes.successMessages.success);
        } catch (error) {
            console.log(error);
            return response(res, 500, error);
        }
    }

    // Method to update an employee by ID
    updateEmployee = async (req, res) => {
        const { id, name, age, salary, nic, role, gender, increment } = req.body;
        try {
            const employeeExist = await Employee.findOne({ _id: id });
            if (!employeeExist) return response(res, 404, ResTypes.errors.not_found);

            const result = await Employee.updateOne(
                { _id: id },
                { $set: {name, age, salary, nic, role, gender, increment} }
            );
            if (result.modifiedCount === 0) return response(res, 403, ResTypes.errors.upadate_error);
            return response(res, 200, ResTypes.successMessages.upadted_success);
        } catch (error) {
            console.log(error);
            return response(res, 500, error);
        }
    }
}

export default EmployeeController = new EmployeeController();
