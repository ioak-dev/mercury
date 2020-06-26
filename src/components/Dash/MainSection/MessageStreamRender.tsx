import React, { useEffect, useState } from 'react';
import { Socket, Presence, Channel } from 'phoenix';
import './style.scss';
import ViewMessage from './ViewMessage';
import { User } from '../../../types/graphql';

interface Props {
  selfUser: User;
  otherUser: User;
  params: any;
  messages: any[];
  newMessages: any[];
}

const MessageStreamRender = (props: Props) => {
  const [newRelevantMessages, setNewRelevantMessages] = useState<any[]>([]);

  useEffect(() => {
    console.log(props.newMessages);
    if (props.newMessages) {
      if (props.selfUser.id === props.otherUser.id) {
        setNewRelevantMessages(
          props.newMessages.filter(item => item.sender === item.receiver)
        );
      } else {
        setNewRelevantMessages(
          props.newMessages.filter(
            item =>
              item.sender == props.otherUser.id ||
              item.receiver == props.otherUser.id
          )
        );
      }
    } else {
      setNewRelevantMessages([]);
    }
  }, [props.newMessages, props.selfUser, props.otherUser]);

  return (
    <div className="message-stream">
      {props.messages?.map((item, index) => (
        <ViewMessage
          key={item.id || index}
          message={item}
          selfUser={props.selfUser}
          otherUser={props.otherUser}
        />
      ))}
      {newRelevantMessages?.map((item, index) => (
        <ViewMessage
          key={item.id || index}
          message={item}
          selfUser={props.selfUser}
          otherUser={props.otherUser}
        />
      ))}
    </div>
  );
};

export default MessageStreamRender;
