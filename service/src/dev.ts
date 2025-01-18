/**
 * File used for local development.
 * Fill out the variables before `input` and run this file via `npm run dev`.
 */

import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { lambdaHandler } from './lambda';

const method = 'GET';
const path = '/list-conversations/daniel';
const pathParameters = {
  user: 'daniel',
};
const body = undefined;

const input: APIGatewayProxyEventV2 = {
  headers: {
    'header1': 'value1',
  },
  queryStringParameters: {
    'parameter1': 'value1',
  },
  requestContext: {
    accountId: '123456789012',
    apiId: 'id',
    domainName: 'id.execute-api.us-east-1.amazonaws.com',
    domainPrefix: 'id',
    http: {
      method: method,
      path,
      protocol: 'HTTPS',
      sourceIp: '127.0.0.1',
      userAgent: '',
    },
    requestId: 'id=',
    routeKey: '',
    stage: '$default',
    time: '2024-12-25T11:58:37.545Z',
    timeEpoch: 1735127900,
  },
  pathParameters,
  body,
  isBase64Encoded: false,
  version: '2.0',
  routeKey: '',
  rawPath: path,
  rawQueryString: '',
};

(async () => {
  const output = await lambdaHandler(input);
  console.log('Handler output: ', output);
})();
