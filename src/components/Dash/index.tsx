import React, { useEffect, useState } from 'react';
import { Socket, Presence, Channel } from 'phoenix';
import { connect, useSelector, useDispatch } from 'react-redux';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import './style.scss';
import OakButton from '../../oakui/OakButton';
import { newId } from '../../events/MessageService';
import LeftPanel from './LeftPanel';
import MainSection from './MainSection';
import { LIST_ALL_USERS } from '../Types/schema';

interface Props {
  setProfile: Function;
  profile: any;
  match: any;
  location: any;
  history: any;
  socket: Socket;
  channel: Channel;
  space: string;
}

const queryString = require('query-string');

const Dash = (props: Props) => {
  const authorization = useSelector(state => state.authorization);
  const [loadUsers, { loading, error, data, called }] = useLazyQuery(
    LIST_ALL_USERS
  );
  const [params, setParams] = useState({
    type: '',
    id: '',
  });

  useEffect(() => {
    if (authorization.isAuth && !called) {
      loadUsers();
    }
  }, [authorization]);

  useEffect(() => {
    setParams(queryString.parse(props.location.search));
  }, [props.location.search]);

  return (
    <div className="dash">
      <div className="left-panel-wrapper">
        <LeftPanel
          space={props.space}
          history={props.history}
          params={params}
          users={data?.allUsers}
        />
      </div>
      <div className="main-section-wrapper">
        {!loading && !error && data && (
          <MainSection
            socket={props.socket}
            channel={props.channel}
            params={params}
            users={data.allUsers}
          />
        )}
      </div>
    </div>
  );
};

export default Dash;
