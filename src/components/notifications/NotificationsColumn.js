import React, { useState, useRef, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Directions, State } from 'react-native-gesture-handler';
import { Flexbox, H5Black } from '../common';
import NotificationCard from './notificationCard/NotificationCard';
import AppContext from '../../contexts/AppContext';
import LoginContext from '../../contexts/LoginContext';
import { Localized } from '../../translations/Localized';
import { CLEAR_ALL_PROPSECT_NOTIFICATIONS } from '../../graphql/mutations';
import { checkForPinnedNotifications } from '../../utils/notifications/checkForPinnedNotifications';
import {
  ColumnContainer,
  ClearButtonContainer,
  // NotificationBottomPadding,
} from './notificationCard/notificationCard.styles';

const windowHeight = Dimensions.get('window').height;

const NotificationsColumn = () => {
  const { associateId } = useContext(AppContext);
  const {
    displayNotifications,
    setDisplayNotifications,
    loadingProspectNotifications,
    prospectNotifications,
    refetchProspectsNotifications,
  } = useContext(LoginContext);

  const fadeAnim = useRef(new Animated.Value(-(windowHeight + 200))).current;

  const [isCalloutOpenFromParent, setIsCalloutOpenFromParent] = useState(false);
  const [isTouchDisabled, setIsTouchDisabled] = useState(false);

  const areTherePinnedNotifications = checkForPinnedNotifications(
    prospectNotifications,
  );

  const [clearAll] = useMutation(CLEAR_ALL_PROPSECT_NOTIFICATIONS, {
    variables: { associateId, deletePinned: false },
    onCompleted: () => {
      refetchProspectsNotifications();
      //  if there are no more pinned notifications then close the notification column
      !areTherePinnedNotifications && setDisplayNotifications(false);
    },
    onError: (error) => console.log(`error in clear all:`, error),
  });

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
    }
    if (!displayNotifications) {
      fadeUp();
    }
    if (displayNotifications && prospectNotifications?.length < 1) {
      setTimeout(() => {
        setDisplayNotifications(false);
      }, 3000);
    }
    return () => {
      fadeUp();
    };
  }, [displayNotifications, prospectNotifications]);

  const AnimatedContainer = Animated.createAnimatedComponent(ColumnContainer);

  return (
    <TouchableWithoutFeedback onPress={() => setIsCalloutOpenFromParent(false)}>
      <AnimatedContainer style={{ top: fadeAnim }}>
        {loadingProspectNotifications ? (
          <Flexbox>
            <H5Black>{Localized('Loading Notifications')}</H5Black>
            <ActivityIndicator />
          </Flexbox>
        ) : (
          <>
            <ScrollView
              style={{ width: '100%', maxHeight: windowHeight - 300 }}>
              <Flexbox
                style={{ zIndex: 2 }}
                onTouchEnd={() => {
                  // e.stopPropagation();
                  setIsCalloutOpenFromParent(false);
                }}
                onStartShouldSetResponder={() => true}>
                {prospectNotifications?.map((item, index) => (
                  <NotificationCard
                    style={{ zIndex: -index }}
                    key={item?.viewId}
                    data={item}
                    isCalloutOpenFromParent={isCalloutOpenFromParent}
                    setIsCalloutOpenFromParent={setIsCalloutOpenFromParent}
                    isTouchDisabled={isTouchDisabled}
                    setIsTouchDisabled={setIsTouchDisabled}
                  />
                ))}
              </Flexbox>
              {/* <TouchableWithoutFeedback
            onPress={() => {
              setIsCalloutOpenFromParent(false);
            }}>
            <NotificationBottomPadding onStartShouldSetResponder={() => true} />
          </TouchableWithoutFeedback> */}
            </ScrollView>
            <ClearButtonContainer
              direction={Directions.UP}
              onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.oldState === State.ACTIVE) {
                  setDisplayNotifications(false);
                }
              }}>
              {prospectNotifications?.length > 0 ? (
                <TouchableOpacity onPress={clearAll}>
                  <H5Black>{Localized('Clear All').toUpperCase()}</H5Black>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setDisplayNotifications(false)}>
                  <H5Black>
                    {Localized('You have no new notifications')}
                  </H5Black>
                </TouchableOpacity>
              )}
            </ClearButtonContainer>
          </>
        )}
      </AnimatedContainer>
    </TouchableWithoutFeedback>
  );
};

NotificationsColumn.propTypes = {
  items: PropTypes.array,
};

export default NotificationsColumn;
