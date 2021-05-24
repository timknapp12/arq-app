import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { MainScrollView, Flexbox, H5 } from '../common';
import ContactCard from './contactCard/ContactCard';
import { Localized } from '../../translations/Localized';
// TODO delete this after getting real contacts
import { contacts } from './mockContacts';

const ProspectsView = ({
  isCalloutOpenFromParent,
  setIsCalloutOpenFromParent,
  isTouchDisabled,
  setIsTouchDisabled,
}) => {
  return (
    <MainScrollView>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          padding: 10,
        }}
        accessibilityLabel="Team Resources"
        onStartShouldSetResponder={() => true}>
        {contacts.length < 1 ? (
          <Flexbox>
            <H5>{Localized('There are no saved contacts')}</H5>
          </Flexbox>
        ) : null}
        {contacts.map((item, index) => (
          <ContactCard
            key={item.id}
            style={{ zIndex: -index }}
            data={item}
            isCalloutOpenFromParent={isCalloutOpenFromParent}
            setIsCalloutOpenFromParent={setIsCalloutOpenFromParent}
            isTouchDisabled={isTouchDisabled}
            setIsTouchDisabled={setIsTouchDisabled}
          />
        ))}
      </View>
    </MainScrollView>
  );
};

ProspectsView.propTypes = {
  isCalloutOpenFromParent: PropTypes.bool.isRequired,
  setIsCalloutOpenFromParent: PropTypes.func.isRequired,
  isTouchDisabled: PropTypes.bool.isRequired,
  setIsTouchDisabled: PropTypes.func.isRequired,
};

export default ProspectsView;
