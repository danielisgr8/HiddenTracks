import { HiddenTracksClient, ListConversationsCommand } from '@danielisgr8/hidden-tracks-client';

const client = new HiddenTracksClient();
(async () => {
  const response = await client.send(new ListConversationsCommand({ user: 'daniel' }));
  console.log(response.items);
})();
