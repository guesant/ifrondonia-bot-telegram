import { parseStringPromise, ParserOptions } from "xml2js";

export const parseXML = <T = unknown>(
  xml: string,
  options?: ParserOptions
): Promise<T> =>
  parseStringPromise(xml, {
    explicitArray: false,
    ...options,
  });
