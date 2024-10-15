import React, { useState, useEffect } from 'react';
import { Box, Text, TabNav } from '@primer/react';
import styles from './Objects.module.css'; // Import the CSS module
import ItemList from './ItemList'; // Import the ItemList component

const Interactions = ({ theme, objs }) => {
  const [selectedTab, setSelectedTab] = useState('insights');

  useEffect(() => {
    const tabNav = document.querySelector(`.${styles.tabNav}`);
    if (theme === 'dark') {
      tabNav.classList.add(styles.tabNavDark);
      document.documentElement.style.setProperty('--tab-hover-color', '#252c35');
    } else {
      tabNav.classList.remove(styles.tabNavDark);
      document.documentElement.style.setProperty('--tab-hover-color', '#717880');
    }
  }, [theme]);

  return (
    <Box className={styles.container} style={{ backgroundColor: theme === 'light' ? '#f6f8f9' : '#0d1117', color: theme === 'light' ? '#1f2328' : '#c9d1d9' }}>
      <TabNav aria-label="Interactions" className={styles.tabNav}>
        <div
          className={`${styles.tabItemWrapper} ${selectedTab === 'insights' ? styles.tabItemWrapperActive : ''}`}
        >
          <button
            className={`${styles.tabItem} ${selectedTab === 'insights' ? styles.tabItemActive : ''}`}
            onClick={() => setSelectedTab('insights')}
          >
            Insights
          </button>
        </div>
        <div
          className={`${styles.tabItemWrapper} ${selectedTab === 'items' ? styles.tabItemWrapperActive : ''}`}
        >
          <button
            className={`${styles.tabItem} ${selectedTab === 'items' ? styles.tabItemActive : ''}`}
            onClick={() => setSelectedTab('items')}
          >
            Items
          </button>
        </div>
      </TabNav>
      <Box p={3}>
        {selectedTab === 'insights' && (
          <Text as="p" className={styles.insights}>
            Coming soon
          </Text>
        )}
        {selectedTab === 'items' && (
          <ItemList 
            theme={theme} 
            itemName="Interactions" 
            buttonName="New interaction" 
            isButtonDisabled={true}  
            objs={[objs]}
            columns={[
              {key: 'name', name: 'Name'}, 
              {key: 'reading_time', name: 'Reading Time (min)'}, 
              {key: 'interaction_type', name: 'Type'},
            ]}
          />
        )}
      </Box>
    </Box>
  );
};

export default Interactions;