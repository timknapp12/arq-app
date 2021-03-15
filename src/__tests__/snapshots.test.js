import React from 'react';
import { render } from '../Utils/test-utils';

import NewsScreen from '../components/NewsScreen';
import DashboardScreen from '../components/DashboardScreen';
import LoadingScreen from '../components/LoadingScreen';
import LoginScreen from '../components/LoginScreen';
import PasswordRecoveryScreen from '../components/PasswordRecoveryScreen';

describe.skip('snapshots for each screen', () => {
  it('snapshot for NewsScreen', () => {
    const { toJSON } = render(<NewsScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
  it('snapshot for DashboardScreen', () => {
    const { toJSON } = render(<DashboardScreen />);
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
  it('snapshot for PasswordRecoveryScreen', () => {
    const { toJSON } = render(<PasswordRecoveryScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
