import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
import { H6, AlertText, Flexbox, Checkmark } from '../common';
import { Localized } from '../../translations/Localized';
import LoginContext from '../../contexts/LoginContext';

const Checkbox = styled.View`
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  border-color: ${(props) => props.theme.primaryTextColor};
  border-width: ${(props) => (props.selected ? '0px' : '1px')};
  background-color: ${(props) => (props.selected ? '#006699' : 'transparent')};
`;

const CreateAccountAndForgotPassword = ({
  navigateToCreateAccount,
  navigateToPasswordRecovery,
}) => {
  const { errorMessage, keepLoggedIn, onKeepLoggedIn } = useContext(
    LoginContext,
  );
  return (
    <Flexbox justify="flex-start">
      {errorMessage ? (
        <View style={{ height: 36 }}>
          <AlertText
            style={{
              textAlign: 'center',
            }}>
            {errorMessage}
          </AlertText>
        </View>
      ) : (
        <View style={{ height: 36 }} />
      )}
      <Flexbox height="30px" direction="row">
        <TouchableOpacity onPress={navigateToCreateAccount}>
          <H6 style={{ textDecorationLine: 'underline' }}>
            {Localized('Create Q account')}
          </H6>
        </TouchableOpacity>
        <TouchableOpacity
          // TODO integrate password recovery screen
          onPress={navigateToPasswordRecovery}
          testID="forgot-password-button">
          <H6>{Localized('Forgot password?')}</H6>
        </TouchableOpacity>
      </Flexbox>
      <Flexbox align="flex-start">
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginBottom: 4,
            marginTop: 4,
          }}
          onPress={() => onKeepLoggedIn(!keepLoggedIn)}>
          <Checkbox selected={keepLoggedIn}>
            {keepLoggedIn && <Checkmark>&#10003;</Checkmark>}
          </Checkbox>
          <H6 style={{ marginStart: 12 }}>{Localized('Keep me logged in')}</H6>
        </TouchableOpacity>
      </Flexbox>
    </Flexbox>
  );
};

CreateAccountAndForgotPassword.propTypes = {
  navigateToCreateAccount: PropTypes.func.isRequired,
  navigateToPasswordRecovery: PropTypes.func.isRequired,
};

export default CreateAccountAndForgotPassword;
