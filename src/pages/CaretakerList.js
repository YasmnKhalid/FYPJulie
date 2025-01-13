import React, { useState, useEffect } from 'react';
import { getCaretakers } from '../services/firestoreService';
import CustomNavbar from '../components/Navbar';
import { CSVLink } from 'react-csv'; // Import CSV export component
import '../style/ListStyle.css';

const CaretakerList = () => {
  const [caretakers, setCaretakers] = useState([]);
  const [exportData, setExportData] = useState([]); // State for export data
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const caretakersData = await getCaretakers();
      setCaretakers(caretakersData);

      // Prepare data for CSV export
      const csvData = caretakersData.map((caretaker) => ({
        Name: caretaker.name,
        Email: caretaker.email,
        Phone: caretaker.phone,
        Address: caretaker.address,
        Role: caretaker.role,
        'Care Recipient ID': caretaker.careRecipientId,
      }));

      setExportData(csvData);
    };

    fetchData();
  }, []);

  const filteredCaretakers = caretakers.filter((caretaker) => {
    const matchesSearch =
      (caretaker.name && caretaker.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (caretaker.email && caretaker.email.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="page-container">
      <CustomNavbar />

      <h1>Caretaker List</h1>

      {/* Export CSV Button */}
      <div className="export-container">
        <CSVLink
          data={exportData}
          filename="caretaker_report.csv"
          className="btn btn-primary mb-3"
        >
          Export as CSV
        </CSVLink>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search by Name or Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Caretaker List Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Role</th>
              <th>Care Recipient ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredCaretakers.map((caretaker) => (
              <tr key={caretaker.id}>
                <td>{caretaker.name}</td>
                <td>{caretaker.email}</td>
                <td>{caretaker.phone}</td>
                <td>{caretaker.address}</td>
                <td>{caretaker.role}</td>
                <td>{caretaker.careRecipientId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CaretakerList;
