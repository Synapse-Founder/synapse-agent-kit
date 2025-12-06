import crypto from 'crypto';

// Universal Test Bond ID for alpha developers (no real value required)
const TEST_BOND_ID = '0x000000000000000000000000000000000000dead';

export interface SynapseConfig {
  apiKey: string;
  bondId: string;
  agentId?: string;
  debug?: boolean;
}

export interface SynapseHeaders {
  'X-Synapse-Bond-Id': string;
  'X-Synapse-Signature': string;
  'X-Synapse-Agent-Id': string;
  'X-Synapse-Timestamp': string;
  'X-Synapse-Version': string;
}

export class Synapse {
  private apiKey: string;
  private bondId: string;
  private agentId: string;
  private debug: boolean;
  private readonly version = '1.0.2';

  constructor(config: SynapseConfig) {
    if (!config.apiKey || !config.bondId) {
      throw new Error('🚨 Synapse requires both apiKey and bondId');
    }

    this.apiKey = config.apiKey;
    this.bondId = config.bondId;
    this.agentId = config.agentId || this.generateAgentId();
    this.debug = config.debug || false;

    // Detect sandbox mode
    if (this.bondId === TEST_BOND_ID) {
      console.log('\x1b[33m🟨 SYNAPSE: Running in SANDBOX MODE (No real value bonded)\x1b[0m');
    }

    this.printBanner();
  }

  private printBanner(): void {
    const banner = `
\x1b[32m╔══════════════════════════════════════════════╗
║                                              ║
║     🛡️  SYNAPSE AGENT: SECURED & BONDED     ║
║                                              ║
║  ✓ Economic Trust Layer Active              ║
║  ✓ Web Bot Auth Protocol Enabled            ║
║  ✓ Bond ID: ${this.bondId.substring(0, 10)}...              ║
║                                              ║
╚══════════════════════════════════════════════╝\x1b[0m
`;
    console.log(banner);
  }

  private generateAgentId(): string {
    return `agent_${crypto.randomBytes(8).toString('hex')}`;
  }

  /**
   * Generates cryptographic signature for request authentication
   */
  private generateSignature(
    method: string,
    url: string,
    timestamp: string,
    body?: string
  ): string {
    const payload = `${method}:${url}:${timestamp}:${this.bondId}:${body || ''}`;
    const hmac = crypto.createHmac('sha256', this.apiKey);
    hmac.update(payload);
    return hmac.digest('hex');
  }

  /**
   * Signs a request and returns Synapse authentication headers
   */
  signRequest(
    method: string,
    url: string,
    body?: string
  ): SynapseHeaders {
    const timestamp = Date.now().toString();
    const signature = this.generateSignature(method, url, timestamp, body);

    const headers: SynapseHeaders = {
      'X-Synapse-Bond-Id': this.bondId,
      'X-Synapse-Signature': signature,
      'X-Synapse-Agent-Id': this.agentId,
      'X-Synapse-Timestamp': timestamp,
      'X-Synapse-Version': this.version,
    };

    if (this.debug) {
      console.log('\x1b[36m[SYNAPSE DEBUG]\x1b[0m Request signed:', {
        method,
        url,
        timestamp,
        signature: `${signature.substring(0, 16)}...`,
      });
    }

    return headers;
  }

  /**
   * Drop-in fetch replacement with automatic Synapse headers
   */
  async fetch(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const method = options.method || 'GET';
    const body = options.body ? String(options.body) : undefined;

    const synapseHeaders = this.signRequest(method, url, body);

    const mergedOptions: RequestInit = {
      ...options,
      headers: {
        ...options.headers,
        ...synapseHeaders,
      },
    };

    if (this.debug) {
      console.log(`\x1b[33m[SYNAPSE]\x1b[0m ${method} ${url}`);
    }

    try {
      const response = await fetch(url, mergedOptions);

      if (this.debug) {
        console.log(
          `\x1b[32m[SYNAPSE]\x1b[0m Response: ${response.status} ${response.statusText}`
        );
      }

      return response;
    } catch (error) {
      if (this.debug) {
        console.error('\x1b[31m[SYNAPSE ERROR]\x1b[0m', error);
      }
      throw error;
    }
  }

  /**
   * Verify if a request signature is valid (for server-side validation)
   */
  static verifySignature(
    signature: string,
    apiKey: string,
    method: string,
    url: string,
    timestamp: string,
    bondId: string,
    body?: string
  ): boolean {
    // Bypass cryptographic check for test Bond ID
    if (bondId === TEST_BOND_ID) {
      console.log('\x1b[33m🟨 Synapse: Test ID detected. Bypassing cryptographic check.\x1b[0m');
      return true; // Always allow test ID
    }

    const payload = `${method}:${url}:${timestamp}:${bondId}:${body || ''}`;
    const hmac = crypto.createHmac('sha256', apiKey);
    hmac.update(payload);
    const expectedSignature = hmac.digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  }

  /**
   * Get current configuration (sanitized)
   */
  getConfig() {
    return {
      bondId: this.bondId,
      agentId: this.agentId,
      version: this.version,
      apiKey: `${this.apiKey.substring(0, 7)}...`,
    };
  }
}

export default Synapse;
