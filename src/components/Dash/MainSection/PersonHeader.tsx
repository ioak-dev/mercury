import React, { useEffect, useState } from 'react';
import { Socket, Presence, Channel } from 'phoenix';
import './style.scss';
import OakButton from '../../../oakui/OakButton';
import ComposeSection from './ComposeSection';
import { newId, sendMessage } from '../../../events/MessageService';
import MessageStream from './MessageStream';
import { User } from '../../../types/graphql';

interface Props {
  user: User;
}

const PersonHeader = (props: Props) => {
  return (
    <div className="main-section-header">
      <i
        className="material-icons chat-sidebar-switch"
        onClick={() => sendMessage('expand-chat-sidebar')}
      >
        menu
      </i>
      <i className="material-icons">person</i>
      {props.user.firstName} {props.user.lastName}
    </div>
  );
};

export default PersonHeader;
