import {
  CreateConversation,
  CreateConversationServerInput,
  CreateConversationServerOutput,
  getHiddenTracksServiceHandler,
  HiddenTracksService,
  ListConversations,
  ListConversationsServerInput,
  ListConversationsServerOutput,
  ListMessages,
  ListMessagesServerInput,
  ListMessagesServerOutput,
  ListSongsForEncoding,
  ListSongsForEncodingServerOutput,
  SendMessage,
  SendMessageServerInput,
  SendMessageServerOutput,
} from "@danielisgr8/hidden-tracks-service-ssdk";

type RequestContext = object;

const listConversationsHandler: ListConversations<RequestContext> = async (input: ListConversationsServerInput): Promise<ListConversationsServerOutput> => {
  console.log(`Listing conversations for ${input.user}`);
  return {
    items: [{ conversationId: '123', recipients: ['daniel', 'greg'], encodingFormat: '1' }],
  };
};

const createConversationHandler: CreateConversation<RequestContext> = async (input: CreateConversationServerInput): Promise<CreateConversationServerOutput> => {
  return { conversationId: '234', recipients: input.recipients, encodingFormat: input.encodingFormat };
};

const sendMessageHandler: SendMessage<RequestContext> = async (input: SendMessageServerInput): Promise<SendMessageServerOutput> => {
  return {
    messageId: '345',
    conversationId: input.conversationId,
    user: input.user,
    createTime: new Date(),
    playlistId: input.playlistId,
    startOffset: input.startOffset,
    endOffset: input.endOffset,
  };
};

const listMessagesHandler: ListMessages<RequestContext> = async (input: ListMessagesServerInput): Promise<ListMessagesServerOutput> => {
  return {
    items: [{
      messageId: '456',
      conversationId: input.conversationId,
      user: input.user,
      createTime: new Date(),
      playlistId: '123ABCabc',
      startOffset: 0,
      endOffset: 5,
    }],
  };
};

const listSongsForEncodingHandler: ListSongsForEncoding<RequestContext> = async (): Promise<ListSongsForEncodingServerOutput> => {
  return {
    songs: ['spotify:track:123ABCabc'],
  };
};

const hiddenTracksService: HiddenTracksService<RequestContext> = {
  ListConversations: listConversationsHandler,
  CreateConversation: createConversationHandler,
  SendMessage: sendMessageHandler,
  ListMessages: listMessagesHandler,
  ListSongsForEncoding: listSongsForEncodingHandler,
};

export const serviceHandler = getHiddenTracksServiceHandler(hiddenTracksService);
