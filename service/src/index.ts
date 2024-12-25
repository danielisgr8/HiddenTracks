import { convertEvent, convertResponse } from "@aws-smithy/server-apigateway";
import { getHiddenTracksServiceHandler, HiddenTracksService, ListConversations, ListConversationsInput, ListConversationsOutput } from "@danielisgr8/hidden-tracks-service-ssdk";
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";

type RequestContext = object;

const listConversationsHandler: ListConversations<RequestContext> = async (input: ListConversationsInput): Promise<ListConversationsOutput> => {
  console.log(`Listing conversations for ${input.user}`);
  return {
    items: [{ conversationId: '123', recipients: ['daniel'], encodingFormat: '1' }],
  };
};

// @ts-expect-error TODO: Implement remaining operations
const hiddenTracksService: HiddenTracksService<RequestContext> = {
  ListConversations: listConversationsHandler,
}

const serviceHandler = getHiddenTracksServiceHandler(hiddenTracksService);

export const lambdaHandler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.log('Input: ', event);

  const convertedEvent = convertEvent(event);
  const rawResponse = await serviceHandler.handle(convertedEvent, {});
  const convertedResponse = convertResponse(rawResponse);

  console.log('Output: ', convertedResponse);

  return convertedResponse;
}
