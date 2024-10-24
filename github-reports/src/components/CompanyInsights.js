import React from 'react';
import { FileIcon, CheckCircleFillIcon, XCircleFillIcon, AlertFillIcon } from '@primer/octicons-react';
import { PiBuilding } from 'react-icons/pi';
import Box from '@mui/material/Box';
import BarChart from './charts/bar'; // Import the BarChart component
import PieChart from './charts/pie'; // Import the PieChart component
import StatBox from './charts/statBox'; // Import the StatBox component
import styles from './Insights.module.css'; // Import the CSS module
import InsightsMap from './charts/map';

const mutateData = (data) => {
  return data.map((item) => {
    const totalInteractions = item.linked_interactions
      ? Object.keys(item.linked_interactions).length
      : 0;

    return {
      ...item,
      total_interactions: totalInteractions
    };
  });
};

// Compute the variance of the number of interactions per company
// and return the results
const computeVariance = (companies) => {
  const totalCompanies = companies.length;
  const totalInteractions = companies.reduce(
    (acc, company) => acc + (company.linked_interactions ? Object.keys(company.linked_interactions).length : 0),
    0
  );
  const avgInteractionsPerCompany = totalInteractions / totalCompanies;

  // Compute variance
  const variance = companies.reduce((acc, company) => {
    const interactions = company.linked_interactions ? Object.keys(company.linked_interactions).length : 0;
    return acc + Math.pow(interactions - avgInteractionsPerCompany, 2);
  }, 0) / totalCompanies;

  // Compute standard deviation (sqrt of variance)
  const standardDeviation = Math.sqrt(variance);

  // Categorize based on standard deviation
  const categories = companies.map((company) => {
    const interactions = company.linked_interactions ? Object.keys(company.linked_interactions).length : 0;
    if (interactions > avgInteractionsPerCompany + standardDeviation) {
      return 1; // High
    } else if (interactions < avgInteractionsPerCompany - standardDeviation) {
      return -1; // Low
    } else {
      return 0; // Medium
    }
  });

  return { variance, standardDeviation, categories };
};

const CompanyInsights = ({ companies, theme, interactions }) => {
  const totalCompanies = companies.length;
  const totalInteractions = companies.reduce((acc, company) => acc + (company.linked_interactions ? Object.keys(company.linked_interactions).length : 0), 0);
  const avgInteractionsPerCompany = Math.ceil(totalInteractions / totalCompanies);
  const avgIcon = avgInteractionsPerCompany >= 10 ? CheckCircleFillIcon : XCircleFillIcon;
  const avgTooltipText = avgInteractionsPerCompany >= 10 ? `The average number of interactions per company. The recommended minimum is 10, and the present value is ${avgInteractionsPerCompany}.` : `The average number of interactions per company is below the recommended minimum of 10. Please consider adding about ${10 - avgInteractionsPerCompany} interactions to each company to improve analysis.`;

  // Mutate the data to include the total number of interactions
  const newCompanies = mutateData(companies);

  // Compute the variance of the number of interactions per company
  // eslint-disable-next-line
  const { variance, standardDeviation, categories } = computeVariance(newCompanies);
  let consistencyIcon = CheckCircleFillIcon;
  let consistencyValue = 'Consistent';
  let consistencyColor = 'black';
  let consistencyTooltip = 'The interactions are consistent across companies.';
  const consistencyTitle = 'Consistency, Interactions/Company';

  // If the variance is greater than 0, the data is inconsistent, but if it is 0 then it is moderately consistent
  if (variance > 0) {
    consistencyIcon = XCircleFillIcon;
    consistencyValue = 'Inconsistent';
    consistencyColor = 'red';
    consistencyTooltip = `The interactions are inconsistent across companies. Please add more interactions to each company to improve consistency.`;
  } else if (variance > 0 && variance < 1) {
    consistencyIcon = AlertFillIcon;
    consistencyValue = 'Mostly Consistent';
    consistencyColor = 'orange';
    consistencyTooltip = `The interactions are moderately consistent across companies. Please add more interactions to each company to improve consistency.`;
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.statsContainer}>
        <StatBox
          icon={PiBuilding}
          statistic={totalCompanies}
          title="Total Companies"
          tooltipText="The total number of companies."
        />
        <StatBox
          icon={FileIcon}
          statistic={totalInteractions}
          title="Total Interactions"
          tooltipText="The total number of interactions."
        />
        <StatBox
          icon={avgIcon}
          statistic={avgInteractionsPerCompany}
          title="Avg., Interactions/Company"
          tooltipText={avgTooltipText}
          color={avgInteractionsPerCompany >= 10 ? 'black' : 'red'}
        />
        <StatBox
          icon={consistencyIcon}
          statistic={consistencyValue}
          title={consistencyTitle}
          tooltipText={consistencyTooltip}
          color={consistencyColor}
        />
      </Box>
      <Box className={styles.contentContainer}>
        <InsightsMap companies={companies} theme={theme} />
        <PieChart 
          items={newCompanies} 
          itemKey='role' 
          itemType='Companies' 
          title='Company Roles (%)'
        />
        <BarChart 
          items={newCompanies} 
          itemKey='name' 
          itemType='Interactions' 
          title='Interactions by Company' 
          valueKey='total_interactions'
          yAxisName='Interactions'
          xAxisName='Companies'
        />
      </Box>
      <Box className={styles.contentContainer}>
        <PieChart 
          items={newCompanies} 
          itemKey='region' 
          itemType='Companies' 
          title='Company Regions (%)'
        />
        <PieChart 
          items={newCompanies} 
          itemKey='role' 
          itemType='Companies' 
          title='Company Roles (%)'
        />
        <PieChart 
          items={newCompanies} 
          itemKey='company_type' 
          itemType='Companies' 
          title='Company Types (%)'
        />
      </Box>
    </Box>
  );
};

export default CompanyInsights;