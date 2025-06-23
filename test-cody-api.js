const fetch = require('node-fetch');

async function testCodyAPI() {
  const accessToken = 'sgp_e3cb05880bc40429_afca3d3b171deb0893f0e60ed018d3d9b0a4aa4f';
  
  try {
    const response = await fetch('https://sourcegraph.com/.api/completions/stream', {
      method: 'POST',
      headers: {
        'Authorization': `token ${accessToken}`,
        'Content-Type': 'application/json',
        'User-Agent': 'BestAIApps-Automation/1.0'
      },
      body: JSON.stringify({
        messages: [
          {
            speaker: 'human',
            text: 'Write a brief test review of ChatGPT in 100 words.'
          }
        ],
        maxTokensToSample: 500,
        temperature: 0.7,
        model: 'anthropic/claude-3-5-sonnet-20241022'
      })
    });

    console.log('Response Status:', response.status);
    console.log('Response Headers:', response.headers.raw());
    
    if (response.ok) {
      const data = await response.text();
      console.log('Success! Cody API Response:', data);
    } else {
      const error = await response.text();
      console.log('Error Response:', error);
    }
  } catch (error) {
    console.error('Network Error:', error);
  }
}

testCodyAPI();
