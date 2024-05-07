import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import Bread from '../../../Components/BreadCrumb/Bread'
import ProductService from '../../../Services/Product/ProductService'

export default function Products() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await ProductService.getAllProducts()
            if (response.data.code === 200) {
                setProducts(response.data.data.products)
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
    return (
        <div className="body-wrapper">
            <div className="container-fluid">
                <div className="position-relative overflow-hidden">
                    <div className="shop-part d-flex w-100">
                        <div className="card-body pb-0 pt-4">
                            <div className="row">
                                {
                                    loading ? (
                                        <div className='d-flex justify-content-center align-items-center my-3'>
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden m-auto"></span>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {
                                                products.map((product) => {
                                                    return <ProductItem product={product} key={product._id}/>
                                                })
                                            }
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
