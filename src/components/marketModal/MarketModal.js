import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Modal, View, TouchableOpacity, Alert } from 'react-native';
import { H4, Picker, ScreenContainer, H5Heavy, Flexbox } from '../common';
import { Localized, initLanguage } from '../../translations/Localized';

const Container = styled.View`
  height: 40%;
  width: 100%;
  padding: 100px 12px 0 12px;
  justify-content: space-between;
  align-items: center;
`;

const MarketModal = ({
  visible,
  onClose,
  context,
  items,
  value,
  onValueChange,
}) => {
  initLanguage();
  const ref = useRef(value);
  const closeModal = () => {
    if (!value) {
      return Alert.alert(Localized('Please select a market'));
    }
    return onClose();
  };

  const onCancel = () => {
    onValueChange(ref.current);
    onClose();
  };

  // we need to restructure the markets from the database into a structure that fits the dropdown picker
  const reshapedItems = items?.map((item) => ({
    id: item.countryId,
    label: item.countryName,
    value: item.countryCode,
    pictureUrl: item.pictureUrl,
  }));

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onCancel}>
      <ScreenContainer style={{ justifyContent: 'flex-start' }}>
        <Container>
          <H4
            style={{
              width: '80%',
              textAlign: 'center',
            }}>
            {Localized(
              `Select a market to see corresponding resources from Corporate`,
            )}
            {context === 'news' &&
              Localized(
                `Select a market to see corresponding news from Corporate`,
              )}
          </H4>
          <View style={{ width: '100%' }}>
            <Picker
              items={reshapedItems}
              value={value}
              onValueChange={onValueChange}
              placeholder={{}}
            />
            <Flexbox
              direction="row"
              justify="flex-end"
              style={{ marginTop: 16 }}>
              <TouchableOpacity
                testID="cancel-button-in-market-modal"
                onPress={onCancel}>
                <H5Heavy>{Localized('CANCEL')}</H5Heavy>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginStart: 16 }}
                testID="save-button-in-market-modal"
                onPress={closeModal}>
                <H5Heavy>{Localized('save').toUpperCase()}</H5Heavy>
              </TouchableOpacity>
            </Flexbox>
          </View>
        </Container>
      </ScreenContainer>
    </Modal>
  );
};

MarketModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  context: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  value: PropTypes.string,
  onValueChange: PropTypes.func,
};

export default MarketModal;
