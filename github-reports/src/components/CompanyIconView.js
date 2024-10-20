import React, { useState, useRef } from 'react';
import { Box, Text } from '@primer/react';
import Tooltip from '@mui/material/Tooltip';
import styles from './CompanyIconView.module.css';
import { useTheme } from '@mui/material/styles';
import { PiBuilding, PiCertificate } from 'react-icons/pi';
import { HiOutlineMap } from 'react-icons/hi2';

const CompanyIconView = ({ companies }) => {
  // eslint-disable-next-line no-unused-vars
  const [showTooltip, setShowTooltip] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [tooltipContent, setTooltipContent] = useState({});
  const target = useRef(null);
  const theme = useTheme();

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
            <Box className={styles.tooltip}>
              <Box className={styles.tooltipItem}>
                <Text className={styles.tooltipHeading}>Company Name</Text>
                <Box className={styles.tooltipContent}>
                  <PiBuilding size={12} className={styles.tooltipIcon} />
                  <Text className={styles.tooltipText}>{company.name}</Text>
                </Box>
              </Box>
              <Box className={styles.tooltipItem}>
                <Text className={styles.tooltipHeading}>Region</Text>
                <Box className={styles.tooltipContent}>
                  <HiOutlineMap size={12} className={styles.tooltipIcon} />
                  <Text className={styles.tooltipText}>{company.region}</Text>
                </Box>
              </Box>
              <Box className={styles.tooltipItem}>
                <Text className={styles.tooltipHeading}>Type</Text>
                <Box className={styles.tooltipContent}>
                  <PiCertificate size={12} className={styles.tooltipIcon} />
                  <Text className={styles.tooltipText}>{company.company_type}</Text>
                </Box>
              </Box>
            </Box>
          }
          placement="right"
          followCursor
          PopperProps={{
            sx: {
                '& .MuiTooltip-tooltip': {
                  backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: '4px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  fontSize: '9px',
                  padding: '8px',
                  width: '200px',
                  textAlign: 'left',
                },
                '& .MuiTooltip-arrow': {
                  color: theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
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