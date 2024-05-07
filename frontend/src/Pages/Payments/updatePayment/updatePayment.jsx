import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdatePayment = () => {
    const initialReportState = {
        reportName: "",
        reportType: "",
        date: "",
        amount: "",
    };

    const { id } = useParams();
    const navigate = useNavigate();
    const [report, setReport] = useState(initialReportState);
    const [errors, setErrors] = useState({});

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setReport({ ...report, [name]: value });
    };

    useEffect(() => {
        axios
            .get(`http://localhost:3500/api/v1/payment/pget/${id}`)
            .then((response) => {
                setReport(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const validateForm = () => {
        const errors = {};

        if (!report.reportName.trim()) {
            errors.reportName = "Report Name is required";
        }

        if (!report.reportType.trim()) {
            errors.reportType = "Report Type is required";
        }

        if (!report.date.trim()) {
            errors.date = "Date is required";
        }

        if (!report.amount.trim()) {
            errors.amount = "Amount is required";
        } else if (isNaN(report.amount)) {
            errors.amount = "Amount must be a number";
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const config = {
            headers: {
                "x-apikey": "API_KEY",
            },
        };

        try {
            await axios.post(
                `http://localhost:3500/api/v1/payment/pupdate/${id}`,
                {
                    id,
                    reportName: report.reportName,
                    reportType: report.reportType,
                    date: report.date,
                    amount: report.amount,
                },
                config
            );
            navigate("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="addOrder">
           <Link to={"/pay"}>
        <div className="backBtn">
          <button type="submit">Back</button>
        </div>
      </Link>
            <h3>Edit Payments</h3>
            <form className="addOrderForm" onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="reportName">Report Name</label>
                    <input
                        type="text"
                        value={report.reportName}
                        onChange={inputChangeHandler}
                        id="reportName"
                        name="reportName"
                        autoComplete="off"
                        placeholder="Report Name"
                    />
                    {errors.reportName && <span className="error">{errors.reportName}</span>}
                </div>
                <div className="inputGroup">
                    <label htmlFor="reportType">Report Type</label>
                    <input
                        type="text"
                        value={report.reportType}
                        onChange={inputChangeHandler}
                        id="reportType"
                        name="reportType"
                        autoComplete="off"
                        placeholder="Report Type"
                    />
                    {errors.reportType && <span className="error">{errors.reportType}</span>}
                </div>
                <div className="inputGroup">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        value={report.date}
                        onChange={inputChangeHandler}
                        id="date"
                        name="date"
                        autoComplete="off"
                        placeholder="Date"
                    />
                    {errors.date && <span className="error">{errors.date}</span>}
                </div>
                <div className="inputGroup">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        value={report.amount}
                        onChange={inputChangeHandler}
                        id="amount"
                        name="amount"
                        autoComplete="off"
                        placeholder="Amount"
                    />
                    {errors.amount && <span className="error">{errors.amount}</span>}
                </div>
                <div className="inputGroup">
                    <button type="submit">Edit Payment</button>
                </div>
            </form>
        </div>
    );
};

export default UpdatePayment;
