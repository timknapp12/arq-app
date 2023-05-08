import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { useMutation } from '@apollo/client';
import { Modal } from 'react-native';
import {
  Flexbox,
  H5Heavy,
  H6Secondary,
  Input,
  Gap,
  AlertText,
} from '../../common';
import { UPDATE_COMMISSION_TREE_NODE } from '../../../graphql/mutations';
import { GET_USER } from '../../../graphql/queries';
import { Localized } from '../../../translations/Localized';

const Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.modalBackgroundColor};
  flex: 1;
`;
const Inner = styled.KeyboardAvoidingView`
  width: 80%;
  background-color: ${(props) => props.theme.backgroundColor};
  padding: 20px 20px 0px 20px;
  box-shadow: ${(props) => props.theme.dropShadow};
`;

const SaveButton = styled.TouchableOpacity`
  opacity: ${(props) => (props.disabled ? 0.35 : 0.83)};
`;

const PlacementConfirmModal = ({
  visible,
  onClose,
  onConfirm,
  selectedUpline,
  selectedPlacementEnrolee,
}) => {
  const [error, setError] = useState('');

  const [placeAmbassador, { loading }] = useMutation(
    UPDATE_COMMISSION_TREE_NODE,
    {
      variables: {
        associateId: selectedPlacementEnrolee?.associateId,
        newUplineAssociateId: selectedUpline?.associateId,
      },
      refetchQueries: [
        {
          query: GET_USER,
          variables: { legacyAssociateId: selectedUpline.legacyAssociateId },
        },
      ],
      onCompleted: () => onClose(),
      onError: (err) => setError(err.message),
    },
  );
  console.log('placeAmbassador', placeAmbassador);
  console.log('selectedUpline', selectedUpline);
  console.log('selectedPlacementEnrolee', selectedPlacementEnrolee);
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
          {error ? <AlertText>{error}</AlertText> : null}
          <H6Secondary>{Localized('Confirm Placement')}</H6Secondary>
          <Gap height="8px" />
          <Input
            label={Localized('Upline Ambassador')}
            value={selectedUpline?.name}
            disabled
          />
          <Gap height="8px" />
          <Input
            label={Localized('Enrollee')}
            value={selectedPlacementEnrolee?.name}
            disabled
          />
          <Flexbox padding={10} direction="row" justify="flex-end">
            <SaveButton testID="cancel-button-in-edit-modal" onPress={onClose}>
              <H5Heavy>{Localized('Cancel').toUpperCase()}</H5Heavy>
            </SaveButton>
            <SaveButton
              testID="save-button-in-edit-modal"
              style={{ marginStart: 16 }}
              disabled={loading}
              onPress={onConfirm}
            >
              <H5Heavy>{Localized('Confirm').toUpperCase()}</H5Heavy>
            </SaveButton>
          </Flexbox>
        </Inner>
      </Container>
    </Modal>
  );
};

PlacementConfirmModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  selectedUpline: PropTypes.object.isRequired,
  selectedPlacementEnrolee: PropTypes.object.isRequired,
};

export default PlacementConfirmModal;
