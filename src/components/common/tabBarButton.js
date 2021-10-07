import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import { useMutation } from '@apollo/client';
import { TouchableOpacity as GestureTouchable } from 'react-native-gesture-handler';
import { Animated, View, Alert } from 'react-native';
import { Flexbox } from './containers';
import AddProspectIcon from '../../../assets/icons/enrollment-icon.svg';
import AddFolderIcon from '../../../assets/icons/FolderIcon.svg';
import ResourcesIcon from '../../../assets/icons/resources.svg';
import add from '../../../assets/icons/AddIcon_White.png';
import AppContext from '../../contexts/AppContext';
import LoginContext from '../../contexts/LoginContext';
import TabButtonContext from '../../contexts/TabButtonContext';
import { Localized } from '../../translations/Localized';
import { ADD_TEAM_ACCESS_CODE } from '../../graphql/mutations';
import { GET_USERS_ACCESS_CODES } from '../../graphql/queries';

// ADD BUTTON
const AddButton = styled(GestureTouchable)`
  height: 56px;
  width: 56px;
  background-color: ${(props) => props.theme.primaryButtonBackgroundColor};
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 24px 12px rgba(0, 0, 0, 0.5);
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
  box-shadow: 0px 24px 12px rgba(0, 0, 0, 0.5);
`;

const AnimatedRow = Animated.createAnimatedComponent(ButtonRow);
const AnimatedSmallButton = Animated.createAnimatedComponent(SmallAddButton);

export const AnimatedAddButtonRow = () => {
  const { theme, associateId } = useContext(AppContext);
  const { alreadyHasTeam, usersTeamInfo } = useContext(LoginContext);
  const {
    buttonScaleAnim,
    rowWidthAnim,
    rowTopAnim,
    // isAccessCodeModalOpen,
    setIsAccessCodeModalOpen,
  } = useContext(TabButtonContext);

  console.log(`usersTeamInfo`, usersTeamInfo);

  // info in case the user needs to create a team
  const [teamName, setTeamName] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [isError, setIsError] = useState(false);
  console.log(`isError`, isError);

  const [addTeamAccessCode] = useMutation(ADD_TEAM_ACCESS_CODE, {
    variables: {
      associateId,
      teamName,
      accessCode,
      teamAccessId: 0,
    },
    refetchQueries: [
      { query: GET_USERS_ACCESS_CODES, variables: { associateId } },
    ],
    onCompleted: async () => {
      setTeamName('');
      setAccessCode('');
      return setIsAccessCodeModalOpen(false);
    },
    onError: () => setIsError(true),
  });

  const saveAccessCode = () => {
    if (teamName.length < 4 || teamName.length > 20) {
      return Alert.alert(
        Localized('Team name must be between 4-20 characters'),
      );
    }
    if (accessCode.length < 4 || accessCode.length > 20) {
      return Alert.alert(
        Localized('Access code must be between 4-20 characters'),
      );
    }
    addTeamAccessCode();
  };

  console.log(`saveAccessCode`, saveAccessCode);

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
          onPress={
            alreadyHasTeam
              ? () => setIsAccessCodeModalOpen(true)
              : () => console.log('no team')
          }
          style={{
            transform: [{ scale: buttonScaleAnim }, { perspective: 1000 }],
          }}
        >
          <AddProspectIcon style={iconStyle} />
        </AnimatedSmallButton>
        <AnimatedSmallButton
          onPress={() => console.log('add folder')}
          style={{
            transform: [{ scale: buttonScaleAnim }, { perspective: 1000 }],
          }}
        >
          <AddFolderIcon style={iconStyle} />
        </AnimatedSmallButton>
        <AnimatedSmallButton
          onPress={() => console.log('add resource')}
          style={{
            transform: [{ scale: buttonScaleAnim }, { perspective: 1000 }],
          }}
        >
          <ResourcesIcon style={iconStyle} />
        </AnimatedSmallButton>
      </AnimatedRow>
    </>
  );
};

// Tab Bar Button
export const TabBarButton = ({ ...props }) => {
  const { theme, hasPermissionsToWrite } = useContext(AppContext);
  const { showAddOptions } = useContext(LoginContext);
  const {
    buttonScaleAnim,
    rowWidthAnim,
    rowTopAnim,
    spin,
    setIsAddContactModalOpen,
    openAddOptions,
    closeAddOptions,
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
          <AddButton
            onPress={() =>
              !hasPermissionsToWrite
                ? setIsAddContactModalOpen(true)
                : showAddOptions
                ? closeAddOptions()
                : openAddOptions()
            }
            right="7px"
            bottom="7px"
          >
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
