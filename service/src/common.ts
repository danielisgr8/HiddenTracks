import {
  CreateConversationServerInput,
  CreateConversationServerOutput,
  getHiddenTracksServiceHandler,
  HiddenTracksService,
  ListConversationsServerInput,
  ListConversationsServerOutput,
  ListMessagesServerInput,
  ListMessagesServerOutput,
  ListSongsForEncodingServerInput,
  ListSongsForEncodingServerOutput,
  SendMessageServerInput,
  SendMessageServerOutput,
} from "@danielisgr8/hidden-tracks-service-ssdk";

type RequestContext = object;

abstract class Handler<Input, Output> {
  protected operation: string;

  constructor(operation: string) {
    this.operation = operation;
  }

  protected abstract performAction(input: Input, context: RequestContext): Promise<Output>;

  public getHandler(): (input: Input, context: RequestContext) => Promise<Output> {
    return async (input, context) => {
      console.log('Operation: ', this.operation);
      console.log('Input: ', JSON.stringify(input, null, 2));

      const output = await this.performAction(input, context);

      console.log('Output: ', JSON.stringify(output, null, 2));

      return output;
    }
  }
}

class ListConversationsHandler extends Handler<ListConversationsServerInput, ListConversationsServerOutput> {
  constructor() {
    super('ListConversations');
  }

  protected async performAction(): Promise<ListConversationsServerOutput> {
    return {
      items: [{ conversationId: '123', recipients: ['daniel', 'greg'], encodingFormat: '1' }],
    };
  }
}

class CreateConversationHandler extends Handler<CreateConversationServerInput, CreateConversationServerOutput> {
  constructor() {
    super('CreateConversation');
  }

  protected async performAction(input: CreateConversationServerInput): Promise<CreateConversationServerOutput> {
    return { conversationId: '234', recipients: input.recipients, encodingFormat: input.encodingFormat };
  }
};

class SendMessageHandler extends Handler<SendMessageServerInput, SendMessageServerOutput> {
  constructor() {
    super('SendMessage');
  }

  protected async performAction(input: SendMessageServerInput): Promise<SendMessageServerOutput> {
    return {
      messageId: '345',
      conversationId: input.conversationId,
      user: input.user,
      createTime: new Date(),
      playlistId: input.playlistId,
      startOffset: input.startOffset,
      endOffset: input.endOffset,
    };
  }
};

class ListMessagesHandler extends Handler<ListMessagesServerInput, ListMessagesServerOutput> {
  constructor() {
    super('ListMessages');
  }

  protected async performAction(input: ListMessagesServerInput): Promise<ListMessagesServerOutput> {    
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
  }
};

class ListSongsForEncodingHandler extends Handler<ListSongsForEncodingServerInput, ListSongsForEncodingServerOutput> {
  constructor() {
    super('ListSongsForEncoding');
  }

  protected async performAction(): Promise<ListSongsForEncodingServerOutput> {
    return {
      songs: ['spotify:track:123ABCabc'],
    };
  }
};

const hiddenTracksService: HiddenTracksService<RequestContext> = {
  ListConversations: new ListConversationsHandler().getHandler(),
  CreateConversation: new CreateConversationHandler().getHandler(),
  SendMessage: new SendMessageHandler().getHandler(),
  ListMessages: new ListMessagesHandler().getHandler(),
  ListSongsForEncoding: new ListSongsForEncodingHandler().getHandler(),
};

export const serviceHandler = getHiddenTracksServiceHandler(hiddenTracksService);
