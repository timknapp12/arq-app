import React from 'react';
// TODO add useContext theme from AppContext when we use the chevrons
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
// import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { H6 } from '../../common';
import { ThemedCard } from './atAGlance.styles';
// import AppContext from '../../../contexts/AppContext';
// import { ChevronContainer } from './atAGlance.styles';
import stringify from '../../../utils/roundDownAndAddCommas/stringify';

const CardForAtAGlance = ({
  title = '',
  value = '',
  onPress = () => {},
  selected,
  ...props
}) => {
  // const { theme } = useContext(AppContext);
  return (
    <ThemedCard selected={selected} {...props}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flex: 1,
          padding: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <H6>{title}</H6>
        <H6>{stringify(value)}</H6>
      </TouchableOpacity>
      {/* TODO - add ability to drill down into depth with chevron */}
      {/* <ChevronContainer>
        <TouchableOpacity
          onPress={() => console.log('pressed chevron')}
          style={{ padding: 4 }}>
          <MaterialCommunityIcon
            name="chevron-right"
            color={theme.primaryTextColor}
            size={24}
          />
        </TouchableOpacity>
      </ChevronContainer> */}
    </ThemedCard>
  );
};

CardForAtAGlance.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onPress: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default CardForAtAGlance;
