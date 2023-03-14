export class UnauthorizedError extends Error {
  constructor() {
    super(`User: is not authorized.`);
  }
}

export class NotImplementedError extends Error {
  constructor() {
    super(`Required method is not implemented.`);
  }
}

export class ArgumentError extends Error {
  constructor(argName: string) {
    super(`Required argument '${argName}' is not provided.`);
  }
}
