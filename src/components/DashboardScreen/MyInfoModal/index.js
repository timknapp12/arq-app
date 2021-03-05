import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity, Modal } from 'react-native';
import {
  ScreenContainer,
  H4Bold,
  Flexbox,
  H2Normal,
  CloseIcon,
  H5,
  AnimatedInput,
} from '../../Common';
import Header from '../../Header';
import Subheader from '../Subheader';

const NameContainer = styled(Flexbox)``;

const Avatar = styled.View`
  height: 72px;
  width: 72px;
  background-color: grey;
  border-radius: 36px;
  margin-bottom: 8px;
`;

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
          <Flexbox width="85%">
            <NameContainer
              align="flex-end"
              justify="center"
              height="130px"
              // width="100%"
              // padding={8}
              direction="row">
              <Avatar />

              <Flexbox
                width="85%"
                justify="space-between"
                height="100%"
                padding={8}>
                <AnimatedInput label="First Name" />
                <AnimatedInput label="Last Name" />
              </Flexbox>
            </NameContainer>
            {/* <Flexbox width="100%" padding={8}> */}
            <AnimatedInput label="Display Name" />
            {/* </Flexbox> */}
          </Flexbox>
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
