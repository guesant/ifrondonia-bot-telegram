import { ITransformedRemoteDataItem } from "./ITransformedRemoteDataItem";

export type ITransformedRemoteData = {
  title: string;
  description: string;
  link: string;
  lastBuildDate: number;
  generator: string;
  language: string;
  items: ITransformedRemoteDataItem[];
};
