import React from 'react'
import { empHeader } from '../../../Utils/Constants/TableHeaders'
import { Link } from 'react-router-dom'

export default function EmpTable({ handleEmployeeDelete, employees, loading }) {

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
                                {
                                    empHeader.map((empH) => {
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
                                employees.map((employee) => {
                                    return (
                                        <tr key={employee._id}>
                                            <td className="border-bottom-0" >
                                                <img src={employee.photoUrl} alt="prologo" width={30} height={30} className="rounded-circle" style={{ cursor: "pointer" }} />
                                            </td>
                                            <td className="border-bottom-0" >
                                                <p className="fw-normal mb-1">{employee.name}</p>
                                            </td>
                                            <td className="border-bottom-0" >
                                                <p className="fw-normal mb-1">{employee.role}</p>
                                            </td>
                                            <td className="border-bottom-0" >
                                                <p className="mb-0 fw-normal">{employee.age}</p>
                                            </td>
                                            <td className="border-bottom-0" >
                                                <p className="mb-0 fw-normal">{employee.gender}</p>
                                            </td>
                                            <td className="border-bottom-0" >
                                                <p className="fw-normal mb-0">{employee.salary}</p>
                                            </td>
                                            <td className="border-bottom-0" >
                                                <p className="fw-normal mb-0">{employee.increment}</p>
                                            </td>
                                            <td className='text-center'>
                                                <Link to={`/main/admin/empEdit/${employee._id}`} className="btn btn-warning" >Edit</Link>
                                                <button type='button'  onClick={() => {
                                                    handleEmployeeDelete(employee._id)
                                                }} className="btn btn-danger ms-3" >Delete</button>
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
