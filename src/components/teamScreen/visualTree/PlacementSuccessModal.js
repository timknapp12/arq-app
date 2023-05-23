import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Modal } from 'react-native';
import { Flexbox, H5Heavy, H5 } from '../../common';
import { Localized } from '../../../translations/Localized';

const Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.modalBackgroundColor};
  flex: 1;
`;
const Inner = styled.View`
  width: 80%;
  background-color: ${(props) => props.theme.backgroundColor};
  padding: 20px 20px 0px 20px;
  box-shadow: ${(props) => props.theme.dropShadow};
`;

const SaveButton = styled.TouchableOpacity`
  opacity: ${(props) => (props.disabled ? 0.35 : 0.83)};
`;

const PlacementSuccessModal = ({ visible, onClose, placementSuccessData }) => {
  const message = Localized('Success! {name1} is now on the team of {name2}')
    .replace('{name1}', placementSuccessData?.enrolleeName)
    .replace('{name2}', placementSuccessData?.uplineName);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <Container>
        <Inner contentContainerStyle={{ width: '100%' }}>
          <H5>{message}</H5>

          <Flexbox padding={10} direction="row" justify="flex-end">
            <SaveButton
              testID="cancel-button-in-place-success-modal"
              onPress={onClose}
            >
              <H5Heavy>{Localized('Close').toUpperCase()}</H5Heavy>
            </SaveButton>
          </Flexbox>
        </Inner>
      </Container>
    </Modal>
  );
};

PlacementSuccessModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  placementSuccessData: PropTypes.object.isRequired,
};

export default PlacementSuccessModal;
