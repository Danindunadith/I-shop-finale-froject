import React, { useEffect, useState } from 'react'
import AddEmp from './AddEmp'
import EmpTable from './EmpTable'
import EmpService from '../../../Services/Emp/EmpService'
import Toaster from '../../../Utils/Constants/Toaster'
import { empHeader } from '../../../Utils/Constants/TableHeaders'
import CusSwal from '../../../Utils/CustomSwal/CusSwal'
import PdfGenerator from '../../../Utils/Pdfs/PdfGenerator'
import ResponseHandler from '../../../Utils/Constants/ResponseHandler'
import { useNavigate } from 'react-router-dom'

export default function EmpManage() {
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await EmpService.getAllEmployees()
            if (response.data.code === 200) {
                setEmployees(response.data.data.employees)
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
            Toaster.dismissLoadingToast()
        }
    }
    const generatePdf = () => {
        Toaster.loadingToast('Generating Pdf')
        try {
            PdfGenerator.generatePdf(employees, "Employee List", empHeader)
            Toaster.justToast('success', 'Creating The Pdf For You', () => {})
        } catch (error) {
            Toaster.justToast('error', 'genration failed', () => { })
        } finally {
            Toaster.dismissLoadingToast()
        }
    }
    const filteredEmp = searchQuery ? employees.filter((employee) => {
        return (
            employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.age.toString().includes(searchQuery) ||
            employee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            // employee.gender.toLowerCase() === searchQuery.toLowerCase() ||
            employee.salary.toString().includes(searchQuery) ||
            employee.nic.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }) : employees

    const handleEmployeeDelete = (id) => {
        CusSwal.deleteConfiramation(async () => {
            Toaster.loadingToast('Generating Pdf')
            try {
                const result = await EmpService.deleteEmployee(id);
                if (result) {
                    Toaster.justToast('success', "Employee Deleted", () => { });
                }
            } catch (error) {
                ResponseHandler.handleResponse(error);
            } finally {
                fetchData();
                Toaster.dismissLoadingToast()
            }
        });
    };
    
    return (
        <div className="body-wrapper">
            <div className="container-fluid">
                {/*  Row 1 */}
                <div className="row">
                    <div className="col-12 d-flex align-items-stretch">
                        <div className="card w-100 shadow-sm">
                            <div className="card-body p-4">
                                <div className='d-flex justify-content-end align-items-center mb-4'>
                                    <button className='btn btn-outline-dark mx-2' onClick={generatePdf}>Export</button>
                                    <button className='btn btn-success' onClick={() => {
                                        navigate(`/main/admin/empAdd`)
                                    }}>Add New</button>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h5 className="card-title fw-semibold">List Of Employees</h5>
                                    <form className="position-relative">
                                        <input
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            type="text" className="form-control search-chat py-2 ps-5" id="text-srh" placeholder="Search" />
                                        <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3" />
                                    </form>
                                </div>
                                <div className="table-responsive">
                                    <EmpTable handleEmployeeDelete={handleEmployeeDelete} employees={filteredEmp} loading={loading} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
