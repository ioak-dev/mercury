import React, { useEffect, useState } from 'react';
import { Socket, Presence, Channel } from 'phoenix';
import './style.scss';
import OakButton from '../../../oakui/OakButton';
import ComposeSection from './ComposeSection';
import { newId } from '../../../events/MessageService';
import MessageStream from './MessageStream';

interface Props {
  socket: Socket;
  channel: Channel;
}

const MainSection = (props: Props) => {
  return (
    <div className="main-section">
      <div className="header-wrapper">Phoenix WS Test</div>
      <div className="message-stream-wrapper">
        <MessageStream channel={props.channel} />
      </div>
      <div className="compose-wrapper">
        <ComposeSection socket={props.socket} channel={props.channel} />
      </div>
    </div>
  );
};

export default MainSection;
