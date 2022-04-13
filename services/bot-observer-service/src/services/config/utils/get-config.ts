import config from "config";
import { getFeedsToWatch } from "./get-feeds-to-watch";

export const getConfig = () =>
  getFeedsToWatch()
    .then((feedsToWatch) => ({
      ...config.util.toObject(),
      feedsToWatch,
    }))
    .catch(() => false);
