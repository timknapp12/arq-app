import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  ScreenContainer,
  Flexbox,
  CloseIcon,
  H2Normal,
  H5,
  H4Bold,
  H4Secondary,
  H4BoldSecondary,
  Switch,
} from '../Common';
import Header from '../Headers';
import Subheader from '../Headers/Subheader';
import { Localized, initLanguage } from '../../Translations/Localized';

const HeaderButtonContainer = styled.View`
  width: 60px;
`;

const SwitchContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
`;

const SocialContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  /* height: 40px; */
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.inactiveBackground};
`;

const ShareOptionsModal = ({
  isShareOptionsModalOpen,
  setIsShareOptionsModalOpen,
}) => {
  initLanguage();
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);
  const [isPhoneEnabled, setIsPhoneEnabled] = useState(false);
  const [isAddressEnabled, setIsAddressEnabled] = useState(false);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isShareOptionsModalOpen}
      onRequestClose={() => setIsShareOptionsModalOpen(false)}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScreenContainer>
          <Flexbox justify="flex-start" height="100%">
            <Header>
              <HeaderButtonContainer>
                <TouchableOpacity
                  onPress={() => setIsShareOptionsModalOpen(false)}>
                  <CloseIcon />
                </TouchableOpacity>
              </HeaderButtonContainer>
              <H2Normal>{Localized('Share Options')}</H2Normal>
              <HeaderButtonContainer>
                <View />
              </HeaderButtonContainer>
            </Header>
            <Subheader justify="center">
              <H5>{Localized('Lead Capture')}</H5>
            </Subheader>
            <Flexbox padding={20} accessibilityLabel="lead capture information">
              <SwitchContainer>
                <H4Secondary>{Localized('Name')}</H4Secondary>
                <H4BoldSecondary>{Localized('Required')}</H4BoldSecondary>
              </SwitchContainer>
              <SwitchContainer>
                <H4Secondary>{Localized('Email')}</H4Secondary>
                <Switch
                  onValueChange={() => setIsEmailEnabled((state) => !state)}
                  value={isEmailEnabled}
                />
              </SwitchContainer>
              <SwitchContainer>
                <H4Secondary>{Localized('Phone Number')}</H4Secondary>
                <Switch
                  onValueChange={() => setIsPhoneEnabled((state) => !state)}
                  value={isPhoneEnabled}
                />
              </SwitchContainer>
              <SwitchContainer>
                <H4Secondary>{Localized('Address')}</H4Secondary>
                <Switch
                  onValueChange={() => setIsAddressEnabled((state) => !state)}
                  value={isAddressEnabled}
                />
              </SwitchContainer>
            </Flexbox>
            <Subheader justify="space-between">
              <View style={{ width: 40 }} />
              <H5>{Localized('Social Display')}</H5>
              <TouchableOpacity style={{ width: 40 }}>
                <H4Bold>{Localized('ADD')}</H4Bold>
              </TouchableOpacity>
            </Subheader>
            <Flexbox
              padding={10}
              accessibilityLabel="social display information">
              <SocialContainer>
                <H4Bold>Facebook</H4Bold>
                <H4Bold>sloane</H4Bold>
              </SocialContainer>
            </Flexbox>
          </Flexbox>
        </ScreenContainer>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

ShareOptionsModal.propTypes = {
  isShareOptionsModalOpen: PropTypes.bool.isRequired,
  setIsShareOptionsModalOpen: PropTypes.func.isRequired,
};

export default ShareOptionsModal;
