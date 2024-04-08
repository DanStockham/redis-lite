import { ErrorType, ResponseError } from '../serialization/DataType';
import { serialize } from '../serialization/serialize';

describe('serialize', () => {
  it('should return a serialized string', () => {
    const input = ['apple', 'banana', 'cherry'];
    const expectedOutput = '*3\r\n$5\r\napple\r\n$6\r\nbanana\r\n$6\r\ncherry\r\n';
    const result = serialize(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should return an empty string if input is empty', () => {
    const input: string[] = [];
    const expectedOutput = '$0\r\n\r\n';
    const result = serialize(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should return null if input is null', () => {
    const input = null;
    const expectedOutput = '$-1\r\n';
    const result = serialize(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle special characters in input', () => {
    const input = ['hello, world', 'foo|bar', 'baz\\qux'];
    const expectedOutput = '*3\r\n$12\r\nhello, world\r\n$7\r\nfoo|bar\r\n$7\r\nbaz\\qux\r\n';
    
    const result = serialize(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle a single string input', () => {
    const input = 'hello, world';
    const expectedOutput = '+hello, world\r\n';
    const result = serialize(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle a single number input', () => {
    const input = 123;
    const expectedOutput = ':123\r\n';
    const result = serialize(input);
    expect(result).toEqual(expectedOutput);
  })

  it('should handle a single string input with special characters', () => {
    const input = 'hello, world|foo\\bar';
    const expectedOutput = '+hello, world|foo\\bar\r\n';
    const result = serialize(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle a ResponseError input', () => {
    const input = new ResponseError(ErrorType.GenericError, 'Something went wrong');
    const expectedOutput = '-Error Something went wrong\r\n';
    const result = serialize(input);
    expect(result).toEqual(expectedOutput);
  });
});
