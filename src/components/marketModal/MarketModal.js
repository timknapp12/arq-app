import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Modal, View, TouchableOpacity, Alert } from 'react-native';
import { H4, Picker, ScreenContainer, H5Heavy } from '../common';
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
  const closeModal = () => {
    if (!value) {
      return Alert.alert(Localized('Please select a market'));
    }
    return onClose();
  };
  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
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
              items={items}
              value={value}
              onValueChange={onValueChange}
              placeholder={{
                label: Localized('Market'),
                value: null,
              }}
            />
            <View
              style={{ width: '100%', alignItems: 'flex-end', marginTop: 16 }}>
              <TouchableOpacity
                testID="save-button-in-market-modal"
                onPress={closeModal}>
                <H5Heavy>{Localized('SAVE')}</H5Heavy>
              </TouchableOpacity>
            </View>
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
