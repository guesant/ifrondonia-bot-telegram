export interface IConfigServiceDependent {
  onConfigUpdated?(): Promise<void>;
}
