import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Picker, ScreenContainer, H4Bold } from '../../src/components/common';

storiesOf('Picker', module)
  .addDecorator((getStory) => <ScreenContainer>{getStory()}</ScreenContainer>)
  .add('Picker countries', () => (
    <Picker
      value="us"
      label="Country"
      onValueChange={(value) => console.log(value)}
      items={pickerItems}
    />
  ))

  .add('Picker cs languages', () => (
    <>
      <H4Bold>Select</H4Bold>
      <Picker
        value="JavaScript"
        label="State"
        onValueChange={(value) => console.log(value)}
        items={[
          { label: 'GraphQl', value: 'gql' },
          { label: 'JavaScript', value: 'JavaScript' },
          { label: 'TypeStript', value: 'TypeStript' },
          { label: 'Python', value: 'Python' },
          { label: 'Java', value: 'Java' },
          { label: 'C++', value: 'C++' },
          { label: 'C', value: 'C' },
        ]}
      />
    </>
  ));

const pickerItems = [
  {
    label: 'United States',
    value: 'us',
  },
  {
    label: 'United Kingdom',
    value: 'uk',
  },
  {
    label: 'Japan',
    value: 'jp',
  },
  {
    label: 'Germany',
    value: 'de',
  },
  {
    label: 'France',
    value: 'fr',
  },
];
