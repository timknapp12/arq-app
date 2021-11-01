import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Flexbox, H5 } from '../../common';
import MyAmbassadorCard from './myAmbassadorCard/MyAmbassadorCard';
import LoginContext from '../../../contexts/LoginContext';
import MyTeamViewContext from '../../../contexts/MyTeamViewContext';
import { Localized } from '../../../translations/Localized';
import { findMembersInDownlineOneLevel } from '../../../utils/teamView/filterDownline';

const MyTeamList = ({ sortBy }) => {
  const { user } = useContext(LoginContext);
  const { closeAllMenus } = useContext(MyTeamViewContext);

  const [data, setData] = useState([]);

  useEffect(() => {
    // for customers, filter for both 'preferred' and 'retail' type, but only one type for ambassadors
    const secondType = sortBy === 'PREFERRED' ? 'RETAIL' : null;
    if (user.childTreeNodes) {
      const filteredData = findMembersInDownlineOneLevel(
        user.childTreeNodes,
        sortBy,
        secondType,
      );
      setData(filteredData);
    }
    return () => {
      setData([]);
    };
  }, [user.childTreeNodes, sortBy]);

  const renderItem = ({ item }) => <MyAmbassadorCard member={item} />;

  if (data?.length < 1) {
    return (
      <Flexbox style={{ width: 320, height: 220 }}>
        <H5 style={{ textAlign: 'center' }}>
          {Localized(
            'We had a problem retrieving your data. Please try again later',
          )}
        </H5>
      </Flexbox>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={closeAllMenus}>
      <View
        style={{
          width: '95%',
          paddingBottom: 120,
          marginTop: 20,
          justifyContent: 'flex-end',
          zIndex: -2,
        }}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item?.associate?.associateId.toString()}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

MyTeamList.propTypes = {
  sortBy: PropTypes.string.isRequired,
};

export default MyTeamList;
