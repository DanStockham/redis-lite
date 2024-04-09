import { ResponseError, ErrorType } from "../serialization/DataType";

export function lpush(key: string, values: string[], storageRepository: any): number {
  const storedList = storageRepository.get(key)?.value;

  if(!storedList) {
    const newList = [...values];
    storageRepository.set(key, newList);
    return newList.length;
  }

  if(!Array.isArray(storedList)) {
    throw new ResponseError(ErrorType.WrongType, 'Operation against a key holding the wrong kind of value');
  }

  const mergedList = [...values, ...storedList];

  storageRepository.set(key, mergedList);

  return mergedList.length;

}