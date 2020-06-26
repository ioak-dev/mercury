import React, { useEffect, useState } from 'react';
import { Socket, Presence, Channel } from 'phoenix';
import './style.scss';
import OakButton from '../../../oakui/OakButton';
import ComposeSection from './ComposeSection';
import { newId } from '../../../events/MessageService';
import MessageStream from './MessageStream';
import { User } from '../../../types/graphql';
import PersonHeader from './PersonHeader';

interface Props {
  socket: Socket;
  channel: Channel;
  params: any;
  users: User[];
}

const MainSection = (props: Props) => {
  const [chosenUser, setChosenUser] = useState<User>();

  useEffect(() => {
    if (props.params?.id && props.params?.type === 'person') {
      setChosenUser(props.users.find(item => item.id === props.params.id));
    } else if (props.params?.id && props.params?.type === 'channel') {
      console.log('channel');
      setChosenUser(undefined);
    }
  }, [props.params]);

  return (
    <div className="main-section">
      <div className="header-wrapper">
        {chosenUser && <PersonHeader user={chosenUser} />}
      </div>
      <div className="message-stream-wrapper">
        <MessageStream
          channel={props.channel}
          params={props.params}
          users={props.users}
        />
      </div>
      <div className="compose-wrapper">
        <ComposeSection
          socket={props.socket}
          channel={props.channel}
          params={props.params}
        />
      </div>
    </div>
  );
};

export default MainSection;
