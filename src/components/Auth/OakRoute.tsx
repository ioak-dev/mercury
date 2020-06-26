import React, { useEffect } from 'react';
import { Socket, Channel } from 'phoenix';
import axios from 'axios';
import { connect, useSelector, useDispatch } from 'react-redux';
import { getAuth, addAuth } from '../../actions/AuthActions';
import { Authorization } from '../Types/GeneralTypes';
import { httpGet } from '../Lib/RestTemplate';
import { sendMessage } from '../../events/MessageService';

interface Props {
  authorization: Authorization;
  path?: string;
  render?: any;
  component: any;
  match: any;
  history: any;
  middleware?: string[];
  cookies: any;
  socket?: Socket;
  channel?: Channel;
}

const OakRoute = (props: Props) => {
  const authorization = useSelector(state => state.authorization);
  const profile = useSelector(state => state.profile);
  const dispatch = useDispatch();

  const middlewares = () => {
    props.middleware?.forEach(middlewareName => {
      if (!runMidleware(middlewareName)) {
        return false;
      }
    });
    return true;
  };

  const runMidleware = middlewareName => {
    sendMessage('spaceChange', true, '');
    switch (middlewareName) {
      case 'readAuthentication':
        return readAuthenticationSpace();
      case 'authenticate':
        return authenticateSpace();
      case 'isAdmin':
        return isAdmin();
      default:
        return true;
    }
  };

  const authenticateSpace = () => {
    return authenticate('space');
  };
  const readAuthenticationSpace = () => {
    return authenticate('space', false);
  };

  const authenticate = async (type, redirect = true) => {
    sendMessage('spaceChange', true, props.match.params.tenant);
    if (authorization.isAuth) {
      return true;
    }
    const cookieKey = `mercury_${props.match.params.tenant}`;
    const authKey = props.cookies.get(cookieKey);
    const baseAuthUrl = `/account/user/${props.match.params.tenant}`;
    if (authKey) {
      try {
        httpGet(`${baseAuthUrl}/session/${authKey}`, null)
          .then(sessionResponse => {
            console.log('success');
            if (sessionResponse.status === 200) {
              dispatch(
                addAuth({
                  isAuth: true,
                  token: sessionResponse.data.token,
                  secret: '',
                  firstName: sessionResponse.data.first_name,
                  lastName: sessionResponse.data.last_name,
                  email: sessionResponse.data.email,
                  type: sessionResponse.data.type,
                  userId: sessionResponse.data.user_id,
                  id: sessionResponse.data.id,
                })
              );
            }
          })
          .catch((error: any) => {
            props.cookies.remove(cookieKey);
            if (redirect && error.response.status === 404) {
              sendMessage('notification', true, {
                type: 'failure',
                message: 'Invalid session token',
                duration: 3000,
              });
              redirectToLogin(props.match.params.tenant);
            } else if (redirect && error.response.status === 401) {
              sendMessage('notification', true, {
                type: 'failure',
                message: 'Session expired',
                duration: 3000,
              });
              redirectToLogin(props.match.params.tenant);
            } else if (redirect && error.response.status === 401) {
              sendMessage('notification', true, {
                type: 'failure',
                message: 'Unhandled exception',
                duration: 3000,
              });
              redirectToLogin(props.match.params.tenant);
            }
          });
      } catch (error) {
        console.log(error);
      }
    } else if (redirect) {
      redirectToLogin(props.match.params.tenant);
    } else {
      return true;
    }
  };

  const isAdmin = () => {
    redirectToUnauthorized();
    return false;
  };

  const redirectToLogin = spaceId => {
    window.location.href = `${process.env.REACT_APP_ONEAUTH_URL}/#/space/${spaceId}/login?type=signin&appId=${process.env.REACT_APP_ONEAUTH_APP_ID}`;
  };

  const redirectToUnauthorized = () => {
    props.history.push(`/${profile.tenant}/unauthorized`);
  };

  return (
    <>
      {middlewares() && (
        <props.component
          {...props}
          profile={profile}
          space={props.match.params.tenant}
          // getProfile={getProfile}
          // setProfile={props.setProfile}
        />
      )}
    </>
  );
};

export default OakRoute;
