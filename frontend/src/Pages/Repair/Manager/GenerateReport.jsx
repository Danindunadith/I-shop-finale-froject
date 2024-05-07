import React, { useState, useEffect } from "react";
import axios from "axios";

function Crud() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    handleSearch();
  }, [startDate, endDate]);

  function extractDateFromRid(rid) {
    const timestamp = rid.split("-")[1];
    return new Date(parseInt(timestamp));
  }

  function handleSearch() {
    const formattedStartDate = new Date(startDate);
    const formattedEndDate = new Date(endDate);

    if (startDate && endDate) {
      updateData(formattedStartDate, formattedEndDate);
    }
  }

  function updateData(startDate, endDate) {
    const url = "http://localhost:3500/api/v1/repair/repairs";
    const config = {
      headers: {
        "x-apikey": "API_KEY",
      },
    };

    axios
      .get(url, config)
      .then((response) => {
        const filteredData = response.data.response.filter((repair) => {
          const repairDate = extractDateFromRid(repair.rid);
          return repairDate >= startDate && repairDate <= endDate;
        });
        setData(filteredData);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const RowGen = () => {
    return data.map((repair, index) => (
      <tr className="text-black font-bold" key={index}>
        <td>{repair.rid}</td>
        <td>{repair.cid}</td>
        <td>{repair.deviceType}</td>
        <td>{repair.model}</td>
        <td>{repair.status === "" ? "Pending" : repair.status}</td>
        <td>{repair.invoice === "" ? "Pending" : repair.invoice}</td>
        <td>{repair.tDscrptn === "" ? "Pending" : repair.tDscrptn}</td>
      </tr>
    ));
  };

  return (
    <>
    <br/><br/>
      <div className="RepairTable">
        <div className="d-flex justify-content-end align-items-center mb-4">
          <a href="/main/admin/Manager/Form" className="btn btn-outline-primary mx-2"> Add Repair </a>
          <a href="/main/admin/Manager/table/pending" className="btn btn-outline-primary mx-2"> Pending Table </a>
          <a href="/main/admin/Manager/table/ongoing" className="btn btn-outline-primary mx-2"> Ongoing Table </a>
          <a href="/main/admin/Manager/table/complete" className="btn btn-outline-primary mx-2"> Completed Table </a>
          <a href="/main/admin/Manager/table/unrepairable" className="btn btn-outline-primary mx-2"> Unrepairable Table </a>
        </div>
        <h3>Generate Report</h3>
        <div className="dateInputs">
          <label>Start Date:</label>
          <input
            className="searchBar"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ marginRight: "200px" }}
          />

          <label>End Date:</label>
          <input
            className="searchBar"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <button onClick={handleSearch}>Search</button>
        </div>
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr className="text-black font-bold">
              <th>Repair ID</th>
              <th>Customer ID</th>
              <th>Device Type</th>
              <th>Model</th>
              <th>Status</th>
              <th>Invoice</th>
              <th>Technician's Description</th>
            </tr>
          </thead>
          <tbody>
            <RowGen />
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Crud;
