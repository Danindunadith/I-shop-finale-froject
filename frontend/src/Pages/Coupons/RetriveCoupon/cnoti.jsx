import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./coupon.css";
import Swal from "sweetalert2"; // Import SweetAlert2

function cnoti() {
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
      body: filteredCoupons.map((coupon) => [
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
        text: "You will not be able to recover this coupon!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
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

  const filteredCoupons = coupons.filter(
    (coupon) => coupon.name.includes("a") || coupon.name.includes("b")
  );

  return (
    <div className="OrderTable">
      <Link to={"/main/admin/delivery"}>
        <div className="backBtn">
          <button type="submit">Home</button>
        </div>
      </Link>
      
      <h3>Notification</h3>
      

      

      <table ref={tableRef} border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>Coupon_ID</th>
            <th>Coupon Code</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Email</th>
            <th>Status</th>
            
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
              <span className="approvedText">Approved</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default cnoti;
