export enum DataType {
  SimpleString = '+',
  Error = '-',
  Integer = ':',
  BulkString = '$',
  Array = '*'
};

export enum ErrorType {
  TypeError = 'TypeError',
  GenericError = 'Error',
  UnknownCommand = 'UnknownCommand',
  WrongType = 'WRONGTYPE'
}

export class ResponseError extends Error {
  constructor(errorType: ErrorType, message: string) {
    super(message);
    this.name = errorType;
  }
}