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

  function confirmDelete(index) {
    let confirmDelete = confirm("Are you sure to Delete this Order.?");
    if (confirmDelete) {
      DeleteRepair(index);
    }
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
    axios
      .post(url, payload, config)
      .then((res) => {
        console.log(res);
        UpdateData();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const RowGen = () => {
    const filteredData = Data.filter(repair =>
      repair.rid.includes(searchTerm) ||
      repair.deviceType.includes(searchTerm) ||
      repair.model.includes(searchTerm)
    );
    return filteredData.filter(repair => repair.status == "").map((repair, index) => (
        <tr className="text-black font-bold" /*"py-4"*/ key={index}>
          <td /*className="px-4 border-2 border-black"*/>{repair.rid}</td>
          <td /*className="px-4 border-2 border-black"*/>{repair.deviceType}</td>
          <td /*className="px-4 border-2 border-black"*/>{repair.model}</td>
          <td /*className="px-4 border-2 border-black"*/>{repair.cDscrptn}</td>
          <td className="actionButtons">
            <button
              type="button"
              className="fa-solid fa-pen-to-square" /*"m-2 block bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 
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
    <br></br><br></br>
    <div className="RepairTable">
    <div className="d-flex justify-content-end align-items-center mb-4">
        <a href="/main/user/repair/Form" className="btn btn-outline-primary mx-2">Add Repair</a>
        <a href="/main/user/repair/table/ongoing" className="btn btn-outline-primary mx-2">Ongoing Table</a>
        <a href="/main/user/repair/table/complete" className="btn btn-outline-primary mx-2">Completed Table</a>
        <a href="/main/user/repair/table/unrepairable" className="btn btn-outline-primary mx-2">Unrepairable Table</a>
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
          cellSpacing={0} /*className="table mb-0 align-middle"*/
        >
          <thead /*className="text-dark fs-4"*/>
            <tr className="text-black font-bold">
              <th /*className="border-bottom-0"*/>RepairID</th>
              <th /*className="border-bottom-0"*/>Device Type</th>
              <th /*className="border-bottom-0"*/>Model</th>
              <th /*className="border-bottom-0"*/>Customer's Description</th>
              <th /*className="border-bottom-0"*/>Action</th>
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
