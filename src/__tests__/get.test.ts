import { get } from "../commands/get";
import { IStorageRepository } from "../repository/IStorageRepository";
import { Item } from "../repository/Item";

describe('get', () => { 
  let storageRepo: IStorageRepository;

  beforeEach(() => {
    storageRepo = {
      set: jest.fn(),
      get: jest.fn(),
      has: jest.fn(),
      delete: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('retrieves the value of a key|value pair in memory storage', () => {
    const item = new Item('bar', Date.now() + 1000000)
    jest.spyOn(storageRepo, 'get').mockReturnValueOnce(item)

    const actual = get('test', storageRepo);
    expect(actual).toBe('bar');
  });

  it('retrieves null when key value pair expires', () => {
    const item = new Item('bar', Date.now() - 1000)
    jest.spyOn(storageRepo, 'get').mockReturnValueOnce(item)

    const actual = get('test', storageRepo);
    expect(actual).toBeNull();
  });

  it('retrieves null when key does not exist in storage', () => {
    jest.spyOn(storageRepo, 'get').mockReturnValueOnce(null)

    const actual = get('test', storageRepo);
    expect(actual).toBeNull();
  });

  it('deletes expired key value pair from storage', () => {
    const item = new Item('bar', Date.now() - 1000)
    jest.spyOn(storageRepo, 'get').mockReturnValueOnce(item)

    get('test', storageRepo);
    expect(storageRepo.delete).toHaveBeenCalledWith('test');
  });

  it('does not delete key value pair when it is not expired', () => {
    const item = new Item('bar', Date.now() + 1000000)
    jest.spyOn(storageRepo, 'get').mockReturnValueOnce(item)

    get('test', storageRepo);
    expect(storageRepo.delete).not.toHaveBeenCalled();
  });
});