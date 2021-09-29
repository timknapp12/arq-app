import React, { useState, useEffect, useRef } from 'react';
import {
  Pressable,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Flexbox } from './containers';
import { AlertText } from './texts';

// Standard Input with Password able to be shown or hidden
const ThemedTextInputContainer = styled.View`
  width: 100%;
  align-items: flex-end;
  height: 28px;
  flex-direction: row;
  padding-bottom: 3px;
  border-bottom-width: ${(props) =>
    props.focused || props.validationError ? '3px' : '1px'};
  border-bottom-color: ${(props) =>
    props.validationError
      ? props.theme.error
      : props.focused
      ? props.theme.highlight
      : props.theme.disabledTextColor};
`;

const ThemedInput = styled.TextInput`
  color: ${(props) => props.theme.primaryTextColor};
  flex: 1;
  font-size: 16px;
  font-family: 'Roboto-Regular';
`;

const ThemedIcon = styled(Ionicons)`
  color: ${(props) => props.theme.disabledTextColor};
`;

// eslint-disable-next-line react/display-name
export const Input = React.forwardRef(
  (
    {
      focused,
      textContentType,
      label = '',
      validationError = false,
      onFocus = () => {},
      style,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef();

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

    const onLabelTouch = () => {
      if (inputRef.current) {
        return inputRef.current.focus();
      }
      if (ref.current) {
        ref.current.focus();
      }
    };

    return (
      <TouchableOpacity style={style} activeOpacity={1} onPress={onLabelTouch}>
        <>
          {label ? <Label>{label}</Label> : null}
          <ThemedTextInputContainer
            focused={isFocused}
            validationError={validationError}
          >
            <ThemedInput
              ref={ref || inputRef}
              secureTextEntry={secureTextEntry}
              onBlur={() => setIsFocused(false)}
              onFocus={() => {
                setIsFocused(true);
                onFocus();
              }}
              {...props}
            />
            {textContentType === 'password' ? (
              <Pressable
                testID="show-passord-button"
                hitSlop={8}
                onPress={() => setSecureTextEntry((state) => !state)}
              >
                {secureTextEntry ? (
                  <ThemedIcon size={24} name="eye" />
                ) : (
                  <ThemedIcon size={24} name="eye-off" />
                )}
              </Pressable>
            ) : null}
          </ThemedTextInputContainer>
        </>
      </TouchableOpacity>
    );
  },
);

Input.propTypes = {
  focused: PropTypes.bool,
  textContentType: PropTypes.string,
  validationError: PropTypes.bool,
  label: PropTypes.string,
  // onFocus prop is used in AddFolderModal.js and UploadAssetModal.js
  onFocus: PropTypes.func,
  style: PropTypes.object,
};

// Animated Input where label animates

const Label = styled.Text`
  font-size: 16px;
  font-family: 'Roboto-Regular';
  color: ${(props) => props.theme.secondaryTextColor};
`;

const ThemedAnimatedInput = styled.TextInput`
  color: ${(props) => props.theme.primaryTextColor};
  width: 100%;
  font-size: 16px;
  font-family: 'Roboto-Regular';
  padding: 3px 0;
  border-bottom-width: ${(props) =>
    props.focused || props.validationError ? '3px' : '1px'};
  border-bottom-color: ${(props) =>
    props.validationError
      ? props.theme.error
      : props.focused
      ? props.theme.highlight
      : props.theme.disabledTextColor};
`;

const CustomInput = Animated.createAnimatedComponent(ThemedAnimatedInput);

export const AnimatedInput = ({
  value = '',
  onChangeText = () => {},
  label = '',
  validationError = false,
  errorMessage = '',
  onBlur = () => {},
  ...props
}) => {
  const inputRef = useRef();
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
    expand();
  };
  const onShrink = () => {
    setIsFocused(false);
    if (!value) {
      shrink();
    }
  };

  useEffect(() => {
    if (value) {
      expand();
    }
  }, [value]);

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
      <Flexbox style={{ minHeight: 50 }} justify="flex-end">
        <Flexbox align="flex-start">
          <Label>{label}</Label>
          <CustomInput
            ref={inputRef}
            value={value}
            onChangeText={onChangeText}
            focused={isFocused}
            validationError={validationError}
            onFocus={onFocus}
            onBlur={() => {
              onShrink();
              onBlur();
            }}
            {...props}
            style={{ height: fadeAnim }}
          />
          {errorMessage ? <AlertText>{errorMessage}</AlertText> : null}
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
  errorMessage: PropTypes.string,
  onBlur: PropTypes.func,
};

// Text Area
const Container = styled.View`
  height: 100%;
  width: 100%;
  margin-top: 8px;
`;
const ThemedTextArea = styled.View`
  flex: 1;
  width: 100%;
  margin-top: 8px;
  border-color: ${(props) =>
    props.focused ? props.theme.highlight : props.theme.disabledTextColor};
  border-width: ${(props) => (props.focused ? '3px' : '1px')};
`;

const TextAreaInput = styled.TextInput`
  color: ${(props) => props.theme.primaryTextColor};
  flex: 1;
  font-size: 16px;
  font-family: 'Roboto-Regular';
  padding: ${(props) => (props.focused ? '3px' : '5px')};
`;

export const TextArea = ({
  label,
  value,
  onChangeText,
  numberOfLines,
  style,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container style={style}>
      <Label>{label}</Label>
      <ThemedTextArea focused={isFocused}>
        <TextAreaInput
          multiline
          numberOfLines={numberOfLines}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => {
            setIsFocused(true);
            onFocus();
          }}
          onBlur={() => setIsFocused(false)}
          focused={isFocused}
          {...props}
        />
      </ThemedTextArea>
    </Container>
  );
};

TextArea.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  numberOfLines: PropTypes.number,
  style: PropTypes.object,
  // onFocus prop is used in UploadAssetModal.js or MyInfoModal
  onFocus: PropTypes.func,
};
