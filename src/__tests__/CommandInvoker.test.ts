import { CommandInvoker } from '../CommandInvoker';
import { IStorageRepository } from '../repository/IStorageRepository';
import { Item } from '../repository/Item';
import { ResponseError } from '../serialization/DataType';

describe('invokeCommand', () => {
  let mockRepo: IStorageRepository;
  let commandInvoker: CommandInvoker;

  beforeEach(() => {
    mockRepo = {
      set: jest.fn(),
      get: jest.fn(),
      has: jest.fn(), // Add this line
      delete: jest.fn(), // Add this line
    };
    commandInvoker = new CommandInvoker(mockRepo);
  });
  it('should return "PONG" when command is "PING"', async () => {
    const mockRepo = jest.fn(() => { }) as unknown as IStorageRepository;
    const result = await new CommandInvoker(mockRepo).invokeCommand(['PING']);
    expect(result).toBe('PONG');
  });

  it('should return the first argument when command is "ECHO"', async () => {
    const mockRepo = jest.fn(() => { }) as unknown as IStorageRepository;
    const result = await new CommandInvoker(mockRepo).invokeCommand(['ECHO', 'Hello, World!']);
    expect(result).toBe('Hello, World!');
  });

  it('should throw an error when command is unknown', async () => {
    expect(async () => {
      const mockRepo = jest.fn(() => { }) as unknown as IStorageRepository;
      await new CommandInvoker(mockRepo).invokeCommand(['UNKNOWN']);
    }).rejects.toBeInstanceOf(ResponseError);
  });

  it('should set the value and return "OK" when command is "SET"', async () => {
    const key = 'key';
    const value = 'value';
    const result = await commandInvoker.invokeCommand(['SET', key, value]);
    expect(mockRepo.set).toHaveBeenCalledWith(key, value);
    expect(result).toBe('OK');
  });

  it('should get the value when command is "GET"', async () => {
    const key = 'key';
    const value = 'value';
    jest.spyOn(mockRepo, 'get').mockReturnValue(new Item(value, Date.now() + 1000000));
    const result = await commandInvoker.invokeCommand(['GET', key]);
    expect(mockRepo.get).toHaveBeenCalledWith(key);
    expect(result).toBe(value);
  });


});
