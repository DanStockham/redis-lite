import { Item } from "./Item";

export interface IStorageRepository {
  set(key: string, value: any, expiration?: number): void;
  get(key: string): Item | null;
  has(key: string): boolean;
  delete(key: string): void;
}