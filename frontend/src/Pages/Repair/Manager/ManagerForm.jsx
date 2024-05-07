import React, { useState } from "react";
import axios from "axios";

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

  const { rid, cid, type, model, cDesc } = formData;

  const validateInput = (name, value) => {
    let errors = { ...errors };
    if (!value.trim()) {
      errors[name] = "This field is required.";
    } else {
      errors[name] = "";
    }
    setErrors(errors);
  };

  const onChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
    validateInput(e.target.name, e.target.value);
  };

  const addRepair = (e) => {
    e.preventDefault();
    const url = "http://localhost:3500/api/v1/repair/createrepair";
    const config = {
      headers: {
        "x-apikey": "API_KEY", // Make sure to replace "API_KEY" with your actual API key
      },
    };
    const uniqueRid = `R-${Date.now()}`;
    const currentDate = new Date();
    const payload = {
      cid,
      rid: uniqueRid,
      deviceType: type,
      model,
      cDscrptn: cDesc,
      status,
      sDate: currentDate
    };
    if (!Object.values(errors).some((error) => error !== "")) {
      axios
        .post(url, payload, config)
        .then((res) => {
          console.log(res);
          alert(`Ordered Successfully \n Customer's Repair ID is ${uniqueRid}`);
          setFormData({
            cid: "",
            type: "",
            model: "",
            cDesc: "",
            status: "",
          });
        })
        .catch((error) => {
          console.error(error);
          // Optionally, set a general error message
          setErrors({
            ...errors,
            general: "An error occurred while adding the item.",
          });
        });
    }
  };

  return (
    /*<div className="body-wrapper">
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 d-flex align-items-stretch">
          <div className="card w-100 shadow-sm">
            <div className='card-header bg-info-subtle'>
              <h2>Place Repairing Order</h2>
            </div>
            <div className="card-body p-4">
              <div className="row">
                <div className="col-3"></div>
                <div className="col-6">*/
    <>
    <br/><br/><br/><br/>
    <div className="d-flex justify-content-end align-items-center mb-4">
      <a href="/main/admin/Manager/table/pending" className="btn btn-outline-primary mx-2"> Pending Table </a>
      <a href="/main/admin/Manager/table/ongoing" className="btn btn-outline-primary mx-2"> Ongoing Table </a>
      <a href="/main/admin/Manager/table/complete" className="btn btn-outline-primary mx-2"> Completed Table </a>
      <a href="/main/admin/Manager/table/unrepairable" className="btn btn-outline-primary mx-2"> Unrepairable Table </a>
      <a href="/main/admin/Manager/Report" className="btn btn-outline-primary mx-2"> Generate Report </a>
      </div>
      <div className="addRepair">
        <h3>Place Repairing Order</h3>
        <form
          onSubmit={addRepair}
          className="addRepairForm" /*'needs-validation'*/
        >
          <div className="inputGroup" /*div className="col-6 col-md-8"*/>
            <label htmlFor="cid" /*className="form-label"*/>
              Customer ID:{" "}
            </label>
            <input
              onChange={onChange}
              value={cid}
              name="cid"
              placeholder="Enter Customer ID"
              //className="border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 border-b-4 text-3xl"
              type="text"
              required
            />
            <br></br>
            {errors.cid && <div /*className="text-red-500"*/>{errors.cid}</div>}

            <label htmlFor="type" /*className="form-label"*/>
              Device Type:{" "}
            </label>
            <select
              onChange={onChange}
              value={type}
              name="type"
              //className="border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 border-b-4 text-3xl"
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
            <br></br>
            {errors.type && (
              <div /*className="text-red-500"*/>{errors.type}</div>
            )}

            <label htmlFor="model" /*className="form-label"*/>Model: </label>
            <input
              onChange={onChange}
              value={model}
              name="model"
              placeholder="Enter Model"
              //className="border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 border-b-4 text-3xl"
              type="text"
              required
            />
            <br></br>
            {errors.model && (
              <div /*className="text-red-500"*/>{errors.model}</div>
            )}

            <label htmlFor="cDesc" /*className="form-label"*/>
              Customer's Description:{" "}
            </label>
            <input
              onChange={onChange}
              value={cDesc}
              name="cDesc"
              placeholder="Enter Customer's Description"
              //className="border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 border-b-4 text-3xl"
              type="text"
              required
            />
            <br />
            {errors.cDesc && (
              <div /*className="text-red-500"*/>{errors.cDesc}</div>
            )}

            <button type="submit" className="btn btn-success">
              Add To Repair
            </button>
          </div>
        </form>
      </div>
    </>
    /*</div>  
            </div>
          </div>
        </div>  
      </div>
    </div>
  </div>*/
  );
}

export default Crud;
