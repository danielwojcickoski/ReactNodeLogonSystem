import React, { useState, useEffect } from 'react';

import NavbarMenu from './NavbarMenu'
import NavbarLogo from './NavbarLogo'
import NavbarLogon from './NavbarLogon'
import NavbarProfile from './NavbarProfile'

import './styles.css';

export default function Navbar(props) {
  const [menuState, setMenuState] = useState('navbar-hidden');
  const [logonState, setLogonState] = useState('navbar-hidden');
  const [logoState, setLogoState] = useState('navbar-hidden');
  const [profileState, setProfileState] = useState('navbar-hidden');

  const centerItem = props.centerItem;
  useEffect(() => {
    if (centerItem === 'logon') {
      setMenuState('');
      setLogoState('');
      setLogonState('');
      setProfileState('navbar-hidden');
    }
    else if (centerItem === 'profile') {
      setMenuState('');
      setLogoState('');
      setLogonState('navbar-hidden');
      setProfileState('');
    }
    else {
      setMenuState('');
      setLogoState('');
      setLogonState('navbar-hidden');
      setProfileState('navbar-hidden');
    }
  }, [centerItem]);

  return (
    <header className="navbar">
      <div className={menuState}>
        <NavbarMenu />
      </div>

      <div className={logoState}>
        <NavbarLogo logoLink={props.logoLink} />
      </div>

      <div className={logonState}>
        <NavbarLogon />
      </div>

      <div className={profileState}>
        <NavbarProfile />
      </div>
    </header>
  );
}