import React, { useEffect, useState } from 'react';

import { InMemoryCache } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from '@apollo/react-hooks';

import { Socket, Channel } from 'phoenix';
import { useSelector, connect } from 'react-redux';
import { Route } from 'react-router-dom';
import './style.scss';
import { HashRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { withCookies } from 'react-cookie';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Home from '../Home';
import Login from '../Auth/Login';
import Landing from '../Landing';
import { getAuth, addAuth, removeAuth } from '../../actions/AuthActions';
import { getUser, addUser } from '../../actions/UserActions';
import { getProfile, setProfile } from '../../actions/ProfileActions';

import Notification from '../Notification';
import Navigation from '../Navigation';
import { httpGet } from '../Lib/RestTemplate';
import { Authorization } from '../Types/GeneralTypes';
import { receiveMessage, sendMessage } from '../../events/MessageService';
import Tenant from '../Tenant';
import constants from '../Constants';
import OakRoute from '../Auth/OakRoute';
import Unauthorized from '../Auth/Unauthorized';
import Dash from '../Dash';

const themes = {
  themecolor1: getTheme('#69A7BF'),
  themecolor2: getTheme('#99587B'),
  themecolor3: getTheme('#A66C26'),
  themecolor4: getTheme('#37AE82'),
};

function getTheme(color: string) {
  return createMuiTheme({
    palette: {
      primary: {
        main: color,
      },
      secondary: {
        main: color,
      },
    },
  });
}

interface Props {
  getProfile: Function;
  setProfile: Function;
  getAuth: Function;
  addAuth: Function;
  removeAuth: Function;
  getUser: Function;
  addUser: Function;
  cookies: any;

  // event: PropTypes.object,
  profile: any;
  authorization: Authorization;
}

const Content = (props: Props) => {
  const authorization = useSelector(state => state.authorization);
  const [socket, setSocket] = useState<Socket>();
  const [channel, setChannel] = useState<Channel>();
  const [showNav, setShowNav] = useState(false);
  const [space, setSpace] = useState('');

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `${space} ${authorization?.token}` || '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    props.getProfile();
    receiveMessage().subscribe(message => {
      if (message.name === 'show-navbar-element') {
        setShowNav(message.signal);
      } else if (message.name === 'spaceChange') {
        setSpace(message.data);
      }
    });
  }, []);

  useEffect(() => {
    if (authorization.isAuth && !socket && space) {
      setSocket(
        new Socket(
          `${process.env.REACT_APP_WS_URL}/socket/websocket?auth_token=${authorization.token}`,
          { params: { auth_token: authorization.token, space } }
        )
      );
    }
  }, [authorization, space]);

  useEffect(() => {
    if (socket) {
      socket.connect();
      socket.onError(() =>
        console.log('there was an error with the connection!')
      );
      socket.onClose(() => console.log('the connection dropped'));

      const userChannel = socket.channel(`user:${authorization.id}`);

      userChannel
        .join()
        .receive('ok', ({ messages }) => console.log('catching up', messages))
        .receive('error', ({ reason }) => console.log('failed join', reason))
        .receive('timeout', () =>
          console.log('Networking issue. Still waiting...')
        );

      setChannel(userChannel);
    }
  }, [socket]);

  return (
    <ApolloProvider client={client}>
      <div
        className={`App ${props.profile.theme} ${props.profile.textSize} ${props.profile.themeColor}`}
      >
        <HashRouter>
          <div className="body">
            <div className="body-content">
              <Notification />
              <MuiThemeProvider theme={themes.themecolor1}>
                {/* {showNav && <Navigation {...props} />} */}
                <Route
                  path="/login"
                  render={propsLocal => (
                    <OakRoute {...propsLocal} {...props} component={Login} />
                  )}
                />
                <Route
                  path="/:tenant/unauthorized"
                  render={propsLocal => (
                    <OakRoute
                      {...propsLocal}
                      {...props}
                      component={Unauthorized}
                      middleware={['isAuthenticated']}
                    />
                  )}
                />
                <Route
                  path="/"
                  exact
                  render={propsLocal => (
                    <OakRoute {...propsLocal} {...props} component={Landing} />
                  )}
                />
                <Route
                  path="/home"
                  exact
                  render={propsLocal => (
                    <OakRoute {...propsLocal} {...props} component={Landing} />
                  )}
                />
                <Route
                  path="/tenant"
                  exact
                  render={propsLocal => (
                    <OakRoute {...propsLocal} {...props} component={Tenant} />
                  )}
                />
                <Route
                  path="/:tenant/home"
                  render={propsLocal => (
                    <OakRoute
                      {...propsLocal}
                      {...props}
                      component={Home}
                      middleware={['readAuthentication']}
                    />
                  )}
                />
                <Route
                  path="/:tenant/dash"
                  render={propsLocal => (
                    <OakRoute
                      {...propsLocal}
                      {...props}
                      component={Dash}
                      middleware={['readAuthentication']}
                      socket={socket}
                      channel={channel}
                    />
                  )}
                />
                <Route
                  path="/:tenant"
                  exact
                  render={propsLocal => (
                    <OakRoute
                      {...propsLocal}
                      {...props}
                      component={Home}
                      middleware={['readAuthentication']}
                    />
                  )}
                />
              </MuiThemeProvider>
            </div>
          </div>
        </HashRouter>
      </div>
    </ApolloProvider>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
  profile: state.profile, // ,
  //   event: state.event
});

export default connect(mapStateToProps, {
  getProfile,
  setProfile,
  getUser,
  addUser,
})(withCookies(Content));
