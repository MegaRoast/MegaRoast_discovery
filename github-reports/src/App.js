import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CompaniesReport from './components/CompaniesReport';
import CompanyReports from './components/CompanyReports';
import MainReport from './components/MainReport';

const App = () => {
  const [inputs, setInputs] = useState({
    companies: [],
    interactions: [],
    branches: [],
    workflows: []
  });

  useEffect(() => {
    const fetchData = async () => {
      const companies = await readObjects('/Companies/Companies.json');
      const interactions = await readObjects('/Interactions/Interactions.json');
      const branches = await readBranches();
      const workflows = await readWorkflows();

      setInputs({ companies, interactions, branches, workflows });
    };

    fetchData();
  }, []);

  if (inputs.companies.length === 0) {
    return <div>No companies found</div>;
  }

  return (
    <div>
      <CompaniesReport companies={inputs.companies} />
      <CompanyReports companies={inputs.companies} />
      <MainReport />
    </div>
  );
};

const readObjects = async (path) => {
  const response = await axios.get(path);
  return response.data;
};

const readBranches = async () => {
  const response = await axios.get('/api/branches');
  return response.data;
};

const readWorkflows = async () => {
  const response = await axios.get('/api/workflows');
  return response.data;
};

export default App;