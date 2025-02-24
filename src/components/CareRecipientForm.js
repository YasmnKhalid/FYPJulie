import React, { useState } from "react";
import "../style/CareRecipientForm.css"; // Custom CSS for purple theme

const CareRecipientForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    disease: "",
    allergic: "",
    caretakerId: "",
    guardianId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add Care Recipient</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter age"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="disease">Disease</label>
          <input
            type="text"
            id="disease"
            name="disease"
            value={formData.disease}
            onChange={handleChange}
            placeholder="Enter disease"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="allergic">Allergic</label>
          <input
            type="text"
            id="allergic"
            name="allergic"
            value={formData.allergic}
            onChange={handleChange}
            placeholder="Enter allergic information"
          />
        </div>
        <div className="form-group">
          <label htmlFor="caretakerId">Caretaker ID</label>
          <input
            type="text"
            id="caretakerId"
            name="caretakerId"
            value={formData.caretakerId}
            onChange={handleChange}
            placeholder="Enter caretaker ID"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="guardianId">Guardian ID</label>
          <input
            type="text"
            id="guardianId"
            name="guardianId"
            value={formData.guardianId}
            onChange={handleChange}
            placeholder="Enter guardian ID"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Add Care Recipient
        </button>
      </form>
    </div>
  );
};

export default CareRecipientForm;
