export const getTargetRSSURL = (targetURL: string) => {
  const targetRSSURL = new URL(targetURL);

  targetRSSURL.searchParams.set("format", "feed");
  targetRSSURL.searchParams.set("type", "rss");

  return targetRSSURL.toString();
};
