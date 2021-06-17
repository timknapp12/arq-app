import React from 'react';
import { render } from '../../../utils/test-utils';
import LoginScreen from './LoginScreen';

describe.skip('Testing react navigation', () => {
  test('screeen contains the Sign in Button', async () => {
    const { findByTestId } = render(<LoginScreen navigation={{}} />);

    const button = await findByTestId('login-button');

    expect(button).toBeTruthy();
  });
});
