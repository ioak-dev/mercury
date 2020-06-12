import React from 'react';

import './style.scss';
import { NavLink } from 'react-router-dom';
import { Authorization, Profile } from '../Types/GeneralTypes';

interface Props {
  authorization: Authorization;
  space: string;
}

const Links = (props: Props) => {
  return (
    <div className="links">
      {props.authorization.isAuth && (
        <>
          <NavLink
            to={`/${props.space}/home`}
            className="navitem"
            activeClassName="active"
          >
            Home
          </NavLink>
          <NavLink
            to={`/${props.space}/dash`}
            className="navitem"
            activeClassName="active"
          >
            Chat
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Links;
