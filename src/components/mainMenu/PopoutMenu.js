import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Animated } from 'react-native';
// using the standard "TouchableOpacity" from react native didn't work on android with buttons inside a position: absolute view
import { TouchableOpacity } from 'react-native-gesture-handler';
import { H4Book } from '../common';
import { Localized } from '../../translations/Localized';
import AppContext from '../../contexts/AppContext';

const SideMenu = styled.View`
  z-index: 2;
  position: absolute;
  align-items: flex-start;
  top: 0;
  background-color: ${(props) => props.theme.sideMenuBackground};
  padding: 18px;
`;

const TouchableContainer = styled.View`
  width: 100%;
`;
const AnimatedMenu = Animated.createAnimatedComponent(SideMenu);

const Touchable = styled(TouchableOpacity)`
  padding: 2px;
`;

const PopoutMenu = ({
  fadeAnim,
  fadeOut,
  setIsMyInfoModalOpen,
  setIsSettingsModalOpen,
  navigation,
}) => {
  const { signOutOfFirebase } = useContext(AppContext);
  return (
    <AnimatedMenu style={{ left: fadeAnim }}>
      <TouchableContainer>
        <Touchable
          onPress={() => {
            fadeOut();
            setIsMyInfoModalOpen(true);
          }}
        >
          <H4Book>{Localized('My Info')}</H4Book>
        </Touchable>
      </TouchableContainer>

      <TouchableContainer>
        <Touchable
          onPress={() => {
            fadeOut();
            setIsSettingsModalOpen(true);
          }}
        >
          <H4Book>{Localized('Settings')}</H4Book>
        </Touchable>
      </TouchableContainer>

      <TouchableContainer>
        <Touchable
          onPress={() => {
            fadeOut();
            navigation.navigate('Prospects Stack');
          }}
        >
          <H4Book>{Localized('Prospects')}</H4Book>
        </Touchable>
      </TouchableContainer>

      <TouchableContainer>
        <Touchable
          onPress={() =>
            navigation.navigate('App Stack', {
              screen: 'Enrollment Screen',
            })
          }
        >
          <H4Book>{Localized('Enrollment')}</H4Book>
        </Touchable>
      </TouchableContainer>

      <TouchableContainer>
        <Touchable
          onPress={async () => {
            await signOutOfFirebase();
            navigation.navigate('Login Screen');
          }}
        >
          <H4Book>{Localized('Sign Out')}</H4Book>
        </Touchable>
      </TouchableContainer>
    </AnimatedMenu>
  );
};

PopoutMenu.propTypes = {
  fadeAnim: PropTypes.object.isRequired,
  fadeOut: PropTypes.func.isRequired,
  setIsMyInfoModalOpen: PropTypes.func.isRequired,
  setIsSettingsModalOpen: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default PopoutMenu;
