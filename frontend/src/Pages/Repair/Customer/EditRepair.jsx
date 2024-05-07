import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Crud() {
  const [formData, setFormData] = useState({
    cid: "",
    type: "",
    model: "",
    cDesc: "",
    status: "",
  });

  const [errors, setErrors] = useState({
    cid: "",
    type: "",
    model: "",
    cDesc: "",
    status: "",
  });

  const { rid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (rid) {
      fetchOrderData(rid);
    }
  }, [rid]);

  const fetchOrderData = (orderId) => {
    const url = `http://localhost:3500/api/v1/repair/repair/${orderId}`;
    const config = {
      headers: {
        "x-apikey": "API_KEY",
      },
    };
    axios
      .get(url, config)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
    validateInput(e.target.name, e.target.value);
  };

  const validateInput = (name, value) => {
    let errors = { ...errors };
    if (!value.trim()) {
      errors[name] = "This field is required.";
    } else {
      errors[name] = "";
    }
    setErrors(errors);
  };

  const updateRepair = (e) => {
    e.preventDefault();
    const url = `http://localhost:3500/api/v1/repair/updaterepair`;
    const config = {
      headers: {
        "x-apikey": "API_KEY",
      },
    };
    const payload = {
      ...formData,
      rid: formData.rid,
    };
    if (!Object.values(errors).some((error) => error !== "")) {
      axios
        .post(url, payload, config)
        .then((res) => {
          console.log(res);
          alert("Order Updated Successfully");
          navigate("/pending_order"); // Redirect to pending_order page
        })
        .catch((error) => {
          console.error(error);
          setErrors({
            ...errors,
            general: "An error occurred while updating the order.",
          });
        });
    }
  };

  return (
    <div className="addRepair">
      <h3>{rid ? "Edit Repair Order" : "Place Repairing Order"}</h3>
      <form onSubmit={updateRepair} className="addRepairForm">
        <div className="inputGroup">
          <label htmlFor="cid">Customer ID: </label>
          <input
            onChange={onChange}
            value={formData.cid}
            name="cid"
            placeholder="Ex: CBR-1000rr"
            type="text"
            required
          />
          <br />
          {errors.cid && <div>{errors.cid}</div>}

          <label htmlFor="type">Device Type: </label>
          <select
            onChange={onChange}
            value={formData.type}
            name="type"
            required
          >
            <option value="">Select a Type</option>
            <option value="Mobile Phone">Mobile Phone</option>
            <option value="Tablet">Tablet</option>
            <option value="Laptop">Laptop</option>
            <option value="Smart Watch">Smart Watch</option>
            <option value="Accessory">Accessory</option>
            <option value="Other">Other</option>
          </select>
          <br />
          {errors.type && <div>{errors.type}</div>}

          <label htmlFor="model">Model: </label>
          <input
            onChange={onChange}
            value={formData.model}
            name="model"
            placeholder="Ex: Samsung Galaxy s23 ultra"
            type="text"
            required
          />
          <br />
          {errors.model && <div>{errors.model}</div>}

          <label htmlFor="cDesc">Customer's Description: </label>
          <input
            onChange={onChange}
            value={formData.cDesc}
            name="cDesc"
            placeholder="Ex: Display has green lines"
            type="text"
            required
          />
          <br />
          {errors.cDesc && <div>{errors.cDesc}</div>}

          <button type="submit">
            {rid ? "Update Order" : "Add To Repair"}
          </button>
          <a href="/Progress">Click to see Progress</a>
        </div>
      </form>
    </div>
  );
}

export default Crud;
