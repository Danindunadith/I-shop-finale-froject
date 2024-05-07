import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./coupon.css";
import Swal from "sweetalert2"; // Import SweetAlert2

const Coupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const tableRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:3500/api/v1/coupon/cgetAll"
      );
      setCoupons(response.data);
    };

    fetchData();
  }, []);

  const generatePdf = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Employee ID", "Employee Role", "Reason", "Email"]],
      body: coupons.map((coupon) => [
        coupon.name,
        coupon.ccategory,
        coupon.cbrand,
        coupon.mail,
      ]),
    });
    doc.save("Leave_list.pdf");
  };

  // Function to delete a coupon
  const deleteCoupon = async (couponId) => {
    try {
      // Show a confirmation alert using SweetAlert2
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this information!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, reject it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        // Make an HTTP request to delete the coupon
        await axios.post("http://localhost:3500/api/v1/coupon/cdelete", {
          id: couponId,
        });

        // Update the state by filtering out the deleted coupon
        setCoupons(coupons.filter((coupon) => coupon._id !== couponId));

        // Show success alert using SweetAlert2
        Swal.fire("Deleted!", "The coupon has been deleted.", "success");
      }
    } catch (error) {
      // Show error alert using SweetAlert2
      Swal.fire(
        "Error!",
        "An error occurred while deleting the coupon.",
        "error"
      );
    }
  };

  const filteredCoupons = searchQuery
    ? coupons.filter((coupon) =>
        Object.values(coupon).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : coupons;

  return (
    <div className="OrderTable">
      <Link to={"/main/admin/delivery"}>
        <div className="backBtn">
          <button type="submit">Home</button>
        </div>
      </Link>
      <button className="btn btn-info m-3" onClick={() => navigate("/cnoti")}>
        Approved List
      </button>
      <h3>Leave requests from employees</h3>
      <div className="searchBar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by any..."
        />
      </div>

      

      <table ref={tableRef} border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>Emp_ID</th>
            <th>Emp name</th>
            <th>Role</th>
            <th>Type</th>
            <th>Email</th>
            <th>Approve</th>
            <th>Decline</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoupons.map((coupon, index) => (
            <tr key={coupon._id}>
              <td>{index + 1}</td>
              <td>{coupon.name}</td>
              <td>{coupon.ccategory}</td>
              <td>{coupon.cbrand}</td>
              <td>{coupon.mail}</td>
              <td>
              <button
                onClick={() => navigate()}
                className="approveButton"
                style={{
    borderRadius: '10%',
    backgroundColor : '#1fd655',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
                       }}
>
  Approve
</button>

              </td>
              <td>
              <button
  onClick={() => deleteCoupon(coupon._id)}
  className="deleteButton"
  style={{
    borderRadius: '10%',
    backgroundColor: '#ff2c2c',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
  }}
>
  Decline
</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="searchBar">
  <button
    onClick={generatePdf}
    style={{
      backgroundColor: '#4e4e4c',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
      outline: 'none',
    }}
  >
    Generate PDF
  </button>
</div>

    </div>
  );
};

export default Coupon;
