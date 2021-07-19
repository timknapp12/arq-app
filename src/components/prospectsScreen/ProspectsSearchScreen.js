import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, ScrollView } from 'react-native';
import { ScreenContainer, Flexbox, Input } from '../common';
import ContactCard from './contactCard/ContactCard';

const ProspectsSearchScreen = ({ route }) => {
  const { prospects = [] } = route.params;

  const [value, setValue] = useState('Search feature is not quite ready yet');

  const [isCalloutOpenFromParent, setIsCalloutOpenFromParent] = useState(false);
  const [isTouchDisabled, setIsTouchDisabled] = useState(false);

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
            testID="propsect-search-input"
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
              {prospects?.map((item, index) => (
                <ContactCard
                  key={item.prospectId}
                  style={{ zIndex: -index }}
                  data={item}
                  isCalloutOpenFromParent={isCalloutOpenFromParent}
                  setIsCalloutOpenFromParent={setIsCalloutOpenFromParent}
                  isTouchDisabled={isTouchDisabled}
                  setIsTouchDisabled={setIsTouchDisabled}
                />
              ))}
            </Flexbox>
          </TouchableWithoutFeedback>
        </ScrollView>
      </ScreenContainer>
    </TouchableWithoutFeedback>
  );
};

ProspectsSearchScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default ProspectsSearchScreen;
