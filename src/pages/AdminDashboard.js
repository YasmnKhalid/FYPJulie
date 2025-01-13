import React from 'react';
import CustomNavbar from '../components/Navbar';
import '../style/AdminDashboard.css';

function AdminDashboard() {
  return (
    <div>
      <CustomNavbar />
      <div className="container mt-4">
        <h2>Welcome, Admin!</h2>
        <p>
          {new Date().toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          })}
        </p>

        {/* Key Metrics */}
        <div className="row my-4">
          <div className="col-md-3">
            <div className="card key-metrics-card">
              <div className="card-body">
                <h5 className="card-title">Total Caretakers</h5>
                <p className="card-text metric-value">50</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card key-metrics-card">
              <div className="card-body">
                <h5 className="card-title">Total Care Recipients</h5>
                <p className="card-text metric-value">120</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card key-metrics-card">
              <div className="card-body">
                <h5 className="card-title">Completed Routines</h5>
                <p className="card-text metric-value">230</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card key-metrics-card">
              <div className="card-body">
                <h5 className="card-title">Pending Tasks</h5>
                <p className="card-text metric-value">15</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mt-4">
          <h4>Recent Activities</h4>
          <ul className="list-group">
            <li className="list-group-item">
              New caretaker application from Alice Johnson.
            </li>
            <li className="list-group-item">
              Service request #REQ1234 has been approved.
            </li>
            <li className="list-group-item">John Doe completed medication routine.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
