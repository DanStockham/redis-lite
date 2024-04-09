import { incr } from "../commands/incr";
import { IStorageRepository } from "../repository/IStorageRepository";

describe('incr', () => {
  let storageRepo: IStorageRepository;

  beforeEach(() => {
    storageRepo = {
      get: jest.fn(),
      set: jest.fn(),
      has: jest.fn(),
      delete: jest.fn()
    };
  });

  it('should increment the value of an existing key', () => {
    const key = 'counter';
    const existingValue = '5';
    const expectedValue = 6;

    storageRepo.get = jest.fn().mockReturnValueOnce({ key, value: existingValue });

    const result = incr(key, storageRepo);

    expect(storageRepo.get).toHaveBeenCalledWith(key);
    expect(storageRepo.set).toHaveBeenCalledWith(key, expectedValue.toString());
    expect(result).toBe(expectedValue);
  });

  it('should set the value to 1 for a non-existing key', () => {
    const key = 'counter';
    const expectedValue = 1;

    const mockStorageRepo = {
      ...storageRepo,
      get: jest.fn().mockReturnValueOnce(null)
    }

    const result = incr(key, mockStorageRepo);

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

    expect(() => incr(key, mockStorageRepo)).toThrow('Value is not an integer');
    expect(mockStorageRepo.get).toHaveBeenCalledWith(key);
    expect(mockStorageRepo.set).not.toHaveBeenCalled();
  });
});