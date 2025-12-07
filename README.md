# Web Bot Auth SDK (TypeScript)

[![npm version](https://img.shields.io/npm/v/synapse-agent-kit.svg)](https://www.npmjs.com/package/synapse-agent-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

A lightweight, zero-dependency implementation of the **Web Bot Auth** standard. Automatically signs requests with cryptographic proofs to prevent anti-bot blocking. Compatible with any surety bond provider.

---

## Overview

Modern web APIs increasingly block automated traffic, even from legitimate AI agents and bots. The **Web Bot Auth** standard solves this by providing a cryptographic identity layer that proves economic accountability without requiring human interaction.

This SDK implements the standard's signature protocol, allowing your TypeScript applications to authenticate as verified bots with minimal code changes.

---

## Features

- **Drop-in Replacement**: `synapse.fetch()` works exactly like `fetch()` with automatic authentication
- **Zero Dependencies**: Pure TypeScript implementation with no external packages
- **Standard Compliant**: Implements Web Bot Auth v1.0 specification
- **Provider Agnostic**: Works with any bond provider supporting the standard
- **Cryptographic Signing**: HMAC-SHA256 signatures with replay protection
- **Server-Side Verification**: Built-in utilities for validating incoming requests
- **Sandbox Mode**: Test without real bonds using the universal test ID

---

## Installation

```bash
npm install synapse-agent-kit
```

---

## Quick Start

### Basic Usage

```typescript
import { Synapse } from 'synapse-agent-kit';

// Initialize with your credentials
const synapse = new Synapse({
  apiKey: 'sk_live_your_api_key',
  bondId: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  agentId: 'my-agent-v1'
});

// Use exactly like fetch()
const response = await synapse.fetch('https://api.example.com/data');
const data = await response.json();
```

### Sandbox Mode (Testing)

Test your integration without spending real tokens:

```typescript
const synapse = new Synapse({
  apiKey: 'sk_test_key',
  bondId: '0x000000000000000000000000000000000000dead', // Universal test ID
  debug: true
});

// All requests bypass cryptographic verification
await synapse.fetch('https://api.example.com/test');
```

When using the test bond ID, you'll see:
```
🟨 SYNAPSE: Running in SANDBOX MODE (No real value bonded)
```

---

## How It Works

The Web Bot Auth standard adds cryptographic headers to HTTP requests:

1. **Request Signing**: Each request is signed with HMAC-SHA256 using your API key
2. **Bond Verification**: The `X-Synapse-Bond-Id` header references your on-chain bond
3. **Replay Protection**: Timestamps prevent request replay attacks
4. **Server Validation**: APIs verify signatures to confirm bot identity

### Authentication Headers

| Header | Description |
|--------|-------------|
| `X-Synapse-Bond-Id` | On-chain surety bond identifier |
| `X-Synapse-Signature` | HMAC-SHA256 signature of the request |
| `X-Synapse-Agent-Id` | Unique agent identifier |
| `X-Synapse-Timestamp` | Request timestamp (replay protection) |
| `X-Synapse-Version` | Protocol version |

---

## API Reference

### Constructor

```typescript
new Synapse(config: SynapseConfig)
```

**Parameters:**
- `apiKey` (string): Your API key for signing requests
- `bondId` (string): Your on-chain bond identifier (use `0x000000000000000000000000000000000000dead` for testing)
- `agentId` (string, optional): Custom agent identifier
- `debug` (boolean, optional): Enable debug logging

### `synapse.fetch(url, options?)`

Drop-in replacement for the standard `fetch()` API with automatic authentication.

```typescript
const response = await synapse.fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'Agent' })
});
```

### `synapse.signRequest(method, url, body?)`

Manually generate authentication headers for custom HTTP clients.

```typescript
const headers = synapse.signRequest('GET', 'https://api.example.com/data');
console.log(headers);
// {
//   'X-Synapse-Bond-Id': '0x742d35Cc...',
//   'X-Synapse-Signature': 'a3f2b1c...',
//   'X-Synapse-Agent-Id': 'agent_abc123',
//   'X-Synapse-Timestamp': '1701234567890',
//   'X-Synapse-Version': '1.0.3'
// }
```

### `Synapse.verifySignature(signature, apiKey, method, url, timestamp, bondId, body?)`

Server-side signature verification for incoming requests.

```typescript
const isValid = Synapse.verifySignature(
  signature,
  apiKey,
  'GET',
  'https://api.example.com/data',
  timestamp,
  bondId
);
```

**Note:** Automatically returns `true` for the universal test bond ID.

---

## Examples

### Price Monitoring Agent

```typescript
const synapse = new Synapse({
  apiKey: 'sk_live_demo_abc123xyz789',
  bondId: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  agentId: 'price-monitor-v1'
});

const stores = [
  'https://api.store-alpha.com/products/12345',
  'https://api.store-beta.com/v1/items/gaming-laptop',
  'https://api.store-gamma.com/pricing/electronics/67890'
];

for (const url of stores) {
  const response = await synapse.fetch(url);
  const data = await response.json();
  console.log(`Price: $${data.price}`);
}
```

### POST Requests with Authentication

```typescript
const response = await synapse.fetch('https://api.example.com/alerts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    productId: '12345',
    targetPrice: 799.99,
    notifyEmail: 'agent@example.com'
  })
});
```

### Custom HTTP Client Integration

```typescript
import axios from 'axios';

const headers = synapse.signRequest('GET', 'https://api.example.com/data');

const response = await axios.get('https://api.example.com/data', {
  headers: {
    ...headers,
    'Accept': 'application/json'
  }
});
```

---

## Security

- **HMAC-SHA256 Signing**: Cryptographic request signatures
- **Replay Attack Prevention**: Timestamp-based request validation
- **Timing-Safe Comparison**: Prevents timing attacks on signature verification
- **Economic Accountability**: Bond IDs provide real economic stake (production mode)

---

## Provider Compatibility

This SDK implements the Web Bot Auth standard and works with any compatible bond provider:

- **SYNAPSE**: Reference implementation with Polygon mainnet bonds
- **Custom Providers**: Any service implementing the standard's signature protocol

To use a different provider, simply provide their bond ID and API key during initialization.

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

## Links

- [GitHub Repository](https://github.com/Synapse-Founder/synapse-agent-kit)
- [npm Package](https://www.npmjs.com/package/synapse-agent-kit)
- [Report Issues](https://github.com/Synapse-Founder/synapse-agent-kit/issues)
- [Web Bot Auth Standard](https://synapse-arch.com) (Reference Implementation)

---

## Support

For questions and support, please open an issue on GitHub.

---

**Built for the AI agent ecosystem**
