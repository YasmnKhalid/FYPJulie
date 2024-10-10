// src/pages/AdminDashboard.js
import React from 'react';
import CustomNavbar from '../components/Navbar';
import '../style/Button.css';

function AdminDashboard() {
  return (
    <div>
      <CustomNavbar />
      <div className="container mt-4">
        <h2>Welcome, Admin!</h2>
        <p> {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' })}.</p>



        {/* Key Metrics */}
        <div className="row my-4">
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Caretakers</h5>
                <p className="card-text">50</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Care Recipients</h5>
                <p className="card-text">120</p>
              </div>
            </div>
          </div>
          {/* Add more cards as needed */}
        </div>

        {/* Service Requests Table */}
        <h4>Service Requests</h4>
        <table className="table mt-2">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Care Recipient</th>
              <th>Guardian</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>REQ1234</td>
              <td>John Doe</td>
              <td>Jane Doe</td>
              <td>Pending</td>
              <td>
                <button className="btn btn-success btn-sm">Approve</button>
                <button className="btn btn-custom btn-sm ms-2">View</button>
                <button className="btn btn-danger btn-sm ms-2">Reject</button>

              </td>
            </tr>
            {/* More rows can be added dynamically */}
          </tbody>
        </table>



        {/* Quick Actions 
          <div className="d-flex mt-4">
         <button className="btn btn-primary me-3">Add New Caretaker</button>
          <button className="btn btn-secondary me-3">Generate Report</button>
         <button className="btn btn-info">View Logs</button>
        </div>  */}



        {/* Recent Activities */}
        <div className="mt-4">
          <h4>Recent Activities</h4>
          <ul className="list-group">
            <li className="list-group-item">New caretaker application from Alice Johnson.</li>
            <li className="list-group-item">Service request #REQ1234 has been approved.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
