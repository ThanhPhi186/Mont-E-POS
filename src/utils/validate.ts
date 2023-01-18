const validatePhone = (phoneText = '') => {
  let message = '';

  if (phoneText) {
    const phone9Number =
      !!Number(phoneText) && phoneText.length === 9 && phoneText[0] !== '0';
    const phone10Number =
      !!Number(phoneText) && phoneText.length === 10 && phoneText[0] === '0';
    if (!phone9Number && !phone10Number) {
      message = 'Số điện thoại không hợp lệ';
      return {result: false, message};
    }
    return {result: true, message: ''};
  }
  message = 'Vui lòng nhập số điện thoại';
  return {result: false, message};
};

const validatePassword = (password: string) => {
  if (!password) return {result: false, message: 'Please fill your password'};
  if (password.length < 8) {
    return {
      result: false,
      message: 'The password must contain at least 8 character',
    };
  }
  if (password.length > 40) {
    return {result: false, message: 'The password with up to 40 characters'};
  }
  const regex = /["'\s/]/;
  const check = password.search(regex);
  if (check !== -1) {
    return {result: false, message: 'The password is invalid'};
  }
  const regex2 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
  const check2 = password.search(regex2);

  if (check2 === -1) return {result: false, message: 'The password is invalid'};
  return {result: true, message: ''};
};

const checkSpecialName = (name = '') => {
  const otherLetters =
    '[a-eghik-vxyàáâãèéêìíòóôõùúýỳỹỷỵựửữừứưụủũợởỡờớơộổỗồốọỏịỉĩệểễềếẹẻẽặẳẵằắăậẩẫầấạảđ₫0123456789]'.normalize(
      'NFC',
    );
  const regexString = `^${otherLetters}+\\s(${otherLetters}+\\s)*${otherLetters}+$`;
  const regexPattern = RegExp(regexString);
  return regexPattern.test(name.toLowerCase().normalize('NFC'));
};

const validateEmail = (email = '') => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export {validateEmail, validatePassword, checkSpecialName, validatePhone};
