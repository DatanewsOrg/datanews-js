'use strict';

const bent = require('bent');
const { handleResponse } = require('./util');

const requestor = (baseUrl, apiKey, method) => bent(baseUrl, 'json', method, {
  'x-api-key': apiKey
});

const monitoringClient = apiKey => {
  const BASE_URL = 'http://api.datanews.io/v1/monitors/';
  const get = requestor(BASE_URL, apiKey, 'GET');
  const post = requestor(BASE_URL, apiKey, 'POST');
  const delete_ = requestor(BASE_URL, apiKey, 'DELETE');

  return {
    list: monitorId => {
      monitorId = monitorId || '';
      return handleResponse(get(`list/${monitorId}`));
    },

    create: params => handleResponse(post('create', params)),
    delete: monitorId => handleResponse(delete_(`delete/${monitorId}`)),
    latest: runId => handleResponse(get(`latest/${runId}`))
  };
};

module.exports = monitoringClient;
