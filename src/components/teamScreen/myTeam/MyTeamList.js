import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, TouchableWithoutFeedback } from 'react-native';
import MyAmbassadorCard from './myAmbassadorCard/MyAmbassadorCard';
import LoginContext from '../../../contexts/LoginContext';
import MyTeamViewContext from '../../../contexts/MyTeamViewContext';
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
