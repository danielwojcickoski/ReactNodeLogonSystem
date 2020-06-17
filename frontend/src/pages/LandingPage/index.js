import React, { useEffect } from 'react';

import './styles.css';
import Navbar from '../../components/NavBar';

export default function LandingPage() {
  useEffect(() => {
    document.title = 'NoNameBet';
  });

  return (
    <div className="landing-page-container">
      <Navbar centerItem="logon" />

      <section className="welcome-section">
        <h1>LandingPage</h1>
      </section>
    </div>
  );
}