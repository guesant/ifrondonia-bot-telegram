import axios, { AxiosInstance } from "axios";
import { defaultAxionsConfig } from "./misc/defaultAxionsConfig";
import { defaultAxiosInstance } from "./misc/defaultAxiosInstance";

export class UsersPreferencesServiceClient {
  private http: AxiosInstance = defaultAxiosInstance;

  #endpointURL: string | null = null;

  get endpointURL() {
    return this.#endpointURL;
  }

  set endpointURL(value: string | null) {
    this.#endpointURL = value;
    this.http = this.#endpointURL
      ? axios.create({ ...defaultAxionsConfig, baseURL: this.#endpointURL })
      : defaultAxiosInstance;
  }

  constructor(endpointURL = process.env.USERS_PREFERENCES_SERVICE_APP!) {
    this.endpointURL = endpointURL;
  }

  async setup() {}

  async stop() {}

  async listAllSubscribedFeeds() {
    const { data } = await this.http({
      url: "/feeds/all-subscribed",
    });

    return data as string[];
  }
}
