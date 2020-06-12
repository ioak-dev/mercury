import React, { useEffect, useState } from 'react';
import { Socket, Presence, Channel } from 'phoenix';
import './style.scss';
import OakButton from '../../../oakui/OakButton';
import { newId } from '../../../events/MessageService';
import OakEditor from '../../../oakui/OakEditor';

interface Props {
  socket: Socket;
  channel: Channel;
}

const ComposeSection = (props: Props) => {
  const [state, setState] = useState({
    message: '',
  });

  const presence = () => {
    const p = new Presence(props.channel);
    p.onSync(() => {
      console.log(p.list());
    });
    p.onJoin((id, current, newP) => {
      if (!current) {
        console.log('user has entered for the first time', newP);
      } else {
        console.log('user additional presence', newP);
      }
    });
  };

  const sendMessage = () => {
    props.channel.push('new_message', { body: state.message }, 10000);
    setState({ message: '' });
  };

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  return (
    <div className="compose-section">
      <form method="GET" onSubmit={sendMessage} noValidate>
        <OakEditor
          data={state}
          id="message"
          handleChange={handleChange}
          handleEnter={sendMessage}
          bottom
          // center
          size
          color
          align
        />
        {/* <OakEditor
          data={state}
          id="message"
          handleChange={handleChange}
          handleEnter={sendMessage}
        /> */}
      </form>
    </div>
  );
};

export default ComposeSection;
