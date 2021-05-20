import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ScreenContainer, Flexbox } from '../../src/components/common';
import MultiAssetMenu from '../../src/components/resourcesScreen/corporateView/MultiAssetMenu';

const options = [
  { title: 'Image', contentType: 'image' },
  { title: 'Video', contentType: 'video' },
  { title: 'com plan', contentType: 'pdf' },
  { title: 'Bills success story', contentType: 'podcast' },
];

storiesOf('Multi Asset Menu', module)
  .addDecorator((getStory) => <ScreenContainer>{getStory()}</ScreenContainer>)
  .add('download', () => (
    <Flexbox height="300px" style={{ backgroundColor: '#2C2C2C' }}>
      <MultiAssetMenu
        title="Download"
        onPress={() => console.log('download pressed')}
        options={options}
      />
    </Flexbox>
  ))
  .add('share', () => (
    <Flexbox height="300px" style={{ backgroundColor: '#2C2C2C' }}>
      <MultiAssetMenu
        title="Share"
        onPress={() => console.log('share pressed')}
        options={options}
      />
    </Flexbox>
  ))
  .add('send', () => (
    <Flexbox height="300px" style={{ backgroundColor: '#2C2C2C' }}>
      <MultiAssetMenu
        title="Send to Prospect"
        onPress={() => console.log('share pressed')}
        options={options}
      />
    </Flexbox>
  ));
