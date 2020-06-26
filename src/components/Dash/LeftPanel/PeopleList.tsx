import React, { useEffect, useState } from 'react';
import { Socket, Presence, Channel } from 'phoenix';
import './style.scss';
import OakButton from '../../../oakui/OakButton';
import LoginSection from './LoginSection';
import Logo from '../../Logo/Logo';
import { User } from '../../../types/graphql';
import PeopleLink from './PeopleLink';

interface Props {
  users: User[];
  history: any;
  space: string;
  params: any;
}

const PeopleList = (props: Props) => {
  return (
    <div className="people-list">
      <div className="typography-4 people-list-title">Direct messages</div>
      {props.users.map(item => (
        <PeopleLink
          user={item}
          key={item.id}
          space={props.space}
          history={props.history}
          params={props.params}
        />
      ))}
    </div>
  );
};

export default PeopleList;
