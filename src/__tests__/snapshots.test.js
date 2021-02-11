import React from 'react';
import { render } from '../Utils/test-utils';

import NewsScreen from '../Components/NewsScreen';
import HomeScreen from '../Components/HomeScreen';
import LoadingScreen from '../Components/LoadingScreen';
import LoginScreen from '../Components/LoginScreen';
import ProfileScreen from '../Components/ProfileScreen';
import PasswordRecoveryScreen from '../Components/PasswordRecoveryScreen';

describe.skip('snapshots for each screen', () => {
  it('snapshot for NewsScreen', () => {
    const { toJSON } = render(<NewsScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
  it('snapshot for HomeScreen', () => {
    const { toJSON } = render(<HomeScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
  it('snapshot for LoadingScreen', () => {
    const { toJSON } = render(<LoadingScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
  it('snapshot for LoginScreen', () => {
    const { toJSON } = render(<LoginScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
  it('snapshot for ProfileScreen', () => {
    const { toJSON } = render(<ProfileScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
  it('snapshot for ProfileScreen', () => {
    const { toJSON } = render(<PasswordRecoveryScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
