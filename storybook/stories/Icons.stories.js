import React from 'react';
import { storiesOf } from '@storybook/react-native';
import {
  ScreenContainer,
  BellIcon,
  AccountIcon,
} from '../../src/components/Common';

storiesOf('Icons', module)
  .addDecorator((getStory) => (
    <ScreenContainer style={{ justifyContent: 'flex-start' }}>
      {getStory()}
    </ScreenContainer>
  ))
  .add('Bell Icon', () => <BellIcon />)
  .add('Bell Icon with badge', () => <BellIcon badgeValue={3} />)
  .add('Account Icon', () => <AccountIcon />);
