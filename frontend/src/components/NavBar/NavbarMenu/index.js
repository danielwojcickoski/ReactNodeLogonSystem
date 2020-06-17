import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMenu, FiXCircle } from 'react-icons/fi';

export default function NavbarMenu() {
  const history = useHistory();

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  const [MenuButtonState, setMenuButtonState] = useState('button');
  const [FiMenuState, setFiMenuState] = useState('');
  const [FiXCircleState, setFiXCircleState] = useState('nav-list-hidden');

  function changeMenuState() {
    if (FiMenuState === 'nav-list-hidden') {
      setMenuButtonState('button');
      setFiMenuState('');
      setFiXCircleState('nav-list-hidden');
    } else {
      setMenuButtonState('button button-wider');
      setFiMenuState('nav-list-hidden');
      setFiXCircleState('');
    }
  }

  return (
    <nav className="navbar-menu">
      <button className={MenuButtonState} onClick={changeMenuState}>
        <FiMenu size={"2vh"} color="grey" className={FiMenuState} />
        <FiXCircle size={"2vh"} color="grey" className={FiXCircleState} />
              Menu
      </button>

      <div className={FiXCircleState}>
        <Link className="navbar-button" to="/">
          LandingPage
        </Link>
        <Link className="navbar-button" to="/register">
          Register
        </Link>
        <Link className="navbar-button" to="/logon">
          Logon
        </Link>
        <Link className="navbar-button" to="/logon/confirmation">
          LogonConfirmation
        </Link>
        <Link className="navbar-button" to="/home">
          HomePage
        </Link>
        <button className="navbar-button dif-color" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </nav>
  );
}