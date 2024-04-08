import { exists } from "../commands/exists";
import { IStorageRepository } from "../repository/IStorageRepository";

describe('exists', () => {
  it('should return 0 when keys array is empty', () => {
    const keys: string[] = [];
    const storageRepo: IStorageRepository = {
      get: jest.fn(),
      has: jest.fn(),
      set: jest.fn(),
      delete: jest.fn()
    };

    const result = exists(keys, storageRepo);

    expect(result).toBe(0);
    expect(storageRepo.has).not.toHaveBeenCalled();
  });

  it('should return the number of existing keys', () => {
    const keys = ['key1', 'key2', 'key3'];
    const storageRepo: IStorageRepository = {
      get: jest.fn(),
      has: jest.fn((key: string) => key === 'key1' ? true : false),
      set: jest.fn(),
      delete: jest.fn()
    };

    const result = exists(keys, storageRepo);

    expect(storageRepo.has).toHaveBeenCalledTimes(3);
    expect(storageRepo.has).toHaveBeenCalledWith('key1');
    expect(storageRepo.has).toHaveBeenCalledWith('key2');
    expect(storageRepo.has).toHaveBeenCalledWith('key3');
    expect(result).toBe(1);
  });
});