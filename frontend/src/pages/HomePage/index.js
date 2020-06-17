import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import verifyAuthorization from '../../utils/verifyAuthorization';

import './styles.css';
import Navbar from '../../components/NavBar';

export default function HomePage() {
  const history = useHistory();

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  useEffect(() => {
    document.title = 'NoNameBet';
    async function verifyAuth() {
      if (await verifyAuthorization() === false) {
        handleLogout();
      }
    }
    verifyAuth();
  });

  return (
    <div className="landing-page-container">
      <Navbar centerItem="profile" logoLink="/home" />

      <section className="welcome-section">
        <h1>HomePage</h1>
      </section>
    </div>
  );
}