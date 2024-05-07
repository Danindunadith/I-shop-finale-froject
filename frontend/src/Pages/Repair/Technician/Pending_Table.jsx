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
      },
      dataType: "json",
    };
    axios.get(url, config).then((response) => {
      setData(response.data.response);
    });
  }

  function UpdateStatus(key) {
    const repairid = key;
    console.log(key);
    const url = "http://localhost:3500/api/v1/repair/updaterepair";
    const config = {
      headers: {
        "x-apikey": "API_KEY",
      },
    };

    const newED = prompt("How many days do you need to complete the repair?");

    if (isNaN(newED)) {
      newED = prompt("Invalid input. Please enter a number.");
      
    } else {
      const today = new Date();
      const estDate = new Date(today);
      estDate.setUTCDate(today.getUTCDate() + parseInt(newED));

      const year = estDate.getFullYear();
      const month = String(estDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because getMonth() returns zero-based month
      const day = String(estDate.getDate()).padStart(2, "0");

      const formattedEstDate = `${year}-${month}-${day}`;
      console.log(formattedEstDate);

      const payload = {
        rid: repairid,
        estDate: formattedEstDate,
        status: "Ongoing",
      };

      console.log(payload);

      axios.post(url, payload, config)
        .then((res) => {
          console.log(res);
          UpdateData();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  const RowGen = () => {
    const filteredData = Data.filter(
      (repair) =>
        repair.rid.includes(searchTerm) ||
        repair.deviceType.includes(searchTerm) ||
        repair.model.includes(searchTerm)
    );
    return filteredData.filter(repair => repair.status === "").map((repair, index) => (
        <tr className="text-black font-bold" /*"py-4"*/ key={index}>
          <td /*className="px-4 border-2 border-black"*/>{repair.rid}</td>
          <td /*className="px-4 border-2 border-black"*/>
            {repair.deviceType}
          </td>
          <td /*className="px-4 border-2 border-black"*/>{repair.model}</td>
          <td /*className="px-4 border-2 border-black"*/>{repair.cDscrptn}</td>
          <td className="actionButtons">
            <button
              type="button"
              className="fa-solid fa-pen-to-square" /*"m-2 block bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 
                    rounded-md focus:outline-none focus:shadow-outline-blue active:bg-violet-900"*/
              onClick={() => UpdateStatus(repair.rid)}
            >
              <i>Start</i>
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
          <a href="/main/admin/Technician/Ongoing" className="btn btn-outline-primary mx-2">Ongoing Table</a>
          <a href="/main/admin/Technician/Complete" className="btn btn-outline-primary mx-2">Completed Table</a>
          <a href="/main/admin/Technician/Unrepairable" className="btn btn-outline-primary mx-2">Unrepairable Table</a>
        </div>
        <div className="container-style">
          <h3>Pending Repair List</h3>
          <input
            className="searchBar"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr className="text-black font-bold">
              <th /*className="px-4 border-2 border-black"*/>RepairID</th>
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
