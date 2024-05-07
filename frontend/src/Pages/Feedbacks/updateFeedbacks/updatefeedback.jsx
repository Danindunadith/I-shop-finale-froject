import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

const UpdateFeedback = () => {
  const { id } = useParams();
  const initialFeedback = {
    fdate: "",
    fname: "",
    frating: "",
    ffeedback: "",
  };

  const [feedback, setFeedback] = useState(initialFeedback);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        await axios.get("http://localhost:3500/api/v1/feedback/fgetOne/" + id);
        setFeedback(response.data);
        console.log("test");
      } catch (error) {
        console.error(error);
      }
      fetchdata();
    };
  }, []);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const url = "http://localhost:3500/api/v1/feedback/fupdate/" + id;

    try {
      // Send POST request with feedback data as payload
      const response = await axios.put(url, feedback);
      console.log(url);
      // Log response data
      console.log(response.data);

      // Handle success response
      if (response.status === 200) {
        // Display success pop-up using SweetAlert2
        Swal.fire({
          position: "center",
          icon: "success",
          title: "feedback report added successfully!",
          showConfirmButton: false,
          timer: 2500,
        });

        // Optionally navigate to another page
        navigate(" ");
      }
    } catch (error) {
      // Handle error response
      console.error("Error adding feedback report:", error);

      // Provide user feedback in case of error
      Swal.fire({
        icon: "error",
        title: "Failed to add feedback report",
        text: error.response
          ? error.response.data.error
          : "Unknown error occurred",
      });
    }
  };

  return (
    <div className="addOrder">
      <Link to="/">Back</Link>
      <h3>Update feedback Report</h3>
      <form className="addOrderForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fdate">Upload Date</label>
          <input
            value={feedback.fdate}
            type="date"
            onChange={inputHandler}
            id="fdate"
            name="fdate"
            autoComplete="off"
            placeholder="Upload Date"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="fname">For</label>
          <input
            value={feedback.fname}
            type="text"
            onChange={inputHandler}
            id="fname"
            name="fname"
            autoComplete="off"
            placeholder="for"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="rating">Rating</label>
          <div id="frating">
            <input
              value={feedback.frating}
              type="radio"
              onChange={inputHandler}
              id="star5"
              name="frating"
            />
            <label htmlFor="star5" title="5 stars">
              5
            </label>

            <input
              type="radio"
              onChange={inputHandler}
              id="star4"
              name="frating"
              value="4"
            />
            <label htmlFor="star4" title="4 stars">
              4
            </label>

            <input
              type="radio"
              onChange={inputHandler}
              id="star3"
              name="frating"
              value="3"
            />
            <label htmlFor="star3" title="3 stars">
              3
            </label>

            <input
              type="radio"
              onChange={inputHandler}
              id="star2"
              name="frating"
              value="2"
            />
            <label htmlFor="star2" title="2 stars">
              2
            </label>

            <input
              type="radio"
              onChange={inputHandler}
              id="star1"
              name="frating"
              value="1"
            />
            <label htmlFor="star1" title="1 star">
              1
            </label>
          </div>
        </div>

        <div className="inputGroup">
          <label htmlFor="ffeedback">Given Feedback</label>
          <input
            value={feedback.ffeedback}
            type="text"
            onChange={inputHandler}
            id="ffeedback"
            name="ffeedback"
            autoComplete="off"
            placeholder="give"
          />
        </div>

        <div className="inputGroup">
          <button type="submit">Update Feedback</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateFeedback;
