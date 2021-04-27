import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Label } from './texts';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';
import AppContext from '../../contexts/AppContext';

// source: https://www.npmjs.com/package/react-native-picker-select#styling

export const Picker = ({
  style = { width: '100%' },
  label,
  items,
  onValueChange,
  value,
  placeholder,
  validationError = false,
}) => {
  const { theme } = useContext(AppContext);
  return (
    <View style={style}>
      <Label>{label}</Label>

      <RNPickerSelect
        style={{
          width: '100%',
          inputIOS: {
            fontSize: 16,
            fontFamily: 'Roboto-Regular',
            paddingBottom: 4,
            paddingEnd: 30, // to ensure the text is never behind the icon
            borderBottomWidth: validationError ? 3 : 1,
            borderBottomColor: validationError
              ? theme.error
              : theme.secondaryTextColor,
            color: theme.color,
          },
          inputAndroid: {
            fontSize: 16,
            fontFamily: 'Roboto-Regular',
            paddingBottom: 4,
            paddingEnd: 30, // to ensure the text is never behind the icon
            borderBottomWidth: validationError ? 3 : 1,
            borderBottomColor: validationError
              ? theme.error
              : theme.secondaryTextColor,
            color: theme.color,
            backgroundColor: 'transparent',
          },
          iconContainer: {
            top: 0,
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
              style={{ marginBottom: 4 }}
              name="chevron-down"
              size={24}
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
  validationError: PropTypes.bool,
};
