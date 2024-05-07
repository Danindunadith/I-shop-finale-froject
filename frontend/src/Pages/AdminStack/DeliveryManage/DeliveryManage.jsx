import React, { useEffect, useState } from 'react'
import Toaster from '../../../Utils/Constants/Toaster'
import PdfGenerator from '../../../Utils/Pdfs/PdfGenerator'
import DeliveryList from './DeliveryList'
import DeliveryService from '../../../Services/DeliveryService/DeliveryService'
import OrderService from '../../../Services/OrderService/OrderService'
import CusSwal from '../../../Utils/CustomSwal/CusSwal'
import { deliveryHeader } from '../../../Utils/Constants/TableHeaders'
import ResponseHandler from '../../../Utils/Constants/ResponseHandler'

export default function DeliveryManage() {

    const [deliveries, setDeliveries] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    
    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await OrderService.getAllOrders()
            if (response.data.code === 200) {
                setDeliveries(response.data.data.orders)
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
            PdfGenerator.generatePdf(deliveries, "Deliver List", deliveryHeader)
            Toaster.justToast('success', 'Creating The Pdf For You', () => { })
        } catch (error) {
            Toaster.justToast('error', 'genration failed', () => { })
        } finally {
            Toaster.dismissLoadingToast()
        }
    }
    const filteredDeliveries = searchQuery ? deliveries.filter((delivery) => {
        return (
            delivery.orderedBy.toLowerCase().includes(searchQuery.toLowerCase()) 
        )
    }) : deliveries

    const handleOrderDelete = (id) => {
        CusSwal.deleteConfiramation(async () => {
            Toaster.loadingToast('Generating Pdf')
            try {
                const result = await OrderService.deleteOrder(id);
                if (result) {
                    Toaster.justToast('success', "Order Deleted", () => { });
                    fetchData();
                }
            } catch (error) {
                ResponseHandler.handleResponse(error);
            } finally {
                Toaster.dismissLoadingToast()
            }
        });
    };
    const handleDeliveryType = async(id,deliveryType) => {
        Toaster.loadingToast('Updating Status')
            try {
                const result = await DeliveryService.updateDelivery({id,deliveryType});
                if (result) {
                    Toaster.justToast('success', "Delivery Updated", () => { });
                    fetchData();
                }
            } catch (error) {
                ResponseHandler.handleResponse(error);
            } finally {
                Toaster.dismissLoadingToast()
            }
    }
    const handleDelivery = async(id,deliveryType) => {
        Toaster.loadingToast('Updating Status')
            try {
                const result = await DeliveryService.addDelivery(id);
                if (result) {
                    Toaster.justToast('success', "Delivery Added", () => { });
                    fetchData();
                }
            } catch (error) {
                ResponseHandler.handleResponse(error);
            } finally {
                Toaster.dismissLoadingToast()
            }
    }
    useEffect(() => {
        fetchData()
    }, [])
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

                                    <button className='btn btn-outline-primary mx-2' onClick={() => { window.location.href = "/coupons"; }}>Apply a leave</button>

                                </div>

                                


                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h5 className="card-title fw-semibold">List Of Deliveries</h5>
                                    <form className="position-relative">
                                        <input
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            type="text" className="form-control search-chat py-2 ps-5" id="text-srh" placeholder="Search who ordered" />
                                        <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3" />
                                    </form>
                                </div>
                                <div className="table-responsive">
                                    <DeliveryList handleOrderDelete={handleOrderDelete} handleDelivery={handleDelivery} handleDeliveryType={handleDeliveryType} deliveries={filteredDeliveries} loading={loading} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        
        
        </div>

        
    )
}
