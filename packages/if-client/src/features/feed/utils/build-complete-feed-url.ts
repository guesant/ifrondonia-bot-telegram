export const buildCompleteFeedURL = (
  baseURL: string,
  resource?: string | null,
  subdomain?: string | null
) => {
  const buildUrl = new URL(baseURL);

  if (subdomain) {
    buildUrl.host = `${subdomain}.${buildUrl.host}`;
  }

  if (resource) {
    buildUrl.pathname = resource;
  }

  return buildUrl.toString();
};
