export async function getBetterAuthHeaders() {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_BETTER_AUTH_URL || process.env.BETTER_AUTH_URL || "http://localhost:3000";

    const res = await fetch(`${origin}/api/auth/jwt`, { cache: "no-store" }).catch(() => null);
    if (res && res.ok) {
      const data = await res.json().catch(() => ({}));
      const token = data?.token || data?.jwt;
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }
  } catch {
    // If fetching token fails, return base Content-Type header
  }

  return headers;
}
