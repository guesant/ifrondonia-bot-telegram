import axios from "axios";
import { defaultAxionsConfig } from "./defaultAxionsConfig";

export const defaultAxiosInstance = axios.create({ ...defaultAxionsConfig });
