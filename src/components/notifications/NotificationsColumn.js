import React, { useState, useRef, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import {
  Animated,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Flexbox, H5Black } from '../common';
import NotificationCard from './notificationCard/NotificationCard';
import AppContext from '../../contexts/AppContext';
import LoginContext from '../../contexts/LoginContext';
import items from './mockNotifications';
import { Localized } from '../../translations/Localized';
import { CLEAR_ALL_PROPSECT_NOTIFICATIONS } from '../../graphql/mutations';
import {
  ColumnContainer,
  ClearButton,
  NotificationBottomPadding,
} from './notificationCard/notificationCard.styles';

const windowHeight = Dimensions.get('window').height;

const NotificationsColumn = () => {
  const { associateId } = useContext(AppContext);
  const { displayNotifications, setDisplayNotifications } =
    useContext(LoginContext);

  const fadeAnim = useRef(new Animated.Value(-(windowHeight + 200))).current;

  const [isCalloutOpenFromParent, setIsCalloutOpenFromParent] = useState(false);
  const [isTouchDisabled, setIsTouchDisabled] = useState(false);

  const [clearAll] = useMutation(CLEAR_ALL_PROPSECT_NOTIFICATIONS, {
    variables: { associateId, deletePinned: false },
    // refetchQueries: [{}],
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
        <ScrollView style={{ width: '100%', maxHeight: windowHeight - 300 }}>
          <Flexbox
            style={{ zIndex: 2 }}
            onTouchEnd={() => {
              // e.stopPropagation();
              setIsCalloutOpenFromParent(false);
            }}
            onStartShouldSetResponder={() => true}>
            {items?.map((item, index) => (
              <NotificationCard
                style={{ zIndex: -index }}
                key={item?.sentLinkId}
                data={item}
                isCalloutOpenFromParent={isCalloutOpenFromParent}
                setIsCalloutOpenFromParent={setIsCalloutOpenFromParent}
                isTouchDisabled={isTouchDisabled}
                setIsTouchDisabled={setIsTouchDisabled}
              />
            ))}
          </Flexbox>
          <TouchableWithoutFeedback
            onPress={() => {
              console.log('this is getting clicked');
              setIsCalloutOpenFromParent(false);
            }}>
            <NotificationBottomPadding onStartShouldSetResponder={() => true} />
          </TouchableWithoutFeedback>
        </ScrollView>
        {items?.length > 0 ? (
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
      </AnimatedContainer>
    </TouchableWithoutFeedback>
  );
};

NotificationsColumn.propTypes = {
  items: PropTypes.array,
};

export default NotificationsColumn;
