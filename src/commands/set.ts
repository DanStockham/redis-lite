import { IStorageRepository } from "../repository/IStorageRepository";

enum SubCommand {
  EX = 'EX',
  PX = 'PX',
  EXAT = 'EXAT',
  PXAT = 'PXAT'
}

export function set(args: string[], storageRepo: IStorageRepository): void {
  const subCommand = args[2]?.toUpperCase();
  
  if (subCommand === SubCommand.EX || subCommand === SubCommand.PX) {
    const ttl = parseInt(args[3]);
    const expiration = new Date().getTime() + (subCommand === SubCommand.EX ? ttl * 1000 : ttl);

    storageRepo.set(args[0], args[1], expiration);
    return;
  }

  if(subCommand === SubCommand.EXAT || subCommand === SubCommand.PXAT) {
    const parsedExpiration = parseInt(args[3]);

    const expiration = subCommand === SubCommand.EXAT ? parsedExpiration * 1000 : parsedExpiration;

    storageRepo.set(args[0], args[1], expiration);
    return;
  }
  

  storageRepo.set(args[0], args[1]);
}