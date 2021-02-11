import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { render, fireEvent } from '../Utils/test-utils';

import HomeStack from '../Navigation/HomeStack';

// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('Testing react navigation', () => {
  test('page contains the header, title, and Profile Button', async () => {
    const component = (
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    );

    const { getAllByText, findAllByText } = render(component);

    const title = await getAllByText('Home Screen');
    const button = await findAllByText('See Profile');

    expect(title.length).toBe(1);
    expect(button.length).toBe(1);
  });

  test('clicking on "See Profile" button takes you to the Profile screen', async () => {
    const component = (
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    );

    const { findByText } = render(component);
    const toClick = await findByText('See Profile');

    fireEvent(toClick, 'press');
    const newHeader = await findByText('Profile Screen');
    const newBody = await findByText('Welcome to the Profile Screen');

    expect(newHeader).toBeTruthy();
    expect(newBody).toBeTruthy();
  });
});
