# 🛡️ Synapse Agent Kit

**The Decentralized Surety Bond Layer for AI Agents. Compliant with Web Bot Auth.**

A TypeScript SDK for building trusted AI agents with economic accountability using the Synapse Protocol.

## 🚀 Features

- **Economic Trust Layer**: Agents backed by on-chain surety bonds
- **Cryptographic Authentication**: HMAC-SHA256 signed requests
- **Drop-in Fetch Replacement**: Works seamlessly with existing code
- **TypeScript Support**: Full type definitions included
- **Zero Dependencies**: Lightweight and secure

## 📦 Installation

```bash
npm install synapse-agent-kit
```

or

```bash
pnpm add synapse-agent-kit
```

or

```bash
yarn add synapse-agent-kit
```

## 🎯 Quick Start

```typescript
import { Synapse } from 'synapse-agent-kit';

// Initialize with your credentials
const synapse = new Synapse({
  apiKey: 'sk_live_your_api_key',
  bondId: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  agentId: 'my-agent-v1',
  debug: true
});

// Use it like fetch, but with automatic trust headers
const response = await synapse.fetch('https://api.example.com/data', {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
});

const data = await response.json();
console.log(data);
```

## 🔑 Configuration

### SynapseConfig

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiKey` | `string` | ✅ | Your Synapse API key |
| `bondId` | `string` | ✅ | Your on-chain surety bond ID |
| `agentId` | `string` | ❌ | Custom agent identifier (auto-generated if not provided) |
| `debug` | `boolean` | ❌ | Enable debug logging (default: `false`) |

## 📚 API Reference

### `synapse.fetch(url, options)`

Drop-in replacement for the native `fetch()` API. Automatically adds Synapse authentication headers.

**Parameters:**
- `url` (string): The URL to fetch
- `options` (RequestInit): Standard fetch options

**Returns:** `Promise<Response>`

### `synapse.signRequest(method, url, body?)`

Manually generate Synapse authentication headers for a request.

**Parameters:**
- `method` (string): HTTP method (GET, POST, etc.)
- `url` (string): The request URL
- `body` (string, optional): Request body for POST/PUT requests

**Returns:** `SynapseHeaders`

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

### `synapse.getConfig()`

Get the current configuration (with sanitized API key).

**Returns:** Object with `bondId`, `agentId`, `version`, and masked `apiKey`

## 🌐 Authentication Headers

Synapse automatically adds the following headers to your requests:

| Header | Description |
|--------|-------------|
| `X-Synapse-Bond-Id` | Your on-chain surety bond identifier |
| `X-Synapse-Signature` | HMAC-SHA256 signature of the request |
| `X-Synapse-Agent-Id` | Your unique agent identifier |
| `X-Synapse-Timestamp` | Request timestamp for replay protection |
| `X-Synapse-Version` | Protocol version |

## 🔐 Security

- All requests are signed using HMAC-SHA256
- Timestamps prevent replay attacks
- Bond IDs provide economic accountability
- Timing-safe signature comparison prevents timing attacks

## 📖 Examples

Check out the `/examples` directory for complete usage examples:

- **Price Monitoring Agent**: Monitor product prices across multiple stores
- **POST Requests**: Create alerts and submit data
- **Manual Signing**: Inspect authentication headers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Links

- [Official Website](https://synapse-arch.com)
- [GitHub Repository](https://github.com/mavenjang/synapse-agent-kit)
- [npm Package](https://www.npmjs.com/package/synapse-agent-kit)
- [Report Issues](https://github.com/mavenjang/synapse-agent-kit/issues)

## 💡 Support

For questions and support, please open an issue on GitHub.

---

Built with ❤️ for the AI agent ecosystem
