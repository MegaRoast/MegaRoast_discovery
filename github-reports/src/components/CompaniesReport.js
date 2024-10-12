import React from 'react';

const CompaniesReport = ({ companies }) => {
  return (
    <div>
      <h2>Companies Report</h2>
      <pre>{JSON.stringify(companies, null, 2)}</pre>
    </div>
  );
};

export default CompaniesReport;