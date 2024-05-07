import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'; // Import SweetAlert2

const AddFeedback = () => {
    const initialFeedback = {
        fdate: "",
        fname: "",
        frating: "",
        ffeedback: "",
    };

    const [feedback, setFeedback] = useState(initialFeedback);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setFeedback({ ...feedback, [name]: value });
    };

    const validateForm = () => {
        const errors = {};

        if (!feedback.fdate) {
            errors.fdate = "Date is required";
        }

        if (!feedback.fname.trim()) {
            errors.fname = "Recipient name is required";
        }

        if (!feedback.frating) {
            errors.frating = "Rating is required";
        }

        if (!feedback.ffeedback.trim()) {
            errors.ffeedback = "Feedback is required";
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const url = "http://localhost:3500/api/v1/feedback/fcreate";

        try {
            const response = await axios.post(url, feedback);

            if (response.status === 200) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Feedback report added successfully!',
                    showConfirmButton: false,
                    timer: 2500
                });
                navigate("/main/user/products");
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to add feedback report',
                text: error.response ? error.response.data.error : 'Unknown error occurred'
            });
        }
    };

    return (
        <div className="addOrder">
            <Link to="/">Back</Link>
            <h3>Add New Feedback Report</h3>
            <form className="addOrderForm" onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="fdate">Upload Date</label>
                    <input
                        type="date"
                        onChange={inputHandler}
                        id="fdate"
                        name="fdate"
                        autoComplete="off"
                        placeholder="Upload Date"
                    />
                    {errors.fdate && <span className="error">{errors.fdate}</span>}
                </div>
                <div className="inputGroup">
                    <label htmlFor="fname">For</label>
                    <input
                        type="text"
                        onChange={inputHandler}
                        id="fname"
                        name="fname"
                        autoComplete="off"
                        placeholder="For"
                    />
                    {errors.fname && <span className="error">{errors.fname}</span>}
                </div>
                <div className="inputGroup">
                    <label htmlFor="frating">Rating</label>
                    <input
                        type="number"
                        onChange={inputHandler}
                        id="frating"
                        name="frating"
                        min="1"
                        max="5"
                    />
                    {errors.frating && <span className="error">{errors.frating}</span>}
                </div>
                <div className="inputGroup">
                    <label htmlFor="ffeedback">Give Feedback</label>
                    <input
                        type="text"
                        onChange={inputHandler}
                        id="ffeedback"
                        name="ffeedback"
                        autoComplete="off"
                        placeholder="Give Feedback"
                    />
                    {errors.ffeedback && <span className="error">{errors.ffeedback}</span>}
                </div>
                <div className="inputGroup">
                    <button type="submit">Add Feedback</button>
                </div>
            </form>
        </div>
    );
};

export default AddFeedback;
