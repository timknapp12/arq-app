import React from 'react';
import PropTypes from 'prop-types';
import { ScreenContainer, Flexbox } from '../../common';
import OrderHistoryView from './OrderHistoryView';
import { maxWidth } from '../../../styles/constants';

const MyTeamDetailsScreen = ({ route }) => {
  const { viewType, member, level } = route?.params;

  return (
    <ScreenContainer
      style={{
        paddingTop: 0,
        paddingBottom: 0,
        justifyContent: 'flex-start',
      }}
    >
      <Flexbox style={{ maxWidth }}>
        <Flexbox padding={10}>
          {viewType === 'orderHistory' && (
            <OrderHistoryView member={member} level={level} />
          )}
        </Flexbox>
      </Flexbox>
    </ScreenContainer>
  );
};

MyTeamDetailsScreen.propTypes = {
  route: PropTypes.object,
};

export default MyTeamDetailsScreen;
