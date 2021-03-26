import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';
import AppContext from '../../contexts/AppContext';

// source: https://www.npmjs.com/package/react-native-picker-select#styling

const SecondaryText = styled.Text`
  font-size: 16px;
  font-family: 'Roboto-Regular';
  color: ${(props) => props.theme.secondaryTextColor};
`;

export const Picker = ({
  style = { width: '100%' },
  label,
  items,
  onValueChange,
  value,
  placeholder,
}) => {
  const { theme } = useContext(AppContext);
  return (
    <View style={style}>
      <SecondaryText>{label}</SecondaryText>

      <RNPickerSelect
        style={{
          width: '100%',
          inputIOS: {
            fontSize: 16,
            fontFamily: 'Roboto-Regular',
            paddingBottom: 4,
            paddingEnd: 30, // to ensure the text is never behind the icon
            borderBottomWidth: 1,
            borderBottomColor: theme.secondaryTextColor,
            color: theme.color,
          },
          inputAndroid: {
            fontSize: 16,
            fontFamily: 'Roboto-Regular',
            paddingBottom: 4,
            paddingEnd: 30, // to ensure the text is never behind the icon
            borderBottomWidth: 1,
            borderBottomColor: theme.secondaryTextColor,
            color: theme.color,
            backgroundColor: 'transparent',
          },
          iconContainer: {
            top: 2,
            right: 5,
          },
        }}
        useNativeAndroidPickerStyle={false}
        onValueChange={onValueChange}
        items={items}
        value={value}
        placeholder={placeholder}
        Icon={() => {
          return (
            <Ionicons
              name="chevron-down"
              size={20}
              color={theme.secondaryTextColor}
            />
          );
        }}
      />
    </View>
  );
};

Picker.propTypes = {
  items: PropTypes.array.isRequired,
  onValueChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.object,
  style: PropTypes.object,
};
