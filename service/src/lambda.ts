import { convertEvent, convertResponse } from "@aws-smithy/server-apigateway";
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { serviceHandler } from "./common";

export const lambdaHandler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.log('Input: ', event);

  const convertedEvent = convertEvent(event);
  const rawResponse = await serviceHandler.handle(convertedEvent, {});
  const convertedResponse = convertResponse(rawResponse);

  console.log('Output: ', convertedResponse);

  return convertedResponse;
};
