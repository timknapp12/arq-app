import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Modal } from 'react-native';
import {
  ScreenContainer,
  H4Bold,
  Flexbox,
  H2Normal,
  CloseIcon,
  H5,
} from '../../Common';
import Header from '../../Header';
import Subheader from '../Subheader';

const MyInfoModal = ({ setIsMyInfoModalOpen, isMyInfoModalOpen }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isMyInfoModalOpen}
      onRequestClose={() => setIsMyInfoModalOpen(false)}>
      <ScreenContainer>
        <Flexbox justify="flex-start" height="100%">
          <Header>
            <TouchableOpacity onPress={() => setIsMyInfoModalOpen(false)}>
              <CloseIcon />
            </TouchableOpacity>
            <H2Normal>My Info</H2Normal>
            <H4Bold>SAVE</H4Bold>
          </Header>
          <Subheader justify="center">
            <H5>Contact Information</H5>
          </Subheader>
        </Flexbox>
      </ScreenContainer>
    </Modal>
  );
};

MyInfoModal.propTypes = {
  setIsMyInfoModalOpen: PropTypes.func.isRequired,
  isMyInfoModalOpen: PropTypes.bool.isRequired,
};

export default MyInfoModal;
