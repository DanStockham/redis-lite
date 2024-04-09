import { decr } from "../commands/decr";
import { IStorageRepository } from "../repository/IStorageRepository";

describe('decr', () => {
  let storageRepo: IStorageRepository;

  beforeEach(() => {
    storageRepo = {
      get: jest.fn(),
      set: jest.fn(),
      has: jest.fn(),
      delete: jest.fn()
    };
  });

  it('should decrement the value of an existing key', () => {
    const key = 'counter';
    const existingValue = '5';
    const expectedValue = 4;

    storageRepo.get = jest.fn().mockReturnValueOnce({ key, value: existingValue });

    const result = decr(key, storageRepo);

    expect(storageRepo.get).toHaveBeenCalledWith(key);
    expect(storageRepo.set).toHaveBeenCalledWith(key, expectedValue.toString());
    expect(result).toBe(expectedValue);
  });

  it('should set the value to 0 for a non-existing key', () => {
    const key = 'counter';
    const expectedValue = 0;

    const mockStorageRepo = {
      ...storageRepo,
      get: jest.fn().mockReturnValueOnce(null)
    }

    const result = decr(key, mockStorageRepo);

    expect(mockStorageRepo.get).toHaveBeenCalledWith(key);
    expect(mockStorageRepo.set).toHaveBeenCalledWith(key, expectedValue.toString());
    expect(result).toBe(expectedValue);
  });

  it('should throw an error if the value is not an integer', () => {
    const key = 'counter';
    const nonIntegerValue = 'abc';

    const mockStorageRepo = {
      ...storageRepo,
      get: jest.fn().mockReturnValueOnce({ key, value: nonIntegerValue })
    }

    expect(() => decr(key, mockStorageRepo)).toThrow('Value is not an integer');
    expect(mockStorageRepo.get).toHaveBeenCalledWith(key);
    expect(mockStorageRepo.set).not.toHaveBeenCalled();
  });
});