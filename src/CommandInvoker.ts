import { decr } from "./commands/decr";
import { del } from "./commands/del";
import { exists } from "./commands/exists";
import { get } from "./commands/get";
import { incr } from "./commands/incr";
import { lpush } from "./commands/lpush";
import { rpush } from "./commands/rpush";
import { set } from "./commands/set";
import { IStorageRepository } from "./repository/IStorageRepository";
import StorageRepository from "./repository/StorageRepository";
import { ErrorType, ResponseError } from "./serialization/DataType";

export class CommandInvoker {
  private repo: IStorageRepository;

  constructor(private storeRepo?: IStorageRepository) {
    this.repo = storeRepo || new StorageRepository();
  }

  public async invokeCommand(bulkStrings: string[]): Promise<string | string[] | null | number> {
    const command = bulkStrings[0].toUpperCase();
    const args = bulkStrings.slice(1);

    switch (command) {
      case 'PING':
        return 'PONG';
      case 'SET':
        set(args, this.repo)
        return 'OK';
      case 'GET':
        return get(args[0], this.repo);
      case 'EXISTS':
        return exists(args, this.repo);
      case 'DEL':
        return del(args, this.repo);
      case 'INCR':
        return incr(args[0], this.repo);
      case 'DECR':
        return decr(args[0], this.repo);
      case 'LPUSH':
        return lpush(args[0], args.slice(1), this.repo);
      case 'RPUSH':
        return rpush(args[0], args.slice(1), this.repo);
      case 'ECHO':
        return args[0];
      default:
        throw new ResponseError(ErrorType.UnknownCommand, `unknown command \'${command}\', with args beginning with: ${args}`);
    }
  }
}
