import React, { useEffect, useState } from 'react';
import { Socket, Presence, Channel } from 'phoenix';
import './style.scss';
import OakButton from '../../../oakui/OakButton';
import ComposeSection from './ComposeSection';
import { newId } from '../../../events/MessageService';
import OakViewer from '../../../oakui/OakViewer';

interface Props {
  channel: Channel;
}

const MessageStream = (props: Props) => {
  const [messages, setMessages] = useState<any>([]);
  useEffect(() => {
    if (props.channel) {
      props.channel.on('new_message', msg => {
        setMessages(prev => [...prev, msg]);
        const div = document.getElementById('message-stream');
        if (div) {
          div.scrollTop = div.scrollHeight - div.clientHeight;
        }
      });
    }
  }, [props.channel]);
  return (
    <div className="message-stream-container" id="message-stream">
      <div className="message-stream">
        {messages.map(item => (
          <OakViewer key={newId()}>{item.body}</OakViewer>
        ))}
      </div>
    </div>
  );
};

export default MessageStream;
