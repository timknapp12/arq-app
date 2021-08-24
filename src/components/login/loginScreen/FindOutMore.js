import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Flexbox, Link, H6 } from '../../common';
import { Localized } from '../../../translations/Localized';

const FindOutMore = ({ onPress }) => {
  return (
    <Flexbox accessibilityLabel="Become an Ambassador">
      <H6
        testID="become-ambassador-text"
        style={{
          textAlign: 'center',
          fontFamily: 'Avenir-Book',
          opacity: 1,
        }}>
        {Localized('Interested in becoming a Q Sciences Ambassador?')}
      </H6>
      <TouchableOpacity testID="become-ambassador-link" onPress={onPress}>
        <Link>{Localized('Find out more')}</Link>
      </TouchableOpacity>
    </Flexbox>
  );
};

FindOutMore.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default FindOutMore;
