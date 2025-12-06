# 🛡️ Synapse Agent Kit

[![npm version](https://img.shields.io/npm/v/synapse-agent-kit.svg)](https://www.npmjs.com/package/synapse-agent-kit)
[![npm downloads](https://img.shields.io/npm/dm/synapse-agent-kit.svg)](https://www.npmjs.com/package/synapse-agent-kit)
[![Build Status](https://img.shields.io/github/actions/workflow/status/Chimera-Founder/synapse-agent-kit/main.yml?branch=main)](https://github.com/Chimera-Founder/synapse-agent-kit/actions)
[![license](https://img.shields.io/npm/l/synapse-agent-kit.svg)](https://github.com/Chimera-Founder/synapse-agent-kit/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue.svg)](https://www.typescriptlang.org/)

**The Decentralized Surety Bond Layer for AI Agents. Compliant with Web Bot Auth.**

Stop getting blocked by Cloudflare, Datadome, and other anti-bot systems. Build trust through cryptographic proof and economic accountability, not IP rotation.

---

## 🚨 The Problem

Your AI agent works perfectly in testing, but in production:
- ❌ Cloudflare blocks it with 403 errors
- ❌ CAPTCHAs appear constantly
- ❌ Rate limits kick in immediately
- ❌ IP rotation doesn't help anymore

**The real issue?** Your agent has no way to prove it's trustworthy.

---

## ✨ The Solution

Synapse Agent Kit implements the **Web Bot Auth** standard with a **Surety Bond** mechanism. Instead of hiding your agent's identity, you cryptographically prove it and back it with economic accountability.

### How It Works

1. **Identity**: Your agent has a unique, verifiable ID
2. **Bond**: You stake economic value as collateral for good behavior
3. **Signature**: Every request is cryptographically signed with HMAC-SHA256
4. **Headers**: Trust proof is automatically injected into HTTP headers

Servers can verify these headers and trust your agent because there's real economic stake backing its behavior.

---

## 🚀 Quick Start

### Installation

```bash
npm install synapse-agent-kit
```

### Basic Usage

```typescript
import { Synapse } from 'synapse-agent-kit';

// Initialize with your credentials
const synapse = new Synapse({
  apiKey: 'sk_live_your_api_key',
  bondId: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  agentId: 'my-agent-v1',
  debug: true
});

// Use it exactly like fetch, but with automatic trust headers
const response = await synapse.fetch('https://api.example.com/data', {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
});

const data = await response.json();
console.log(data);
```

That's it! Your agent is now backed by economic trust.

---

## 🎯 Features

### 🔐 Economic Trust Layer
Agents backed by on-chain surety bonds that prove economic accountability.

### 🔑 Cryptographic Authentication
HMAC-SHA256 signed requests with timestamp-based replay attack prevention.

### 🔄 Drop-in Fetch Replacement
Works seamlessly with existing code. Just replace `fetch` with `synapse.fetch`.

### 📘 TypeScript Support
Full type definitions included for the best developer experience.

### 🪶 Zero Dependencies
Lightweight and secure. No bloat, no vulnerabilities.

### ⚡ Production Ready
Battle-tested and used in production environments.

---

## 📚 API Reference

### `new Synapse(config)`

Creates a new Synapse instance.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiKey` | `string` | ✅ | Your Synapse API key |
| `bondId` | `string` | ✅ | Your on-chain surety bond ID |
| `agentId` | `string` | ❌ | Custom agent identifier (auto-generated if not provided) |
| `debug` | `boolean` | ❌ | Enable debug logging (default: `false`) |

### `synapse.fetch(url, options)`

Drop-in replacement for the native `fetch()` API. Automatically adds Synapse authentication headers.

**Parameters:**
- `url` (string): The URL to fetch
- `options` (RequestInit): Standard fetch options

**Returns:** `Promise<Response>`

**Example:**

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

Manually generate Synapse authentication headers for a request.

**Parameters:**
- `method` (string): HTTP method (GET, POST, etc.)
- `url` (string): The request URL
- `body` (string, optional): Request body for POST/PUT requests

**Returns:** `SynapseHeaders`

**Example:**

```typescript
const headers = synapse.signRequest('GET', 'https://api.example.com/data');
console.log(headers);
// {
//   'X-Synapse-Bond-Id': '0x742d35Cc...',
//   'X-Synapse-Signature': 'a3f2b1c...',
//   'X-Synapse-Agent-Id': 'agent_abc123',
//   'X-Synapse-Timestamp': '1701234567890',
//   'X-Synapse-Version': '1.0.0'
// }
```

### `Synapse.verifySignature(signature, apiKey, method, url, timestamp, bondId, body?)`

Static method for server-side signature verification.

**Parameters:**
- `signature` (string): The signature to verify
- `apiKey` (string): The API key used to sign the request
- `method` (string): HTTP method
- `url` (string): Request URL
- `timestamp` (string): Request timestamp
- `bondId` (string): Bond ID from the request
- `body` (string, optional): Request body

**Returns:** `boolean`

**Example:**

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

### `synapse.getConfig()`

Get the current configuration (with sanitized API key).

**Returns:** Object with `bondId`, `agentId`, `version`, and masked `apiKey`

---

## 🌐 Authentication Headers

Synapse automatically adds the following headers to your requests:

| Header | Description |
|--------|-------------|
| `X-Synapse-Bond-Id` | Your on-chain surety bond identifier |
| `X-Synapse-Signature` | HMAC-SHA256 signature of the request |
| `X-Synapse-Agent-Id` | Your unique agent identifier |
| `X-Synapse-Timestamp` | Request timestamp for replay protection |
| `X-Synapse-Version` | Protocol version |

---

## 🔐 Security

- **HMAC-SHA256 Signing**: All requests are cryptographically signed
- **Replay Attack Prevention**: Timestamps prevent request replay
- **Economic Accountability**: Bond IDs provide real economic stake
- **Timing-Safe Comparison**: Prevents timing attacks on signature verification

---

## 📖 Examples

Check out the `/examples` directory for complete usage examples:

### Price Monitoring Agent

Monitor product prices across multiple stores without getting blocked.

```typescript
const synapse = new Synapse({
  apiKey: 'sk_live_demo_abc123xyz789',
  bondId: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  agentId: 'price-monitor-v1',
  debug: true
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

### POST Requests

Create alerts and submit data with automatic authentication.

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

### Manual Header Inspection

Inspect the generated headers for debugging or custom implementations.

```typescript
const headers = synapse.signRequest(
  'GET',
  'https://api.example.com/secure-endpoint'
);

console.log('Generated Synapse Headers:');
Object.entries(headers).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- [Official Website](https://synapse-arch.com)
- [GitHub Repository](https://github.com/Synapse-Founder/synapse-agent-kit)
- [npm Package](https://www.npmjs.com/package/synapse-agent-kit)
- [Report Issues](https://github.com/Synapse-Founder/synapse-agent-kit/issues)

---

## 💡 Support

For questions and support, please open an issue on GitHub.

---

## 🌟 Show Your Support

If this project helped you, please consider giving it a ⭐️ on GitHub!

---

**Built with ❤️ for the AI agent ecosystem**
