import React, { useEffect, useState } from 'react';
import { Socket, Presence, Channel } from 'phoenix';
import './style.scss';
import OakButton from '../../../oakui/OakButton';
import LoginSection from './LoginSection';
import Logo from '../../Logo/Logo';
import { User } from '../../../types/graphql';

interface Props {
  user: User;
  history: any;
  space: string;
  params: any;
}

const PeopleLink = (props: Props) => {
  const changePerson = () => {
    props.history.push(`/${props.space}/dash?type=person&id=${props.user.id}`);
  };
  return (
    <div
      className={`people-link ${
        props.params?.type === 'person' && props.params?.id === props.user.id
          ? 'active'
          : ''
      }`}
      onClick={changePerson}
    >
      {props.user.firstName} {props.user.lastName}
    </div>
  );
};

export default PeopleLink;
