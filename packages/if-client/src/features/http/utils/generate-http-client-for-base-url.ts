import axios from "axios";
import { Logger } from "winston";

export const generateHTTPClientForBaseURL = (
  baseURL: string | null = null,
  logger: Logger | null = null
) => {
  const http = axios.create(Object.assign({}, baseURL ? { baseURL } : {}));

  if (logger) {
    http.interceptors.request.use(
      (config) => {
        logger.http({
          action: "client.http",
          status: "request.start",
          args: { config },
        });

        return config;
      },
      (error) => {
        logger.error({
          action: "client.http",
          status: "request.error",
          args: { error },
        });

        return Promise.reject(error);
      }
    );

    http.interceptors.response.use(
      (response) => {
        logger.debug({
          action: "client.http",
          status: "response.ok",
          args: { response },
        });

        return response;
      },
      (error) => {
        logger.error({
          action: "client.http",
          status: "response.error",
          args: { error },
        });

        return Promise.reject(error);
      }
    );
  }

  return http;
};
