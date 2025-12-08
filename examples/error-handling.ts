/**
 * Error Handling Example
 * 
 * This example demonstrates how to handle various error scenarios
 * when using Synapse Agent Kit in production.
 */

import { Synapse } from 'synapse-agent-kit';

// Simulated error scenarios
enum ErrorScenario {
  BOND_EXPIRED = 'bond_expired',
  INSUFFICIENT_STAKE = 'insufficient_stake',
  NETWORK_ERROR = 'network_error',
  INVALID_SIGNATURE = 'invalid_signature',
  RATE_LIMITED = 'rate_limited'
}

async function simulateRequest(synapse: Synapse, scenario: ErrorScenario) {
  console.log(`\n🧪 Testing scenario: ${scenario}`);
  console.log('─'.repeat(50));

  try {
    // In a real scenario, these errors would come from the server
    // For this example, we'll simulate different error responses
    const response = await synapse.fetch('https://httpbin.org/status/200');

    // Simulate different error scenarios based on response
    switch (scenario) {
      case ErrorScenario.BOND_EXPIRED:
        throw new Error('Bond has expired. Please renew your surety bond at https://synapse-arch.com');
      
      case ErrorScenario.INSUFFICIENT_STAKE:
        throw new Error('Insufficient stake. Current: 100 USDC, Required: 500 USDC');
      
      case ErrorScenario.INVALID_SIGNATURE:
        throw new Error('Invalid signature. Please check your API key');
      
      case ErrorScenario.RATE_LIMITED:
        throw new Error('Rate limit exceeded. Please try again in 60 seconds');
      
      case ErrorScenario.NETWORK_ERROR:
        throw new Error('Network error: ECONNREFUSED');
      
      default:
        console.log('✅ Request successful');
        return await response.json();
    }

  } catch (error) {
    handleError(error, scenario);
  }
}

function handleError(error: unknown, scenario: ErrorScenario) {
  const err = error as Error;
  
  console.log('❌ Error caught:', err.message);
  
  // Handle specific error types
  switch (scenario) {
    case ErrorScenario.BOND_EXPIRED:
      console.log('\n💡 Recovery Strategy:');
      console.log('   1. Visit https://synapse-arch.com/dashboard');
      console.log('   2. Navigate to "Bonds" section');
      console.log('   3. Click "Renew Bond" and complete payment');
      console.log('   4. Wait for on-chain confirmation (~30 seconds)');
      console.log('   5. Retry your request');
      break;

    case ErrorScenario.INSUFFICIENT_STAKE:
      console.log('\n💡 Recovery Strategy:');
      console.log('   1. Current stake is below minimum threshold');
      console.log('   2. Add more collateral to your bond');
      console.log('   3. Minimum stake: 500 USDC');
      console.log('   4. Visit: https://synapse-arch.com/bonds/increase-stake');
      break;

    case ErrorScenario.INVALID_SIGNATURE:
      console.log('\n💡 Recovery Strategy:');
      console.log('   1. Verify your API key is correct');
      console.log('   2. Check if API key has been rotated');
      console.log('   3. Regenerate API key if compromised');
      console.log('   4. Update your environment variables');
      break;

    case ErrorScenario.RATE_LIMITED:
      console.log('\n💡 Recovery Strategy:');
      console.log('   1. Implement exponential backoff');
      console.log('   2. Add delay between requests');
      console.log('   3. Consider upgrading to higher tier bond');
      console.log('   4. Use request queuing for burst traffic');
      break;

    case ErrorScenario.NETWORK_ERROR:
      console.log('\n💡 Recovery Strategy:');
      console.log('   1. Check internet connectivity');
      console.log('   2. Verify target server is reachable');
      console.log('   3. Implement retry logic with exponential backoff');
      console.log('   4. Add circuit breaker pattern for resilience');
      break;

    default:
      console.log('\n💡 General Recovery Strategy:');
      console.log('   1. Check error message for details');
      console.log('   2. Review Synapse documentation');
      console.log('   3. Contact support if issue persists');
  }
}

// Retry logic with exponential backoff
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      console.log(`\n🔄 Attempt ${attempt + 1}/${maxRetries}`);
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, attempt);
        console.log(`⏳ Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw new Error(`Failed after ${maxRetries} attempts: ${lastError!.message}`);
}

// Main execution
async function main() {
  console.log('🛡️  Synapse Error Handling Examples');
  console.log('═'.repeat(50));

  // Initialize Synapse (use test mode for safe examples)
  const synapse = new Synapse({
    apiKey: 'sk_test_key',
    bondId: '0x000000000000000000000000000000000000dead',
    agentId: 'error-handling-demo',
    debug: false
  });

  // Test each error scenario
  const scenarios = [
    ErrorScenario.BOND_EXPIRED,
    ErrorScenario.INSUFFICIENT_STAKE,
    ErrorScenario.INVALID_SIGNATURE,
    ErrorScenario.RATE_LIMITED,
    ErrorScenario.NETWORK_ERROR
  ];

  for (const scenario of scenarios) {
    await simulateRequest(synapse, scenario);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Pause between tests
  }

  // Demonstrate retry logic
  console.log('\n\n🔁 Demonstrating Retry Logic');
  console.log('═'.repeat(50));

  try {
    await retryWithBackoff(async () => {
      const response = await synapse.fetch('https://httpbin.org/status/200');
      return await response.json();
    });
    console.log('✅ Request succeeded with retry logic');
  } catch (error) {
    console.log('❌ All retries exhausted:', (error as Error).message);
  }

  console.log('\n\n✨ Error handling examples completed');
}

// Run the example
main();
