import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import ErrorModal from '../../src/components/ErrorModal';

const Example = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setIsModalOpen(true)}>
        <Text>Open Modal</Text>
      </TouchableOpacity>
      <ErrorModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        errorMessage="Network connection failed"
      />
    </>
  );
};

storiesOf('Error Modal', module)
  .addDecorator((getStory) => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      }}>
      {getStory()}
    </View>
  ))
  .add('default', () => <Example />);
