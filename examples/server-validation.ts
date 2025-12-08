/**
 * Server-Side Validation Example
 * 
 * This example shows how a server (like Browserbase or any API provider)
 * can verify incoming requests from Synapse-authenticated agents.
 */

import { Synapse } from 'synapse-agent-kit';
import http from 'http';

// Mock API key database (in production, fetch from secure storage)
const VALID_API_KEYS = new Set([
  'sk_live_demo_abc123xyz789',
  'sk_live_your_api_key_here'
]);

// Create HTTP server
const server = http.createServer(async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Synapse-*');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  console.log(`\n📥 Incoming ${req.method} request to ${req.url}`);

  // Extract Synapse headers
  const signature = req.headers['x-synapse-signature'] as string;
  const bondId = req.headers['x-synapse-bond-id'] as string;
  const agentId = req.headers['x-synapse-agent-id'] as string;
  const timestamp = req.headers['x-synapse-timestamp'] as string;
  const version = req.headers['x-synapse-version'] as string;

  // Check if all required headers are present
  if (!signature || !bondId || !timestamp) {
    console.log('❌ Missing required Synapse headers');
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      error: 'Unauthorized',
      message: 'Missing Synapse authentication headers'
    }));
    return;
  }

  console.log('🔍 Validating request...');
  console.log('  Bond ID:', bondId);
  console.log('  Agent ID:', agentId);
  console.log('  Timestamp:', new Date(parseInt(timestamp)).toISOString());
  console.log('  Version:', version);

  // Collect request body for POST requests
  let body = '';
  if (req.method === 'POST' || req.method === 'PUT') {
    for await (const chunk of req) {
      body += chunk.toString();
    }
  }

  // Verify signature for each known API key
  // In production, you'd look up the API key associated with the bond ID
  let isValid = false;
  for (const apiKey of VALID_API_KEYS) {
    isValid = Synapse.verifySignature(
      signature,
      apiKey,
      req.method!,
      `http://localhost:3000${req.url}`,
      timestamp,
      bondId,
      body || undefined
    );
    
    if (isValid) {
      console.log('✅ Signature verified with API key:', apiKey.substring(0, 15) + '...');
      break;
    }
  }

  if (!isValid) {
    console.log('❌ Invalid signature');
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      error: 'Unauthorized',
      message: 'Invalid signature'
    }));
    return;
  }

  // Check timestamp freshness (prevent replay attacks)
  const requestTime = parseInt(timestamp);
  const now = Date.now();
  const maxAge = 5 * 60 * 1000; // 5 minutes

  if (Math.abs(now - requestTime) > maxAge) {
    console.log('❌ Request timestamp too old or in the future');
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      error: 'Unauthorized',
      message: 'Request timestamp expired'
    }));
    return;
  }

  // Request is valid! Process it
  console.log('✅ Request authorized');
  
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    success: true,
    message: 'Request authenticated successfully',
    agent: {
      id: agentId,
      bondId: bondId,
      verified: true
    },
    data: {
      // Your API response here
      example: 'This is protected data only accessible to verified agents'
    }
  }));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`\n🚀 Synapse validation server running on http://localhost:${PORT}`);
  console.log('📝 Send requests with Synapse-authenticated agents to test validation\n');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
