import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import EmpService from '../../../Services/Emp/EmpService';
import { useFormik } from 'formik';
import Toaster from '../../../Utils/Constants/Toaster';
import EmpYup from '../../../Validation/Emp/EmpYup';

export default function EditEmp() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({});

    const { setValues, values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: EmpYup.updateEmployee,
        onSubmit: async (values) => {
            setLoading(true);
            Toaster.loadingToast('Updating Employee...');
            try {
                const result = await EmpService.updateEmployee(id, values);
                if (result.data.code === 200) {
                    Toaster.justToast('success', result.data.data.message, () => {
                        navigate('/main/admin/employee');
                    });
                }
            } catch (error) {
                console.error(error);
                // Handle error response
            } finally {
                setLoading(false);
                Toaster.dismissLoadingToast();
                console.log('values:', values);
            }
        }
    })
    const fetchEmployeeDetails = async () => {
        try {
            setLoading(true)
            const response = await EmpService.getEmployee(id);
            if (response.data.code === 200) {
                const employee = response.data.data.employee;
                setInitialValues(employee)
                setValues(employee);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        fetchEmployeeDetails();
    }, [id]);
    return (

        <div className="body-wrapper">
            <div className="container-fluid">
                {/*  Row 1 */}
                <div className="row">
                    <div className="col-12 d-flex align-items-stretch">
                        <div className="card w-100 shadow-sm">
                            <div className='card-header bg-info-subtle'>
                                <h2>Edit Employee</h2>
                            </div>
                            <div className="card-body p-4">
                                <div className="row">
                                    <div className="col-3"></div>
                                    <div className="col-6">
                                        {
                                            loading ? (
                                                <div className='d-flex justify-content-center align-items-center my-3'>
                                                    <div className="spinner-border" role="status">
                                                        <span className="visually-hidden m-auto"></span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <form className='needs-validation' noValidate onSubmit={handleSubmit}>
                                                    {/* order detail */}
                                                    <h4 className='bg-primary-subtle p-2 rounded'>Employee Detail</h4>
                                                    <div className="row mb-2">
                                                        <div className="col-6 col-md-8">
                                                            <label htmlFor="name" className="form-label">Name</label>
                                                            <input
                                                                type="text"
                                                                className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                                                                id="name"
                                                                name="name"
                                                                value={values.name}
                                                                onChange={handleChange}
                                                            />
                                                            <div className="invalid-feedback">
                                                                {errors.name}
                                                            </div>
                                                        </div>
                                                        <div className="col-6 col-md-4">
                                                            <label htmlFor="UserTel" className="form-label">Age</label>
                                                            <div className="input-group">
                                                                <input
                                                                    type="text"
                                                                    className={`form-control ${errors.age && touched.age ? 'is-invalid' : ''}`}
                                                                    id="age"
                                                                    name="age"
                                                                    value={values.age}
                                                                    onChange={handleChange}
                                                                />
                                                                <div className="invalid-feedback">
                                                                    {errors.age}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-4">
                                                        <div className="col-4">
                                                            <label htmlFor="gender" className="form-label">Gender</label>
                                                            <select
                                                                className={`form-control ${errors.gender && touched.gender ? 'is-invalid' : ''}`}
                                                                id="gender"
                                                                name='gender'
                                                                value={values.gender}
                                                                onChange={handleChange}
                                                            >
                                                                <option >choose</option>
                                                                <option value="male">Male</option>
                                                                <option value="female">Female</option>
                                                            </select>
                                                            <div className="invalid-feedback">
                                                                {errors.gender}
                                                            </div>
                                                        </div>
                                                        <div className="col-5">
                                                            <label htmlFor="role" className="form-label">Role</label>
                                                            <select
                                                                className={`form-control ${errors.role && touched.role ? 'is-invalid' : ''}`}
                                                                id="role"
                                                                name='role'
                                                                value={values.role}
                                                                onChange={handleChange}
                                                            >
                                                                <option >choose</option>
                                                                <option value="employee">Employee</option>
                                                                <option value="manager">Manager</option>
                                                                <option value="saleman">Saleman</option>
                                                                <option value="security">Security</option>
                                                            </select>
                                                            <div className="invalid-feedback">
                                                                {errors.role}
                                                            </div>
                                                        </div>
                                                        <div className="col-3">
                                                            <label htmlFor="cname" className="form-label">Increament</label>
                                                            <select
                                                                className={`form-control ${errors.increment && touched.increment ? 'is-invalid' : ''}`}
                                                                id="increment"
                                                                name='increment'
                                                                value={values.increment}
                                                                onChange={handleChange}
                                                            >
                                                                <option >choose</option>
                                                                <option value="bonus">Bonus</option>
                                                                <option value="worker">Worker</option>
                                                                <option value="attendance">Attendance</option>
                                                            </select>
                                                            <div className="invalid-feedback">
                                                                {errors.increment}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-4">
                                                        <div className="col-7">
                                                            <label htmlFor="salary" className="form-label">Salary</label>
                                                            <div className="input-group">
                                                                <input
                                                                    type="text"
                                                                    className={`form-control ${errors.salary && touched.salary ? 'is-invalid' : ''}`}
                                                                    id="salary"
                                                                    name="salary"
                                                                    value={values.salary}
                                                                    onChange={handleChange}
                                                                />
                                                                <div className="invalid-feedback">
                                                                    {errors.salary}
                                                                </div>
                                                            </div>


                                                        </div>
                                                        <div className="col-5">
                                                            <label htmlFor="Usernic" className="form-label">NIC</label>
                                                            <div className="input-group">
                                                                <input
                                                                    type="text"
                                                                    maxLength="12"
                                                                    className={`form-control ${errors.nic && touched.nic ? 'is-invalid' : ''}`}
                                                                    id="Usernic"
                                                                    name='nic'
                                                                    value={values.nic}
                                                                    onChange={handleChange}
                                                                />
                                                                <div className="invalid-feedback">
                                                                    {errors.nic}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex justify-content-end mb-2">
                                                        <button type="button" disabled={loading} onClick={() => {
                                                            navigate(-1)
                                                        }} className="btn btn-danger mx-2">Go Back</button>
                                                        <button type="submit" disabled={loading} className="btn btn-warning">Edit Now</button>
                                                    </div>
                                                </form>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
