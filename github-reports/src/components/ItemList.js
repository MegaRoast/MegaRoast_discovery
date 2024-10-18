import React, { useState } from 'react';
import { Box, Text, Button } from '@primer/react';
import styles from './ItemList.module.css'; // Import the CSS module
import SortableSearchableTable from './SortableSearchableTable'; // Import the existing component
import InteractionIconView from './InteractionIconView'; // Import the new component
import CompanyIconView from './CompanyIconView'; // Import the new component

const ItemList = ({ theme, itemName, isCompanyView, buttonName, columns = [], isButtonDisabled = false, objs }) => {
  const [view, setView] = useState('list');

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
        {view === 'list' && (
          <SortableSearchableTable columns={columns} data={objs} theme={theme} />
        )}
        {view === 'icon' && (
            isCompanyView ? (
                <CompanyIconView companies={objs} />
            ) : (
                <InteractionIconView interactions={objs} />
            )
        )}
      </Box>
      <Box className={styles.actionsContainer}>
        <Button
          variant="primary"
          className={`${styles.newItemButton} ${isButtonDisabled ? styles.newItemButtonDisabled : ''}`}
          disabled={isButtonDisabled}
        >
          {buttonName}
        </Button>
      </Box>
    </Box>
  );
};

export default ItemList;