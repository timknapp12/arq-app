import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity, Linking } from 'react-native';
import { H6, AlertText, Flexbox, Checkmark } from '../common';
import { Localized } from '../../translations/Localized';

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
  isError,
  saveUsername,
  setSaveUsername,
}) => {
  return (
    <Flexbox>
      {isError && (
        <AlertText
          style={{
            textAlign: 'center',
          }}>
          {Localized(
            `Sorry, we couldn't log you in. Please re-enter your username and password`,
          )}
        </AlertText>
      )}
      <Flexbox height="60px" direction="row">
        <TouchableOpacity>
          <H6 style={{ textDecorationLine: 'underline' }}>Create Q account</H6>
        </TouchableOpacity>
        <TouchableOpacity
          // TODO integrate password recovery screen
          // onPress={() =>
          //   navigation.navigate('Password Recovery Screen')
          // }
          onPress={() =>
            Linking.openURL('https://office2.myqsciences.com/#/Login')
          }
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
          }}
          onPress={() => setSaveUsername((state) => !state)}>
          <Checkbox selected={saveUsername}>
            {saveUsername && <Checkmark>&#10003;</Checkmark>}
          </Checkbox>
          <H6 style={{ marginStart: 12 }}>{Localized('Keep me logged in')}</H6>
        </TouchableOpacity>
      </Flexbox>
    </Flexbox>
  );
};

CreateAccountAndForgotPassword.propTypes = {
  isError: PropTypes.bool.isRequired,
  saveUsername: PropTypes.bool.isRequired,
  setSaveUsername: PropTypes.func.isRequired,
};

export default CreateAccountAndForgotPassword;
