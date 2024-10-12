import React from 'react';

const CompanyReports = ({ companies }) => {
  return (
    <div>
      <h2>Company Reports</h2>
      {companies.map((company, index) => (
        <div key={index}>
          <h3>{company.name}</h3>
          <pre>{JSON.stringify(company, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
};

export default CompanyReports;