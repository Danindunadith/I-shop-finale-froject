import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditCoupon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState({ mail: "" });

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/api/v1/coupon/cgetOne/${id}`);
        setCoupon(response.data);
      } catch (error) {
        console.error("Error fetching coupon:", error);
      }
    };

    fetchCoupon();
  }, [id]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setCoupon((prevCoupon) => ({
      ...prevCoupon,
      [name]: value
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        `http://localhost:3500/api/v1/coupon/cupdate`,
        {
          id,
          mail: coupon.mail,
        },
        {
          headers: {
            "x-apikey": "API_KEY", // Replace with your API key
          },
        }
      );
      navigate("/list");
    } catch (error) {
      console.error("Error updating coupon:", error);
    }
  };

  return (
    <div className="addOrder">
      <Link to={"/"}>Back</Link>
      <h3>Edit Orders</h3>
      <form className="addOrderForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="mail">Email</label>
          <input
            type="email"
            value={coupon.mail}
            onChange={inputChangeHandler}
            id="mail"
            name="mail"
            autoComplete="off"
            placeholder="E-mail"
          />
        </div>
        <div className="inputGroup">
          <button type="submit">Edit Orders</button>
        </div>
      </form>
    </div>
  );
};

export default EditCoupon;
