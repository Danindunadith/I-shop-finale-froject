import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AddCoupon.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCoupon = () => {
  const [coupon, setCoupon] = useState({
    name: "",
    ccategory: "",
    cbrand: "",
    mail: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setCoupon({ ...coupon, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!coupon.name.trim()) {
      errors.name = "Employee ID is required";
      isValid = false;
    }

    if (!coupon.ccategory) {
      errors.ccategory = "Employee Role is required";
      isValid = false;
    }

    if (!coupon.cbrand) {
      errors.cbrand = "Reason is required";
      isValid = false;
    }

    if (!coupon.mail.trim()) {
      errors.mail = "Email is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const url = "http://localhost:3500/api/v1/coupon/ccreate";
      const payload = coupon;

      const config = {
        headers: {
          "x-apikey": "API_KEY",
        },
      };

      try {
        const response = await axios.post(url, payload, config);
        console.log(response);
        toast.success("Leave informations submitted successfully!");
        navigate("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="addOrder">
      <ToastContainer />
      <Link to={"/main/admin/delivery"}>
        <div className="backBtn">
          <button type="submit">Back</button>
        </div>
      </Link>
      <h3>Fill Leave Information</h3>
      <form className="addOrderForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="code">
            <h5>Employee Name</h5>
          </label>
          <input
            type="text"
            onChange={inputHandler}
            id="name"
            name="name"
            autoComplete="off"
            placeholder="Enter employee name"
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div className="inputGroup">
          <label htmlFor="cbrand">
            <h5>Employee Role</h5>
          </label>
          <select onChange={inputHandler} id="ccategory" name="ccategory">
            <option value="">Select Role</option>
            <option value="Delivery Manager">Delivery Manager</option>
            <option value="Stock Manager">Stock Manager</option>
            <option value="Promotion Manager">Promotion Manager</option>
            <option value="Payment Manager">Payment Manager</option>
            <option value="Repair Manager">Repair Manager</option>
            <option value="Customer Manager">Customer Manager</option>
            <option value="Other">Other</option>
          </select>
          {errors.ccategory && <div className="error">{errors.ccategory}</div>}
        </div>

        <div className="inputGroup">
          <label htmlFor="cbrand">
            <h5>Reason</h5>
          </label>
          <select onChange={inputHandler} id="cbrand" name="cbrand">
            <option value="">Select reason</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Maternity Leave">Maternity Leave</option>
            <option value="Annual Leave">Annual Leave</option>
            <option value="Unpaid Leave">Unpaid Leave</option>
          </select>
          {errors.cbrand && <div className="error">{errors.cbrand}</div>}
        </div>

        <div className="inputGroup">
          <label htmlFor="mail">
            <h5>Email</h5>
          </label>
          <input
            type="email"
            onChange={inputHandler}
            id="mail"
            name="mail"
            autoComplete="off"
            placeholder="Enter your email"
          />
          {errors.mail && <div className="error">{errors.mail}</div>}
        </div>
        <div className="sBtn">
          <button type="submit">Submit Leave</button>
        </div>
      </form>
    </div>
  );
};

export default AddCoupon;

