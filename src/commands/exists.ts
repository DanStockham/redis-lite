import { IStorageRepository } from "../repository/IStorageRepository";

export function exists(keys: string[], storageRepo: IStorageRepository): number {
  if(keys.length === 0) {
    return 0;
  }

  let acc = 0;

  for(let key of keys) {
    if(storageRepo.has(key)) {
      acc++;
    }
  }

  return acc;
}