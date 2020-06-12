import React, { useEffect, useState } from 'react';
import './style.scss';
import OakButton from '../../oakui/OakButton';
import { newId } from '../../events/MessageService';

interface Props {
  setProfile: Function;
  profile: any;
  match: any;
  history: any;
}

const Home = (props: Props) => {
  return <div className="home full">Phoenix WS Test home page</div>;
};

export default Home;
