import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CompaniesReport from './components/CompaniesReport';
import CompanyReports from './components/CompanyReports';
import MainReport from './components/MainReport';
import GitHubAuth from './components/Authorization'; // Import the GitHubAuth component

const App = () => {
  const [inputs, setInputs] = useState({
    companies: [],
    interactions: [],
    branches: [],
    workflows: []
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      const fetchData = async () => {
        const companies = await readObjects('/Companies/Companies.json', accessToken);
        const interactions = await readObjects('/Interactions/Interactions.json', accessToken);
        const branches = await readBranches(accessToken);
        const workflows = await readWorkflows(accessToken);

        setInputs({
          companies,
          interactions,
          branches,
          workflows
        });
      };

      fetchData();
    }
  }, [isAuthenticated, accessToken]);

  const readObjects = async (url, token) => {
    const response = await axios.get(url, {
      headers: {
        Authorization: `token ${token}`
      }
    });
    return response.data;
  };

  const readBranches = async (token) => {
    // Implement the function to read branches using the token
  };

  const readWorkflows = async (token) => {
    // Implement the function to read workflows using the token
  };

  return (
    <div>
      {!isAuthenticated ? (
        <GitHubAuth
          onAuthSuccess={(token) => {
            setAccessToken(token);
            setIsAuthenticated(true);
          }}
        />
      ) : (
        <>
          <CompaniesReport data={inputs.companies} />
          <CompanyReports data={inputs.interactions} />
          <MainReport data={inputs.branches} workflows={inputs.workflows} />
        </>
      )}
    </div>
  );
};

export default App;