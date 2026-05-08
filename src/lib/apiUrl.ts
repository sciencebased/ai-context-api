// Build a URL into the static API surface that respects the deployed base
// path. In dev (BASE_URL='/') this returns '/api/foo'. On GitHub Pages
// (BASE_URL='/ai-context-api/') it returns '/ai-context-api/api/foo'.
export const apiUrl = (pathOrPathSegments: string): string => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const tail = pathOrPathSegments.replace(/^\//, "");
  return `${base}/${tail}`;
};
