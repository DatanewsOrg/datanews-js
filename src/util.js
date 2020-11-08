'use strict';

const formurlencoded = require('form-urlencoded').default;
const {
  DatanewsError,
  InvalidRequestError,
  RateLimitError,
  AuthorizationError
} = require('./errors');

module.exports = {
  encodeParams: params => formurlencoded(params, {
    ignorenull : true,
    skipIndex : true,
    skipBracket : true
  }),

  handleResponse: promise => promise
    .catch(err => {
      const reject = (fn, orig) => Promise.reject(
        orig
          ? new fn(orig.json(), orig.message)
          : new fn()
      );

      if (!(err instanceof Error) || err.name !== 'StatusError') {
        return reject(DatanewsError);
      }

      switch (err.statusCode) {
        case 400:
        case 404:
          return reject(InvalidRequestError, err);
        case 401:
        case 403:
          return reject(AuthorizationError, err);
        case 429:
          return reject(RateLimitError, err);
        default:
          return reject(DatanewsError, err);
      }
    })
};
