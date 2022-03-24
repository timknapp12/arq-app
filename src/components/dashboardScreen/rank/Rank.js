import React, { useState, useContext } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Flexbox } from '../../common';
import RankTabs from './RankTabs';
import OvRank from './OvRank';
import CvRank from './CvRank';
import DashboardScreenContext from '../../../contexts/DashboardScreenContext';

const Rank = () => {
  const { closeMenus } = useContext(DashboardScreenContext);
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
          {selectedTab === 'ovRank' ? <OvRank /> : <CvRank />}
        </Flexbox>
      </>
    </TouchableWithoutFeedback>
  );
};

export default Rank;
