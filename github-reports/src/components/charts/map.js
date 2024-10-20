import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import coffeeIcon from '../../images/coffee_icon.svg';
import 'leaflet/dist/leaflet.css';
import styles from './map.module.css';

const InsightsMap = ({ companies, title='Company Locations', zoom=3 }) => {
  const customIcon = new L.icon({
    iconUrl: coffeeIcon,
    iconRetinaUrl: coffeeIcon,
    popupAnchor: [-0, -0],
    iconSize: [25, 25]
  });

  const [defaultLat, setDefaultLat] = useState(0);
  const [defaultLong, setDefaultLong] = useState(0);

  useEffect(() => {
    if (companies.length > 0) {
      setDefaultLat(companies[0].latitude);
      setDefaultLong(companies[0].longitude);
    }
  }, [companies]);

  const SetViewOnChange = ({ coords }) => {
    const map = useMap();
    map.setView(coords, map.getZoom());
    return null;
  };

  // Custom function to create cluster icons
  const createClusterCustomIcon = (cluster) => {
    const count = cluster.getChildCount();
    let size = 'large';
    if (count < 10) {
      size = 'small';
    } else if (count >= 10 && count < 100) {
      size = 'medium';
    }

    const className = `marker-cluster marker-cluster-${size}`;
    const backgroundColor = '#221c18';
    const textColor = '#ffffff';
    const border = '2px solid #c6964c';
    const paddingBottom = '5px';
    const html = `<div style="background-color: ${backgroundColor}; color: ${textColor}; border: ${border}; padding-bottom: ${paddingBottom}"><span>${count}</span></div>`;

    return new L.DivIcon({
      html: html,
      className: className,
      iconSize: L.point(40, 40, true),
    });
  };

  return (
    <Box className={styles.mapContainer}>
      <Box className={styles.mapBoxTop}>
        <MapContainer center={[defaultLat, defaultLong]} zoom={zoom} style={{ height: 322, width: "100%" }}>
          <SetViewOnChange coords={[defaultLat, defaultLong]} />
          <TileLayer
            url="https://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
            {companies.map((company, index) => (
              <Marker key={index} position={[company.latitude, company.longitude]} icon={customIcon}>
                <Popup>
                  {company.name}
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </Box>
      <Box className={styles.mapBoxBottom}>
        <span>{title}</span>
      </Box>
    </Box>
  );
};

export default InsightsMap;