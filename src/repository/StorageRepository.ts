import { IStorageRepository } from "./IStorageRepository";
import { Item } from "./Item";

export class StorageRepository implements IStorageRepository{
  private storage: Map<string, Item>;

  constructor() {
    this.storage = new Map<string, Item>();
  }

  set(key: string, value: any, expiration?: number): void {
    const dateUnixTime = expiration ?? new Date().getTime();
    this.storage.set(
      key, 
      new Item(value, dateUnixTime)
    );
  }

  get(key: string): Item | null {
    return this.storage.get(key) || null;
  }

  delete(key: string): void {
    this.storage.delete(key);
  }

  has(key: string): boolean {
    return this.storage.has(key);
  }
}

export default StorageRepository;