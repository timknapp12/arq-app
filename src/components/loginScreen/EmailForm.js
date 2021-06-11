import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { Flexbox, Input, Label } from '../common';
import { Localized } from '../../translations/Localized';
import LoginContext from '../../contexts/LoginContext';

const EmailForm = ({ onSubmit, createAccount }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    setErrorMessage,
  } = useContext(LoginContext);

  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const onNext = () => {
    passwordRef.current.focus();
  };

  const onToConfirm = () => {
    confirmPasswordRef.current.focus();
  };

  if (createAccount) {
    return (
      <Flexbox>
        <Flexbox align="flex-start" height="50px" style={{ marginBottom: 8 }}>
          <Label>{Localized('Email Address')}</Label>
          <Input
            auotFocus
            testID="new-account-email-input"
            value={email}
            onChangeText={(text) => {
              setErrorMessage('');
              setEmail(text);
            }}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={onNext}
            autoCapitalize="none"
          />
        </Flexbox>

        <Flexbox align="flex-start" style={{ marginBottom: 4 }}>
          <Label>{Localized('Type a password')}</Label>
          <Input
            testID="new-account-password-input"
            value={password}
            onChangeText={(text) => {
              setErrorMessage('');
              setPassword(text);
            }}
            ref={passwordRef}
            textContentType="password"
            returnKeyType="next"
            onSubmitEditing={onToConfirm}
          />
        </Flexbox>

        <Flexbox align="flex-start" style={{ marginBottom: 4 }}>
          <Label>{Localized('Re-type a password')}</Label>
          <Input
            testID="confirm-password-input"
            value={confirmPassword}
            onChangeText={(text) => {
              setErrorMessage('');
              setConfirmPassword(text);
            }}
            ref={confirmPasswordRef}
            textContentType="password"
            returnKeyType="go"
            onSubmitEditing={onSubmit}
          />
        </Flexbox>
      </Flexbox>
    );
  }
  return (
    <Flexbox>
      <Flexbox align="flex-start" height="50px" style={{ marginBottom: 8 }}>
        <Label>{Localized('Email Address')}</Label>
        <Input
          testID="email-input"
          value={email}
          onChangeText={(text) => {
            setErrorMessage('');
            setEmail(text);
          }}
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={onNext}
          autoCapitalize="none"
        />
      </Flexbox>

      <Flexbox align="flex-start" style={{ marginBottom: 4 }}>
        <Label>{Localized('Password')}</Label>
        <Input
          testID="password-input"
          value={password}
          onChangeText={(text) => {
            setErrorMessage('');
            setPassword(text);
          }}
          ref={passwordRef}
          textContentType="password"
          returnKeyType="go"
          onSubmitEditing={onSubmit}
        />
      </Flexbox>
    </Flexbox>
  );
};

EmailForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  createAccount: PropTypes.bool,
};

export default EmailForm;
