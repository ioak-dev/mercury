import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Comment = {
  __typename?: 'Comment';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  post?: Maybe<Post>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
};

export type CommentInputType = {
  description: Scalars['String'];
  postId: Scalars['String'];
};

export type RootMutationType = {
  __typename?: 'RootMutationType';
  createComment?: Maybe<Comment>;
  createPost?: Maybe<Post>;
  createUser?: Maybe<User>;
};


export type RootMutationTypeCreateCommentArgs = {
  payload?: Maybe<CommentInputType>;
};


export type RootMutationTypeCreatePostArgs = {
  payload?: Maybe<PostInputType>;
};


export type RootMutationTypeCreateUserArgs = {
  payload?: Maybe<UserInputType>;
};

export type Personmessage = {
  __typename?: 'Personmessage';
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  receiver?: Maybe<Scalars['String']>;
  sender?: Maybe<Scalars['String']>;
};

export type PersonmessagePaginated = {
  __typename?: 'PersonmessagePaginated';
  hasMore?: Maybe<Scalars['Boolean']>;
  lastIndex?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<Personmessage>>>;
};

export type Post = {
  __typename?: 'Post';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
};

export type PostInputType = {
  description: Scalars['String'];
  title: Scalars['String'];
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  allPosts?: Maybe<Array<Maybe<Post>>>;
  allUsers: Array<User>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  personmessages?: Maybe<PersonmessagePaginated>;
  post?: Maybe<Post>;
  user?: Maybe<User>;
  userByUserId?: Maybe<User>;
};


export type RootQueryTypeCommentsArgs = {
  postId: Scalars['ID'];
};


export type RootQueryTypePersonmessagesArgs = {
  lastIndex: Scalars['Int'];
  otherId: Scalars['ID'];
  pageSize: Scalars['Int'];
  selfId: Scalars['ID'];
};


export type RootQueryTypePostArgs = {
  id: Scalars['ID'];
};


export type RootQueryTypeUserArgs = {
  id: Scalars['ID'];
};


export type RootQueryTypeUserByUserIdArgs = {
  userId: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<Post>>>;
  type?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type UserInputType = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  type: Scalars['String'];
  userId: Scalars['String'];
};

export type AllUsersQueryVariables = {};


export type AllUsersQuery = (
  { __typename?: 'RootQueryType' }
  & { allUsers: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
  )> }
);

export type PersonmessagesQueryVariables = {
  selfId: Scalars['ID'];
  otherId: Scalars['ID'];
  pageSize: Scalars['Int'];
  lastIndex: Scalars['Int'];
};


export type PersonmessagesQuery = (
  { __typename?: 'RootQueryType' }
  & { personmessages?: Maybe<(
    { __typename?: 'PersonmessagePaginated' }
    & Pick<PersonmessagePaginated, 'lastIndex' | 'hasMore'>
    & { results?: Maybe<Array<Maybe<(
      { __typename?: 'Personmessage' }
      & Pick<Personmessage, 'id' | 'content' | 'sender' | 'receiver'>
    )>>> }
  )> }
);


export const AllUsersDocument = gql`
    query AllUsers {
  allUsers {
    id
    firstName
    lastName
    email
  }
}
    `;
export type AllUsersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<AllUsersQuery, AllUsersQueryVariables>, 'query'>;

    export const AllUsersComponent = (props: AllUsersComponentProps) => (
      <ApolloReactComponents.Query<AllUsersQuery, AllUsersQueryVariables> query={AllUsersDocument} {...props} />
    );
    
export type AllUsersProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<AllUsersQuery, AllUsersQueryVariables>
    } & TChildProps;
export function withAllUsers<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AllUsersQuery,
  AllUsersQueryVariables,
  AllUsersProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, AllUsersQuery, AllUsersQueryVariables, AllUsersProps<TChildProps, TDataName>>(AllUsersDocument, {
      alias: 'allUsers',
      ...operationOptions
    });
};
export type AllUsersQueryResult = ApolloReactCommon.QueryResult<AllUsersQuery, AllUsersQueryVariables>;
export const PersonmessagesDocument = gql`
    query Personmessages($selfId: ID!, $otherId: ID!, $pageSize: Int!, $lastIndex: Int!) {
  personmessages(selfId: $selfId, otherId: $otherId, lastIndex: $lastIndex, pageSize: $pageSize) {
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
export type PersonmessagesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<PersonmessagesQuery, PersonmessagesQueryVariables>, 'query'> & ({ variables: PersonmessagesQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const PersonmessagesComponent = (props: PersonmessagesComponentProps) => (
      <ApolloReactComponents.Query<PersonmessagesQuery, PersonmessagesQueryVariables> query={PersonmessagesDocument} {...props} />
    );
    
export type PersonmessagesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<PersonmessagesQuery, PersonmessagesQueryVariables>
    } & TChildProps;
export function withPersonmessages<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PersonmessagesQuery,
  PersonmessagesQueryVariables,
  PersonmessagesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, PersonmessagesQuery, PersonmessagesQueryVariables, PersonmessagesProps<TChildProps, TDataName>>(PersonmessagesDocument, {
      alias: 'personmessages',
      ...operationOptions
    });
};
export type PersonmessagesQueryResult = ApolloReactCommon.QueryResult<PersonmessagesQuery, PersonmessagesQueryVariables>;