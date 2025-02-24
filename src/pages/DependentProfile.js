import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import "../style/DependentProfile.css";

const DependentProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const recipient = location.state?.recipient; // Get recipient details from state

  const [guardian, setGuardian] = useState(null);
  const [careRecipients, setCareRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(recipient);
  const [loading, setLoading] = useState(true);

  // Editable fields with initial values
  const [allergic, setAllergic] = useState(recipient?.allergic || "");
  const [disease, setDisease] = useState(recipient?.disease || "");
  const [mortalityStatus, setMortalityStatus] = useState(
    recipient?.mortalityStatus || "alive"
  );

  useEffect(() => {
    const fetchGuardianData = async (uid) => {
      const db = getFirestore();
      const guardianRef = doc(db, "users", uid);
      const guardianSnap = await getDoc(guardianRef);

      if (guardianSnap.exists()) {
        const guardianData = guardianSnap.data();
        setGuardian(guardianData);

        const careRecipientId = guardianData.careRecipientId || [];
        const careRecipientPromises = careRecipientId.map((id) =>
          getDoc(doc(db, "care_recipients", id))
        );
        const careRecipientSnapshots = await Promise.all(careRecipientPromises);

        const recipients = careRecipientSnapshots
          .filter((snap) => snap.exists())
          .map((snap) => snap.data());

        setCareRecipients(recipients);
      }
      setLoading(false);
    };

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchGuardianData(user.uid);
      } else {
        window.location.href = "/login";
      }
    });
  }, []);

  const handleSave = () => {
    // Save the updated details (implement Firestore update here if needed)
    console.log("Updated Details:", { allergic, disease, mortalityStatus });
    alert("Details updated successfully!");
    // Navigate back to the dashboard
    navigate("/guardian-dashboard");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-container">
      <button className="back-button" onClick={() => navigate("/guardian-dashboard")}>
        <FaArrowLeft className="back-icon" /> Back to Dashboard
      </button>
      <h2>Dependent Profile</h2>

      {/* Care Recipients List */}
      <div className="care-recipients">
        <h3>Your Care Recipients</h3>
        <div className="recipient-list">
          {careRecipients.map((recipient, index) => (
            <div
              key={index}
              className={`recipient-card ${
                selectedRecipient?.name === recipient.name ? "selected" : ""
              }`}
              onClick={() => {
                setSelectedRecipient(recipient);
                setAllergic(recipient.allergic || "");
                setDisease(recipient.disease || "");
                setMortalityStatus(recipient.mortalityStatus || "alive");
              }}
            >
              <h4>Dependent Name: {recipient.name}</h4>
              <p>Age: {recipient.age}</p>
              <p>Disease: {recipient.disease}</p>
              <p>Allergic to: {recipient.allergic}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Card at the Top */}
      {selectedRecipient && (
        <div className="recipient-card">
          <h3>{selectedRecipient.name}</h3>
          <p>
            <strong>Age:</strong> {selectedRecipient.age}
          </p>
          <p>
            <strong>Gender:</strong> {selectedRecipient.gender}
          </p>
          <p>
            <strong>Mortality Status:</strong> {mortalityStatus}
          </p>
        </div>
      )}

      {/* Editable Form */}
      <div className="profile-container">
        <h3>Edit Details</h3>
        <div className="editable-field">
          <label>Allergic:</label>
          <input
            type="text"
            value={allergic}
            onChange={(e) => setAllergic(e.target.value)}
            placeholder="Enter allergic details"
          />
        </div>
        <div className="editable-field">
          <label>Disease:</label>
          <input
            type="text"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            placeholder="Enter disease details"
          />
        </div>
        <div className="editable-field">
          <label>Mortality Status:</label>
          <select
            value={mortalityStatus}
            onChange={(e) => setMortalityStatus(e.target.value)}
          >
            <option value="alive">Alive</option>
            <option value="deceased">Deceased</option>
          </select>
        </div>
        <button className="save-button" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default DependentProfilePage;
