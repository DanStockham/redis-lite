import { set } from "../commands/set";
import { IStorageRepository } from "../repository/IStorageRepository";

describe('set', () => {
  let storageRepo: IStorageRepository;

  beforeEach(() => {
    storageRepo = {
      set: jest.fn(),
      get: jest.fn(),
      has: jest.fn(),
      delete: jest.fn(), // Add the missing 'delete' property
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call storageRepo.set with the correct arguments when subCommand is EX', () => {
    const args = ['key', 'value', 'EX', '10'];
    const expiration = new Date().getTime() + 10000;

    set(args, storageRepo);

    expect(storageRepo.set).toHaveBeenCalledWith('key', 'value', expiration);
  });

  it('should call storageRepo.set with the correct arguments when subCommand is PX', () => {
    const args = ['key', 'value', 'PX', '5000'];
    const expiration = new Date().getTime() + 5000;

    set(args, storageRepo);

    expect(storageRepo.set).toHaveBeenCalledWith('key', 'value', expiration);
  });

  it('should call storageRepo.set with the correct arguments when subCommand is EXAT', () => {
    const args = ['key', 'value', 'EXAT', '1640995200'];
    const expiration = 1640995200000;

    set(args, storageRepo);

    expect(storageRepo.set).toHaveBeenCalledWith('key', 'value', expiration);
  });

  it('should call storageRepo.set with the correct arguments when subCommand is PXAT', () => {
    const args = ['key', 'value', 'PXAT', '1640995200000'];
    const expiration = 1640995200000;

    set(args, storageRepo);

    expect(storageRepo.set).toHaveBeenCalledWith('key', 'value', expiration);
  });

  it('should call storageRepo.set with the correct arguments when subCommand is not EX, PX, EXAT, or PXAT', () => {
    const args = ['key', 'value'];

    set(args, storageRepo);

    expect(storageRepo.set).toHaveBeenCalledWith('key', 'value');
  });
});