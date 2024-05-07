import { useState, useEffect } from "react";
import axios from "axios";

function Crud() {
  const [Data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    UpdateData();
  }, []);

  function UpdateData() {
    const url = "http://localhost:3500/api/v1/repair/repairs";
    const config = {
      headers: {
        "x-apikey": "API_KEY",
        "Accept": "application/json",
      },
    };
    axios.get(url, config)
    .then((response) => {
      setData(response.data.response);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
  }

  function DeleteRepair(key) {
    const repairid = key;
    console.log(key);
    const url = "http://localhost:3500/api/v1/repair/deleterepair";
    const config = {
      headers: {
        "x-apikey": "API_KEY",
      },
    };
    const payload = {
      rid: repairid,
    };
    axios.post(url, payload, config)
      .then((res) => {
        console.log(res);
        UpdateData();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function confirmDelete(index) {
    let confirmDelete = confirm("Are you sure to Delete this Order.?");
    if (confirmDelete) {
      DeleteRepair(index);
    }
  }

  const RowGen = () => {
    const filteredData = Data.filter(repair =>
        repair.rid.includes(searchTerm) ||
        repair.cid.includes(searchTerm) ||
        repair.deviceType.includes(searchTerm) ||
        repair.model.includes(searchTerm)
    );
    return filteredData.filter(repair => repair.status === "").map((repair, index) => (
        <tr className="text-black font-bold" /*"py-4"*/ key={index}>
          <td /*className="px-4 border-2 border-black"*/>{repair.rid}</td>
          <td /*className="px-4 border-2 border-black"*/>{repair.cid}</td>
          <td /*className="px-4 border-2 border-black"*/>
            {repair.deviceType}
          </td>
          <td /*className="px-4 border-2 border-black"*/>{repair.model}</td>
          <td /*className="px-4 border-2 border-black"*/>{repair.cDscrptn}</td>
          <td className="actionButtons" /*"px-4 border-2 border-black" */>
            <button
              type="button"
              className="fa-solid fa-trash" /*"m-2 block bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 
                    rounded-md focus:outline-none focus:shadow-outline-blue active:bg-red-900"*/
              onClick={() => confirmDelete(repair.rid)}
            >
              <i>Delete</i>
            </button>
          </td>
        </tr>
      ));
  };

  return (
    <>
    <br/><br/>
      <div className="RepairTable" /*"flex items-center justify-center min-h-screen "*/>
        <div className="d-flex justify-content-end align-items-center mb-4">
          <a href="/main/admin/Manager/Form" className="btn btn-outline-primary mx-2"> Add Repair </a>
          <a href="/main/admin/Manager/table/ongoing" className="btn btn-outline-primary mx-2"> Ongoing Table </a>
          <a href="/main/admin/Manager/table/complete" className="btn btn-outline-primary mx-2"> Completed Table </a>
          <a href="/main/admin/Manager/table/unrepairable" className="btn btn-outline-primary mx-2"> Unrepairable Table </a>
          <a href="/main/admin/Manager/Report" className="btn btn-outline-primary mx-2"> Generate Report </a>
        </div>
        <div className="container-style">
          <h3>Pending Repair Order List</h3>
          <input
            className="searchBar"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table
          border={1}
          cellPadding={10}
          cellSpacing={0} /*className="text-3xl backdrop-blur-lg "*/
        >
          <thead>
            <tr className="text-black font-bold">
              <th /*className="px-4 border-2 border-black"*/>RepairID</th>
              <th /*className="px-4 border-2 border-black"*/>CustomerID</th>
              <th /*className="px-4 border-2 border-black"*/>Device Type</th>
              <th /*className="px-4 border-2 border-black"*/>Model</th>
              <th /*className="px-4 border-2 border-black"*/>
                Customer's Description
              </th>
              <th /*className="px-4 border-2 border-black"*/>Action</th>
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
