/*import { useState } from 'react'
import axios from 'axios'

function Crud() {

    const [ formData,setFormData ] = useState({
      rid: "",
      cid:"",
      type:"",
      model:"",
      cDesc:""
  })

    const { rid, cid, type, model, cDesc} = formData;

      const addRepair = () => {
        const url = 'http://localhost:3500/api/v1/repair/createrepair'
        const config = {
          headers: {
            "x-apikey": "API_KEY",
          },
        }
        const payload = {
          cid,
          rid,
          deviceType: type,
          model,
          cDscrptn:cDesc
        }
        axios.post(url,payload,config)
        .then((res) => {
          console.log(res)
          console.log(config) 
        })
        .catch((error) => {
          console.error(error)
        })
  
    }

    const onChange = (e) => {
        setFormData((prevformData) => ({
          ...prevformData,
          [e.target.name]:e.target.value
        }))
      }

  return (
    <>
      <div className="body-wrapper">
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
                    <div className="col-6">
                      <div className="col-6 col-md-8">
                        <label htmlFor="rid" className="form-label">Repair ID: </label>
                        <input onChange={onChange} value={rid} name='rid' 
                            placeholder="Ex: R1" 
                            //className="border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 border-b-4 text-3xl" 
                            type="text" />  
                          <br/>
                          <br/>      
                        <label htmlFor="cid" className="form-label">Customer ID: </label>
                        <input onChange={onChange} value={cid} name='cid' 
                            placeholder="Ex: CBR1000rr" 
                            //className="border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 border-b-4 text-3xl" 
                            type="text" />
                          <br/>
                          <br/>  
                        <label htmlFor="type" className="form-label">Device Type: </label>
                        <select onChange={onChange} value={type} name='type' 
                            //className="border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 border-b-4 text-3xl"
                            >
                              <option value="">Select a Type</option>
                              <option value="Mobile Phone">Mobile Phone</option>
                              <option value="Tablet">Tablet</option>
                              <option value="Laptop">Laptop</option>
                              <option value="Smart Watch">Smart Watch</option>
                              <option value="Accessory">Accessory</option>
                              <option value="Other">Other</option>
                            </select>
                          <br/>
                          <br/>
                        <label htmlFor="model" className="form-label">Model: </label>
                        <input onChange={onChange} value={model} name='model' 
                            placeholder="Ex: Samsung Galaxy s23 ultra" 
                            //className="border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 border-b-4 text-3xl" 
                            type="text" />
                          <br/>
                          <br/>
                        <label htmlFor="cDesc" className="form-label">Customer's Description: </label>
                        <input onChange={onChange} value={cDesc} name='cDesc' 
                            placeholder="Ex: Display has green lines" 
                            //className="border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 border-b-4 text-3xl" 
                            type="text" />
                          <br/>
                          <br/>
                        </div>
                      <div className="d-flex justify-content-end mb-2">
                        <div className="mb-5 flex w-44 h-14 max-w-sm  bg-gradient-to-tr from-blue-300 to-blue-600 p-0.5 shadow-lg">
                          <button className="btn btn-success" onClick={addRepair}>
                            Add To Repair
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>  
            </div>
          </div>
        </div>  
      </div>
    </>
  )
}*/
import React, { useState } from "react";
import axios from "axios";
import "../cf.css";

function Crud() {
  const [formData, setFormData] = useState({
    cid: "",
    type: "",
    model: "",
    cDesc: "",
    status: "",
    invoice: "",
  });

  const [errors, setErrors] = useState({
    rid: "",
    cid: "",
    type: "",
    model: "",
    cDesc: "",
    status: "",
    invoice: "",
  });

  const { cid, type, model, cDesc, invoice } = formData;

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
          alert(`Ordered Successfully \n Your Repair ID is ${uniqueRid}`);
          setFormData({
            cid: "",
            type: "",
            model: "",
            cDesc: "",
            status: "",
            invoice: "",
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
    <br></br><br></br><br></br><br></br>
        <div className="d-flex justify-content-end align-items-center mb-4">
          <a href="/main/user/repair/table/pending" className="btn btn-outline-primary mx-2"> Pending Table </a>
          <a href="/main/user/repair/table/ongoing" className="btn btn-outline-primary mx-2"> Ongoing Table </a>
          <a href="/main/user/repair/table/complete" className="btn btn-outline-primary mx-2"> Completed Table </a>
          <a href="/main/user/repair/table/unrepairable" className="btn btn-outline-primary mx-2"> Unrepairable Table </a>
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
              placeholder="Ex: CBR-1000rr"
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
              placeholder="Ex: Samsung Galaxy s23 ultra"
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
              placeholder="Ex: Display has green lines"
              //className="border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 border-b-4 text-3xl"
              type="text"
              required
            />
            <br />
            {errors.cDesc && (
              <div /*className="text-red-500"*/>{errors.cDesc}</div>
            )}

            <button type="submit" /*className="btn btn-success"*/>
              Add To Repair
            </button>
            <a href="Progress">Click to see Progress</a>
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
