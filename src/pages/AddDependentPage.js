import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaArrowLeft } from "react-icons/fa"; // Import an arrow icon
import CareRecipientForm from "../components/CareRecipientForm"; // Import the form component
import "../style/AddDependentPage.css"; // Import the updated CSS

const AddDependentPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleFormSubmit = (data) => {
    console.log("Form submitted:", data);
    // Save data to Firestore or handle it here
  };

  return (
    <div className="page-container">
      <button className="back-button" onClick={() => navigate("/guardian-dashboard")}>
        <FaArrowLeft className="back-icon" /> 
      </button>
      <h2>Add Care Recipient</h2>
      <CareRecipientForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default AddDependentPage;
