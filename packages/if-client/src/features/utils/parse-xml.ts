import { parseStringPromise } from "xml2js";

export const parseXML = <T = unknown>(xml: string): Promise<T> =>
  parseStringPromise(xml, { explicitArray: false });
