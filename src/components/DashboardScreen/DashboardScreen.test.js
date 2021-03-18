import React from 'react';
import { render } from '../../utils/test-utils';

import DashboardScreen from './DashboardScreen';

jest.useFakeTimers();

describe.skip('<DashboardScreen />', () => {
  it('Dashboard Screen has a title called Dashboard Screen', async () => {
    const { getByTestId } = render(<DashboardScreen navigation={{}} />);

    const screenTitle = 'Dashboard';

    expect(getByTestId('dashboard-screen-title').props.children).toBe(
      screenTitle,
    );
  });
});
