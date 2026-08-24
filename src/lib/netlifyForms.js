/**
 * Submit a form to Netlify Forms from a client-rendered React form.
 *
 * Two rules from the Netlify docs that are easy to get wrong:
 *   1. The body must be URL-encoded, not JSON.
 *   2. `form-name` must be present and must match the hidden form declared in
 *      index.html — that hidden copy is what registers the form at deploy time.
 *
 * The honeypot (`bot-field`) is sent empty; a bot filling it in gets the
 * submission silently dropped as spam.
 */
export const submitNetlifyForm = async (formName, fields) => {
  const body = new URLSearchParams({
    "form-name": formName,
    "bot-field": "",
    ...fields,
  });

  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(
      `Netlify could not accept that submission (${response.status}).`
    );
  }
};

export default submitNetlifyForm;
