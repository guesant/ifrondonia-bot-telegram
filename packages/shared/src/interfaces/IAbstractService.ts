export interface IAbstractService {
  start?(): Promise<void>;

  stop?(reason?: string): Promise<void>;
}
