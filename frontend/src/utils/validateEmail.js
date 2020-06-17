export default function validateEmail(email) {
  var indexAt = email.indexOf('@');
  if (indexAt < 1 || email[indexAt + 1] === undefined) {
    return false;
  }
  var indexPoint = -1;
  for (var count = indexAt + 1; count < email.length; count++) {
    if (email[count] === '.') {
      indexPoint = count;
      break;
    }
  }
  if (indexPoint < (indexAt + 1) || email[indexPoint + 1] === undefined) {
    return false;
  }
  return true;
}