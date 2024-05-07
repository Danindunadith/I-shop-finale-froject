import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./addOrder.css";
import axios from "axios";

const AddOrder = () => {
  const [order, setOrder] = useState({
    name: "",
    category: "",
    brand: "",
    model: "",
    quantity: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!order.name.trim()) {
      errors.name = "Supplier's name is required";
      isValid = false;
    }

    if (!order.category.trim()) {
      errors.category = "Model is required";
      isValid = false;
    }

    if (!order.brand) {
      errors.brand = "Brand is required";
      isValid = false;
    }

    if (!order.model) {
      errors.model = "Category is required";
      isValid = false;
    }

    if (!order.quantity.trim()) {
      errors.quantity = "Quantity is required";
      isValid = false;
    } else if (!/^\d+$/.test(order.quantity)) {
      errors.quantity = "Quantity must be a number";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const url = "http://localhost:3500/api/v1/stock/create";
      const payload = order;
      const config = {
        headers: {
          "x-apikey": "API_KEY",
        },
      };
      try {
        const response = await axios.post(url, payload, config);
        console.log(response);
        navigate("/stocks");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="addOrder">
      <Link to={"/stocks"}>
        <div className="backBtn">
          <button type="submit">Back</button>
        </div>
      </Link>
      <h3>Place Orders</h3>
      <form className="addOrderForm" onSubmit={submitForm}>
        <div className="inputGroup">
        <label htmlFor="name">
            <h5>Supplier's name</h5>
          </label>
          <input
            type="text"
            onChange={inputHandler}
            id="name"
            name="name"
            autoComplete="off"
            placeholder="Full name"
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>


        
      <div className="inputGroup">
        <label htmlFor="category">
            <h5>Category</h5>
          </label>
          <select onChange={inputHandler} id="category" name="category">
            <option value="">Select Category</option>
            <option value="Smart phone">Smart phone</option>
            <option value="Laptop">Laptop</option>
            <option value="EarBud">EarBud</option>
          </select>
          {errors.category && <div className="error">{errors.category}</div>}
        </div>


        <div className="inputGroup">
        <label htmlFor="brand">
            <h5>Brand</h5>
          </label>
          <select onChange={inputHandler} id="brand" name="brand">
            <option value="">Select Brand</option>
            <option value="Nokia">Nokia</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Asus">Asus</option>
            <option value="Dell">Dell</option>
          </select>
          {errors.brand && <div className="error">{errors.brand}</div>}
        </div>



        

        <div className="inputGroup">
        <label htmlFor="model">
            <h5>Model</h5>
          </label>
          <input
            type="text"
            onChange={inputHandler}
            id="model"
            name="model"
            autoComplete="off"
            placeholder="Model"
          />
          {errors.model && <div className="error">{errors.model}</div>}
        </div>



        <div className="inputGroup">
        <label htmlFor="quantity">
            <h5>Quantity</h5>
          </label>
          <input
            type="number"
            onChange={inputHandler}
            id="quantity"
            name="quantity"
            autoComplete="off"
            placeholder="Quantity"
          />
          {errors.quantity && <div className="error">{errors.quantity}</div>}
        </div>


        



        <div className="sBtn">
          <button type="submit">Submit Order</button>
        </div>
      </form>
    </div>
  );
};

export default AddOrder;
