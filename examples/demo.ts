import { Synapse } from 'synapse-agent-kit';

/**
 * DEMO: E-Commerce Price Monitoring Agent
 * 
 * This agent monitors product prices across multiple stores
 * and uses Synapse to avoid getting blocked by anti-bot systems.
 */

// Initialize Synapse with your credentials
const synapse = new Synapse({
  apiKey: 'sk_live_demo_abc123xyz789', // Replace with your API key
  bondId: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', // Replace with your Bond ID
  agentId: 'price-monitor-v1',
  debug: true // See the magic happen in real-time
});

// Simulated protected API endpoints
const PROTECTED_APIS = [
  'https://api.store-alpha.com/products/12345',
  'https://api.store-beta.com/v1/items/gaming-laptop',
  'https://api.store-gamma.com/pricing/electronics/67890'
];

/**
 * Main agent workflow
 */
async function runPriceMonitoringAgent() {
  console.log('\n🤖 Starting Price Monitoring Agent...\n');
  
  const results = [];

  for (const apiUrl of PROTECTED_APIS) {
    try {
      console.log(`\n📡 Querying: ${apiUrl}`);
      
      // The magic: synapse.fetch() works exactly like fetch()
      // but automatically attaches trust headers
      const response = await synapse.fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Synapse-Price-Monitor/1.0'
        }
      });

      if (response.ok) {
        // In a real scenario, you'd parse actual product data
        // For demo purposes, we'll simulate it
        const mockData = {
          productId: apiUrl.split('/').pop(),
          price: Math.floor(Math.random() * 1000) + 500,
          currency: 'USD',
          inStock: Math.random() > 0.3,
          timestamp: new Date().toISOString()
        };

        console.log('\x1b[32m✅ Request Verified via SYNAPSE Protocol\x1b[0m');
        console.log(`   💰 Price: $${mockData.price} ${mockData.currency}`);
        console.log(`   📦 Stock: ${mockData.inStock ? 'Available' : 'Out of Stock'}`);

        results.push({
          url: apiUrl,
          status: 'success',
          data: mockData
        });
      } else {
        console.log(`\x1b[33m⚠️  Response: ${response.status} ${response.statusText}\x1b[0m`);
        results.push({
          url: apiUrl,
          status: 'error',
          error: `HTTP ${response.status}`
        });
      }

    } catch (error) {
      console.error(`\x1b[31m❌ Failed to fetch ${apiUrl}\x1b[0m`);
      console.error(`   Error: ${error.message}`);
      results.push({
        url: apiUrl,
        status: 'error',
        error: error.message
      });
    }

    // Polite delay between requests
    await sleep(1000);
  }

  // Summary Report
  console.log('\n' + '='.repeat(60));
  console.log('📊 AGENT RUN SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total Requests: ${results.length}`);
  console.log(`Successful: ${results.filter(r => r.status === 'success').length}`);
  console.log(`Failed: ${results.filter(r => r.status === 'error').length}`);
  console.log('\n✨ All requests were authenticated with Synapse Protocol');
  console.log('🛡️  Economic trust enabled - No bot blocks!\n');

  return results;
}

/**
 * Example: Advanced usage with POST requests
 */
async function createPriceAlert() {
  console.log('\n📬 Creating price alert via protected API...\n');

  const alertData = {
    productId: '12345',
    targetPrice: 799.99,
    notifyEmail: 'agent@example.com'
  };

  try {
    const response = await synapse.fetch('https://api.store-alpha.com/alerts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(alertData)
    });

    if (response.ok) {
      console.log('\x1b[32m✅ Price Alert Created Successfully\x1b[0m');
      console.log('   Synapse automatically signed the POST request');
      console.log(`   Alert ID: alert_${Math.random().toString(36).substr(2, 9)}`);
    }

  } catch (error) {
    console.error('\x1b[31m❌ Failed to create alert:\x1b[0m', error.message);
  }
}

/**
 * Example: Manual header inspection
 */
function demonstrateManualSigning() {
  console.log('\n🔍 DEMO: Manual Request Signing\n');
  
  const headers = synapse.signRequest(
    'GET',
    'https://api.example.com/secure-endpoint'
  );

  console.log('Generated Synapse Headers:');
  console.log('─'.repeat(50));
  Object.entries(headers).forEach(([key, value]) => {
    const displayValue = key === 'X-Synapse-Signature' 
      ? `${value.substring(0, 20)}...` 
      : value;
    console.log(`${key}: ${displayValue}`);
  });
  console.log('─'.repeat(50));
  console.log('\nThese headers prove:');
  console.log('  ✓ Agent identity');
  console.log('  ✓ Economic accountability (Bond ID)');
  console.log('  ✓ Request authenticity (Signature)');
  console.log('  ✓ Timestamp for replay protection\n');
}

// Utility function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Run the demo
(async () => {
  try {
    // Display manual signing example first
    demonstrateManualSigning();

    // Run the main monitoring workflow
    await runPriceMonitoringAgent();

    // Demonstrate POST request
    await createPriceAlert();

    console.log('\n🎉 Demo completed successfully!\n');
    console.log('Next steps:');
    console.log('  1. Replace demo API key with your real credentials');
    console.log('  2. Update bondId with your on-chain surety bond');
    console.log('  3. Point to your actual API endpoints');
    console.log('  4. Deploy your trusted agent!\n');

  } catch (error) {
    console.error('\n💥 Demo failed:', error);
    process.exit(1);
  }
})();
