import { IStorageRepository } from "../repository/IStorageRepository";
import { Item } from "../repository/Item";

export function get(key:string, storageRepo: IStorageRepository): string | null {
  const item: Item | null = storageRepo.get(key);
  const currentTime = Date.now();

  if(!item) {
    return null;
  }
  
  if(currentTime > item?.expiration) {
    storageRepo.delete(key);
    return null
  }

  return item.value;
}