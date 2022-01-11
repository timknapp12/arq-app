import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import { Flexbox } from '../../common';
import RankTabs from './RankTabs';
import OvRank from './OvRank';
import CvRank from './CvRank';

const Rank = ({ ranklist, user, closeMenus }) => {
  const [selectedTab, setSelectedTab] = useState('ovRank');

  return (
    <TouchableWithoutFeedback onPress={closeMenus}>
      <>
        <RankTabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          closeMenus={closeMenus}
        />
        <Flexbox justify="flex-start" onStartShouldSetResponder={() => true}>
          {selectedTab === 'ovRank' ? (
            <OvRank ranklist={ranklist} user={user} closeMenus={closeMenus} />
          ) : (
            <CvRank ranklist={ranklist} user={user} closeMenus={closeMenus} />
          )}
        </Flexbox>
      </>
    </TouchableWithoutFeedback>
  );
};

Rank.propTypes = {
  ranklist: PropTypes.arrayOf(
    PropTypes.shape({
      rankId: PropTypes.number,
      rankName: PropTypes.string,
      requiredPv: PropTypes.number,
      minimumQoV: PropTypes.number,
      legMaxPercentage: PropTypes.number,
      maximumPerLeg: PropTypes.number,
      requiredPa: PropTypes.number,
    }),
  ),
  user: PropTypes.object,
  closeMenus: PropTypes.func,
};

export default Rank;
