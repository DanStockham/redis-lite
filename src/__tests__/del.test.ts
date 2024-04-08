import { del } from "../commands/del";
import { IStorageRepository } from "../repository/IStorageRepository";

describe('del', () => {
  it('should delete existing keys and return the number of deleted keys', () => {
    const keys = ['key1', 'key2', 'key3'];
    const storageRepo: IStorageRepository = {
      get: jest.fn(),
      has: jest.fn(() => true),
      set: jest.fn(),
      delete: jest.fn()
    };

    const deletedKeys = del(keys, storageRepo);

    expect(deletedKeys).toBe(3);
  });

  it('should not delete keys that do not exist and return 0', () => {
    const keys = ['key1', 'key2', 'key3'];
    const storageRepo: IStorageRepository = {
      get: jest.fn(),
      has: jest.fn(() => false),
      set: jest.fn(),
      delete: jest.fn()
    };

    const deletedKeys = del(keys, storageRepo);

    expect(deletedKeys).toBe(0);
  });

  it('should return 0 when no keys are provided', () => {
    const keys: string[] = [];
    const storageRepo: IStorageRepository = {
      get: jest.fn(),
      has: jest.fn(() => false),
      set: jest.fn(),
      delete: jest.fn()
    };

    const deletedKeys = del(keys, storageRepo);

    expect(deletedKeys).toBe(0);
  });
});