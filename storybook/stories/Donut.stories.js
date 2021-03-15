import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ScreenContainer } from '../../src/components/Common';
import Donut from '../../src/components/DashboardScreen/Donut';
import DoubleDonut from '../../src/components/DashboardScreen/DoubleDonut';

storiesOf('Donut', module)
  .addDecorator((getStory) => (
    <ScreenContainer style={{ justifyContent: 'flex-start' }}>
      {getStory()}
    </ScreenContainer>
  ))
  .add('donut with 100%', () => (
    <Donut percentage={456} max={456} color="purple" />
  ))
  .add('donut with 75%', () => (
    <Donut percentage={75} max={100} color="purple" />
  ))
  .add('double donut', () => (
    <DoubleDonut
      outerpercentage={206}
      outermax={256}
      outercolor="red"
      innerpercentage={155}
      innermax={256}
      innercolor="hotpink"
    />
  ));
