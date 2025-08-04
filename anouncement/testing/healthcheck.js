#!/usr/bin/env node

const http = require('http');

// Health check for both applications
const checkHealth = (port, app) => {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: port,
      path: '/api/health',
      method: 'GET',
      timeout: 5000
    }, (res) => {
      if (res.statusCode === 200) {
        resolve(`✅ ${app} (port ${port}) is healthy`);
      } else {
        reject(`❌ ${app} (port ${port}) returned status ${res.statusCode}`);
      }
    });

    req.on('error', (err) => {
      reject(`❌ ${app} (port ${port}) is not responding: ${err.message}`);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(`❌ ${app} (port ${port}) timed out`);
    });

    req.end();
  });
};

async function main() {
  console.log('🏥 Running health checks...');
  
  try {
    const webResult = await checkHealth(3000, 'Web App');
    console.log(webResult);
  } catch (error) {
    console.log(error);
  }

  try {
    const cmsResult = await checkHealth(3001, 'CMS App');
    console.log(cmsResult);
  } catch (error) {
    console.log(error);
  }
}

main();
