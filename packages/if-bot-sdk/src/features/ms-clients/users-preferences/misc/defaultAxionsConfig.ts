import { AxiosRequestConfig } from "axios";
import { stringify } from "querystring";

export const defaultAxionsConfig: AxiosRequestConfig = {
  paramsSerializer: (params) => stringify(params),
};
