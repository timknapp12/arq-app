import React, { useState, useContext, useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import * as Analytics from 'expo-firebase-analytics';
import { Flexbox } from '../../common';
import RankTabs from './RankTabs';
import OvRank from './OvRank';
import CvRank from './CvRank';
import DashboardScreenContext from '../../../contexts/DashboardScreenContext';

const Rank = () => {
  const { closeMenus } = useContext(DashboardScreenContext);
  const [selectedTab, setSelectedTab] = useState('ovRank');

  useEffect(() => {
    Analytics.logEvent(`${selectedTab}_tab_visited`);
  }, [selectedTab]);

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
