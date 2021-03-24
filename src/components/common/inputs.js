import React, { useState, useEffect, useRef } from 'react';
import { Pressable, Animated, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Flexbox } from './containers';

// Standard Input with Password able to be shown or hidden
const ThemedTextInputContainer = styled.View`
  width: 100%;
  align-items: flex-end;
  height: 28px;
  flex-direction: row;
  border-bottom-width: ${(props) =>
    props.focused || props.validationError ? '3px' : '1px'};
  border-bottom-color: ${(props) =>
    props.validationError
      ? props.theme.error
      : props.focused
      ? props.theme.highlight
      : props.theme.disabledTextColor};
  padding-bottom: 3px;
`;

const ThemedInput = styled.TextInput`
  color: ${(props) => props.theme.color};
  flex: 1;
  font-size: 16px;
  font-family: 'Roboto-Regular';
`;

const ThemedIcon = styled(Ionicons)`
  color: ${(props) => props.theme.disabledTextColor};
`;

// eslint-disable-next-line react/display-name
export const Input = React.forwardRef(
  ({ focused, textContentType, validationError = false, ...props }, ref) => {
    const [secureTextEntry, setSecureTextEntry] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
      if (focused) {
        setIsFocused(true);
      }
      return () => {
        setIsFocused(false);
      };
    }, [focused]);

    useEffect(() => {
      if (textContentType === 'password') {
        setSecureTextEntry(true);
      }
    }, [textContentType]);

    return (
      <ThemedTextInputContainer
        focused={isFocused}
        validationError={validationError}>
        <ThemedInput
          ref={ref}
          secureTextEntry={secureTextEntry}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          {...props}
        />
        {textContentType === 'password' ? (
          <Pressable
            testID="show-passord-button"
            hitSlop={8}
            onPress={() => setSecureTextEntry((state) => !state)}>
            {secureTextEntry ? (
              <ThemedIcon size={24} name="eye" />
            ) : (
              <ThemedIcon size={24} name="eye-off" />
            )}
          </Pressable>
        ) : null}
      </ThemedTextInputContainer>
    );
  },
);

Input.propTypes = {
  textContentType: PropTypes.string,
  focused: PropTypes.bool,
  validationError: PropTypes.bool,
};

// Animated Input where label animates

const Label = styled.Text`
  font-size: 16px;
  font-family: 'Roboto-Regular';
  color: ${(props) => props.theme.secondaryTextColor};
`;

const ThemedAnimatedInput = styled.TextInput`
  border-bottom-width: ${(props) =>
    props.focused || props.validationError ? '3px' : '1px'};
  border-bottom-color: ${(props) =>
    props.validationError
      ? props.theme.error
      : props.focused
      ? props.theme.highlight
      : props.theme.disabledTextColor};
  color: ${(props) => props.theme.color};
  width: 100%;
  font-size: 16px;
  font-family: 'Roboto-Regular';
  padding: 3px 0;
`;

const CustomInput = Animated.createAnimatedComponent(ThemedAnimatedInput);

export const AnimatedInput = ({
  value = '',
  onChangeText = () => {},
  label = '',
  validationError = false,
  ...props
}) => {
  const inputRef = useRef();
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
    expand();
  };
  const onBlur = () => {
    setIsFocused(false);
    if (!value) {
      shrink();
    }
  };

  const initialValue = value ? 24 : 3;
  const fadeAnim = useRef(new Animated.Value(initialValue)).current;

  const expand = () => {
    Animated.timing(fadeAnim, {
      toValue: 24,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const shrink = () => {
    Animated.timing(fadeAnim, {
      toValue: 3,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <TouchableWithoutFeedback onPress={() => inputRef.current.focus()}>
      <Flexbox height="50px" justify="flex-end">
        <Flexbox align="flex-start">
          <Label>{label}</Label>
          <CustomInput
            ref={inputRef}
            value={value}
            onChangeText={onChangeText}
            focused={isFocused}
            validationError={validationError}
            onFocus={onFocus}
            onBlur={onBlur}
            {...props}
            style={{ height: fadeAnim }}
          />
        </Flexbox>
      </Flexbox>
    </TouchableWithoutFeedback>
  );
};

AnimatedInput.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  label: PropTypes.string,
  validationError: PropTypes.bool,
};
