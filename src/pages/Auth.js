import React, { useState } from 'react';
import axios from 'axios';

function Login() {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const botToken = '';

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleConfirmationCodeChange = (e) => {
    setConfirmationCode(e.target.value);
  };

  const handleSendCode = async () => {
    try {
      const response = await axios.post(
        `https://api.telegram.org/bot${botToken}/auth.sendCode`,
        {
          phone_number: phoneNumber,
        }
      );
      console.log(response.data);
      setIsCodeSent(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        `https://api.telegram.org/bot${botToken}/auth.signIn`,
        {
          phone_number: phoneNumber,
          phone_code: confirmationCode,
        }
      );

      console.log(response.data);

      const token = response.data.result.auth_token;
      localStorage.setItem('auth_token', token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id ="login">
      <h2 id="loginTxt">Login</h2>
      {!isCodeSent && (
        <div>
          <input id="phoneNum" placeholder="Номер телефона" type="text" value={phoneNumber} onChange={handlePhoneNumberChange} />
          <button id="sendCode"onClick={handleSendCode}>Получить код</button>
        </div>
      )}
      {isCodeSent && (
        <div>
          <input  placeholder="Код подтверждения" type="text" value={confirmationCode} onChange={handleConfirmationCodeChange} />
          <button onClick={handleSignIn}>Войти</button>
        </div>
      )}
    </div>
  );
};

export default Login;
