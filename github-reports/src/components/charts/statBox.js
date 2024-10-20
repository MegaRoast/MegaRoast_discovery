import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import styles from './statBox.module.css'; // Import the CSS module
import { useTheme } from '@mui/material/styles';

const StatBox = ({ icon: Icon, statistic, title, tooltipText, color = 'black' }) => {
    const theme = useTheme();
    return (
    <Tooltip
      title={tooltipText}
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
      <Box className={styles.statBox}>
        <Box className={styles.statBoxTop} style={{ color }}>
          <Icon size={32} className={styles.icon} />
          <span>{statistic}</span>
        </Box>
        <Box className={styles.statBoxBottom}>
          <span>{title}</span>
        </Box>
      </Box>
    </Tooltip>
  );
};

StatBox.propTypes = {
  icon: PropTypes.elementType.isRequired,
  statistic: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  tooltipText: PropTypes.string.isRequired,
  color: PropTypes.string,
  theme: PropTypes.object.isRequired,
};

export default StatBox;