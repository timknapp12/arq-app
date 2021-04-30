import React, { useState } from 'react';
import { storiesOf } from '@storybook/react-native';
import {
  ScreenContainer,
  PrimaryButton,
  Flexbox,
  H4Book,
} from '../../src/components/common';
import Toast from '../../src/components/toast/Toast';
import DownloadToast from '../../src/components/resourcesScreen/DownloadToast';

const Example = () => {
  const [showToast, setShowToast] = useState(false);
  return (
    <Flexbox height="100%" justify="space-around">
      <Toast visible={showToast}>
        <H4Book>TOAST</H4Book>
      </Toast>
      <Flexbox height="300px" justify="space-around">
        <PrimaryButton onPress={() => setShowToast(true)}>
          Show Toast
        </PrimaryButton>
        <PrimaryButton onPress={() => setShowToast(false)}>
          Dismiss Toast
        </PrimaryButton>
      </Flexbox>
    </Flexbox>
  );
};

storiesOf('Toasts', module)
  .addDecorator((getStory) => <ScreenContainer>{getStory()}</ScreenContainer>)
  .add('default', () => <Example />)
  .add('Download Toast', () => (
    <DownloadToast
      visible
      title="Image.png"
      body="Downloading..."
      progress={20}
    />
  ));
