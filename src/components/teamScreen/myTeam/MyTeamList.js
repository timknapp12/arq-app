import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, TouchableWithoutFeedback } from 'react-native';
import { useQuery } from '@apollo/client';
import { Flexbox, H5, LoadingSpinner } from '../../common';
import MyAmbassadorCard from './myAmbassadorCard/MyAmbassadorCard';
import MyTeamViewContext from '../../../contexts/MyTeamViewContext';
import { GET_USER } from '../../../graphql/queries';
import { Localized } from '../../../translations/Localized';
import { findMembersInDownlineOneLevel } from '../../../utils/teamView/filterDownline';

const MyTeamList = ({ sortBy }) => {
  const {
    closeAllMenus,
    levelInTree,
    legacyAssociateId,
    setMyTeamViewHeader,
    setCurrentMembersUplineId,
  } = useContext(MyTeamViewContext);

  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);

  const { loading, data: memberData } = useQuery(GET_USER, {
    variables: { legacyAssociateId },
    onError: () => setIsError(true),
  });

  //   console.log(`memberData`, memberData?.treeNodeFor?.associate);

  useEffect(() => {
    // for customers, filter for both 'preferred' and 'retail' type, but only one type for ambassadors
    const secondType = sortBy === 'PREFERRED' ? 'RETAIL' : null;
    if (memberData?.treeNodeFor?.childTreeNodes) {
      const filteredData = findMembersInDownlineOneLevel(
        memberData?.treeNodeFor?.childTreeNodes,
        sortBy,
        secondType,
      );
      console.log(`filteredData`, filteredData);
      setData(memberData?.treeNodeFor?.childTreeNodes);
      setCurrentMembersUplineId(
        memberData?.treeNodeFor?.uplineTreeNode?.associate?.legacyAssociateId,
      );
    }
    return () => {
      setData([]);
    };
  }, [memberData?.treeNodeFor?.childTreeNodes, sortBy]);

  // set the header at the top of the My Team view
  useEffect(() => {
    if (levelInTree === 0) {
      const header =
        sortBy === 'AMBASSADOR'
          ? Localized('My Ambassadors')
          : Localized('My Customers');
      setMyTeamViewHeader(header);
    } else {
      const firstName = memberData?.treeNodeFor?.associate?.firstName ?? '';
      const lastName = memberData?.treeNodeFor?.associate?.lastName ?? '';

      setMyTeamViewHeader(`${firstName} ${lastName}`);
    }
  }, [sortBy, levelInTree, memberData]);

  const renderItem = ({ item }) => (
    <MyAmbassadorCard member={item} level={levelInTree} />
  );

  if (loading) {
    return (
      <Flexbox padding={10}>
        <LoadingSpinner size="large" />
      </Flexbox>
    );
  }

  if (isError) {
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
