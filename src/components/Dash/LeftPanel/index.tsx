import React, { useEffect, useState } from 'react';
import { Socket, Presence, Channel } from 'phoenix';
import './style.scss';
import OakButton from '../../../oakui/OakButton';
import LoginSection from './LoginSection';

interface Props {
  space: string;
}

const LeftPanel = (props: Props) => {
  return (
    <div className="left-panel">
      <div>left panel</div>
      <LoginSection space={props.space} />
    </div>
  );
};

export default LeftPanel;
