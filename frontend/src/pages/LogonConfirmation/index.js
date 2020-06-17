import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';

import verifyAuthorization from '../../utils/verifyAuthorization';
import errorAlert from '../../utils/errorAlert';
import api from '../../services/api';

import './styles.css';
import Navbar from '../../components/NavBar';

export default function LogonConfirmation() {
  const history = useHistory();
  const [confirmation, setConfirmation] = useState('');

  const user = localStorage.getItem('user');
  const preAuthorization = localStorage.getItem('preAuthorization');

  useEffect(() => {
    document.title = 'Login - NoNameBet';
    async function verifyAuth() {
      if (await verifyAuthorization()) {
        history.push('/home');
      }
    }
    verifyAuth();
  });

  async function handleConfirmation(e) {
    e.preventDefault();

    try {
      if (confirmation === '') throw new Error('MISSINGDATA');

      await api.post('logon/confirmation', {
        user,
        preAuthorization,
        confirmation
      }).then(response => {
        localStorage.setItem('authorization', response.data.authorization);
      });

      history.push('/home');
    } catch (Error) {
      errorAlert(Error);
    }
  }

  async function handleResendCode() {
    try {
      await api.post('logon/resendcode', {
        user,
        preAuthorization
      });

      alert('Seu codigo foi reenviado');
    } catch (Error) {
      if (Error.message === 'Network Error') alert('Erro não foi possivel se conectar ao servidor');
      else alert('Erro desconhecido');
    }
  }

  return (
    <div className="logon-confirmation-container">
      <Navbar centerItem="none" />

      <section className="form">
        <p className="info-text">
          <MdEmail size={16} color="#41414d" />
              Digite abaixo o codigo enviado para seu email

          <MdEmail size={16} color="#41414d" />
        </p>
        <p className="info-text">
          O codigo pode demorar até de cinco minutos para ser enviado
        </p>

        <form onSubmit={handleConfirmation}>
          <input
            placeholder="Confirmação"
            value={confirmation}
            onChange={e => setConfirmation(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>
        </form>
        <button className="button" type="submit" onClick={handleResendCode}>Não recebi nenhum codigo</button>
      </section>
    </div>
  );
  }