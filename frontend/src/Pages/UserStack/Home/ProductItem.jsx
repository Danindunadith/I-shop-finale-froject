import React from 'react'
import banner from '../../../../public/assets/images/products/s1.jpg'
import { Link } from 'react-router-dom'
export default function ProductItem({product}) {
    return (
        <div className="col-sm-4 col-md-3">
            <div className="card hover-img overflow-hidden rounded-2">
                <div className="position-relative">
                    <Link to={`/main/user/product/${product._id}`} >
                        <img  style={{ width: '100%', height: '200px' }}  src={product.imgUrl} className="img-fluid card-img-top rounded-0" alt="..." />
                    </Link>
                </div>
                <div className="card-body pt-3 p-4">
                    <h6 className="fw-semibold fs-4">{product.name}</h6>
                    <div className="d-flex align-items-center justify-content-between">
                        <h6 className="fw-semibold fs-4 mb-0">${product.price} <span className="ms-2 fw-normal text-muted fs-3"><del>${parseFloat(product.price*1.75).toFixed(2)}</del></span>
                        </h6>
                        <ul className="list-unstyled d-flex align-items-center mb-0">
                            
                            
                        <Link to={"/fadd"} className="addButton">
                              Feedbacks
                               </Link>

                            
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
