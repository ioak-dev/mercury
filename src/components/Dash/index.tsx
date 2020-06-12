import React, { useEffect, useState } from 'react';
import { Socket, Presence, Channel } from 'phoenix';
import { connect, useSelector, useDispatch } from 'react-redux';
import './style.scss';
import OakButton from '../../oakui/OakButton';
import { newId } from '../../events/MessageService';
import LeftPanel from './LeftPanel';
import MainSection from './MainSection';

interface Props {
  setProfile: Function;
  profile: any;
  match: any;
  history: any;
  socket: Socket;
  channel: Channel;
  space: string;
}

const Dash = (props: Props) => {
  return (
    <div className="dash">
      <div className="left-panel-wrapper">
        <LeftPanel space={props.space} />
      </div>
      <div className="main-section-wrapper">
        <MainSection socket={props.socket} channel={props.channel} />
      </div>
    </div>
  );
};

export default Dash;
