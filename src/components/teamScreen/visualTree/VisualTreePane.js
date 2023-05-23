import React, { useState, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/client';
import * as Analytics from 'expo-firebase-analytics';
// Components
import { ScrollView, TouchableWithoutFeedback, Animated } from 'react-native';
import { LoadingSpinner, H5 } from '../../common';
import { DraxScrollView } from 'react-native-drax';
import VisualTreeBubble from './VisualTreeBubble';
import VisualTreePaneSection from './VisualTreePaneSection';
import PlacementsDrawer from './PlacementsDrawer';
import PlacementSuccessModal from './PlacementSuccessModal';
import { VisualTreeContainer, ReceivingCircle } from './visualTree.styles';
// Utils
import { GET_USER } from '../../../graphql/queries';
import {
  findMembersInDownlineOneLevel,
  getAssociatesEligibleForPlacement,
} from '../../../utils/teamView/filterDownline';
import isLegacyAssociateIdInArray from '../../../utils/teamView/isLegacyAssociateIdInArray';
import { Localized } from '../../../translations/Localized';
import properlyCaseName from '../../../utils/properlyCaseName/properlyCaseName';
// Contexts
import AppContext from '../../../contexts/AppContext';
import TeamScreenContext from '../../../contexts/TeamScreenContext';
import LoginContext from '../../../contexts/LoginContext';

const VisualTreePane = ({
  searchId,
  level,
  closeMenus,
  style,
  setActiveBubbleMember,
  activeBubbleMember,
  setPaneHasContent,
  paneHasContent,
}) => {
  const { theme } = useContext(AppContext);
  const { isViewReset, setIsViewReset } = useContext(TeamScreenContext);
  const { user } = useContext(LoginContext);

  const [receiveCirlceBorderColor, setReceiveCirlceBorderColor] = useState(
    theme.disabledTextColor,
  );

  const [idOfDraggedItem, setIdOfDraggedItem] = useState(null);

  const [treeData, setTreeData] = useState(null);
  const [focusedMember, setFocusedMember] = useState(null);
  const [isOutsideBubbleEntering, setIsOutsideBubbleEntering] = useState(false);
  const [levelOfFocusedMember, setLevelOfFocusedMember] = useState(0);
  const [horizontalOffset, setHorizontalOffset] = useState(0);

  const [getUser, { loading, data }] = useLazyQuery(GET_USER, {
    onError: (error) =>
      console.log('error in get user in VisualTreePane.js', error),
    onCompleted: () => {
      setPaneHasContent(true);
      setActiveBubbleMember(null);
    },
  });

  const emptySearchId = 0;
  const getTopLevelUser = () =>
    getUser({
      variables: { legacyAssociateId: searchId },
      fetchPolicy: 'network-only',
    });
  useEffect(() => {
    if (searchId !== emptySearchId) {
      getTopLevelUser();
    }
  }, [searchId, level]);

  const reshapeMember = (item) => ({
    associateId: item?.associate?.associateId,
    legacyAssociateId: item?.associate?.legacyAssociateId,
    firstName: item?.associate?.firstName,
    lastName: item?.associate?.lastName,
    associateType: item?.associate?.associateType,
    associateStatus: item?.associate?.associateStatus,
    uplineId: item?.uplineTreeNode?.associate?.legacyAssociateId,
    enrollerId: item?.uplineEnrollmentTreeNode?.associate?.legacyAssociateId,
    ovRankName: item?.rank?.rankName,
    ovRankId: item?.rank?.rankId,
    cvRankName: item?.customerSalesRank?.rankName,
    cvRankId: item?.customerSalesRank?.customerSalesRankId,
    ov: item?.ov,
    cv: item?.cv,
    dateSignedUp: item?.associate?.dateSignedUp,
  });

  useEffect(() => {
    if (!data) return;
    const filteredData = findMembersInDownlineOneLevel(
      data?.treeNodeFor?.childTreeNodes,
      'AMBASSADOR',
    );
    setTreeData(filteredData);
    const topLevelMember = reshapeMember(data?.treeNodeFor);
    setFocusedMember(topLevelMember);
    setIsViewReset(false);
  }, [data, isViewReset]);

  useEffect(() => {
    setIsOutsideBubbleEntering(focusedMember?.associate === idOfDraggedItem);
  }, [focusedMember, idOfDraggedItem]);

  useEffect(() => {
    if (level) {
      setLevelOfFocusedMember(level);
    }
  }, [level]);

  const onDragStartFocused = (item, level) => {
    setIdOfDraggedItem(item?.legacyAssociateId);
    setActiveBubbleMember({ ...item, level });
    closeMenus();
    fadeDown();
    Analytics.logEvent('visual_tree_bubble_tapped');
  };

  const onDragEndFocused = () => {
    setIdOfDraggedItem(null);
  };

  const onDragDropFocused = () => {
    setIdOfDraggedItem(null);
  };

  const isAValidDropToTopCirlce = isLegacyAssociateIdInArray(
    treeData,
    idOfDraggedItem,
  );

  const onReceiveDragDrop = (payload) => {
    if (!isAValidDropToTopCirlce) return;
    getUser({
      variables: {
        legacyAssociateId: payload?.legacyAssociateId,
      },
    });
    setLevelOfFocusedMember((state) => state + 1);
  };

  const scrollViewRef = useRef(null);

  // this is needed to keep track of when the user scrolls horizontally to adjust absolute position of bubbles if the scrollview is wider than 100% width
  const onHorizontalScroll = ({ contentOffset }) => {
    setHorizontalOffset(contentOffset.x);
  };

  // PLACEMENT SUITE
  const initialPlacementList = getAssociatesEligibleForPlacement(user);
  const [associatesEligibleForPlacement, setAssociatesEligibleForPlacement] =
    useState(initialPlacementList);
  const [hidePlacementContainer, setHidePlacementContainer] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  // topLevelPlacementUpline is a place holder so if expanded bubbles are dragged back to the top level we know who is at the top and can set the selectedPlacementUpline to the correct person
  const [topLevelPlacementUpline, setTopLevelPlacementUpline] = useState(null);
  // this will be the person used when the PlaceMentConfirmModal is opened
  const [selectedPlacementUpline, setSelectedPlacementUpline] = useState(null);
  const [selectedPlacementEnrolee, setSelectedPlacementEnrolee] =
    useState(null);
  const [isPlacementConfirmModalOpen, setIsPlacementConfirmModalOpen] =
    useState(false);
  const [isPlacementSuccessModalOpen, setIsPlacementSuccessModalOpen] =
    useState(false);
  const [placementSuccessData, setPlacementSuccessData] = useState({
    uplineName: '',
    enrolleeName: '',
  });

  useEffect(() => {
    if (user) {
      const placementList = getAssociatesEligibleForPlacement(user);
      setAssociatesEligibleForPlacement(placementList);
    }
  }, [user]);

  const initialValue = -128;
  const fadeAnim = useRef(new Animated.Value(initialValue)).current;

  useEffect(() => {
    if (focusedMember) {
      const {
        legacyAssociateId,
        associateId,
        firstName = '',
        lastName = '',
      } = focusedMember;
      const data = {
        legacyAssociateId,
        associateId,
        name: properlyCaseName(firstName, lastName),
      };
      setSelectedPlacementUpline(data);
      setTopLevelPlacementUpline(data);
    }
  }, [focusedMember]);

  const fadeUp = () => {
    setIsExpanded(true);
    Animated.timing(fadeAnim, {
      toValue: 80,
      duration: 700,
      useNativeDriver: false,
    }).start();
  };

  const fadeDown = () => {
    setIsExpanded(false);
    Animated.timing(fadeAnim, {
      toValue: initialValue,
      duration: 700,
      useNativeDriver: false,
    }).start();
  };

  if (loading) {
    return <LoadingSpinner style={{ marginTop: 20 }} size="large" />;
  }

  return (
    <DraxScrollView
      contentContainerStyle={{
        paddingBottom: 200,
      }}
      style={{
        zIndex: -1,
        ...style,
      }}
      ref={scrollViewRef}
      onContentSizeChange={(_, height) => {
        scrollViewRef?.current?.scrollTo({ y: height, amimated: true });
      }}
    >
      {searchId !== 0 ? (
        <ScrollView
          contentContainerStyle={{
            minWidth: '100%',
            minHeight: '100%',
          }}
          style={{
            minHeight: '100%',
            zIndex: -1,
            marginTop: 16,
          }}
          onScroll={({ nativeEvent }) => onHorizontalScroll(nativeEvent)}
          scrollEventThrottle={16}
          //the nested ScrollView with 'horizontal' prop allows for scrolling horizontally, while the parent ScrollView allows vertical
          horizontal
        >
          <TouchableWithoutFeedback onPress={closeMenus}>
            <VisualTreeContainer onStartShouldSetResponder={() => true}>
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
                onReceiveDragDrop={({ dragged: { payload } }) => {
                  onReceiveDragDrop(payload);
                  Analytics.logEvent('visual_tree_bubble_dropped');
                }}
              >
                {focusedMember && !isOutsideBubbleEntering && (
                  <VisualTreeBubble
                    style={{ position: 'absolute', top: -7, left: 3 }}
                    member={focusedMember}
                    draggable={true}
                    longPressDelay={200}
                    onDragStart={() =>
                      onDragStartFocused(focusedMember, levelOfFocusedMember)
                    }
                    onDragEnd={onDragEndFocused}
                    onDragDrop={onDragDropFocused}
                    payload={focusedMember}
                    isBeingDragged={
                      idOfDraggedItem === focusedMember?.legacyAssociateId
                    }
                    level={levelOfFocusedMember}
                    horizontalOffset={horizontalOffset}
                    selected={
                      activeBubbleMember?.associateId ===
                      focusedMember?.associateId
                    }
                  />
                )}
              </ReceivingCircle>

              <VisualTreePaneSection
                level={levelOfFocusedMember + 1}
                parentData={treeData}
                focusedMember={focusedMember}
                setTopCirlceBorderColor={setReceiveCirlceBorderColor}
                setIdOfDraggedItemForParent={setIdOfDraggedItem}
                closeMenus={closeMenus}
                horizontalOffset={horizontalOffset}
                setActiveBubbleMember={setActiveBubbleMember}
                activeBubbleMember={activeBubbleMember}
                fadeDown={fadeDown}
                setHidePlacementContainer={setHidePlacementContainer}
                selectedPlacementUpline={selectedPlacementUpline}
                // prevPlacementUpline is used for when the expanded bubbles are dragged backward toward the top
                prevPlacementUpline={topLevelPlacementUpline}
                setSelectedPlacementUpline={setSelectedPlacementUpline}
                isPlacementConfirmModalOpen={isPlacementConfirmModalOpen}
                setIsPlacementConfirmModalOpen={setIsPlacementConfirmModalOpen}
                selectedPlacementEnrolee={selectedPlacementEnrolee}
                getTopLevelUser={getTopLevelUser}
                setIsPlacementSuccessModalOpen={setIsPlacementSuccessModalOpen}
                setPlacementSuccessData={setPlacementSuccessData}
              />
            </VisualTreeContainer>
          </TouchableWithoutFeedback>
        </ScrollView>
      ) : (
        <H5 style={{ textAlign: 'center', marginTop: 16 }}>
          {Localized('Search for a team member')}
        </H5>
      )}
      {paneHasContent && !hidePlacementContainer && (
        <PlacementsDrawer
          associatesEligibleForPlacement={associatesEligibleForPlacement}
          isExpanded={isExpanded}
          fadeAnim={fadeAnim}
          fadeUp={fadeUp}
          fadeDown={fadeDown}
          setIsPlacementConfirmModalOpen={setIsPlacementConfirmModalOpen}
          setSelectedPlacementEnrolee={setSelectedPlacementEnrolee}
        />
      )}
      {isPlacementSuccessModalOpen && (
        <PlacementSuccessModal
          visible={isPlacementSuccessModalOpen}
          onClose={() => setIsPlacementSuccessModalOpen(false)}
          placementSuccessData={placementSuccessData}
        />
      )}
    </DraxScrollView>
  );
};

VisualTreePane.propTypes = {
  searchId: PropTypes.number.isRequired,
  level: PropTypes.number,
  closeMenus: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  setActiveBubbleMember: PropTypes.func.isRequired,
  activeBubbleMember: PropTypes.object,
  setPaneHasContent: PropTypes.func.isRequired,
  paneHasContent: PropTypes.bool.isRequired,
};

export default VisualTreePane;
