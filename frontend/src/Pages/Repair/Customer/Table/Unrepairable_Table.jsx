import { useState, useEffect } from "react";
import axios from "axios";

function Crud() {
  const [Data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    UpdateData()
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

  const RowGen = () => {
    const filteredData = Data.filter(
      (repair) =>
        repair.rid.includes(searchTerm) ||
        repair.deviceType.includes(searchTerm) ||
        repair.model.includes(searchTerm)
    );
    return filteredData
      .filter((repair) => repair.status === "Unrepairable")
      .map((repair, index) => (
        <tr className="text-black font-bold" /*"py-4"*/ key={index}>
          <td /*className="px-4 border-2 border-black"*/>{repair.rid}</td>
          <td /*className="px-4 border-2 border-black"*/>
            {repair.deviceType}
          </td>
          <td /*className="px-4 border-2 border-black"*/>{repair.model}</td>
          <td /*className="px-4 border-2 border-black"*/>{repair.tDscrptn}</td>
        </tr>
      ));
  };

  return (
    <>
    <br></br><br></br>
      <div className="RepairTable">    
        <div className="d-flex justify-content-end align-items-center mb-4">
          <a href="/main/user/repair/Form" className="btn btn-outline-primary mx-2"> Add Repair </a>
          <a href="/main/user/repair/table/pending" className="btn btn-outline-primary mx-2"> Pending Table </a>
          <a href="/main/user/repair/table/ongoing" className="btn btn-outline-primary mx-2"> Ongoing Table </a>
          <a href="/main/user/repair/table/complete" className="btn btn-outline-primary mx-2"> Completed Table </a>
        </div>
        <div className="container-style">
          <h3>Unrepairable Order List</h3>
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
              <th /*className="border-bottom-0"*/>Technician's Description</th>
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
