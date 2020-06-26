import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useSelector, connect } from 'react-redux';
import { Socket, Presence, Channel } from 'phoenix';
import './style.scss';
import OakButton from '../../../oakui/OakButton';
import ComposeSection from './ComposeSection';
import { newId } from '../../../events/MessageService';
import OakViewer from '../../../oakui/OakViewer';
import ViewMessage from './ViewMessage';
import { User } from '../../../types/graphql';
import { LIST_PERSON_MESSAGES } from '../../Types/schema';
import MessageStreamRender from './MessageStreamRender';
import OakInfiniteScroll from '../../../oakui/OakInfiniteScroll';
import OakSpinner from '../../../oakui/OakSpinner';

interface Props {
  channel: Channel;
  params: any;
  users: User[];
}

const MessageStream = (props: Props) => {
  const [
    loadPersonMessages,
    { loading, error, data, called, fetchMore, refetch },
  ] = useLazyQuery(LIST_PERSON_MESSAGES, {
    notifyOnNetworkStatusChange: true,
    variables: { selfId: '', otherId: '', lastIndex: -1, pageSize: 20 },
  });
  const authorization = useSelector(state => state.authorization);
  const [messages, setMessages] = useState<any>([]);
  const [selfUser, setSelfUser] = useState<User>();
  const [otherUser, setOtherUser] = useState<User>();

  useEffect(() => {
    if (authorization.isAuth && props.users) {
      setSelfUser(props.users.find(item => item.id == authorization.id));
      setOtherUser(props.users.find(item => item.id == props.params.id));
      fetchData();
    }
  }, [authorization, props.users, props.params]);

  const fetchData = () => {
    if (!called) {
      loadPersonMessages({
        variables: {
          selfId: authorization.id,
          otherId: props.params.id,
          lastIndex: -1,
          pageSize: 20,
        },
      });
    } else {
      refetch({
        selfId: authorization.id,
        otherId: props.params.id,
        lastIndex: -1,
        pageSize: 20,
      });
    }
  };

  const fetchMoreData = () => {
    if (!loading && data?.personmessages && data?.personmessages?.hasMore) {
      fetchMore({
        variables: { lastIndex: data.personmessages.lastIndex },
        updateQuery: (prev: any, { fetchMoreResult }: any) => {
          return {
            personmessages: {
              ...prev.personmessages,
              results: [
                ...fetchMoreResult.personmessages.results,
                ...prev.personmessages.results,
              ],
              lastIndex: fetchMoreResult.personmessages.lastIndex,
              hasMore: fetchMoreResult.personmessages.hasMore,
            },
          };
        },
      });
    }
  };

  useEffect(() => {
    if (props.channel) {
      props.channel.on('new_message', msg => {
        setMessages(prev => [...prev, msg]);
        setTimeout(() => {
          const div = document.getElementById('message-stream');
          if (div) {
            div.scrollTop = div.scrollHeight - div.clientHeight;
          }
        }, 0);
      });
    }
  }, [props.channel]);

  const handleChange = () => {
    console.log('scrolled');
    fetchMoreData();
  };

  return (
    <>
      <div className="message-stream-container" id="message-stream">
        {selfUser && otherUser && (
          <OakInfiniteScroll
            handleChange={handleChange}
            selector=".message-stream-container"
            reverseOrder
          >
            <MessageStreamRender
              params={props.params}
              messages={data?.personmessages?.results}
              newMessages={messages}
              selfUser={selfUser}
              otherUser={otherUser}
            />
          </OakInfiniteScroll>
        )}
      </div>
      {loading && <OakSpinner />}
    </>
  );
};

export default MessageStream;
