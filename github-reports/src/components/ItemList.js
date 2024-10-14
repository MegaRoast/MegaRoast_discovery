import React, { useState } from 'react';
import { Box, Text, Button } from '@primer/react';
import styles from './ItemList.module.css'; // Import the CSS module

const ItemList = ({ theme, itemName, buttonName, columns = [], isButtonDisabled = false }) => {
  const [view, setView] = useState('list');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...columns];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [columns, sortConfig]);

  return (
    <Box className={`${styles.container} ${theme === 'dark' ? styles.dark : styles.light}`}>
      <Box className={styles.headerContainer}>
        <Box className={styles.headerContent}>
          <Text as="h3" className={styles.headerText}>
            {itemName}
          </Text>
          <Box className={styles.viewButtons}>
            <Text as="span" className={styles.viewText}>View as:</Text>
            <Button
              variant={view === 'list' ? 'primary' : 'default'}
              onClick={() => setView('list')}
              className={`${styles.button} ${view === 'list' ? styles.activeButton : ''}`}
            >
              List
            </Button>
            <Button
              variant={view === 'icon' ? 'primary' : 'default'}
              onClick={() => setView('icon')}
              className={`${styles.button} ${view === 'icon' ? styles.activeButton : ''}`}
            >
              Icon
            </Button>
          </Box>
        </Box>
      </Box>
      <Box className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {Array.isArray(columns) && columns.map((column) => (
                <th key={column.key} onClick={() => requestSort(column.key)}>
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(columns) && sortedItems.map((item, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.key}>{item[column.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
      <Box className={styles.actionsContainer}>
        <Box className={styles.actionsContent}>
          <Button
            variant="primary"
            className={`${styles.newItemButton} ${isButtonDisabled ? styles.newItemButtonDisabled : ''}`}
            disabled={isButtonDisabled}
          >
            {buttonName}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemList;