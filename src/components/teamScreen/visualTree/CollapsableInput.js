import React, { useState, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Animated, Keyboard } from 'react-native';
import { Input } from '../../common';
import AppContext from '../../../contexts/AppContext';
import { Localized } from '../../../translations/Localized';

const CollapsableInput = ({ isOpen, value, onChangeText }) => {
  const { theme } = useContext(AppContext);
  const [inputWidth, setInputWidth] = useState(0);

  const anim = useRef(new Animated.Value(0)).current;

  const expand = () => {
    Animated.timing(anim, {
      toValue: 40,
      duration: 700,
      useNativeDriver: false,
    }).start(() => {
      setInputWidth('100%');
    });
  };
  const collapse = () => {
    setInputWidth(0);
    Keyboard.dismiss();
    Animated.timing(anim, {
      toValue: 0,
      duration: 700,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (isOpen) {
      expand();
    } else {
      collapse();
    }
  }, [isOpen]);

  return (
    <Animated.View style={{ width: inputWidth, height: anim }}>
      {isOpen && (
        <Input
          autoFocus
          value={value}
          onChangeText={onChangeText}
          placeholder={Localized('Search')}
          placeholderTextColor={theme.placeholderTextColor}
        />
      )}
    </Animated.View>
  );
};

CollapsableInput.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
};

export default CollapsableInput;
