import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Flexbox, Input } from '../common';
import { Localized } from '../../translations/Localized';
import AppContext from '../../contexts/AppContext';

const EmailForm = ({
  username,
  setUsername,
  password,
  setPassword,
  //   confirmPassword,
  //   setConfirmPassword,
  passwordRef,
  onNext,
  onSubmit,
}) => {
  const { theme } = useContext(AppContext);
  return (
    <Flexbox>
      <Flexbox height="50px" style={{ marginBottom: 8 }}>
        <Input
          testID="username-input"
          value={username}
          onChangeText={(text) => setUsername(text)}
          keyboardType="email-address"
          placeholder={Localized('Username')}
          placeholderTextColor={theme.disabledTextColor}
          returnKeyType="next"
          onSubmitEditing={onNext}
        />
      </Flexbox>

      <Flexbox style={{ marginBottom: 4 }}>
        <Input
          testID="password-input"
          value={password}
          onChangeText={(text) => setPassword(text)}
          ref={passwordRef}
          placeholder={Localized('Password')}
          placeholderTextColor={theme.disabledTextColor}
          textContentType="password"
          returnKeyType="go"
          onSubmitEditing={onSubmit}
        />
      </Flexbox>
    </Flexbox>
  );
};

EmailForm.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  confirmPassword: PropTypes.string,
  setConfirmPassword: PropTypes.func,
  passwordRef: PropTypes.object.isRequired,
  onNext: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EmailForm;
