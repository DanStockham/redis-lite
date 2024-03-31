# Redis-lite

This is an implementation of Redis using Nodejs. This document provides instructions on how to set up your development environment, start the server, and use the available commands.

## Setup for Development

1. Clone the repository:
  ```
  git clone https://github.com/yourusername/node-redis-js.git
  ```

2. Navigate to the project directory:
  ```
  cd node-redis-js
  ```

3. Install the dependencies:
  ```
  npm install
  ```

## Starting the Server

First, create a production bundle:

```
npm run build
```

Then, start your server:

```
npm start
```

If you want to run the server in development:

```
npm run dev
```

## Commands

List of current implemented commands

* [PING](#PING)
* [SET](#SET)
* [GET](#GET)
* [EXISTS](#EXISTS)
* [DEL](#DEL)
* [INCR](#INCR)
* [DECR](#DECR)
* [LPUSH](#LPUSH)
* [RPUSH](#RPUSH)
* [SAVE](#SAVE)

### PING 

Returns PONG. This command is useful for:

1. Testing whether a connection is still alive.
2. Verifying the server's ability to serve data - an error is returned when this isn't the case (e.g., during load from persistence or accessing a stale replica).
3. Measuring latency.

### SET

Set key to hold the string value. If key already holds a value, it is overwritten, regardless of its type. Any previous time to live associated with the key is discarded on successful SET operation.

Options:

* EX seconds -- Set the specified expire time, in seconds (a positive integer).
* PX milliseconds -- Set the specified expire time, in milliseconds (a positive integer).
* EXAT timestamp-seconds -- Set the specified Unix time at which the key will expire, in seconds (a positive integer).
* PXAT timestamp-milliseconds -- Set the specified Unix time at which the key will expire, in milliseconds (a positive integer).

Examples:

```
SET foo bar
SET baz man EX 60
SET price right EXAT 1711891364
```

### GET

Get the value of key. If the key does not exist the special value nil is returned. An error is returned if the value stored at key is not a string, because GET only handles string values.

### EXISTS

*NOT IMPLEMENTED*

The `EXISTS` command checks if a key exists in the Redis database.

### DEL

*NOT IMPLEMENTED*

The `DEL` command deletes one or more keys from the Redis database.

### INCR

*NOT IMPLEMENTED*

The `INCR` command increments the value of a key by 1.

### DECR

*NOT IMPLEMENTED*

The `DECR` command decrements the value of a key by 1.

### LPUSH

*NOT IMPLEMENTED*

The `LPUSH` command inserts one or more values at the beginning of a list.

### RPUSH

*NOT IMPLEMENTED*

The `RPUSH` command inserts one or more values at the end of a list.

### SAVE

*NOT IMPLEMENTED*

The `SAVE` command saves the current state of the Redis database to disk.