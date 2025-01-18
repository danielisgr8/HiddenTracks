$version: "2"
namespace dev.danielschubert.hiddentracks

use aws.api#service
use aws.protocols#restJson1
use smithy.framework#ValidationException

@restJson1
@service(sdkId: "HiddenTracks")
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

@http(code: 200, method: "POST", uri: "/create-conversation")
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

  errors: [ValidationException]
}

@readonly
@http(code: 200, method: "GET", uri: "/list-conversations/{user}")
operation ListConversations {
  input := for Conversation {
    @required
    @httpLabel
    $user
  }

  output := {
    @required
    items: ConversationSummaryList
  }

  errors: [ValidationException]
}

@http(code: 200, method: "POST", uri: "/send-message")
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

  errors: [ValidationException]
}

@readonly
@http(code: 200, method: "GET", uri: "/list-messages/{conversationId}")
operation ListMessages {
  input := for Message {
    @required
    @httpQuery("user")
    user: User

    @required
    @httpLabel
    $conversationId
  }

  output := {
    @required
    items: MessageSummaryList
  }

  errors: [ValidationException]
}

@readonly
@http(code: 200, method: "GET", uri: "/list-songs-for-encoding")
operation ListSongsForEncoding {
  input := {
    @required
    @httpQuery("user")
    user: User

    @required
    @httpQuery("message")
    message: NonEmptyString
  }

  output := {
    @required
    songs: SongUriList
  }

  errors: [ValidationException]
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
