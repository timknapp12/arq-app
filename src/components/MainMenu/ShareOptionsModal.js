import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';
import { ScreenContainer, H4Bold } from '../Common';

const ShareOptionsModal = ({
  isShareOptionsModalOpen,
  setIsShareOptionsModalOpen,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isShareOptionsModalOpen}
      onRequestClose={() => setIsShareOptionsModalOpen(false)}>
      <ScreenContainer>
        <H4Bold>Share Options</H4Bold>
      </ScreenContainer>
    </Modal>
  );
};

ShareOptionsModal.propTypes = {
  isShareOptionsModalOpen: PropTypes.bool.isRequired,
  setIsShareOptionsModalOpen: PropTypes.func.isRequired,
};

export default ShareOptionsModal;
