import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity as GestureTouchable } from 'react-native-gesture-handler';
import { Animated, View } from 'react-native';
import { Flexbox } from './containers';
import AddProspectIcon from '../../../assets/icons/enrollment-icon.svg';
import AddFolderIcon from '../../../assets/icons/AddFolderIcon.svg';
import AddAssetIcon from '../../../assets/icons/AddAssetIcon.svg';
import add from '../../../assets/icons/AddIcon_White.png';
import AppContext from '../../contexts/AppContext';
import LoginContext from '../../contexts/LoginContext';
import TabButtonContext from '../../contexts/TabButtonContext';

// ADD BUTTON
const AddButton = styled(GestureTouchable)`
  height: 56px;
  width: 56px;
  background-color: ${(props) => props.theme.primaryButtonBackgroundColor};
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.dropShadow};
`;

// ANIMATED ADD BUTTON OPTIONS
const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
`;

const SmallAddButton = styled(GestureTouchable)`
  height: 40px;
  width: 40px;
  background-color: ${(props) => props.theme.primaryButtonBackgroundColor};
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.dropShadow};
`;

const AnimatedRow = Animated.createAnimatedComponent(ButtonRow);
const AnimatedSmallButton = Animated.createAnimatedComponent(SmallAddButton);

export const AnimatedAddButtonRow = () => {
  const { theme } = useContext(AppContext);
  const {
    buttonScaleAnim,
    rowWidthAnim,
    rowTopAnim,
    handleAddProspect,
    handleAddFolder,
    handleAddAsset,
  } = useContext(TabButtonContext);

  const iconStyle = {
    height: 36,
    width: 36,
    color: theme.primaryTextColor,
    alignSelf: 'center',
  };
  return (
    <>
      <AnimatedRow style={{ top: rowTopAnim, width: rowWidthAnim }}>
        <AnimatedSmallButton
          onPress={handleAddProspect}
          style={{
            transform: [{ scale: buttonScaleAnim }, { perspective: 1000 }],
          }}
        >
          <AddProspectIcon style={iconStyle} />
        </AnimatedSmallButton>
        <AnimatedSmallButton
          onPress={handleAddFolder}
          style={{
            transform: [{ scale: buttonScaleAnim }, { perspective: 1000 }],
          }}
        >
          <AddFolderIcon style={iconStyle} />
        </AnimatedSmallButton>
        <AnimatedSmallButton
          onPress={handleAddAsset}
          style={{
            transform: [{ scale: buttonScaleAnim }, { perspective: 1000 }],
          }}
        >
          <AddAssetIcon style={iconStyle} />
        </AnimatedSmallButton>
      </AnimatedRow>
    </>
  );
};

// Tab Bar Button
export const TabBarButton = ({ ...props }) => {
  const { theme } = useContext(AppContext);
  const { showAddOptions } = useContext(LoginContext);
  const {
    buttonScaleAnim,
    rowWidthAnim,
    rowTopAnim,
    spin,
    handleMainAddButton,
  } = useContext(TabButtonContext);

  return (
    <>
      <Flexbox
        {...props}
        height="0px"
        style={{
          position: 'absolute',
          bottom: 70,
        }}
      >
        {showAddOptions && (
          <AnimatedAddButtonRow
            buttonScaleAnim={buttonScaleAnim}
            rowWidthAnim={rowWidthAnim}
            rowTopAnim={rowTopAnim}
          />
        )}
        <View
          style={{
            height: 70,
            width: 70,
            borderRadius: 35,
            backgroundColor: theme.activeBackground,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          <AddButton onPress={handleMainAddButton} right="7px" bottom="7px">
            <Animated.Image
              source={add}
              style={{
                height: 46,
                width: 46,
                transform: [{ rotate: spin }],
              }}
            />
          </AddButton>
        </View>
      </Flexbox>
    </>
  );
};
