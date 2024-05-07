import React from 'react'
import { deliveryHeader } from '../../../Utils/Constants/TableHeaders'

export default function DeliveryList({ handleOrderDelete, loading, deliveries, handleDeliveryType, handleDelivery }) {
    return (
        <>
            {
                loading ? (
                    <div className='d-flex justify-content-center align-items-center my-3'>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden m-auto"></span>
                        </div>
                    </div>
                ) : (
                    <table className="table mb-0 align-middle">
                        <thead className="text-dark fs-4" >
                                <tr>
                                    <th>
                                    <h6 className="fw-semibold mb-0">tracking_Id</h6>
                                    </th>
                                {
                                    deliveryHeader.map((empH) => {
                                        return (
                                            <th className="border-bottom-0" >
                                                <h6 className="fw-semibold mb-0">{empH}</h6>
                                            </th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                deliveries.map((delivery) => {
                                    return (
                                        <tr key={delivery._id}>
                                            <td className="border-bottom-0" >
                                                <p className="fw-normal mb-0">TK{delivery._id}</p>
                                            </td>
                                            <td className="border-bottom-0" >
                                                <p className="fw-normal mb-1">{delivery.orderedBy}</p>
                                            </td>
                                            <td className="border-bottom-0" >
                                                <p className="fw-normal mb-1">{delivery.country}</p>
                                            </td>
                                            <td className="border-bottom-0" >
                                                <p className="mb-0 fw-normal">{delivery.homeAddress}</p>
                                            </td>
                                            <td className="border-bottom-0" >
                                                <p className="mb-0 fw-normal">{delivery.postalCode}</p>
                                            </td>
                                            <td className="border-bottom-0" >
                                                <p className="fw-normal mb-0">{delivery.telephone}</p>
                                            </td>
                                            <td className="border-bottom-0" >
                                                <p className="fw-normal mb-0">{delivery.city}</p>
                                            </td>
                                            <td className='text-center'>
                                                {
                                                    (delivery.shipped === "true") ? (
                                                        <select
                                                            className="form-control"
                                                            id="deliveryType"
                                                            name='deliveryType'
                                                            value={delivery.deliveryType}
                                                            onChange={(e) => {
                                                                handleDeliveryType(delivery._id, e.target.value)
                                                            }}
                                                        >
                                                            <option value="standard">standard</option>
                                                            <option value="express">express</option>
                                                        </select>
                                                    ) : (
                                                        ''
                                                    )
                                                }
                                            </td>
                                            <td className='text-center'>
                                                {
                                                    (delivery.shipped === "false") ? (
                                                        <button type='button' onClick={() => {
                                                            handleDelivery(delivery._id)
                                                        }} className="btn btn-success ms-3" >Ship Now</button>
                                                    ) : (
                                                        <button type='button' disabled className="btn btn-dark ms-3" >Shipped</button>
                                                    )
                                                }
                                            </td>
                                            <td>
                                                <button type='button' onClick={() => {
                                                    handleOrderDelete(delivery._id)
                                                }} className="btn btn-danger ms-3" >Reject</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                        
                    </table>

                    
                )
            }
        </>
    )
}
