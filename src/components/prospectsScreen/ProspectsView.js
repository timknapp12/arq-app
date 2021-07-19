import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { MainScrollView, Flexbox, H5 } from '../common';
import ContactCard from './contactCard/ContactCard';
import { Localized } from '../../translations/Localized';

const ProspectsView = ({ prospects }) => {
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
        {prospects?.length < 1 ? (
          <Flexbox>
            <H5>{Localized('There are no saved prospects')}</H5>
          </Flexbox>
        ) : null}
        {prospects?.map((item, index) => (
          <ContactCard
            key={item.prospectId}
            style={{ zIndex: -index }}
            data={item}
          />
        ))}
      </View>
    </MainScrollView>
  );
};

ProspectsView.propTypes = {
  prospects: PropTypes.array.isRequired,
};

export default ProspectsView;
