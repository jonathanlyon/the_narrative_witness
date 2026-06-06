export type SignupSource = "hero" | "midpage" | "final";

export interface SignupResult {
  configured: boolean;
}

const configuredEndpoint = import.meta.env.VITE_SUBSCRIBE_ENDPOINT?.trim();
const endpoint = configuredEndpoint || (import.meta.env.PROD ? "/api/subscribe" : "");

export const kickstarterPrelaunchUrl =
  import.meta.env.VITE_KICKSTARTER_PRELAUNCH_URL?.trim() || "";

export const hasKickstarterPrelaunchUrl = kickstarterPrelaunchUrl.length > 0;

export async function subscribeReader(email: string, source: SignupSource): Promise<SignupResult> {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail || !normalizedEmail.includes("@")) {
    throw new Error("Please enter a valid email address.");
  }

  const payload = {
    email: normalizedEmail,
    source,
    page: window.location.href,
    submittedAt: new Date().toISOString(),
    company: "",
  };

  if (!endpoint) {
    localStorage.setItem(`narrative_witness_signup_${source}`, JSON.stringify(payload));
    return { configured: false };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Something went wrong. Please try again in a moment.");
  }

  return { configured: true };
}
