const KIT_API_URL = "https://api.kit.com/v4";
const ALLOWED_SOURCES = new Set(["hero", "midpage", "final", "writing"]);

function isAllowedOrigin(request) {
  const origin = request.headers.origin;
  const host = request.headers.host;

  if (!origin || !host) return true;

  try {
    const originUrl = new URL(origin);
    return originUrl.host === host;
  } catch {
    return false;
  }
}

function normalizeReferrer(page, source) {
  try {
    const referrer = new URL(page);
    referrer.searchParams.set("signup_location", source);
    return referrer.toString();
  } catch {
    return "https://www.thenarrativewitness.com/";
  }
}

async function kitRequest(path, apiKey, body) {
  const response = await fetch(`${KIT_API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": apiKey,
    },
    body: JSON.stringify(body),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = Array.isArray(result.errors)
      ? result.errors.join(", ")
      : "Kit rejected the subscription request.";
    throw new Error(message);
  }

  return result;
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  if (!isAllowedOrigin(request)) {
    return response.status(403).json({ error: "Origin not allowed." });
  }

  const apiKey = process.env.KIT_API_KEY?.trim();
  const formId = process.env.KIT_FORM_ID?.trim();

  if (!apiKey || !formId) {
    console.error("Kit subscription environment variables are not configured.");
    return response.status(503).json({ error: "Email registration is temporarily unavailable." });
  }

  const { email, source, page, company } = request.body ?? {};
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const normalizedSource = ALLOWED_SOURCES.has(source) ? source : "final";

  // Hidden field for low-cost bot filtering.
  if (company) {
    return response.status(200).json({ ok: true });
  }

  if (
    normalizedEmail.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
  ) {
    return response.status(422).json({ error: "Please enter a valid email address." });
  }

  try {
    await kitRequest("/subscribers", apiKey, {
      email_address: normalizedEmail,
      state: "inactive",
    });

    await kitRequest(`/forms/${encodeURIComponent(formId)}/subscribers`, apiKey, {
      email_address: normalizedEmail,
      referrer: normalizeReferrer(page, normalizedSource),
    });

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error("Kit subscription failed:", error instanceof Error ? error.message : error);
    return response.status(502).json({ error: "Registration failed. Please try again shortly." });
  }
}
