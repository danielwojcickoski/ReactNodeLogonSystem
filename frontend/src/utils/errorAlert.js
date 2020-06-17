export default function errorAlert(error) {
  if (error.response !== undefined) {
    if (error.response.request !== undefined) {
      if (error.response.request.response !== undefined) {
        error.message = JSON.parse(error.response.request.response).error;
      }
    }
  }

  console.log(error.message);

  switch (error.message) {
    case 'MISSINGDATA':
      alert('Erro, dados faltantes');
      break;

    case 'WRONGPASSWORD':
      alert('Erro, a senha digitada esta incorreta');
      break;

    case 'SHORTPASSWORD':
      alert('Erro, a senha digitada deve ter no minimo 8 digitos');
      break;

    case 'CONFIRMPASSWORRDERROR':
      alert('Erro, as senhas digitadas não são iguais');
      break;

    case 'INVALIDEMAIL':
      alert('Erro, o email digitado é invalido');
      break;

    case 'WRONGCODE':
      alert('Erro, o codigo digitado esta incorreto');
      break;

    case 'Network Error':
      alert('Erro, não foi possivel se conectar ao servidor');
      break;

    case 'USERNOTFOUND':
      alert('Erro, nenhum usuario encontrado');
      break;

    case 'NOTAUTHORIZED':
      alert('Erro, não autorizado');
      break;

    case 'USERALREADYUSED':
      alert('Erro, nome de usuario ja utilizado');
      break;

    case 'EMAILALREADYUSED':
      alert('Erro, email ja utilizado');
      break;

    default:
      alert('Erro desconhecido');
      break;
  }
}