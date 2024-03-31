import { deserialize } from "../serialization/deserialize";

describe('deserialize', () => {
  it('Should deserialize a simple string', () => {
    const input = '+OK\r\n';
    const multipleStrings = '+hello world\r\n';
    const expected = 'OK';
    const expectedMultiple = 'hello world';

    expect(deserialize(input)).toBe(expected);
    expect(deserialize(multipleStrings)).toBe(expectedMultiple);
  })

  it('Should deserialize an single element array', () => {
    const input = '*1\r\n$4\r\nping';
    const ping = 'ping';  

    expect(deserialize(input)).toEqual([ping]);
  })

  it('Should deserialize an array with multiple bulk strings', () => {
    const input = '*2\r\n$4\r\necho\r\n$11\r\nhello world';
    const echo = ['echo', 'hello world'];

    expect(deserialize(input)).toEqual(echo);
  })

  it('Should deserialize an Error', () => {
    const input = '-Error message\r\n';
    const error = ['Error', 'message'];

    expect(deserialize(input)).toEqual(error);
  })

  it('Should deserialize an array to null', () => {
    const input = '*-1\r\n';
    const nullArr: string[] = [];

    expect(deserialize(input)).toEqual(nullArr);
  })

  it('Should deserialize bulk string to null', () => {
    const input = '$0\r\n\r\n';
    const nullArr = null;

    expect(deserialize(input)).toEqual(nullArr);
  })

  it('should log an error message when deserialization fails', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error');
    const input = 'invalidInput';

    expect(() => {
      deserialize(input);
    }).toThrow();

    expect(consoleErrorSpy).toHaveBeenCalledWith(`Failed to deserialize string: ${input}`);
  });

  it('should throw an error when deserializing an invalid array length', () => {
    const input = '*invalid\r\n';
    expect(() => {
      deserialize(input);
    }).toThrow('Invalid array length');
  });
});
