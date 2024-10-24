import React, { useState, useEffect } from 'react';
import { ThemeProvider, BaseStyles, Box, Header, Text, IconButton } from '@primer/react';
import { TriangleDownIcon, SunIcon, MoonIcon, SignOutIcon } from '@primer/octicons-react';
import mrLogo from './images/mr_logo_192H.png'; // Import your custom logo
import Studies from './components/Studies'; // Import the Studies component
import Interactions from './components/Interactions'; // Import the Interactions component
import Companies from './components/Companies'; // Import the Companies component

const menuItems = [
  { name: 'Companies', href: '#companies' },
  { name: 'Interactions', href: '#interactions' },
  { name: 'Studies', href: '#studies' },
  { name: 'Status', href: '#' },
];

const buttonItems = [
  { icon: SignOutIcon, label: 'Logout', hasTriangle: false },
];

const App = () => {
  const [theme, setTheme] = useState('light');
  const [selectedMenu, setSelectedMenu] = useState('companies');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.style.backgroundColor = theme === 'light' ? '#f6f8f9' : '#0d1117';
    document.body.style.color = theme === 'light' ? '#1f2328' : '#c9d1d9';
  }, [theme]);

  return (
    <ThemeProvider colorMode={theme}>
      <BaseStyles>
        <Header style={{ backgroundColor: theme === 'light' ? '#f6f8f9' : '#0d1117', color: theme === 'light' ? '#1f2328' : '#c9d1d9' }}>
          <Header.Item full>
            <Header.Link href="#" fontSize={2} display="flex" alignItems="center" style={{ color: theme === 'light' ? '#1f2328' : '#c9d1d9' }}>
              <img src={mrLogo} alt="Logo" style={{ height: 32, marginRight: 8 }} />
              <Text fontSize={2} fontWeight="bold">Mediumroast for GitHub</Text>
            </Header.Link>
          </Header.Item>
          {menuItems.map((item, index) => (
            <Header.Item key={index}>
              <Header.Link href={item.href} onClick={() => setSelectedMenu(item.name.toLowerCase())} style={{ color: theme === 'light' ? '#1f2328' : '#c9d1d9' }}>
                {item.name}
              </Header.Link>
            </Header.Item>
          ))}
          <Header.Item>
            <IconButton
              icon={theme === 'light' ? MoonIcon : SunIcon}
              aria-label="Toggle theme"
              onClick={toggleTheme}
            />
          </Header.Item>
          {buttonItems.map((item, index) => (
            <Header.Item key={index}>
              <IconButton icon={item.icon} aria-label={item.label} />
              {item.hasTriangle && <TriangleDownIcon size={16} />}
            </Header.Item>
          ))}
        </Header>
        <Box p={4}>
          {selectedMenu === 'companies' && <Companies theme={theme} />}
          {selectedMenu === 'interactions' && <Interactions theme={theme} />}
          {selectedMenu === 'studies' && <Studies theme={theme} />}
          {/* Add other components for different menu items here */}
        </Box>
      </BaseStyles>
    </ThemeProvider>
  );
};

export default App;