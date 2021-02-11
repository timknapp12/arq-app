import React from 'react';
import { render } from '../Utils/test-utils';

import HomeScreen from '../components/HomeScreen';

describe('<HomeScreen />', () => {
  it('Home Screen has a title called Home Screen', async () => {
    const { getByTestId } = render(<HomeScreen navigation={{}} />);

    const screenTitle = 'Home Screen';

    expect(getByTestId('home-screen-title').props.children).toBe(screenTitle);
  });
});
