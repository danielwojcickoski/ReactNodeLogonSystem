import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MdCreate } from 'react-icons/md';

import verifyAuthorization from '../../utils/verifyAuthorization';
import errorAlert from '../../utils/errorAlert';
import api from '../../services/api';

import './styles.css';
import Navbar from '../../components/NavBar';

export default function Logon() {
  const history = useHistory();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = 'Login - NoNameBet';
    async function verifyAuth() {
      if (await verifyAuthorization()) {
        history.push('/home');
      }
    }
    verifyAuth();
  });

  async function handleLogin(e) {
    e.preventDefault();

    try {
      if (user === '' || password === '') throw new Error('MISSINGDATA');
      else if (password.length < 8) throw new Error('WRONGPASSWORD');

      await api.post('logon', {
        user,
        password
      }).then(response => {
        localStorage.setItem('user', user);
        localStorage.setItem('preAuthorization', response.data.preAuthorization);
      });

      history.push('/logon/confirmation');
    } catch (Error) {
      errorAlert(Error);
    }
  }

  return (
    <div className="logon-container">
      <Navbar centerItem="none" />

      <section className="form">
        <form onSubmit={handleLogin}>
          <input
            placeholder="Usuario"
            value={user}
            onChange={e => setUser(e.target.value)}
          />
          <input
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <MdCreate size={16} color="#41414d" />
              Não tenho cadastro
            </Link>
        </form>
      </section>
    </div>
  );
}