import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import verifyAuthorization from '../../utils/verifyAuthorization';
import errorAlert from '../../utils/errorAlert';
import validateEmail from '../../utils/validateEmail';
import api from '../../services/api';

import './styles.css'
import Navbar from '../../components/NavBar';

export default function Register() {
  const history = useHistory();

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    document.title = 'Cadatro - NoNameBet';
    async function verifyAuth() {
      if (await verifyAuthorization()) {
        history.push('/home');
      }
    }
    verifyAuth();
  });

  async function handleRegister(e) {
    e.preventDefault();

    try {
      if (user === '' || email === '' || password === '' || confirmPassword === '') throw new Error('MISSINGDATA');
      else if (password.length < 8) throw new Error('SHORTPASSWORD');
      else if (password !== confirmPassword) throw new Error('CONFIRMPASSWORRDERROR');
      else if (validateEmail(email) === false) throw new Error('INVALIDEMAIL');

      await api.post('register', { user, email, password }).then(response => {
      });

      alert('Cadastro realizado com sucesso');
      history.push('/logon');
    } catch (Error) {
      errorAlert(Error);
    }
  }

  return (
    <div className="register-container">
      <Navbar centerItem="none" />

      <section className="form">
        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome de Usuario"
            value={user}
            onChange={e => setUser(e.target.value)}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <input
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <button className="button" type="submit">Cadastrar</button>

          <Link className="back-link" to="/logon">
            <FiLogIn size={16} color="#41414d" />
              Já tenho cadastro
            </Link>
        </form>
      </section>
    </div>
  );
}