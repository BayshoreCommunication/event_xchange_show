/* Small helpers shared by the guest pitch, suggest-a-guest and
   newsletter forms. */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_RX = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i;

export const isEmail = (v: string) => EMAIL.test(v.trim());

export const isUrl = (v: string) => URL_RX.test(v.trim());

/** Accepts one or more links separated by commas. */
export const isUrlList = (v: string) =>
  v
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .every(isUrl);

export type SubmitResult = { preview: boolean };

/**
 * POSTs the payload as JSON. With no endpoint configured the form runs in
 * preview mode: nothing is sent and `{ preview: true }` is returned.
 */
export async function submitForm(endpoint: string, payload: Record<string, unknown>): Promise<SubmitResult> {
  if (!endpoint) {
    await new Promise((r) => setTimeout(r, 650));
    return { preview: true };
  }
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Request failed");
  return { preview: false };
}

export const readLocal = <T,>(key: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const writeLocal = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

export const removeLocal = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch {}
};
