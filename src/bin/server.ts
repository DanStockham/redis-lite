#!/usr/bin/env node

import * as net from 'net';
import * as dotenv from 'dotenv';
import logger from '../logger';
import { deserialize } from '../serialization/deserialize';
import { serialize } from '../serialization/serialize';
import { ErrorType, ResponseError } from '../serialization/DataType';
import { CommandInvoker } from '../CommandInvoker';
import StorageRepository from '../repository/StorageRepository';

dotenv.config();

const port = process.env.PORT || 6379;
const storageRepo = new StorageRepository();
const commandInvoker = new CommandInvoker(storageRepo);

const server = net.createServer((socket) => {
  socket.on('data', async (data) => {
    const command = data.toString().trim();
    logger.info(`Received command: ${command}`);
    
    try {
      const deserializedRequest = deserialize(command);

      if(!deserializedRequest) { 
        socket.write('');
        return;
      }

      const commandRequest: string[] = deserializedRequest as string[]; 

      logger.debug(`Deserialized command: ${commandRequest}`);

      // Handle command
      const response = await commandInvoker.invokeCommand(commandRequest);

      socket.write(serialize(response))

    } catch (error: unknown) {
      const errMessage = error instanceof Error ? error.message : 'Unknown error';
      const errPayload = new ResponseError(ErrorType.GenericError, errMessage);

      socket.write(serialize(errPayload));
    }
  });

  socket.on('end', () => {
    logger.info('Client disconnected');
  });
});

server.listen(port, () => {
  const address = server.address();
  const host = typeof address === 'string' ? address : address?.address;
  logger.info(`Server is listening on host: ${host}`);
  logger.info(`Redis server is running on port ${port}`);
});

server.on('error', (error) => {
  logger.error(`Error occurred: ${error.message}`);
});
