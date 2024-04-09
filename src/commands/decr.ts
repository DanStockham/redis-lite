import { IStorageRepository } from "../repository/IStorageRepository";

export function decr(key: string, storageRepo: IStorageRepository): number {
  const val = storageRepo.get(key)?.value;

  let parsedVal;
  
  if(!val) {
    parsedVal = 0;
    storageRepo.set(key, parsedVal.toString());
    return parsedVal;
  } else {
    parsedVal = parseInt(val);
  }

  if(isNaN(parsedVal)) {
    throw new Error('Value is not an integer');
  }

  parsedVal--;

  storageRepo.set(key, parsedVal.toString());

  return parsedVal;
}