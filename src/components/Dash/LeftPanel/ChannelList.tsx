import React, { useEffect, useState } from 'react';
import { Socket, Presence, Channel } from 'phoenix';
import './style.scss';
import OakButton from '../../../oakui/OakButton';
import LoginSection from './LoginSection';
import Logo from '../../Logo/Logo';
import { User } from '../../../types/graphql';

interface Props {
  history: any;
  space: string;
  params: any;
}

const ChannelList = (props: Props) => {
  return (
    <div className="channel-list">
      <div className="typography-4 channel-list-title">Channels</div>
      <div className="">No channels yet</div>
    </div>
  );
};

export default ChannelList;
