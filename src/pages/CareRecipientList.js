import React, { useState, useEffect } from 'react';
import { getCareRecipients, getGuardianById } from '../services/firestoreService'; // Import the new service function
import CustomNavbar from '../components/Navbar';
import { CSVLink } from 'react-csv'; // Import CSV export component
import '../style/ListStyle.css';

const CareRecipientList = () => {
  const [careRecipients, setCareRecipients] = useState([]);
  const [exportData, setExportData] = useState([]); // State for export data
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const careRecipientsData = await getCareRecipients();

      // Fetch guardian names for each care recipient
      const enrichedData = await Promise.all(
        careRecipientsData.map(async (recipient) => {
          if (recipient.guardianId) {
            const guardian = await getGuardianById(recipient.guardianId);
            return {
              ...recipient,
              guardianName: guardian?.name || 'Unknown', // Add guardian name to recipient data
            };
          }
          return recipient;
        })
      );

      setCareRecipients(enrichedData);

      // Prepare data for CSV export
      const csvData = enrichedData.map((recipient) => ({
        'Patient ID': recipient.id,
        'Guardian Name': recipient.guardianName,
        Name: recipient.name,
        Age: recipient.age,
        Gender: recipient.gender,
        Allergic: recipient.allergic,
        Disease: recipient.disease,
      }));

      setExportData(csvData);
    };

    fetchData();
  }, []);

  const filteredCareRecipients = careRecipients.filter((recipient) => {
    const matchesSearch =
      (recipient.id && recipient.id.includes(searchTerm)) ||
      (recipient.name && recipient.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = filterStatus ? recipient.status === filterStatus : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="page-container">
      <CustomNavbar />

      <h1>Care Recipient List</h1>

      {/* Export CSV Button */}
      <div className="export-container">
        <CSVLink
          data={exportData}
          filename="care_recipient_report.csv"
          className="btn btn-primary mb-3"
        >
          Export as CSV
        </CSVLink>
      </div>

      {/* Search Bar and Filters */}
      <div className="search-filter-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search by ID or Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Alive">Alive</option>
          <option value="Deceased">Deceased</option>
        </select>
      </div>

      {/* Care Recipient List Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Guardian Name</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Allergic</th>
              <th>Disease</th>
            </tr>
          </thead>
          <tbody>
            {filteredCareRecipients.map((recipient) => (
              <tr key={recipient.id}>
                <td>{recipient.id}</td>
                <td>{recipient.guardianName}</td>
                <td>{recipient.name}</td>
                <td>{recipient.age}</td>
                <td>{recipient.gender}</td>
                <td>{recipient.allergic}</td>
                <td>{recipient.disease}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CareRecipientList;
