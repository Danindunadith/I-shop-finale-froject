import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../placeOrder/addOrder.css";
import { useState } from "react";
import axios from "axios";

const EditOrder = () => {
  const orders = {
    brand: "",
    model: "",
    quantity: "",
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(orders);
  const [errors, setErrors] = useState({}); // State for validation errors

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
    console.log(order);
  };

  const validateInputs = () => {
    let isValid = true;
    const errorsObj = {};

    // Validate brand
    if (!order.brand.trim()) {
      isValid = false;
      errorsObj.brand = "Brand is required";
    }

    // Validate model
    if (!order.model.trim()) {
      isValid = false;
      errorsObj.model = "Model is required";
    }

    // Validate quantity
    if (!order.quantity.trim()) {
      isValid = false;
      errorsObj.quantity = "Quantity is required";
    } else if (isNaN(order.quantity)) {
      isValid = false;
      errorsObj.quantity = "Quantity must be a number";
    }

    setErrors(errorsObj);
    return isValid;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      const config = {
        headers: {
          "x-apikey": "API_KEY",
        },
      };
      console.log(id);
      await axios
        .post(
          `http://localhost:3500/api/v1/stock/update`,
          {
            id,
            brand: order.brand,
            model: order.model,
            quantity: order.quantity,
          },
          config
        )
        .then((response) => {
          navigate("/stocks");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="addOrder">
      <Link to={"/stocks"}>
        <div className="backBtn">
          <button type="submit">Back</button>
        </div>
      </Link>
      <h3>Edit Orders</h3>
      <form className="addOrderForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="brand">
            <h5>Brand</h5></label>
          <select value={order.brand} onChange={inputChangeHandler} id="brand" name="brand">
                    <option value="">Select Brand</option>
                        <option value="Nokia">Nokia</option>
                        <option value="Apple">Apple</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Asus">Asus</option>
                        <option value="Dell">Dell</option>
                    </select>
          {errors.brand && <span className="error">{errors.brand}</span>}
        </div>
        <div className="inputGroup">
          <label htmlFor="model"> <h5>Model</h5></label>
          <input
            type="text"
            value={order.model}
            onChange={inputChangeHandler}
            id="model"
            name="model"
            autoComplete="off"
            placeholder="Model"
          />
          {errors.model && <span className="error">{errors.model}</span>}
        </div>
        <div className="inputGroup">
          <label htmlFor="quantity"> <h5>Quantity</h5></label>
          <input
            type="number"
            value={order.quantity}
            onChange={inputChangeHandler}
            id="quantity"
            name="quantity"
            autoComplete="off"
            placeholder="Quantity"
          />
          {errors.quantity && <span className="error">{errors.quantity}</span>}
        </div>
        <div className="inputGroup">
          <button type="submit">Edit Orders</button>
        </div>
      </form>
    </div>
  );
};

export default EditOrder;
