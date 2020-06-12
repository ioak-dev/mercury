import React, { useEffect, useState } from 'react';
import { Socket, Presence, Channel } from 'phoenix';
import { useSelector } from 'react-redux';
import './style.scss';
import OakButton from '../../../oakui/OakButton';

interface Props {
  space: string;
}

const LoginSection = (props: Props) => {
  const authorization = useSelector(state => state.authorization);
  const login = () => {
    window.location.href = `${process.env.REACT_APP_ONEAUTH_URL}/#/space/${props.space}/login?appId=${process.env.REACT_APP_ONEAUTH_APP_ID}`;
  };
  return (
    <div className="action">
      {authorization.isAuth && (
        <OakButton
          theme="primary"
          variant="disappear"
          small
          //   action={props.logout}
        >
          <i className="material-icons">power_settings_new</i>Logout
        </OakButton>
      )}
      {!authorization.isAuth && (
        <OakButton
          theme="primary"
          variant="appear"
          align="left"
          small
          action={login}
        >
          <i className="material-icons">person</i>Login
        </OakButton>
      )}
    </div>
  );
};

export default LoginSection;
