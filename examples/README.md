# Synapse Agent Kit Examples

This directory contains working examples demonstrating how to use Synapse Agent Kit in real-world scenarios.

## Available Examples

### 1. Basic Bot (`basic-bot.ts`)

The simplest way to get started with Synapse Agent Kit.

**What it demonstrates:**
- SDK initialization
- Making authenticated GET requests
- Viewing configuration

**Run it:**
```bash
npx tsx examples/basic-bot.ts
```

---

### 2. Server-Side Validation (`server-validation.ts`)

Shows how API providers can verify incoming requests from Synapse-authenticated agents.

**What it demonstrates:**
- Extracting Synapse headers
- Signature verification
- Timestamp validation (replay attack prevention)
- Request authorization flow

**Run it:**
```bash
npx tsx examples/server-validation.ts
```

Then in another terminal, test it with:
```bash
curl -X POST http://localhost:3000/api/test \
  -H "Content-Type: application/json" \
  -H "X-Synapse-Bond-Id: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb" \
  -H "X-Synapse-Signature: <signature>" \
  -H "X-Synapse-Timestamp: $(date +%s)000" \
  -d '{"test": "data"}'
```

---

### 3. Error Handling (`error-handling.ts`)

Comprehensive guide to handling errors in production environments.

**What it demonstrates:**
- Bond expiration handling
- Insufficient stake errors
- Invalid signature recovery
- Rate limiting strategies
- Network error resilience
- Retry logic with exponential backoff

**Run it:**
```bash
npx tsx examples/error-handling.ts
```

---

## Prerequisites

Install TypeScript execution environment:

```bash
npm install -g tsx
```

Or use with `npx` (no installation needed):

```bash
npx tsx examples/basic-bot.ts
```

---

## Configuration

Before running the examples, update the credentials in each file:

```typescript
const synapse = new Synapse({
  apiKey: 'sk_live_your_api_key_here', // Replace with your API key
  bondId: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', // Replace with your bond ID
  agentId: 'your-agent-id'
});
```

### Test Mode

For testing without real credentials, use the universal test bond ID:

```typescript
const synapse = new Synapse({
  apiKey: 'sk_test_key',
  bondId: '0x000000000000000000000000000000000000dead', // Universal test ID
  debug: true
});
```

---

## Production Checklist

Before deploying to production:

- [ ] Replace test credentials with real API keys
- [ ] Set up proper error handling and logging
- [ ] Implement retry logic for network failures
- [ ] Monitor bond expiration dates
- [ ] Set up alerts for low stake balances
- [ ] Use environment variables for sensitive data
- [ ] Enable debug mode only in development

---

## Additional Resources

- **Documentation**: [synapse-arch.com](https://synapse-arch.com)
- **API Reference**: [README.md](../README.md#api-reference)
- **GitHub Issues**: [Report a bug](https://github.com/Synapse-Founder/synapse-agent-kit/issues)
- **NPM Package**: [npmjs.com/package/synapse-agent-kit](https://www.npmjs.com/package/synapse-agent-kit)

---

## Contributing

Found a bug or want to add a new example? We welcome contributions!

1. Fork the repository
2. Create your feature branch
3. Add your example with clear documentation
4. Submit a pull request

See [CONTRIBUTING.md](../CONTRIBUTING.md) for detailed guidelines.
