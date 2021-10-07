import React, { useState, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import AppContext from '../../contexts/AppContext';

const Toast = ({ visible, children, ...props }) => {
  const { theme } = useContext(AppContext);

  const [isToastVisible, setisToastVisible] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    setisToastVisible(true);
    // Will change fadeAnim value to 1 in 1 second
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 1000,
      delay: 2000,
      useNativeDriver: true,
    }).start(() => setisToastVisible(false));
  };

  const toastAnimation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  useEffect(() => {
    if (visible) {
      fadeIn();
    }
    if (!visible) {
      fadeOut();
    }
  }, [visible]);

  if (isToastVisible) {
    return (
      <Animated.View
        {...props}
        style={{
          top: toastAnimation,
          position: 'absolute',
          width: '100%',
          borderRadius: 10,
          backgroundColor: theme.activeBackground,
          justifyContent: 'center',
          padding: 12,
          zIndex: 2,
        }}
      >
        {children}
      </Animated.View>
    );
  }
  return null;
};

Toast.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.any,
};

export default Toast;
