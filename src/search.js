'use strict';

const bent = require('bent');
const { handleResponse, encodeParams } = require('./util');

const searchClient = apiKey => {
  const requestor = bent('http://api.datanews.io/v1/', 'json', 'GET', {
    'x-api-key': apiKey
  });

  const makeRequest = (endpoint, params) => {
    const encoded = encodeParams(params);
    return handleResponse(requestor(`${endpoint}?${encoded}`));
  };

  return {
    headlines: params => makeRequest('headlines', params),
    news: params => makeRequest('news', params),
    sources: params => makeRequest('sources', params)
  };
};

module.exports = searchClient;
