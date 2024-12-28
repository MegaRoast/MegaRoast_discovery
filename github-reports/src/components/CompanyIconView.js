import React, { useState, useRef } from 'react';
import { Box, Text } from '@primer/react';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import styles from './CompanyIconView.module.css';
import tooltipStyles from './tooltipStyles.module.css';
import { OrganizationIcon, GlobeIcon, BriefcaseIcon } from '@primer/octicons-react';

const CompanyIconView = ({ companies }) => {
  const theme = useTheme();

  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState({});
  const target = useRef(null);

  const handleMouseEnter = (company, event) => {
    setTooltipContent(company);
    setShowTooltip(true);
    target.current = event.currentTarget;
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <Box className={styles.iconViewContainer}>
      {companies.map((company, index) => (
        <Tooltip
          key={index}
          title={
            <Box className={tooltipStyles.tooltip}>
              <Box className={tooltipStyles.tooltipItem}>
                <Text className={tooltipStyles.tooltipHeading}>Company Name</Text>
                <Box className={tooltipStyles.tooltipContent}>
                  <OrganizationIcon size={12} className={tooltipStyles.tooltipIcon} />
                  <Text className={tooltipStyles.tooltipText}>{company.name}</Text>
                </Box>
              </Box>
              <Box className={tooltipStyles.tooltipItem}>
                <Text className={tooltipStyles.tooltipHeading}>Region</Text>
                <Box className={tooltipStyles.tooltipContent}>
                  <GlobeIcon size={12} className={tooltipStyles.tooltipIcon} />
                  <Text className={tooltipStyles.tooltipText}>{company.region}</Text>
                </Box>
              </Box>
              <Box className={tooltipStyles.tooltipItem}>
                <Text className={tooltipStyles.tooltipHeading}>Type</Text>
                <Box className={tooltipStyles.tooltipContent}>
                  <BriefcaseIcon size={12} className={tooltipStyles.tooltipIcon} />
                  <Text className={tooltipStyles.tooltipText}>{company.company_type}</Text>
                </Box>
              </Box>
            </Box>
          }
          placement="right"
          followCursor
          PopperProps={{
            sx: {
              '& .MuiTooltip-tooltip': {
                '--tooltip-background-color': theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
                '--tooltip-text-color': theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                '--tooltip-border-color': theme.palette.primary.main,
              },
              '& .MuiTooltip-arrow': {
                '--tooltip-background-color': theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
              },
            },
          }}
        >
          <Box
            className={styles.iconItem}
            onMouseEnter={(e) => handleMouseEnter(company, e)}
            onMouseLeave={handleMouseLeave}
          >
            <Box className={styles.iconWrapper}>
              <img src={company.logo_url} alt={company.name} className={styles.companyLogo} />
            </Box>
            <Text as="p" className={styles.iconText}>
              {company.name}
            </Text>
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
};

export default CompanyIconView;