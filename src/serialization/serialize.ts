import { DataType, ResponseError } from "./DataType";

export function serialize(input: string[] | string | number | ResponseError | null) {
  if(typeof input === 'string') {
    return `${DataType.SimpleString}${input}\r\n`
  }

  if(typeof input === 'number') {
    return `${DataType.Integer}${input}\r\n`
  }

  if(input instanceof ResponseError) {
    return `${DataType.Error}${input.name} ${input.message}\r\n`
  }

  if(!input) {
    return '$-1\r\n'
  }

  if(input.length === 0) {
    return '$0\r\n\r\n'
  }

  const length = input.length;
  let stringArray = `${DataType.Array}${length}\r\n`;

  let stringifiedItems = input.map((item) => {
    const parsedItem = typeof item === 'number' ? `${DataType.Integer}${item}` : item;
    return `${DataType.BulkString}${item.length}\r\n${parsedItem}\r\n`;
  }).join('');

  return `${stringArray}${stringifiedItems}`
}