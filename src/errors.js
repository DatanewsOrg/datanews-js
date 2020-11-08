'use strict';

class DatanewsError extends Error {
  constructor(json, message) {
    super(message);

    this.type = this.constructor.name;
    this.json = json || Promise.resolve();
  }
}

class AuthorizationError extends DatanewsError {}

class InvalidRequestError extends DatanewsError {}

class RateLimitError extends DatanewsError {}

module.exports = {
  DatanewsError,
  AuthorizationError,
  InvalidRequestError,
  RateLimitError
};
