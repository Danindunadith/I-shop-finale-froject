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
    const repairid = Data[key].rid;
    console.log(Data[key].rid);
    const url = "http://localhost:3500/api/v1/repair/updaterepair";
    const config = {
      headers: {
        "x-apikey": "API_KEY",
      },
    };

    const newStatus = prompt(
      "Type the number \n 1: Ongoing \n 2: Completed \n 3: Can't be Complete"
    );
    const payload = {
      rid: repairid,
      status: newStatus,
    };
    axios
      .post(url, payload, config)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
    UpdateData();
  }

  function UpdateDiscription(key) {
    const repairid = Data[key].rid;
    console.log(Data[key].rid);
    const url = "http://localhost:3500/api/v1/repair/updaterepair";
    const config = {
      headers: {
        "x-apikey": "API_KEY",
      },
    };

    const newDesc = prompt("Enter Description");
    const payload = {
      rid: repairid,
      tDscrptn: newDesc,
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
    const filteredData = Data.filter(
      (repair) =>
        repair.rid.includes(searchTerm) ||
        repair.deviceType.includes(searchTerm) ||
        repair.model.includes(searchTerm)
    );
    return filteredData
      .filter((repair) => repair.status === "Completed")
      .map((repair, index) => (
        <tr className="text-black font-bold" /*"py-4"*/ key={index}>
          <td /*className="px-4 border-2 border-black"*/>{repair.rid}</td>
          <td /*className="px-4 border-2 border-black"*/>
            {repair.deviceType}
          </td>
          <td /*className="px-4 border-2 border-black"*/>{repair.model}</td>
          <td /*className="px-4 border-2 border-black"*/>{repair.status}</td>
          <td /*className="px-4 border-2 border-black"*/>{repair.cDscrptn}</td>
          <td /*className="px-4 border-2 border-black"*/>{repair.tDscrptn}</td>
        </tr>
      ));
  };

  return (
    <>
    <br/><br/>
      <div className="RepairTable" /*"flex items-center justify-center min-h-screen "*/>
        <div className="d-flex justify-content-end align-items-center mb-4">
          <a href="/main/admin/Technician/Pending" className="btn btn-outline-primary mx-2">Pending Table</a>
          <a href="/main/admin/Technician/Ongoing" className="btn btn-outline-primary mx-2">Ongoing Table</a>
          <a href="/main/admin/Technician/Unrepairable" className="btn btn-outline-primary mx-2">Unrepairable Table</a>
        </div>
        <div className="container-style">
          <h3>Completed Repair List</h3>
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
              <th /*className="px-4 border-2 border-black"*/>Status</th>
              <th /*className="px-4 border-2 border-black"*/>
                Customer's Description
              </th>
              <th /*className="px-4 border-2 border-black"*/>
                Technician's Description
              </th>
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
