import React from 'react';
import { render } from '../Utils/test-utils';
import PasswordRecoveryScreen from '../Components/PasswordRecoveryScreen';

describe('Testing react navigation', () => {
  test('screeen contains the intructions, 1 input fields and Submit Button', () => {
    const { queryByTestId } = render(
      <PasswordRecoveryScreen navigation={{}} />,
    );

    const title = queryByTestId('recover-password-instructions');
    const emailInput = queryByTestId('email-input');
    const button = queryByTestId('password-recovery-button');

    expect(title).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(button).toBeTruthy();
  });
});
