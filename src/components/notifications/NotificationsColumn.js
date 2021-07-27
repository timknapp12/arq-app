import React, { useRef, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Animated, Dimensions, ScrollView } from 'react-native';
import { Flexbox, H5Black } from '../common';
import NotificationCard from './notificationCard/NotificationCard';
import LoginContext from '../../contexts/LoginContext';
import items from './mockNotifications';
import { Localized } from '../../translations/Localized';

const windowHeight = Dimensions.get('window').height;

const Container = styled.View`
  padding: 0px;
  width: 100%;
  background-color: ${(props) => props.theme.backgroundColor};
  position: absolute;
`;

const ClearButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 12px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  /* border top and margin top simulates the margin at the bottom of each NotificationCard */
  border-top-width: 2px;
  margin-top: -2px;
  border-top-color: ${(props) => props.theme.backgroundColor};
`;

const NotificationsColumn = () => {
  const { displayNotifications } = useContext(LoginContext);
  const fadeAnim = useRef(new Animated.Value(-(windowHeight + 200))).current;

  const fadeDown = () => {
    Animated.timing(fadeAnim, {
      toValue: 36,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  const fadeUp = () => {
    Animated.timing(fadeAnim, {
      toValue: -windowHeight,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (displayNotifications) {
      fadeDown();
    } else {
      fadeUp();
    }
    return () => {
      fadeUp();
    };
  }, [displayNotifications]);

  const AnimatedContainer = Animated.createAnimatedComponent(Container);

  return (
    <AnimatedContainer style={{ top: fadeAnim }}>
      <ScrollView
        style={{ width: '100%', maxHeight: windowHeight - 300 }}
        // nestedScrollEnabled={true}
      >
        <Flexbox
          onStartShouldSetResponder={() => true}
          onTouchEnd={(e) => {
            e.stopPropagation();
          }}>
          {items?.map((item) => (
            <NotificationCard key={item.sentLinkId} />
          ))}
        </Flexbox>
      </ScrollView>
      <ClearButton>
        <H5Black>{Localized('Clear All').toUpperCase()}</H5Black>
      </ClearButton>
    </AnimatedContainer>
  );
};

NotificationsColumn.propTypes = {
  items: PropTypes.array,
};

export default NotificationsColumn;
