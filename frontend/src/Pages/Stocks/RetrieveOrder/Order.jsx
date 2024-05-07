import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import "./order.css";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3500/api/v1/stock/getall");
        setOrders(response.data);
        setFilteredOrders(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const deleteOrder = async (orderId) => {
    const url = "http://localhost:3500/api/v1/stock/delete";
    const config = {
      headers: {
        "x-apikey": "API_KEY",
      },
    };

    try {
      await axios.post(url, { id: orderId }, config);
      setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Stock item deleted successfully',
      });
    } catch (error) {
      console.error("Error deleting order:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete stock item',
      });
    }
  };

  const generateReport = () => {
    const doc = new jsPDF();
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
  
    // Calculate total quantity
    const totalQuantity = orders.reduce((total, order) => total + parseInt(order.quantity), 0);

    const categoryQuantities = {};
  
    orders.forEach(order => {
      if (!categoryQuantities[order.category]) {
        categoryQuantities[order.category] = 0;
      }
      categoryQuantities[order.category] += parseInt(order.quantity);
   });

    // Add title and total quantity to the PDF
    doc.text(`Order Report - ${formattedDate}`, 10, 10);
    doc.text(`Total Quantity of Orders: ${totalQuantity}`, 10, 20);

    const tableColumn = ["Order ID", "Supplier's Name", "Category", "Brand", "Model", "Quantity"];
    const tableRows = orders.map(order => [order._id, order.name, order.category, order.brand, order.model, order.quantity]);
    
    // Draw table below the title and total quantity
    doc.autoTable({
      startY: 30, // Start the table below the title and total quantity
      head: [tableColumn],
      body: tableRows
    });

    let startYPosition = (orders.length * 10) + 50; // Start after the table
    Object.keys(categoryQuantities).forEach((category, index) => {
    const yPos = startYPosition + (index * 10);
    doc.text(`Total Quantity for ${category}: ${categoryQuantities[category]}`, 10, yPos);
  });

    doc.save('order_report.pdf');
  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = orders.filter(order =>
      order.name.toLowerCase().includes(query) ||
      order.category.toLowerCase().includes(query) ||
      order.brand.toLowerCase().includes(query) ||
      order.model.toLowerCase().includes(query)
    );
    setFilteredOrders(filtered);
  };

  return (
    <div className="OrderTable">

       <Link to={"/main/admin/delivery"}>
        <div className="backBtn">
          <button type="submit">Home</button>
        </div>
      </Link>





      <Link to={"/add"} className="addButton">
        Place Orders
      </Link>
      <button onClick={generateReport} className='reportButton'>Generate a Report</button>
      <input
        type="text"
        className="searchInput"
        value={searchQuery}
        onChange={handleSearchInputChange}
        placeholder="Search by any.."
      />
      



      <h3>Order List</h3>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Supplier's Name</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Quantity</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr key={order._id} className="text-black font-bold">
              <td>{order._id}</td>
              <td>{order.name}</td>
              <td>{order.category}</td>
              <td>{order.brand}</td>
              <td>{order.model}</td>
              <td>{order.quantity}</td>
              <td className="actionButtons">
                <Link to={`/edit/${order._id}`}>
                  Update
                </Link>
              </td>
              <td className="actionButtons">
                <button onClick={() => deleteOrder(order._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Link to={"/coupons"} className="addButton">
        Apply Leave
      </Link>
      <Link to={"/payments"} className="addButton">
        Pay For Stocks
      </Link>

      



    </div>
  );
};

export default Order;
