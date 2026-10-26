import { SyntheticExercise } from '@/types';

export const ARENA_EXERCISES: SyntheticExercise[] = [
  {
    id: 'arena-01',
    title: 'Broken Object Level Authorization (BOLA) in Order Receipt API',
    domain: 'API',
    category: 'Authorization',
    difficulty: 'Beginner',
    scenario:
      'You are auditing an e-commerce API. An authenticated customer (Account ID: 501) requests their receipt via GET /api/v1/orders/10482. Notice the sequential order ID in the URL path and the customer ID returned in the JSON payload.',
    objective:
      'Examine the request and response below. Determine why an attacker with valid credentials can access other customers orders. Submit the security flaw identifier or flag to validate your finding.',
    hint: 'Look at how the resource ID (10482) is passed directly in the URL path without any contextual authorization check linking it to the authenticated session bearer token.',
    httpRequest: {
      method: 'GET',
      url: '/api/v1/orders/10482/receipt',
      headers: {
        Host: 'api.retail-store.example',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjdXN0XzUwMSIsInJvbGUiOiJ1c2VyIn0.test_sig',
        Accept: 'application/json',
        'User-Agent': 'Mozilla/5.0 (Security-Audit)',
      },
    },
    httpResponse: {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json',
        'X-Service-Node': 'order-srv-04',
      },
      body: JSON.stringify(
        {
          order_id: 10482,
          customer_id: 'cust_501',
          total_cents: 14950,
          shipping_address: '742 Evergreen Terrace, Springfield',
          payment_method: 'VISA ending in 4012',
          item_count: 3,
          download_token: 'tok_user_receipt_501_authenticated',
        },
        null,
        2
      ),
    },
  },
  {
    id: 'arena-02',
    title: 'JWT Algorithm "none" Signature Bypass',
    domain: 'API',
    category: 'Authentication',
    difficulty: 'Intermediate',
    scenario:
      'An identity gateway inspects incoming JWT tokens. The token header specifies `"alg": "none"`. If the verification library is improperly configured, it may treat an unsigned token as valid.',
    objective:
      'Inspect the Authorization header. Identify the danger of allowing algorithm negotiation from untrusted client tokens. Submit the vulnerability finding or exploit flag.',
    hint: 'A JWT consists of three base64url-encoded parts: header.payload.signature. Notice the empty signature component after the second period: "eyJhbGciOiJub25lIn0...."',
    httpRequest: {
      method: 'GET',
      url: '/api/v2/admin/telemetry',
      headers: {
        Host: 'auth.enterprise-mesh.example',
        Authorization:
          'Bearer eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiJhZG1pbl91c2VyIiwicm9sZSI6InN1cGVyX2FkbWluIiwiZXhwIjoyMDgwMDAwMDAwfQ.',
        'X-Request-Trace': 'sec-trace-991',
      },
    },
    httpResponse: {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json',
        Server: 'Gateway-Auth/2.1',
      },
      body: JSON.stringify(
        {
          authenticated_user: 'admin_user',
          role: 'super_admin',
          active_nodes: 14,
          privileged_metric: '[SIGNATURE_BYPASS_DETECTED_SUBMIT_FLAG]',
          status: 'Cluster healthy',
        },
        null,
        2
      ),
    },
  },
  {
    id: 'arena-03',
    title: 'Rate Limiting Bypass via Spoofed X-Forwarded-For Header',
    domain: 'Web',
    category: 'Business Logic',
    difficulty: 'Intermediate',
    scenario:
      'A login endpoint enforces a rate limit of 5 failed attempts per IP address. The reverse proxy blindly trusts the leftmost IP supplied in the client X-Forwarded-For header.',
    objective:
      'Analyze how an attacker can bypass IP-based throttling by rotating spoofed upstream IP addresses in the request header. Validate the flaw with the security token or finding name.',
    hint: 'If the proxy does not strip or sanitize incoming client headers, the attacker controls the IP address value used by the rate-limiter bucket.',
    httpRequest: {
      method: 'POST',
      url: '/api/auth/login',
      headers: {
        Host: 'portal.cloud-system.example',
        'Content-Type': 'application/json',
        'X-Forwarded-For': '198.51.100.84',
        'User-Agent': 'Credential-Checker/1.0',
      },
      body: JSON.stringify(
        {
          username: 'security-researcher',
          password: 'Attempt_Password_42',
        },
        null,
        2
      ),
    },
    httpResponse: {
      status: 401,
      statusText: 'Unauthorized',
      headers: {
        'Content-Type': 'application/json',
        'X-RateLimit-Limit': '5',
        'X-RateLimit-Remaining': '4',
        'X-Client-IP-Evaluated': '198.51.100.84',
      },
      body: JSON.stringify(
        {
          error: 'Invalid credentials',
          attempts_remaining: 4,
          debug_notice: 'Evaluated IP from X-Forwarded-For header',
          audit_token: '[IP_SPOOF_VALIDATED_SUBMIT_FLAG]',
        },
        null,
        2
      ),
    },
  },
  {
    id: 'arena-04',
    title: 'Mass Assignment Flaw in User Account Profile Update',
    domain: 'API',
    category: 'Access Control',
    difficulty: 'Advanced',
    scenario:
      'A profile settings form allows updating display names and bios. The backend automatically deserializes the incoming JSON body directly into the database ORM model without field whitelist filtering.',
    objective:
      'Observe how unintended fields like `is_verified` or `role` can be modified. Locate the security flaw and submit the validation token.',
    hint: 'Compare what a standard user should be allowed to edit vs what fields the database model accepts.',
    httpRequest: {
      method: 'PUT',
      url: '/api/v1/users/profile',
      headers: {
        Host: 'app.workhub.example',
        Authorization: 'Bearer user_session_token_7721',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          display_name: 'Alex Vance',
          bio: 'Independent Security Researcher',
          role: 'ADMIN',
          is_verified: true,
          billing_tier: 'ENTERPRISE_UNLIMITED',
        },
        null,
        2
      ),
    },
    httpResponse: {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          id: 'usr_8812',
          display_name: 'Alex Vance',
          role: 'ADMIN',
          is_verified: true,
          billing_tier: 'ENTERPRISE_UNLIMITED',
          access_key: '[ROLE_ELEVATED_SUBMIT_FLAG]',
          updated_at: '2026-10-25T14:20:00Z',
        },
        null,
        2
      ),
    },
  },
];
