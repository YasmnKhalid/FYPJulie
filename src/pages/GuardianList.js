import React, { useState, useEffect } from 'react';
import { getGuardians, getCareRecipientById } from '../services/firestoreService';
import CustomNavbar from '../components/Navbar';
import { CSVLink } from 'react-csv'; // Import CSV export component
import '../style/ListStyle.css';

const GuardianList = () => {
  const [guardians, setGuardians] = useState([]);
  const [exportData, setExportData] = useState([]); // State for export data
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDependentStatus, setFilterDependentStatus] = useState('');
  const [filterServiceStatus, setFilterServiceStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const guardiansData = await getGuardians();

      // Enrich guardians data with care recipient information
      const enrichedData = await Promise.all(
        guardiansData.map(async (guardian) => {
          if (guardian.careRecipientId) {
            const careRecipient = await getCareRecipientById(guardian.careRecipientId);
            return {
              ...guardian,
              dependentName: careRecipient?.name || 'Unknown',
              dependentStatus: careRecipient?.status || 'Unknown',
            };
          }
          return guardian;
        })
      );

      setGuardians(enrichedData);

      // Prepare data for CSV export
      const csvData = enrichedData.map((guardian) => ({
        'Guardian ID': guardian.id,
        'Guardian Name': guardian.name,
        'Dependent Name': guardian.dependentName,
        'Dependent Status': guardian.dependentStatus,
        'Caretaker Service Status': guardian.caretakerServiceStatus || 'Unknown',
      }));

      setExportData(csvData);
    };

    fetchData();
  }, []);

  const filteredGuardians = guardians.filter((guardian) => {
    const matchesSearch =
      (guardian.id && guardian.id.includes(searchTerm)) ||
      (guardian.name && guardian.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDependentStatus = filterDependentStatus
      ? guardian.dependentStatus === filterDependentStatus
      : true;

    const matchesServiceStatus = filterServiceStatus
      ? guardian.caretakerServiceStatus === filterServiceStatus
      : true;

    return matchesSearch && matchesDependentStatus && matchesServiceStatus;
  });

  return (
    <div className="page-container">
      {/* Pass Export CSV Handler to Navbar */}
      <CustomNavbar />

      <h1>Guardian List</h1>

      {/* Export CSV Button */}
      <div className="export-container">
        <CSVLink
          data={exportData}
          filename="guardian_report.csv"
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
          value={filterDependentStatus}
          onChange={(e) => setFilterDependentStatus(e.target.value)}
        >
          <option value="">All Dependent Status</option>
          <option value="Alive">Alive</option>
          <option value="Deceased">Deceased</option>
        </select>

        <select
          className="filter-select"
          value={filterServiceStatus}
          onChange={(e) => setFilterServiceStatus(e.target.value)}
        >
          <option value="">All Service Status</option>
          <option value="Active">Active</option>
          <option value="Terminated">Terminated</option>
        </select>
      </div>

      {/* Guardian List Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Guardian ID</th>
              <th>Guardian Name</th>
              <th>Dependent Name</th>
              <th>Dependent Status</th>
              <th>Caretaker Service Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredGuardians.map((guardian) => (
              <tr key={guardian.id}>
                <td>{guardian.id}</td>
                <td>{guardian.name}</td>
                <td>{guardian.dependentName}</td>
                <td>{guardian.dependentStatus}</td>
                <td>{guardian.caretakerServiceStatus || 'Unknown'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuardianList;
