import gql from 'graphql-tag';

export const LIST_ALL_USERS = gql`
  query AllUsers {
    allUsers {
      id
      firstName
      lastName
      email
    }
  }
`;

export const LIST_PERSON_MESSAGES = gql`
  query Personmessages(
    $selfId: ID!
    $otherId: ID!
    $pageSize: Int!
    $lastIndex: Int!
  ) {
    personmessages(
      selfId: $selfId
      otherId: $otherId
      lastIndex: $lastIndex
      pageSize: $pageSize
    ) {
      lastIndex
      hasMore
      results {
        id
        content
        sender
        receiver
      }
    }
  }
`;
