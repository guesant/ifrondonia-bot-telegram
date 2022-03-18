export type IConfigFeedInfo = {
  id: string;
  path: {
    subdomain?: string | null;
    resource: string;
  };
};
