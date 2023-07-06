import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleConfirmationCodeChange = (e) => {
    setConfirmationCode(e.target.value);
  };

  const handleSendCode = async () => {
    /* try {
      const response = await axios.post(
        `https://api.telegram.org/bot/auth.sendCode`,
        {
          phone_number: phoneNumber,
          settings: {
            api_id,
            api_hash
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    } */
  };

  const handleSignIn = async () => {
   /*  try {
      const response = await axios.post(
        `https://api.telegram.org/bot/auth.signIn`,
        {
          phone_number: phoneNumber,
          phone_code_hash,
          phone_code: confirmationCode,
        }
      );

      console.log(response.data);

      const token = response.data.result.auth_token;
      localStorage.setItem('auth_token', token);

    } catch (error) {
      console.error(error);
    } */
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Phone Number:</label>
        <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} />
      </div>
      <div>
        <label>Confirmation Code:</label>
        <input type="text" value={confirmationCode} onChange={handleConfirmationCodeChange} />
      </div>
      <button onClick={handleSendCode}>Send Code</button>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default Login;

