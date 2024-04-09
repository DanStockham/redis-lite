import { rpush } from "../commands/rpush";
import { ErrorType, ResponseError } from "../serialization/DataType";
import { IStorageRepository } from "../repository/IStorageRepository";

describe('rpush', () => {
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

    const result = rpush(key, values, storageRepo);

    expect(storageRepo.get).toHaveBeenCalledWith(key);
    expect(storageRepo.set).toHaveBeenCalledWith(key, values);
    expect(result).toBe(expectedLength);
  });

  it('should append values to an existing list and return the new length', () => {
    const key = 'mylist';
    const existingList = ['value1', 'value2'];
    const values = ['value3', 'value4'];
    const expectedLength = existingList.length + values.length;

    storageRepo.get = jest.fn().mockReturnValueOnce({ key, value: existingList });

    const result = rpush(key, values, storageRepo);

    expect(storageRepo.get).toHaveBeenCalledWith(key);
    expect(storageRepo.set).toHaveBeenCalledWith(key, [...existingList, ...values]);
    expect(result).toBe(expectedLength);
  });

  it('should throw a ResponseError if the value is not an array', () => {
    const key = 'mylist';
    const values = 'value1';
    const passedValues = ['value1'];

    storageRepo.get = jest.fn().mockReturnValueOnce({ key, value: values });

    expect(() => rpush(key, passedValues, storageRepo)).toThrow(ResponseError);
    expect(storageRepo.get).toHaveBeenCalledWith(key);
    expect(storageRepo.set).not.toHaveBeenCalled();
  });
});