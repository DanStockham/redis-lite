import { DataType } from "./DataType";


export function deserialize(input: string): string | string[] | null | number {
  try {
    const firstByte = input[0];

    if (firstByte === DataType.SimpleString) {
      return input.split(DataType.SimpleString)[1].trim();
    }

    if (firstByte === DataType.Integer) {
      return parseInt(input.split(DataType.Integer)[1]);
    }


    if (firstByte === DataType.Array) {
      const arrayLength = input.slice(1).match(/^.[-\d]*/g)?.join('');
      const length = parseInt(arrayLength || '');

      if (isNaN(length)) {
        throw new Error('Invalid array length');
      }

      if (length <= 0) {
        return [];
      }

      const payload = input.slice(4); // remove the first line                                                  
      const stringPair = payload.match(/\$(\d+)\r\n(.*)/g);
      

      return stringPair?.map((element) => {
        return deserialize(element);
      }) as string[] ?? [];
    }

    if (firstByte === DataType.BulkString) {
      const length = parseInt(input.split(DataType.BulkString)[1]);

      if (length <= 0) {
        return null;
      }

      const bulkString = input.split('\r\n')[1];

      return bulkString;
    }

    if (firstByte === DataType.Error) {
      const error = input.slice(1).split(/\s/g);
      return [error[0], error[1].replace('\r\n', '')];
    }

    throw new Error(`Unknown data type: ${firstByte}`);

  } catch (error) {
    console.error(`Failed to deserialize string: ${input}`);
    throw error;
  }
}
