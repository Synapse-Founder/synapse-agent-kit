/**
 * Basic Bot Example
 * 
 * This example demonstrates the simplest way to use Synapse Agent Kit
 * to make authenticated HTTP requests.
 */

import { Synapse } from 'synapse-agent-kit';

async function main() {
  // Initialize Synapse with your credentials
  const synapse = new Synapse({
    apiKey: 'sk_live_your_api_key_here',
    bondId: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    agentId: 'basic-bot-v1',
    debug: true // Enable logging to see what's happening
  });

  console.log('🤖 Basic Bot initialized');
  console.log('📋 Configuration:', synapse.getConfig());

  try {
    // Make a simple GET request
    console.log('\n📡 Making authenticated request...');
    const response = await synapse.fetch('https://api.github.com/repos/Synapse-Founder/synapse-agent-kit');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    console.log('\n✅ Request successful!');
    console.log('Repository:', data.full_name);
    console.log('Stars:', data.stargazers_count);
    console.log('Description:', data.description);

  } catch (error) {
    console.error('\n❌ Request failed:', error);
    process.exit(1);
  }
}

// Run the example
main();
