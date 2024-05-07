import React, { useEffect, useState } from 'react'
import banner from '../../../../public/assets/images/products/s1.jpg'
import { useNavigate, useParams } from 'react-router-dom'
import OrderService from '../../../Services/OrderService/OrderService'
import { useFormik } from 'formik';
import OrderYup from '../../../Validation/OrderYup/OrderYup';
import Toaster from '../../../Utils/Constants/Toaster';
import ResponseHandler from '../../../Utils/Constants/ResponseHandler';
import ProductService from '../../../Services/Product/ProductService';
import LocalStore from '../../../Store/LocalStore';

export default function Checkout() {
    // Accessing URL parameters
    const { id } = useParams();
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    // Fetch token data from LocalStore
    const tokenData = LocalStore.getToken();

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await ProductService.getProduct(id)
            if (response.data.code === 200) {
                setProduct(response.data.data.product)
            }
        } catch (error) {
            if (error.response.data.code === 404) {
                Toaster.justToast('error', error.response.data.data.message, () => { })
            }
            if (error.response.data.code === 500) {
                Toaster.justToast('error', error.response.data.data.message, () => { })
            }
        } finally {
            setLoading(false)
        }
    }

    const initValues = {
        email: tokenData ? tokenData.email : null,
        homeAddress: '',
        pid:id,
        postalCode: '',
        street: '',
        telephone: '',
        country: '',
        city: '',
        cardName: '',
        cardNumber: '',
        cvc: ''
    }
    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: initValues,
        validationSchema: OrderYup.orderSchema,
        onSubmit: async (values) => {
            setLoading(true)
            Toaster.loadingToast("Placing Order .......")
            try {
                const result = await OrderService.addOrder(values)
                if (result.data.code === 200) {
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
        
            <div className="body-wrapper">
                <div className="container-fluid">
                    {/*  Row 1 */}
                    <div className="row">
                        <div className="col-12 d-flex align-items-stretch">
                            <div className="card w-100 shadow-sm">
                                <div className='card-header bg-info-subtle'>
                                    <h2>Checkout</h2>
                                </div>
                                <div className="card-body p-4">
                                    <div className="row">
                                        <div className="col-4">
                                            {
                                                loading ? (
                                                    <div className='h-75 d-flex justify-content-center align-items-center my-3'>
                                                        <div className="spinner-border" role="status">
                                                            <span className="visually-hidden m-auto"></span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <img src={product.imgUrl} className='img-fluid rounded' alt="" />
                                                )
                                            }
                                        </div>
                                        <div className="col-8">
                                            <form className='needs-validation' noValidate onSubmit={handleSubmit}>
                                                {/* order detail */}
                                                <h4 className='bg-primary-subtle p-2 rounded'>Billing Detail</h4>
                                                <div className="row mb-2">
                                                    <div className="col-6 col-md-8">
                                                        <label htmlFor="userAddress" className="form-label">Home Address</label>
                                                        <input
                                                            type="text"
                                                            name='homeAddress'
                                                            value={values.homeAddress}
                                                            onChange={handleChange}
                                                            className={`form-control ${errors.homeAddress && touched.homeAddress ? 'is-invalid' : ''}`}
                                                            id="userAddress"
                                                            aria-describedby="emailHelp"
                                                        />
                                                        <div className="invalid-feedback">
                                                            {errors.homeAddress}
                                                        </div>
                                                    </div>
                                                    <div className="col-6 col-md-4">
                                                        <label htmlFor="UserTel" className="form-label">Telephone</label>
                                                        <div className="input-group">
                                                            <span className="input-group-text">94</span>
                                                            <input
                                                                type="text"
                                                                name='telephone'
                                                                value={values.telephone}
                                                                onChange={handleChange}
                                                                className={`form-control ${errors.telephone && touched.telephone ? 'is-invalid' : ''}`}
                                                                pattern="[0-9]*"
                                                                maxLength="9"
                                                                id="UserTel"
                                                                aria-label="Amount (to the nearest rupee)"
                                                            />
                                                            <div className="invalid-feedback">
                                                                {errors.telephone}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-4">
                                                    <div className="col-4">
                                                        <label htmlFor="country" className="form-label">Country</label>
                                                        <select
                                                            className={`form-control ${errors.country && touched.country ? 'is-invalid' : ''}`}
                                                            id="country"
                                                            name='country'
                                                            value={values.country}
                                                            onChange={handleChange}
                                                        >
                                                            <option >choose</option>
                                                            <option value="srilanka">SriLanka</option>
                                                            <option value="usa">USA</option>
                                                            <option value="uk">UK</option>
                                                            <option value="india">India</option>
                                                        </select>
                                                        <div className="invalid-feedback">
                                                            {errors.country}
                                                        </div>
                                                    </div>
                                                    <div className="col-5">
                                                        <label htmlFor="city" className="form-label">City</label>
                                                        <select
                                                            className={`form-control ${errors.city && touched.city ? 'is-invalid' : ''}`}
                                                            id="city"
                                                            name='city'
                                                            value={values.city}
                                                            onChange={handleChange}
                                                        >
                                                            <option >choose</option>
                                                            <option value="kurunegala">Kurunegala</option>
                                                            <option value="colombo">Colombo</option>
                                                            <option value="kandy">Kandy</option>
                                                        </select>
                                                        <div className="invalid-feedback">
                                                            {errors.city}
                                                        </div>
                                                    </div>
                                                    <div className="col-3">
                                                        <label htmlFor="postal" className="form-label">Postal Code</label>
                                                        <div className="input-group">
                                                            <input
                                                                type="text"
                                                                maxLength="6"
                                                                className={`form-control ${errors.postalCode && touched.postalCode ? 'is-invalid' : ''}`}
                                                                id="postal"
                                                                name='postalCode'
                                                                value={values.postalCode}
                                                                onChange={handleChange}
                                                            />
                                                            <div className="invalid-feedback">
                                                                {errors.postalCode}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                <h4 className='bg-primary-subtle p-2 rounded'>Additional Details</h4>
                                                <div className="row mb-4">
                                                    <div className="col-6">
                                                        <label htmlFor="cnum" className="form-label">Land phone</label>
                                                        <div className="input-group">
                                                            <input
                                                                type="text"
                                                                maxLength="12"
                                                                className={`form-control ${errors.cardNumber && touched.cardNumber ? 'is-invalid' : ''}`}
                                                                id="cnum"
                                                                name='cardNumber'
                                                                value={values.cardNumber}
                                                                onChange={handleChange}
                                                            />
                                                            <div className="invalid-feedback">
                                                                {errors.cardNumber}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-3">
                                                        <label htmlFor="cname" className="form-label">Contact Name</label>
                                                        <div className="input-group">
                                                            <input
                                                                type="text"
                                                                className={`form-control ${errors.cardName && touched.cardName ? 'is-invalid' : ''}`}
                                                                id="cname"
                                                                name='cardName'
                                                                value={values.cardName}
                                                                onChange={handleChange}
                                                            />
                                                            <div className="invalid-feedback">
                                                                {errors.cardName}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-3">
                                                        <label htmlFor="UserCVC" className="form-label">Promo-code</label>
                                                        <div className="input-group">
                                                            <input
                                                                type="text"
                                                                maxLength="3"
                                                                className={`form-control ${errors.cvc && touched.cvc ? 'is-invalid' : ''}`}
                                                                id="UserCVC"
                                                                name='cvc'
                                                                value={values.cvc}
                                                                onChange={handleChange}
                                                            />
                                                            <div className="invalid-feedback">
                                                                {errors.cvc}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                               
                                               
                                                

                                                

                                                <div className="d-flex justify-content-end mb-2">
                                                    <button type="button" disabled={loading} onClick={() => {
                                                        navigate("/ccard")
                                                    }} className="btn btn-danger mx-2">Card-Pay</button>



                                                   <button type="submit" disabled={loading} className="btn btn-success">Buy Now</button>


                                                  





                                                    
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
