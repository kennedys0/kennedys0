import { SecurityWriteup } from '@/types';

export const WRITEUPS: SecurityWriteup[] = [
  {
    slug: 'bola-multitenant-graphql-federation',
    title: 'Dissecting Broken Object Level Authorization in Federated GraphQL Subgraphs',
    summary: 'A deep dive into how decoupled microservice resolvers in Apollo Federation can fail to propagate tenant authorization contexts, leading to stealthy data cross-contamination.',
    category: 'API Security',
    domain: 'API',
    readingTime: '7 min read',
    publishedAt: '2026-07-22',
    tags: ['GraphQL', 'BOLA', 'Authorization', 'Microservices', 'Apollo'],
    content: `
### Overview
GraphQL Federation enables organizations to split massive monolithic schemas into independently deployable subgraphs. While this enhances developer velocity, it decentralizes the authorization boundary. In this writeup, we analyze a real-world scenario where a sub-graph entity resolver relied on the gateway for tenant enforcement, leaving direct entity references unprotected.

### The Attack Surface
In Apollo Federation, entity resolution uses the \`_entities\` query:

\`\`\`graphql
query ($representations: [_Any!]!) {
  _entities(representations: $representations) {
    ... on OrganizationInvoice {
      id
      amount
      billingContactEmail
      lineItems {
        description
        total
      }
    }
  }
}
\`\`\`

When the frontend gateway processes a query, it resolves composite types across multiple microservices. If the \`BillingService\` subgraph does not explicitly inspect the requesting user's tenant ID from the injected JWT headers, any valid representation key can be hydrated.

### Root Cause
The microservice resolver assumed authentication performed by the API Gateway was sufficient proof of authorization:

\`\`\`typescript
// Vulnerable Resolver in Billing Subgraph
const resolvers = {
  OrganizationInvoice: {
    __resolveReference(reference, context) {
      // Flaw: reference.id is queried directly without verifying context.user.tenantId
      return db.invoices.findById(reference.id);
    }
  }
};
\`\`\`

### Technical Impact
An attacker with an account in Tenant A could capture a legitimate GraphQL request, swap the \`invoiceId\` with an enumerated or intercepted UUID belonging to Tenant B, and the federated query engine would fetch Tenant B's sensitive financial data.

### Remediation
1. **Enforce Tenant Context in Resolvers**: Never trust entity keys alone. Always join against the authenticated user's organization scope:

\`\`\`typescript
// Secure Resolver
const resolvers = {
  OrganizationInvoice: {
    async __resolveReference(reference, context) {
      const invoice = await db.invoices.findOne({
        where: {
          id: reference.id,
          tenantId: context.user.tenantId // Mandatory scope assertion
        }
      });
      if (!invoice) throw new ForbiddenError('Access Denied');
      return invoice;
    }
  }
};
\`\`\`

2. **Schema Directives**: Apply authorization directives (e.g., \`@auth(requires: TENANT_MATCH)\`) evaluated during AST traversal before query execution.
    `,
  },
  {
    slug: 'second-order-ssrf-webhook-pipelines',
    title: 'Second-Order Blind SSRF via Asynchronous Webhook Pipelines',
    summary: 'Exploring why synchronous URL validation fails when background task queues fetch webhook targets asynchronously without re-validating DNS resolutions.',
    category: 'Server-Side Request Handling',
    domain: 'Web',
    readingTime: '9 min read',
    publishedAt: '2026-05-18',
    tags: ['SSRF', 'DNS Rebinding', 'Webhooks', 'Cloud Security'],
    content: `
### Background
Webhooks are ubiquitous in SaaS applications for sending event-driven notifications to customers. To protect internal infrastructure from Server-Side Request Forgery (SSRF), applications commonly validate customer-supplied URLs against private IP ranges (e.g., RFC 1918, 169.254.169.254, 127.0.0.1).

However, a serious vulnerability emerges when validation occurs at registration time, but execution occurs minutes or hours later in worker containers.

### The Vulnerability Architecture
1. **Registration**: Submitter provides \`https://webhook.attacker.example/receive\`.
2. **Synchronous Check**: The API resolves \`webhook.attacker.example\` to \`203.0.113.50\` (Public IP). Check passes; URL saved to database.
3. **Execution**: An event occurs. The worker process reads the URL and dispatches an HTTP POST request.
4. **DNS Rebinding**: The attacker's DNS server now responds with TTL=0 and IP \`169.254.169.254\`.
5. **Exploitation**: The worker connects to the cloud metadata service and forwards AWS IAM session tokens back to the attacker.

### Key Takeaways & Defense-in-Depth
- **Validate at Connection Time, Not Validation Time**: The HTTP client socket must pin the connection to the validated IP directly.
- **Dedicated Egress Proxies**: Route all external webhook requests through an isolated DMZ proxy with hardware egress firewalls blocking private CIDR blocks.
- **Disable Redirects**: Prevent the destination server from issuing a 302 redirect back into private internal microservice hostnames.
    `,
  },
  {
    slug: 'race-conditions-idempotency-deduplication',
    title: 'Race Conditions in Idempotency-Key Deduplication Logic',
    summary: 'Analyzing concurrent HTTP requests and time-of-check to time-of-use (TOCTOU) flaws in distributed idempotency implementations.',
    category: 'Business Logic',
    domain: 'Web',
    readingTime: '6 min read',
    publishedAt: '2026-02-15',
    tags: ['Race Condition', 'Idempotency', 'Concurrency', 'Redis'],
    content: `
### Introduction
Idempotency keys prevent duplicate payments and operations when network retries occur. Standard RFC specifications suggest caching the idempotency key and returning the cached response if repeated within a given TTL window.

### The Concurrency Window
When a naive implementation uses standard multi-step cache checks:

\`\`\`python
# Vulnerable Pattern
def process_order(idempotency_key, payload):
    cached = redis.get(f"idempotency:{idempotency_key}")
    if cached:
        return json.loads(cached)
    
    # 10ms execution gap
    result = execute_payment(payload)
    
    redis.set(f"idempotency:{idempotency_key}", json.dumps(result), ex=3600)
    return result
\`\`\`

If two identical requests arrive within 10ms of each other, both evaluate \`cached == None\`. Both dispatch payment transactions to the bank.

### Solution
Use atomic lock acquisition or Redis \`SET key value NX EX\` prior to executing any state-altering logic:

\`\`\`python
# Hardened Atomic Pattern
def process_order(idempotency_key, payload):
    lock_acquired = redis.set(f"lock:{idempotency_key}", "processing", nx=True, ex=30)
    if not lock_acquired:
        raise ConcurrencyConflictException("Request is already in flight.")
    
    try:
        result = execute_payment(payload)
        redis.set(f"result:{idempotency_key}", json.dumps(result), ex=3600)
        return result
    finally:
        redis.delete(f"lock:{idempotency_key}")
\`\`\`
    `,
  },
];
