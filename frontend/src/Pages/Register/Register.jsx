import React, { useState } from 'react'
import { NavLink, useNavigate, Navigate } from 'react-router-dom'
import logo from "../../../public/assets/images/logos/dark-logo.svg"
import { useFormik } from 'formik';
import AuthYup from '../../Validation/Auth/AuthYup';
import AuthService from '../../Services/Auth/AuthService';
import ResponseHandler from '../../Utils/Constants/ResponseHandler';
import Toaster from '../../Utils/Constants/Toaster';

export default function Register() {
    const [loading,setLoading] = useState(false)
    const initValues = {
        username: '',
        email: '',
        password: '',
    }
    const navigate = useNavigate();
    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: initValues,
        validationSchema: AuthYup.registerSchema,
        onSubmit: async (values) => {
            setLoading(true)
            Toaster.loadingToast("Creating User .......")
            try {
                const result = await AuthService.authRegister(values)
                if (result.data.code === 201) {
                    Toaster.justToast('success', result.data.data.message, () => {
                        Toaster.dismissLoadingToast()
                        navigate('/main/user/products')
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
                                    <NavLink to={'/register'} className="text-nowrap logo-img text-center d-block py-3 pb-5 w-100">
                                        <img src={logo} width={180} alt="logo" />
                                    </NavLink>
                                    <form className='needs-validation' noValidate onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputtext1" className="form-label">Name</label>
                                            <input
                                                value={values.username}
                                                onChange={handleChange}
                                                type="text"
                                                name="username"
                                                className={`form-control ${(errors.username && touched.username) ? 'is-invalid' : ''}`}
                                                id="exampleInputtext1"
                                                aria-describedby="textHelp"
                                                required />
                                            <div className="invalid-feedback">
                                                {errors.username}
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
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
                                        <div className="mb-4">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                            <input
                                                value={values.password}
                                                onChange={handleChange}
                                                type="password"
                                                name='password'
                                                className={`form-control ${(errors.password && touched.password) ? 'is-invalid' : ''}`}
                                                id="exampleInputPassword1"
                                                required />
                                            <div className="invalid-feedback">
                                                {errors.password}
                                            </div>
                                        </div>
                                        <button type='submit' disabled={loading} className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Sign Up</button>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <p className="fs-4 mb-0 fw-bold">Already have an Account?</p>
                                            <NavLink className="text-primary fw-bold ms-2" to={'/login'}>Sign In</NavLink>
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
