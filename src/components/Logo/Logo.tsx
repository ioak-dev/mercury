import React from 'react';
import { useSelector } from 'react-redux';
import mercuryWhite from '../../images/mercury_white.svg';
import mercuryBlack from '../../images/mercury_black.svg';

import './style.scss';

const Logo = () => {
  const profile = useSelector(state => state.profile);
  return (
    <div className="logo-container">
      {profile?.theme === 'theme_light' && (
        <img className="logo" src={mercuryBlack} alt="Mercury logo" />
      )}
      {profile?.theme === 'theme_dark' && (
        <img className="logo" src={mercuryWhite} alt="Mercury logo" />
      )}
    </div>
  );
};

export default Logo;
