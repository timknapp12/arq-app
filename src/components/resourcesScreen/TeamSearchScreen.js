import React from 'react';
import { ScreenContainer, Flexbox, Input, H4 } from '../common';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';

const TeamSearchScreen = () => {
  return (
    <TouchableWithoutFeedback style={{ flex: 1 }}>
      <ScreenContainer style={{ justifyContent: 'flex-start', height: '100%' }}>
        <Flexbox width="85%">
          <Input />
        </Flexbox>
        <ScrollView
          style={{ flex: 1, width: '100%', height: '100%' }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 120,
            marginTop: 8,
          }}>
          <Flexbox onStartShouldSetResponder={() => true} height="100%">
            <Flexbox
              style={{
                height: 80,
                backgroundColor: 'lightblue',
                marginTop: 9,
                width: '100%',
              }}>
              <H4>Hi</H4>
            </Flexbox>
          </Flexbox>
        </ScrollView>
      </ScreenContainer>
    </TouchableWithoutFeedback>
  );
};

export default TeamSearchScreen;
