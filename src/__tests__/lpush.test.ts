import { lpush } from "../commands/lpush";
import { ErrorType, ResponseError } from "../serialization/DataType";
import { IStorageRepository } from "../repository/IStorageRepository";

describe('lpush', () => {
  let storageRepo: IStorageRepository;

  beforeEach(() => {
    storageRepo = {
      get: jest.fn(),
      set: jest.fn(),
      has: jest.fn(),
      delete: jest.fn()
    };
  });

  it('should create a new list and return its length if the key does not exist', () => {
    const key = 'mylist';
    const values = ['value1', 'value2', 'value3'];
    const expectedLength = values.length;

    storageRepo.get = jest.fn().mockReturnValueOnce(null);

    const result = lpush(key, values, storageRepo);

    expect(storageRepo.get).toHaveBeenCalledWith(key);
    expect(storageRepo.set).toHaveBeenCalledWith(key, values);
    expect(result).toBe(expectedLength);
  });

  it('should prepend values to an existing list and return the new length', () => {
    const key = 'mylist';
    const existingList = ['value3', 'value4'];
    const values = ['value1', 'value2'];
    const expectedLength = existingList.length + values.length;

    storageRepo.get = jest.fn().mockReturnValueOnce({ key, value: existingList });

    const result = lpush(key, values, storageRepo);

    expect(storageRepo.get).toHaveBeenCalledWith(key);
    expect(storageRepo.set).toHaveBeenCalledWith(key, [...values, ...existingList]);
    expect(result).toBe(expectedLength);
  });

  it('should throw a ResponseError if the value is not an array', () => {
    const key = 'mylist';
    const values = 'value1';
    const passedValues = ['value1'];

    storageRepo.get = jest.fn().mockReturnValueOnce({ key, value: values });

    expect(() => lpush(key, passedValues, storageRepo)).toThrow(ResponseError);
    expect(storageRepo.get).toHaveBeenCalledWith(key);
    expect(storageRepo.set).not.toHaveBeenCalled();
  });
});