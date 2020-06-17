import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

export default function NavbarLogon() {
  return (
    <div>
        <Link className="button" to="/logon">
          <FiLogIn size={"2vh"} color="grey" />
              Entrar
        </Link>
      </div>
  );
}