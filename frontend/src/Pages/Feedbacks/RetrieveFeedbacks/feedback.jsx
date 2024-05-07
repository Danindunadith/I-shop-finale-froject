import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import jsPDF from "jspdf";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3500/api/v1/feedback/fgetAll");
        setFeedbacks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const deleteFeedback = async (feedbackId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.post("http://localhost:3500/api/v1/feedback/fdelete", { id: feedbackId });
        setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback._id !== feedbackId));
        await Swal.fire('Deleted!', 'The feedback has been deleted.', 'success');
      } catch (error) {
        console.error(error);
        await Swal.fire('Error!', 'An error occurred while deleting the feedback.', 'error');
      }
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Feedback List", 10, 10);
    const tableColumn = ["Feedback ID", "User's Name", "About", "Rating", "Feedback"];
    const tableRows = feedbacks.map((feedback, index) => [
      index + 1,
      feedback.fdate,
      feedback.fname,
      feedback.frating,
      feedback.ffeedback
    ]);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows
    });
    doc.save("feedback_list.pdf");
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredFeedbacks = feedbacks.filter(feedback =>
    feedback.fdate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feedback.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feedback.ffeedback.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    


    <div className="OrderTable">
      
      <h3>Feedbacks From Users</h3>
      
     




      <button onClick={generatePDF} className="reportButton">Generate PDF</button>
      <input
        type="text"
        className="searchInput"
        value={searchQuery}
        onChange={handleSearchInputChange}
        placeholder="Search..."
      />
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>Feedback_Id</th>
            <th>User's Name</th>
            <th>About</th>
            <th>Rating</th>
            <th>Feedback</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeedbacks.map((feedback, index) => (
            <tr key={feedback._id}>
              <td>{index + 1}</td>
              <td>{feedback.fdate}</td>
              <td>{feedback.fname}</td>
              <td>{feedback.frating}</td>
              <td>{feedback.ffeedback}</td>
              <td>
                <button
                  className="btn btn-danger ms-3"
                  onClick={() => updateFeedback(feedback._id)}
                >
                  Update
                </button>
                <br />
              </td>
              <td className="actionButtons">
                <button onClick={() => deleteFeedback(feedback._id)}>
                  <i className="fa fa-trash">Delete</i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );
};

export default FeedbackList;
