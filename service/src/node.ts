import { convertRequest } from '@aws-smithy/server-node';
import { HttpResponse } from '@aws-sdk/protocol-http';
import { createServer, ServerResponse } from 'node:http';
import { serviceHandler } from './common';

const port = 3000;

const writeResponse = (httpResponse: HttpResponse, response: ServerResponse) => {
  response.statusCode = httpResponse.statusCode;
  Object.entries(httpResponse.headers).forEach(([key, value]) => response.setHeader(key, value));
  response.write(httpResponse.body);
  response.end();
}

const server = createServer(async (request, response) => {
  const httpRequest = convertRequest(request);

  const httpResponse = await serviceHandler.handle(httpRequest, {});

  writeResponse(httpResponse, response);
});

server.listen(port, () => {
  console.info(`Listening on port ${port}`);
});
