$version: "2"
namespace dev.danielschubert.hiddentracks

service HiddenTracks {
  version: "2006-03-01"
  resources: [Conversation, Message],
  operations: [ListSongsForEncoding]
}

resource Conversation {
  identifiers: { conversationId: Identifier, user: User }
  properties: { recipients: UserList, encodingFormat: NonEmptyString }
  create: CreateConversation
  list: ListConversations
}

resource Message {
  identifiers: { messageId: Identifier },
  properties: { conversationId: Identifier, user: User, createTime: Timestamp, playlistId: PlaylistId, startOffset: SongOffset, endOffset: SongOffset }
  create: SendMessage
  list: ListMessages
}

operation CreateConversation {
  input := for Conversation {
    @required
    $user

    @required
    $recipients

    @required
    $encodingFormat
  }

  output: ConversationSummary
}

@readonly
operation ListConversations {
  input := for Conversation {
    @required
    $user
  }

  output := {
    @required
    items: ConversationSummaryList
  }
}

operation SendMessage {
  input := for Message {
    @required
    $user

    @required
    $conversationId

    @required
    $playlistId
    
    @required
    $startOffset
    
    @required
    $endOffset
  }

  output: MessageSummary
}

@readonly
operation ListMessages {
  input := for Message {
    @required
    user: User

    @required
    $conversationId
  }

  output := {
    @required
    items: MessageSummaryList
  }
}

@readonly
operation ListSongsForEncoding {
  input := {
    @required
    user: User

    @required
    message: NonEmptyString
  }

  output := {
    songs: SongUriList
  }
}

@length(min: 1)
string NonEmptyString

@pattern("^[0-9]+$")
string Identifier

// Based on Spotify ID: https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids
@pattern("^[0-9A-Za-z]+$")
string PlaylistId

@range(min: 0)
integer SongOffset

@length(min: 0)
string User

list UserList {
  member: User
}

structure ConversationSummary for Conversation {
    @required
    $conversationId

    @required
    $recipients

    @required
    $encodingFormat
}

list ConversationSummaryList {
  member: ConversationSummary
}

structure MessageSummary for Message {
  @required
  $messageId
  
  @required
  $conversationId
  
  @required
  $user
  
  @required
  $createTime
  
  @required
  $playlistId
  
  @required
  $startOffset
  
  @required
  $endOffset
}

list MessageSummaryList {
  member: MessageSummary
}

// Based on Spotify URI: https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids
@pattern("^spotify:track:[0-9A-Za-z]+$")
string SongUri

list SongUriList {
  member: SongUri
}
