import React, { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Animated, Easing } from 'react-native';
import TabButtonContext from '../contexts/TabButtonContext';
import AccessCodeModal from '../components/resourcesScreen/teamView/AccessCodeModal';
import AddContactModal from '../components/prospectsScreen/AddContactModal';
import LoginContext from '../contexts/LoginContext';

const { width: screenWidth } = Dimensions.get('screen');
const duration = 250;

const TabButtonDataContainer = ({ children }) => {
  const { setShowAddOptions } = useContext(LoginContext);
  const [isAccessCodeModalOpen, setIsAccessCodeModalOpen] = useState(false);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);

  const [teamName, setTeamName] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [isError, setIsError] = useState(false);

  const saveAccessCode = () => {};

  const buttonScaleAnim = useRef(new Animated.Value(0)).current;
  const rowWidthAnim = useRef(new Animated.Value(120)).current;
  const rowTopAnim = useRef(new Animated.Value(0)).current;
  // source for roateAnim https://javascript.plainenglish.io/creating-a-rotation-animation-in-react-native-45c3f2973d62
  const [rotateAnim] = useState(new Animated.Value(0));

  const openAddOptions = () => {
    setShowAddOptions(true);
    Animated.parallel([
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: duration,
        useNativeDriver: false,
      }),
      Animated.timing(rowWidthAnim, {
        toValue: screenWidth / 2,
        duration: duration,
        useNativeDriver: false,
      }),
      Animated.timing(rowTopAnim, {
        toValue: -46,
        duration: duration,
        useNativeDriver: false,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const closeAddOptions = () => {
    Animated.parallel([
      Animated.timing(buttonScaleAnim, {
        toValue: 0,
        duration: duration,
        useNativeDriver: false,
      }),
      Animated.timing(rowWidthAnim, {
        toValue: 120,
        duration: duration,
        useNativeDriver: false,
      }),
      Animated.timing(rowTopAnim, {
        toValue: 0,
        duration: duration,
        useNativeDriver: false,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => setShowAddOptions(false));
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <>
      <TabButtonContext.Provider
        value={{
          buttonScaleAnim,
          rowWidthAnim,
          rowTopAnim,
          spin,
          openAddOptions,
          closeAddOptions,
          isAccessCodeModalOpen,
          setIsAccessCodeModalOpen,
          isAddContactModalOpen,
          setIsAddContactModalOpen,
        }}
      >
        {children}
      </TabButtonContext.Provider>
      {isAccessCodeModalOpen && (
        <AccessCodeModal
          visible={isAccessCodeModalOpen}
          onClose={() => setIsAccessCodeModalOpen(false)}
          onSave={saveAccessCode}
          teamName={teamName}
          setTeamName={setTeamName}
          accessCode={accessCode}
          setAccessCode={setAccessCode}
          isNew
          isError={isError}
          setIsError={setIsError}
        />
      )}
      {isAddContactModalOpen && (
        <AddContactModal
          isAddContactModalOpen={isAddContactModalOpen}
          onClose={() => setIsAddContactModalOpen(false)}
          newContact={true}
        />
      )}
    </>
  );
};

TabButtonDataContainer.propTypes = {
  children: PropTypes.any.isRequired,
};

export default TabButtonDataContainer;
