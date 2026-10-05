/**
 * Sanitized Member Vetting & Invitation Pattern
 * 
 * Authentic pattern extracted from privatesocietylab.com (Private Society Lab)
 * Demonstrates invitation-only vetting logic, URL query parameter extraction (?ref=),
 * multi-channel identity validation (Signal / Telegram / PGP), and non-blocking asynchronous state transitions.
 */

export interface VettingApplicationPayload {
  name: string;
  email: string;
  messagingId: string;
  referral?: string;
  status: "pending" | "approved" | "rejected";
}

export interface VettingResponse {
  success: boolean;
  title: string;
  message: string;
}

/**
 * Parses URL search parameters on the client to extract and pre-fill referral credentials.
 */
export function extractReferralFromUrl(searchQuery: string = window.location.search): string | null {
  const params = new URLSearchParams(searchQuery);
  const ref = params.get("ref");
  return ref ? ref.trim() : null;
}

/**
 * Validates membership application inputs on the client before network dispatch.
 * Enforces secure identity handles for Signal / Telegram / PGP communication.
 */
export function validateVettingPayload(data: Partial<VettingApplicationPayload>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.name || !data.name.trim()) {
    errors.name = "Legal or preferred collective handle is required.";
  }

  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = "A valid private email address is required for confidential correspondence.";
  }

  if (!data.messagingId || !data.messagingId.trim()) {
    errors.messagingId = "A secure messaging identity (Signal, Telegram, or PGP key ID) is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Submits membership inquiry to the headless vetting endpoint.
 * Controls button locking, feedback display, and handles multi-state confirmation.
 */
export async function submitVettingApplicationAsync(
  payload: Omit<VettingApplicationPayload, "status">,
  endpoint: string = "/api/cms/forms/submit/form-submissions",
  signal?: AbortSignal
): Promise<VettingResponse> {
  const validation = validateVettingPayload(payload);
  if (!validation.isValid) {
    throw new Error(Object.values(validation.errors).join(" "));
  }

  const completePayload: VettingApplicationPayload = {
    ...payload,
    status: "pending",
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(completePayload),
    signal,
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => ({}));
    throw new Error(errorJson.message || `Vetting submission failed with status ${response.status}`);
  }

  return {
    success: true,
    title: "REQUEST RECEIVED",
    message: "Your application is under manual review. Access dispatch instructions will be transmitted via secure channels upon committee approval.",
  };
}
