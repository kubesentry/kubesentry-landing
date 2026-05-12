/**
 * POST /api/subscribe
 *
 * Cloudflare Pages Function that proxies email signups to Buttondown.
 * The Buttondown API token lives in an env var (BUTTONDOWN_API_KEY) and
 * never leaves the server.
 *
 * Configure in Cloudflare Dashboard:
 *   Pages → kubesentry-landing → Settings → Environment variables
 *   Add: BUTTONDOWN_API_KEY = your_token_here
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  // Basic CORS / method handling
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    // Parse request body
    const body = await request.json();
    const email = (body.email || '').trim().toLowerCase();

    // Validate email
    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Invalid email address' }),
        { status: 400, headers }
      );
    }

    // Check API key configured
    if (!env.BUTTONDOWN_API_KEY) {
      console.error('BUTTONDOWN_API_KEY not set');
      return new Response(
        JSON.stringify({ ok: false, error: 'Server misconfigured' }),
        { status: 500, headers }
      );
    }

    // Subscribe via Buttondown API
    // Docs: https://docs.buttondown.email/api-reference
    const buttondownRes = await fetch(
      'https://api.buttondown.email/v1/subscribers',
      {
        method: 'POST',
        headers: {
          Authorization: `Token ${env.BUTTONDOWN_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          tags: ['landing-page', 'early-access'],
          referrer_url: request.headers.get('referer') || 'https://kubesentry.io',
        }),
      }
    );

    // Buttondown returns 201 on new sub, 400 on duplicate.
    // Both are "OK" from the user's perspective.
    if (buttondownRes.status === 201) {
      return new Response(
        JSON.stringify({ ok: true, status: 'subscribed' }),
        { status: 200, headers }
      );
    }

    if (buttondownRes.status === 400) {
      // Likely a duplicate — gracefully treat as success
      const errorBody = await buttondownRes.text();
      if (errorBody.toLowerCase().includes('already')) {
        return new Response(
          JSON.stringify({ ok: true, status: 'already-subscribed' }),
          { status: 200, headers }
        );
      }
      // Other 400 errors (bad email format from Buttondown side)
      return new Response(
        JSON.stringify({ ok: false, error: 'Invalid email' }),
        { status: 400, headers }
      );
    }

    // Unexpected error from Buttondown
    const errorBody = await buttondownRes.text();
    console.error('Buttondown API error:', buttondownRes.status, errorBody);
    return new Response(
      JSON.stringify({ ok: false, error: 'Subscription service unavailable' }),
      { status: 502, headers }
    );
  } catch (err) {
    console.error('Subscribe endpoint error:', err);
    return new Response(
      JSON.stringify({ ok: false, error: 'Server error' }),
      { status: 500, headers }
    );
  }
}

// Reject GET and other methods
export async function onRequest(context) {
  return new Response(
    JSON.stringify({ ok: false, error: 'Method not allowed' }),
    {
      status: 405,
      headers: { 'Content-Type': 'application/json', Allow: 'POST' },
    }
  );
}

function isValidEmail(email) {
  // Simple email regex — Buttondown will do real validation server-side
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length < 256;
}
