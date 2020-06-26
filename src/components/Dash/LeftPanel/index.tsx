import React, { useEffect, useState } from 'react';
import { useSelector, connect } from 'react-redux';
import { Socket, Presence, Channel } from 'phoenix';
import './style.scss';
import OakButton from '../../../oakui/OakButton';
import LoginSection from './LoginSection';
import Logo from '../../Logo/Logo';
import { User } from '../../../types/graphql';
import PeopleList from './PeopleList';
import ChannelList from './ChannelList';
import OakAvatar from '../../../oakui/OakAvatar';

interface Props {
  space: string;
  users: User[];
  history: any;
  params: any;
}

const LeftPanel = (props: Props) => {
  const authorization = useSelector(state => state.authorization);
  return (
    <div className="left-panel">
      <div className="top-header">
        <Logo />
        <LoginSection space={props.space} />
      </div>
      <div className="">
        <OakAvatar
          firstName={authorization.firstName}
          lastName={authorization.lastName}
        />
      </div>
      <div className="channel-list-wrapper">
        <ChannelList
          history={props.history}
          space={props.space}
          params={props.params}
        />
      </div>
      <div className="people-list-wrapper">
        {props.users && (
          <PeopleList
            users={props.users}
            history={props.history}
            space={props.space}
            params={props.params}
          />
        )}
      </div>
    </div>
  );
};

export default LeftPanel;
