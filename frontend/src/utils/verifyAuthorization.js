import api from '../services/api';

export default function verifyAuthorization() {
  const user = localStorage.getItem('user');
  const authorization = localStorage.getItem('authorization');

  if (authorization === '' || authorization === null || user === '' || user === null) {
    return false;
  }
  else {
    try {
      api.post('logon/verifyauth', {
        user,
        authorization
      });

      return true;
    } catch (Error) {
      return false;
    }
  }
}