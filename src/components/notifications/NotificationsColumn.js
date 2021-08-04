import React, { useState, useRef, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Flexbox, H5Black } from '../common';
import NotificationCard from './notificationCard/NotificationCard';
import AppContext from '../../contexts/AppContext';
import LoginContext from '../../contexts/LoginContext';
import { Localized } from '../../translations/Localized';
import { CLEAR_ALL_PROPSECT_NOTIFICATIONS } from '../../graphql/mutations';
import { checkForPinnedNotifications } from '../../utils/notifications/checkForPinnedNotifications';
import {
  ColumnContainer,
  ClearButton,
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
      areTherePinnedNotifications && setDisplayNotifications(false);
    },
    onError: (error) => console.log(`error`, error),
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
    } else {
      fadeUp();
    }
    return () => {
      fadeUp();
    };
  }, [displayNotifications]);

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
            {prospectNotifications?.length > 0 ? (
              <ClearButton onPress={clearAll}>
                <H5Black>{Localized('Clear All').toUpperCase()}</H5Black>
              </ClearButton>
            ) : (
              <ClearButton
                activeOpacity={1}
                onPress={() => setDisplayNotifications(false)}>
                <H5Black>{Localized('You have no new notifications')}</H5Black>
              </ClearButton>
            )}
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
