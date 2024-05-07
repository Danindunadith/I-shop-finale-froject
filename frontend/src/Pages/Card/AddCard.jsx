import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'; // Import SweetAlert2

const AddCard = () => {
    const initialPayment = {
        cardtype: "",
        cardno: "",
        cardmouth: "",
        cardyear: "",
        cardcvv: ""
    };

    const [card, setCard] = useState(initialPayment);
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setCard({ ...card, [name]: value });
    };

    const submitForm = async (e) => {
        e.preventDefault();

        const url = "http://localhost:3500/api/v1/card/cardcreate";

        try {
            const response = await axios.post(url, card);

            if (response.status === 201) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Card report added successfully!',
                    showConfirmButton: false,
                    timer: 2500
                });
                navigate(" ");
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to add card report',
                text: error.response ? error.response.data.error : 'Unknown error occurred'
            });
        }
    };

    return (
        <div className="addOrder">
            <Link to="/main/user/product/65fe90d2b1b53fd693e4217f">Back</Link>
            <h3>Payments</h3>
            <form className="addOrderForm" onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="cardtype">Type of payment</label>
                    <select
                        onChange={inputHandler}
                        id="cardtype"
                        name="cardtype"
                    >
                        <option value="">Select Type</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="Prepaid Card">Prepaid Card</option>
                    </select>
                </div>

                <div className="inputGroup">
                    <label htmlFor="cardno">Card Number</label>
                    <input
                        type="text"
                        onChange={inputHandler}
                        id="cardno"
                        name="cardno"
                        autoComplete="off"
                        placeholder="Card Number"
                    />
                </div>

                <div className="inputGroup">
                    <label htmlFor="cardmouth">Expiry Month</label>
                    <input
                        type="date"
                        onChange={inputHandler}
                        id="cardmouth"
                        name="cardmouth"
                        autoComplete="off"
                        placeholder="Expiry Month"
                    />
                </div>

                <div className="inputGroup">
                    <label htmlFor="cardyear">Expiry Year</label>
                    <input
                        type="text"
                        onChange={inputHandler}
                        id="cardyear"
                        name="cardyear"
                        autoComplete="off"
                        placeholder="Expiry Year"
                    />
                </div>

                <div className="inputGroup">
                    <label htmlFor="cardcvv">CVV</label>
                    <input
                        type="text"
                        onChange={inputHandler}
                        id="cardcvv"
                        name="cardcvv"
                        autoComplete="off"
                        placeholder="CVV"
                    />
                </div>

                <div className="inputGroup">
                    <button type="submit">Pay Now</button>
                </div>
            </form>
        </div>
    );
};

export default AddCard;
