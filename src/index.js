'use strict';

const searchClient = require('./search');
const monitoringClient = require('./monitoring');
const errors = require('./errors');

const datanews = apiKey => ({
  search: searchClient(apiKey),
  monitoring: monitoringClient(apiKey),
  errors
});

module.exports = datanews;
