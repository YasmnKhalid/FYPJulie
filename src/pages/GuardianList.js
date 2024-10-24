import React, { useState, useEffect } from 'react';
import { getGuardians } from '../services/firestoreService';
import CustomNavbar from '../components/Navbar';
import '../style/ListStyle.css'; 

const GuardianList = () => {
  const [guardians, setGuardians] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('');
  const [filterDependentStatus, setFilterDependentStatus] = useState('');
  const [filterServiceStatus, setFilterServiceStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const guardiansData = await getGuardians();
      setGuardians(guardiansData);
    };

    fetchData();
  }, []);

  // const filteredGuardians = guardians.filter((guardian) => {
  //   const matchesSearch = guardian.id.includes(searchTerm) || guardian.name.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesState = filterState ? guardian.state === filterState : true;
  //   const matchesDependentStatus = filterDependentStatus ? guardian.dependentStatus === filterDependentStatus : true;
  //   const matchesServiceStatus = filterServiceStatus ? guardian.caretakerServiceStatus === filterServiceStatus : true;

  //   return matchesSearch && matchesState && matchesDependentStatus && matchesServiceStatus;
  // });

  // const filteredGuardians = guardians.filter((guardian) => {
  //   const matchesSearch = (guardian.id && guardian.id.includes(searchTerm)) ||
  //                         (guardian.name && guardian.name.toLowerCase().includes(searchTerm.toLowerCase()));
  //   const matchesState = filterState ? guardian.state === filterState : true;
  //   const matchesDependentStatus = filterDependentStatus ? guardian.dependentStatus === filterDependentStatus : true;
  //   const matchesServiceStatus = filterServiceStatus ? guardian.caretakerServiceStatus === filterServiceStatus : true;
  
  //   return matchesSearch && matchesState && matchesDependentStatus && matchesServiceStatus;
  // });


const filteredGuardians = guardians.filter((guardian) => {
  const matchesSearch = (guardian.id && guardian.id.includes(searchTerm)) ||
                        (guardian.name && guardian.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
  // Convert both state and filterState to lowercase for case-insensitive comparison
  const matchesState = filterState ? guardian.state && guardian.state.toLowerCase() === filterState.toLowerCase() : true;

  const matchesDependentStatus = filterDependentStatus ? guardian.dependentStatus === filterDependentStatus : true;
  const matchesServiceStatus = filterServiceStatus ? guardian.caretakerServiceStatus === filterServiceStatus : true;

  return matchesSearch && matchesState && matchesDependentStatus && matchesServiceStatus;
});

useEffect(() => {
  console.log(guardians); // Log guardians to check if data has 'state' field populated
  console.log(filterState); // Log filterState to check the selected state
}, [guardians, filterState]);

  

  return (
    <div className="page-container">
      <CustomNavbar />
      <h1>Guardian List</h1>
  
      {/* Search Bar and Filters */}
      <div className="search-filter-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search by ID or Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
  
        <select className="filter-select" value={filterState} onChange={(e) => setFilterState(e.target.value)}>
          <option value="">All States</option>
          <option value="Selangor">Selangor</option>
          <option value="State2">State2</option>
        </select>
  
        <select className="filter-select" value={filterDependentStatus} onChange={(e) => setFilterDependentStatus(e.target.value)}>
          <option value="">All Dependent Status</option>
          <option value="Alive">Alive</option>
          <option value="Deceased">Deceased</option>
        </select>
  
        <select className="filter-select" value={filterServiceStatus} onChange={(e) => setFilterServiceStatus(e.target.value)}>
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
                <td>{guardian.caretakerServiceStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuardianList;
