import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import { Flexbox } from '../../common';
import RankTabs from './RankTabs';
import OvRank from './OvRank';
import CvRank from './CvRank';

const Rank = ({
  ranklist,
  user,
  closeMenus,
  isRankInfoPopupOpen,
  setIsRankInfoPopupOpen,
  displayNotifications,
}) => {
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
            <OvRank
              ranklist={ranklist}
              user={user}
              closeMenus={closeMenus}
              isRankInfoPopupOpen={isRankInfoPopupOpen}
              setIsRankInfoPopupOpen={setIsRankInfoPopupOpen}
              displayNotifications={displayNotifications}
            />
          ) : (
            <CvRank
              ranklist={ranklist}
              user={user}
              closeMenus={closeMenus}
              isRankInfoPopupOpen={isRankInfoPopupOpen}
              setIsRankInfoPopupOpen={setIsRankInfoPopupOpen}
              displayNotifications={displayNotifications}
            />
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
  user: PropTypes.object.isRequired,
  closeMenus: PropTypes.func.isRequired,
  isRankInfoPopupOpen: PropTypes.bool.isRequired,
  setIsRankInfoPopupOpen: PropTypes.func.isRequired,
  displayNotifications: PropTypes.bool.isRequired,
};

export default Rank;
