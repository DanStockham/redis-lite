import { IStorageRepository } from "../repository/IStorageRepository";

export function del(keys: string[], storageRepo: IStorageRepository): number {
  let deletedKeys = 0;

  for(let key of keys) {
    if(storageRepo.has(key)) {
      storageRepo.delete(key);
      deletedKeys++;
    }
  }

  return deletedKeys;
}
  