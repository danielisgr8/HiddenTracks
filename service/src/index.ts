import { ListMessagesInput } from "@danielisgr8/hidden-tracks-service-ssdk";

const foo: ListMessagesInput = {
  user: 'blah',
  conversationId: '123',
};
console.log(JSON.stringify(foo, null, 2));
