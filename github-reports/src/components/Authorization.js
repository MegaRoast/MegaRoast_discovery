import React, { useState } from 'react';
import axios from 'axios';

const GitHubAuth = () => {
  const [userCode, setUserCode] = useState('');
  const [verificationUri, setVerificationUri] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const clientId = 'Iv1.f5c0a4eb1f0606f8'; // Replace with your GitHub OAuth App Client ID

  const startDeviceFlow = async () => {
    try {
      const response = await axios.post('https://github.com/login/device/code', {
        client_id: clientId,
        scope: 'repo'
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      setUserCode(response.data.user_code);
      setVerificationUri(response.data.verification_uri);

      pollForAccessToken(response.data.device_code);
    } catch (error) {
      console.error('Error starting device flow:', error);
    }
  };

  const pollForAccessToken = async (deviceCode) => {
    try {
      const interval = setInterval(async () => {
        try {
          const response = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: clientId,
            device_code: deviceCode,
            grant_type: 'urn:ietf:params:oauth:grant-type:device_code'
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });

          if (response.data.access_token) {
            clearInterval(interval);
            setAccessToken(response.data.access_token);
          }
        } catch (error) {
          if (error.response && error.response.data.error !== 'authorization_pending') {
            clearInterval(interval);
            console.error('Error polling for access token:', error);
          }
        }
      }, 5000);
    } catch (error) {
      console.error('Error polling for access token:', error);
    }
  };

  return (
    <div>
      <button onClick={startDeviceFlow}>Authenticate with GitHub</button>
      {userCode && (
        <div>
          <p>Please visit <a href={verificationUri} target="_blank" rel="noopener noreferrer">{verificationUri}</a> and enter the code: {userCode}</p>
        </div>
      )}
      {accessToken && (
        <div>
          <p>Access Token: {accessToken}</p>
        </div>
      )}
    </div>
  );
};

export default GitHubAuth;