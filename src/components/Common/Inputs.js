import React, { useState, useEffect } from 'react';
import { Pressable } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';

const ThemedTextInputContainer = styled.View`
  width: 100%;
  align-items: flex-end;
  height: 28px;
  flex-direction: row;
  border-bottom-width: ${(props) => (props.focused ? '3px' : '1px')};
  border-bottom-color: ${(props) =>
    props.focused ? props.theme.highlight : props.theme.disabledTextColor};
  padding-bottom: 4px;
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
  ({ focused, textContentType, ...props }, ref) => {
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
      <ThemedTextInputContainer focused={isFocused}>
        <ThemedInput
          ref={ref}
          style={{ fontFamily: 'Roboto-Regular' }}
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
};
