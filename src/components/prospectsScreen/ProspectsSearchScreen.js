import React, { useState } from 'react';
import { TouchableWithoutFeedback, ScrollView } from 'react-native';
import { ScreenContainer, Flexbox, Input, H4 } from '../common';

const ProspectsSearchScreen = () => {
  const [value, setValue] = useState('Search feature is not quite ready yet');

  // this is to dismiss the little callout popup menu by tapping anywhere on the screen
  //   const [isCalloutOpenFromParent, setIsCalloutOpenFromParent] = useState(false);
  // this is to disable navigation to an asset on android devices when a touch event happens on a callout menu that is rendered over the top of an asset card
  //   const [isNavDisabled, setIsNavDisabled] = useState(false);

  return (
    <TouchableWithoutFeedback
      //   onPress={() => setIsCalloutOpenFromParent(false)}
      style={{ flex: 1 }}>
      <ScreenContainer
        style={{
          justifyContent: 'flex-start',
          paddingTop: 0,
          paddingBottom: 0,
          height: '100%',
        }}>
        <Flexbox width="85%">
          <Input
            autoFocus
            testID="team-search-input"
            value={value}
            onChangeText={(text) => setValue(text)}
            returnKeyType="done"
          />
        </Flexbox>
        <ScrollView
          style={{ flex: 1, width: '100%', height: '100%' }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 120,
            marginTop: 8,
          }}>
          <TouchableWithoutFeedback
          // onPress={() => setIsCalloutOpenFromParent(false)}
          >
            <Flexbox
              justify="flex-start"
              padding={10}
              onStartShouldSetResponder={() => true}
              height="100%">
              <H4>Search</H4>
            </Flexbox>
          </TouchableWithoutFeedback>
        </ScrollView>
      </ScreenContainer>
    </TouchableWithoutFeedback>
  );
};

export default ProspectsSearchScreen;
