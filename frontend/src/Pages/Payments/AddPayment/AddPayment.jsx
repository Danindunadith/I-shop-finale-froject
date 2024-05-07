import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'; // Import SweetAlert2

const AddPayment = () => {
    const initialPayment = {
        reportName: "",
        reportType: "",
        date: "",
        for: "",
        amount: ""
    };

    const [payment, setPayment] = useState(initialPayment);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setPayment({ ...payment, [name]: value });
    };

    const validateForm = () => {
        const errors = {};

        if (!payment.reportName) {
            errors.reportName = "Report Category is required";
        }

        if (!payment.reportType) {
            errors.reportType = "Report Type is required";
        }

        if (!payment.date) {
            errors.date = "Date is required";
        }

        if (!payment.for.trim()) {
            errors.for = "Purpose is required";
        }

        if (!payment.amount) {
            errors.amount = "Amount is required";
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const url = "http://localhost:3500/api/v1/payment/pcreate";

        try {
            const response = await axios.post(url, payment);

            if (response.status === 200) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Payment report added successfully!',
                    showConfirmButton: false,
                    timer: 2500
                });
                navigate(" ");
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to add payment report',
                text: error.response ? error.response.data.error : 'Unknown error occurred'
            });
        }
    };

    return (
        <div className="addOrder">
            <Link to={"/main/admin/delivery"}>
        <div className="backBtn">
          <button type="submit">Home</button>
        </div>
      </Link>
            <h3>Add New Payment Report</h3>
            <form className="addOrderForm" onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="reportName">Report Category</label>
                    <select
                        onChange={inputHandler}
                        id="reportName"
                        name="reportName"
                    >
                        <option value="">Select Report Category</option>
                        <option value="Employee Report">Employee Report</option>
                        <option value="Stock Related Report">Stock Report</option>
                        <option value="Repair Report">Repair Report</option>
                        <option value="Delivery Report">Delivery Report</option>
                        <option value="Promotion Report">Promotion Report</option>
                    </select>
                    <span style={{ color: 'red' }}>{errors.reportName}</span>
                </div>

                <div className="inputGroup">
                    <label htmlFor="reportType">Report Type</label>
                    <select
                        onChange={inputHandler}
                        id="reportType"
                        name="reportType"
                    >
                        <option value="">Select Report Type</option>
                        <option value="Daily Report">Daily Report</option>
                        <option value="Monthly Report">Monthly Report</option>
                    </select>
                    <span style={{ color: 'red' }}>{errors.reportType}</span>
                </div>

                <div className="inputGroup">
                    <label htmlFor="date">Upload Date</label>
                    <input
                        type="date"
                        onChange={inputHandler}
                        id="date"
                        name="date"
                        autoComplete="off"
                        placeholder="Upload Date"
                    />
                    <span style={{ color: 'red' }}>{errors.date}</span>
                </div>

                <div className="inputGroup">
                    <label htmlFor="for">Purpose</label>
                    <input
                        type="text"
                        onChange={inputHandler}
                        id="for"
                        name="for"
                        autoComplete="off"
                        placeholder="Purpose"
                    />
                    <span style={{ color: 'red' }}>{errors.for}</span>
                </div>

                <div className="inputGroup">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        onChange={inputHandler}
                        id="amount"
                        name="amount"
                        autoComplete="off"
                        placeholder="Amount"
                    />
                    <span style={{ color: 'red' }}>{errors.amount}</span>
                </div>

                <div className="inputGroup">
                    <button type="submit">Add Report</button>
                </div>
            </form>
        </div>
    );
};

export default AddPayment;
