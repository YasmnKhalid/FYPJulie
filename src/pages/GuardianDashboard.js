import Guardiansidebar from '../components/GuardianSidebar';
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

import "../style/GuardianDashboard.css";

// Register components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);

const GuardianDashboard = () => {
  const [guardian, setGuardian] = useState(null);
  const [careRecipients, setCareRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  // Dummy data for graphs
  const heartRateData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Heart Rate (BPM)",
        data: [72, 75, 73, 74, 78, 76, 79],
        borderColor: "rgba(255, 99, 132, 0.8)",
        backgroundColor: "rgba(255, 99, 132, 0.4)",
      },
    ],
  };

  const bloodPressureData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Blood Pressure (mmHg)",
        data: [120, 122, 118, 121, 123, 119, 124],
        borderColor: "rgba(54, 162, 235, 0.8)",
        backgroundColor: "rgba(54, 162, 235, 0.4)",
      },
    ],
  };

  const glucoseLevelData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Glucose Level (mg/dL)",
        data: [95, 100, 110, 105, 98, 92, 97],
        borderColor: "rgba(75, 192, 192, 0.8)",
        backgroundColor: "rgba(75, 192, 192, 0.4)",
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <Guardiansidebar />
      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Welcome, {guardian?.name}!</h2>
          <p>{new Date().toLocaleDateString()}</p>
        </div>
        <div className="care-recipients">
          <h3>Your Care Recipients</h3>
          <div className="recipient-list">
            {careRecipients.map((recipient, index) => (
              <div
                key={index}
                className={`recipient-card ${selectedRecipient === recipient ? "selected" : ""
                  }`}
                onClick={() => setSelectedRecipient(recipient)}
              >
                <h4>Dependent Name: {recipient.name}</h4>
                <p>Age: {recipient.age}</p>
                <p>Disease: {recipient.disease}</p>
                <p>Allergic to: {recipient.allergic}</p>
              </div>
            ))}
          </div>
        </div>
        {selectedRecipient && (
          <div className="health-metrics">
            <h3>Health Metrics for {selectedRecipient.name}</h3>
            <div className="chart-grid">
              <div className="chart">
                <h4>Heart Rate</h4>
                <Line data={heartRateData} options={{ maintainAspectRatio: false }} />
              </div>
              <div className="chart">
                <h4>Blood Pressure</h4>
                <Line data={bloodPressureData} options={{ maintainAspectRatio: false }} />
              </div>
              <div className="chart">
                <h4>Glucose Level</h4>
                <Line data={glucoseLevelData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default GuardianDashboard;
