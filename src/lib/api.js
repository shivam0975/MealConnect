/**
 * Thin wrapper around the Netlify Functions API.
 *
 * `/api/*` is rewritten to `/.netlify/functions/*` by netlify.toml, so paths
 * here stay readable. Identity keeps its session in the `nf_jwt` cookie, which
 * `credentials: "include"` sends along — that is how the functions know who is
 * calling.
 */

const request = async (path, { method = "GET", body } = {}) => {
  const response = await fetch(`/api/${path}`, {
    method,
    credentials: "include",
    headers: body ? { "content-type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  // A function that crashes outright can return HTML, so do not assume JSON.
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(
      payload?.error || `Request failed (${response.status})`
    );
    error.status = response.status;
    throw error;
  }

  return payload;
};

export const donationsApi = {
  list: () => request("donations"),
  create: (donation) => request("donations", { method: "POST", body: donation }),
  setStatus: (id, status) =>
    request("donations", { method: "PATCH", body: { id, status } }),
  remove: (id) => request(`donations?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  }),
};

export default request;
