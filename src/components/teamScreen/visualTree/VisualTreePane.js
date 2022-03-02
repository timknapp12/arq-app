import React, { useState, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { Flexbox, LoadingSpinner, H5 } from '../../common';
import { DraxProvider } from 'react-native-drax';
import VisualTreeBubble from './VisualTreeBubble';
import VisualTreePaneSection from './VisualTreePaneSection';
import AppContext from '../../../contexts/AppContext';
import { VisualTreeContainer, ReceivingCircle } from './visualTree.styles';
import { GET_USER } from '../../../graphql/queries';
import { findMembersInDownlineOneLevel } from '../../../utils/teamView/filterDownline';
import isLegacyAssociateIdInArray from '../../../utils/teamView/isLegacyAssociateIdInArray';
import { Localized } from '../../../translations/Localized';

const VisualTreePane = ({ searchId, level, closeMenus, style }) => {
  const { theme, legacyId } = useContext(AppContext);

  const [receiveCirlceBorderColor, setReceiveCirlceBorderColor] = useState(
    theme.disabledTextColor,
  );

  const [idOfDraggedItem, setIdOfDraggedItem] = useState(null);

  const [treeData, setTreeData] = useState(null);
  const [focusedMember, setFocusedMember] = useState(null);
  const [uplineMember, setUplineMember] = useState(null);
  const [isOutsideBubbleEntering, setIsOutsideBubbleEntering] = useState(false);
  const [levelOfFocusedMember, setLevelOfFocusedMember] = useState(null);

  const [getUser, { loading, data }] = useLazyQuery(GET_USER, {
    onError: (error) =>
      console.log('error in get user in VisualTreePane.js', error),
  });

  useEffect(() => {
    if (searchId !== 0) {
      getUser({ variables: { legacyAssociateId: searchId } });
    }
  }, [searchId, level]);

  const reshapeMember = (item) => ({
    associateId: item?.associate?.associateId,
    legacyAssociateId: item?.associate?.legacyAssociateId,
    firstName: item?.associate?.firstName,
    lastName: item?.associate?.lastName,
    associateType: item?.associate?.associateType,
    associateStatus: item?.associate?.associateStatus,
    uplineId: item?.uplineNode?.associate?.legacyAssociateId,
    ovRankName: item?.rank?.rankName,
    cvRankName: item?.customerSalesRank?.rankName,
  });

  useEffect(() => {
    if (data) {
      const filteredData = findMembersInDownlineOneLevel(
        data?.treeNodeFor?.childTreeNodes,
        'AMBASSADOR',
      );
      setTreeData(filteredData);
      const topLevelMember = reshapeMember(data?.treeNodeFor);
      setFocusedMember(topLevelMember);
      const upline = reshapeMember(data?.treeNodeFor?.uplineTreeNode);
      setUplineMember(upline);
    }
  }, [data]);

  useEffect(() => {
    setIsOutsideBubbleEntering(focusedMember?.associate === idOfDraggedItem);
  }, [focusedMember, idOfDraggedItem]);

  useEffect(() => {
    if (level) {
      setLevelOfFocusedMember(level);
    }
  }, [level]);

  const onDragStart = (item) => {
    setReceiveCirlceBorderColor(theme.primaryButtonBackgroundColor);
    setIdOfDraggedItem(item?.legacyAssociateId);
  };

  const onDragEnd = () => {
    setReceiveCirlceBorderColor(theme.disabledTextColor);
    setIdOfDraggedItem(null);
  };

  const onDragDrop = () => {
    setReceiveCirlceBorderColor(theme.disabledTextColor);
    setIdOfDraggedItem(null);
  };

  const onDragStartFocused = (item) => {
    setIdOfDraggedItem(item?.legacyAssociateId);
  };

  const onDragEndFocused = () => {
    setIdOfDraggedItem(null);
  };

  const onDragDropFocused = () => {
    setIdOfDraggedItem(null);
  };

  if (loading) {
    setTimeout(() => {
      return <LoadingSpinner style={{ marginTop: 10 }} size="large" />;
    }, 500);
  }

  const isAValidDropToTopCirlce =
    isLegacyAssociateIdInArray(treeData, idOfDraggedItem) ||
    uplineMember?.legacyAssociateId === idOfDraggedItem;

  const onReceiveDragDrop = (payload) => {
    if (isAValidDropToTopCirlce) {
      getUser({
        variables: {
          legacyAssociateId: payload?.legacyAssociateId,
        },
      });
      if (payload?.legacyAssociateId === uplineMember?.legacyAssociateId) {
        setLevelOfFocusedMember((state) => state - 1);
      } else {
        setLevelOfFocusedMember((state) => state + 1);
      }
    }
  };

  const scrollViewRef = useRef(null);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 140,
      }}
      style={{
        width: '100%',
        height: '100%',
        zIndex: -1,
        ...style,
      }}
      ref={scrollViewRef}
      onContentSizeChange={(_, height) => {
        scrollViewRef?.current?.scrollTo({ y: height, amimated: true });
      }}
    >
      <DraxProvider>
        {searchId !== 0 ? (
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              width: '100%',
              minHeight: '100%',
            }}
            style={{
              width: '100%',
              minHeight: '100%',
              zIndex: -1,
            }}
            //the nested ScrollView with 'horizontal' prop allows for scrolling horizontally, while the parent ScrollView allows vertical
            horizontal
          >
            <TouchableWithoutFeedback onPress={closeMenus}>
              <VisualTreeContainer onStartShouldSetResponder={() => true}>
                {uplineMember && (
                  <Flexbox padding={20}>
                    <VisualTreeBubble
                      member={uplineMember}
                      draggable={uplineMember?.legacyAssociateId !== legacyId}
                      onDragStart={() => onDragStart(uplineMember)}
                      onDragEnd={onDragEnd}
                      onDragDrop={onDragDrop}
                      payload={uplineMember}
                      position="relative"
                      isBeingDragged={
                        idOfDraggedItem === uplineMember?.legacyAssociateId
                      }
                      level={levelOfFocusedMember - 1}
                    />
                  </Flexbox>
                )}
                <ReceivingCircle
                  borderColor={receiveCirlceBorderColor}
                  receivingStyle={
                    isAValidDropToTopCirlce && {
                      backgroundColor: theme.dropZoneBackgroundColor,
                    }
                  }
                  onReceiveDragEnter={() => {
                    isAValidDropToTopCirlce && setIsOutsideBubbleEntering(true);
                  }}
                  onReceiveDragExit={() => {
                    setIsOutsideBubbleEntering(false);
                  }}
                  onReceiveDragDrop={({ dragged: { payload } }) =>
                    onReceiveDragDrop(payload)
                  }
                >
                  {focusedMember && !isOutsideBubbleEntering && (
                    <VisualTreeBubble
                      style={{ position: 'absolute', top: -7, left: 3 }}
                      member={focusedMember}
                      draggable={true}
                      longPressDelay={200}
                      onDragStart={() => onDragStartFocused(focusedMember)}
                      onDragEnd={onDragEndFocused}
                      onDragDrop={onDragDropFocused}
                      payload={focusedMember}
                      isBeingDragged={
                        idOfDraggedItem === focusedMember?.legacyAssociateId
                      }
                      level={levelOfFocusedMember}
                    />
                  )}
                </ReceivingCircle>

                <VisualTreePaneSection
                  level={levelOfFocusedMember + 1}
                  parentData={treeData}
                  focusedMember={focusedMember}
                  setTopCirlceBorderColor={setReceiveCirlceBorderColor}
                  setIdOfDraggedItemForParent={setIdOfDraggedItem}
                />
              </VisualTreeContainer>
            </TouchableWithoutFeedback>
          </ScrollView>
        ) : (
          <H5 style={{ textAlign: 'center', marginTop: 16 }}>
            {Localized('Search for a team member')}
          </H5>
        )}
      </DraxProvider>
    </ScrollView>
  );
};

VisualTreePane.propTypes = {
  searchId: PropTypes.number.isRequired,
  level: PropTypes.number,
  closeMenus: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
};

export default VisualTreePane;
