import React, { useState } from 'react'
import { NavLink, useNavigate, Navigate } from 'react-router-dom'
import logo from "../../../public/assets/images/logos/dark-logo.svg"
import AuthService from '../../Services/Auth/AuthService'
import Toaster from '../../Utils/Constants/Toaster'
import { useFormik } from 'formik'
import ResponseHandler from '../../Utils/Constants/ResponseHandler'
import AuthYup from '../../Validation/Auth/AuthYup'
import LocalStore from '../../Store/LocalStore'

export default function Login() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const initValues = {
        role: 'user',
        email: '',
        password: '',
    }
    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: initValues,
        validationSchema: AuthYup.loginSchema,
        onSubmit: async (values) => {
            setLoading(true)
            Toaster.loadingToast("Validating User .......")
            try {
                const result = await AuthService.authLogin(values)
                if (result.data.code === 201) {
                    const { token, role, email } = result.data.data;
                    LocalStore.storeToken({ token, role, email });
                    Toaster.justToast('success', result.data.data.message, () => {
                        Toaster.dismissLoadingToast()
                        if (role === "user")
                            navigate('/main/user/products')
                        if (role === "admin")
                            navigate('/main/admin/employee')
                    })
                }
            } catch (error) {
                ResponseHandler.handleResponse(error)
            } finally {
                setLoading(false)
                Toaster.dismissLoadingToast()
            }
        }
    })

    return (
        <>
            <div className="position-relative overflow-hidden bg-white min-vh-100 d-flex align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-center w-100">
                    <div className="row justify-content-center w-100">
                        <div className="col-md-8 col-lg-6 col-xxl-3">
                            <div className="card mb-0 shadow-sm border">
                                <div className="card-body">
                                    <NavLink to={'/login'} className="text-nowrap logo-img text-center d-block py-3 pb-5 w-100">
                                        <img src={logo} width={180} alt="loogo" />
                                    </NavLink>
                                    <form className='needs-validation' noValidate onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                            <input
                                                value={values.email}
                                                onChange={handleChange}
                                                type="email"
                                                name='email'
                                                className={`form-control ${(errors.email && touched.email) ? 'is-invalid' : ''}`}
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                                required />
                                            <div className="invalid-feedback">
                                                {errors.email}
                                            </div>
                                        </div>
                                        <div className="mb-0">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                            <input
                                                value={values.password}
                                                onChange={handleChange}
                                                name='password'
                                                type="password"
                                                className={`form-control ${(errors.password && touched.password) ? 'is-invalid' : ''}`}
                                                id="exampleInputPassword1"
                                                required />
                                            <div className="invalid-feedback">
                                                {errors.password}
                                            </div>
                                        </div>

                                        <div className='d-flex justify-content-center align-items-center my-4'>
                                            <div className="me-3">
                                                <input
                                                    value="user"
                                                    onChange={handleChange}
                                                    type="radio"
                                                    className="btn-check"
                                                    name="role"
                                                    id="option1"
                                                    checked={values.role === 'user'}
                                                />
                                                <label className="btn btn-success" htmlFor="option1">Users</label>
                                            </div>
                                            <div className="">
                                                <input
                                                    value="admin"
                                                    onChange={handleChange}
                                                    type="radio"
                                                    className="btn-check"
                                                    name="role"
                                                    checked={values.role === 'admin'}
                                                    id="option2" />
                                                <label className="btn btn-success" htmlFor="option2">Admin</label>
                                            </div>
                                        </div>

                                        <button type='submit' disabled={loading} className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Sign In</button>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <p className="fs-4 mb-0 fw-bold">New User?</p>
                                            <NavLink to={'/register'} className="text-primary fw-bold ms-2">Create an account</NavLink>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}
