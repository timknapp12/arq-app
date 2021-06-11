import React from 'react';
import { render } from '../../../utils/test-utils';
import LoginScreen from './LoginScreen';

describe('Testing react navigation', () => {
  test('screeen contains the log in instructions, 2 input fields and Sign in Button', () => {
    const { queryByTestId } = render(<LoginScreen navigation={{}} />);

    const title = queryByTestId('login-instructions');
    const usernameInput = queryByTestId('username-input');
    const passwordInput = queryByTestId('password-input');
    const button = queryByTestId('login-button');

    expect(title).toBeTruthy();
    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(button).toBeTruthy();
  });
});
