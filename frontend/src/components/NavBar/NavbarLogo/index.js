import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../../assets/placeholder-logo.png';

export default function Navbar(props) {
  function setTo(){
    if(props.logoLink === undefined){
      return '/';
    }
    return props.logoLink;
  }
  return (
    <div>
      <Link to={setTo}>
        <img src={logoImg} alt="NoNameBet" />
      </Link>
    </div>
  );
}