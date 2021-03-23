import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import EditModal from '../../src/components/editModal/EditModal';
import { AnimatedInput } from '../../src/components/common';

const Example = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setIsModalOpen(true)}>
        <Text>Open Edit Modal</Text>
      </TouchableOpacity>
      <EditModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={() => {
          console.log('save the info');
          setIsModalOpen(false);
        }}>
        <AnimatedInput auotFocus={true} label="Username" value="test" />
      </EditModal>
    </>
  );
};

storiesOf('Edit Modal', module)
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
