import React, { useState, useMemo } from 'react';
import { Box, TextInput, Text } from '@primer/react';
import { FilterIcon } from '@primer/octicons-react'; // Import the filter icon
import styles from './SortableSearchableTable.module.css'; // Import the CSS module

const SortableSearchableTable = ({ columns, data, theme }) => { // Accept the theme prop
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchQuery, setSearchQuery] = useState('');

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? '▲' : '▼';
  };

  const filteredItems = useMemo(() => {
    const filtered = data.filter(item => {
      return columns.some(column => {
        const value = item[column.key];
        if (value === undefined || value === null) {
          return false;
        }
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        if (typeof value === 'number') {
          return value.toString().includes(searchQuery);
        }
        return false;
      });
    });
    return filtered;
  }, [data, columns, searchQuery]);

  const sortedItems = useMemo(() => {
    let sortableItems = [...filteredItems];
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
  }, [filteredItems, sortConfig]);

  return (
    <Box className={`${styles.outerContainer} ${theme === 'dark' ? 'dark' : ''}`}> {/* Apply the theme class */}
      <Box className={styles.innerContainer}>
        <Box className={styles.searchContainer}>
          <FilterIcon className={styles.filterIcon} />
          <TextInput
            placeholder="Filter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </Box>
        {data.length === 0 ? (
          <Box className={styles.noItems}>
            <Text>No items supplied</Text>
          </Box>
        ) : (
          <Box className={theme === 'dark' ? styles.darkTableContainer : styles.tableContainer}>
            <div className={theme === 'dark' ? styles.darkHeaderCover : styles.headerCover}></div> {/* Add the small container above the header */}
            <table className={theme === 'dark' ? styles.darkTable : styles.table}>
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.key} onClick={() => requestSort(column.key)}>
                      {column.name}
                      <span className={styles.sortIndicator}>{getSortIndicator(column.key)}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedItems.map((item, index) => (
                  <tr key={index}>
                    {columns.map((column) => (
                      <td key={column.key}>{item[column.key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SortableSearchableTable;