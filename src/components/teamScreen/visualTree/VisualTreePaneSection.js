import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/client';
import * as Analytics from 'expo-firebase-analytics';
import { LoadingSpinner, H6 } from '../../common';
import { GET_USER } from '../../../graphql/queries';
import VisualTreeBubble from './VisualTreeBubble';
import PlacementConfirmModal from './PlacementConfirmModal';
import reformatListForVisualTreeBubbles from '../../../utils/teamView/reformatListForVisualTreeBubbles';
import { findMembersInDownlineOneLevel } from '../../../utils/teamView/filterDownline';
import isLegacyAssociateIdInArray from '../../../utils/teamView/isLegacyAssociateIdInArray';
import AppContext from '../../../contexts/AppContext';
import { OuterCircle, ReceivingCircle } from './visualTree.styles';
import { Localized } from '../../../translations/Localized';

const paddingOffset = 60;

const circularBaseDiameter = 230;
const gridBaseDiameter = 360;
const gridBasePadding = 24;

const VisualTreePaneSection = ({
  level,
  parentData,
  focusedMember,
  setTopCirlceBorderColor = () => {},
  setIdOfDraggedItemForParent = () => {},
  closeMenus,
  horizontalOffset,
  setActiveBubbleMember,
  activeBubbleMember,
  fadeDown,
  setHidePlacementContainer,
  selectedPlacementUpline,
  prevPlacementUpline,
  setSelectedPlacementUpline,
  setIsPlacementConfirmModalOpen,
  isPlacementConfirmModalOpen,
  selectedPlacementEnrolee,
  getTopLevelUser,
}) => {
  const { theme } = useContext(AppContext);
  const [treeData, setTreeData] = useState(null);
  const [outerCircleReceiveBorderColor, setOuterCircleReceiveBorderColor] =
    useState(theme.disabledTextColor);
  const [idOfDraggedItem, setIdOfDraggedItem] = useState(null);
  const [droppedMember, setDroppedMember] = useState(null);

  const [isOutsideBubbleEntering, setIsOutsideBubbleEntering] = useState(false);
  const [
    isBottomBubbleEnteringOuterCirlce,
    setIsBottomBubbleEnteringOuterCirlce,
  ] = useState(false);
  // reloadSameData flag is when a bubble is dragged back up to the bigger outer circle and then immediately back down to the smaller receiving circle (because the data doesn't reset in this case)
  const [reloadSameData, setReloadSameData] = useState(false);

  const [nextPlacementUpline, setNextPlacementUpline] = useState(null);
  const setPlacementUplineData = (member) => {
    const {
      legacyAssociateId,
      associateId,
      firstName = '',
      lastName = '',
    } = member;
    const data = {
      legacyAssociateId,
      associateId,
      name: `${firstName} ${lastName}`,
    };
    setNextPlacementUpline(data);
    setSelectedPlacementUpline(data);
  };

  const [getUser, { loading, data }] = useLazyQuery(GET_USER, {
    onError: (error) =>
      console.log('error in get user in VisualTreePane.js', error),
  });

  useEffect(() => {
    if (data || reloadSameData) {
      const filteredData = findMembersInDownlineOneLevel(
        data?.treeNodeFor?.childTreeNodes,
        'AMBASSADOR',
      );
      setTreeData(filteredData);
      setReloadSameData(false);
    }
  }, [data, reloadSameData]);

  useEffect(() => {
    setTreeData(null);
    setDroppedMember(null);
  }, [parentData]);

  const treeListCopy = parentData ? [...parentData] : [];

  // for 12 items or greater we display them as a grid rather than in a circle
  const circularLayout = parentData?.length > 0 && parentData?.length < 12;
  const gridLayout = parentData?.length > 11;

  const gridDiameter = gridBaseDiameter + parentData?.length * 14;

  const outerCircleDiameter = circularLayout
    ? circularBaseDiameter + parentData?.length * 24
    : gridLayout
    ? gridDiameter
    : circularBaseDiameter;

  const radius = outerCircleDiameter / 2 - paddingOffset;

  const gridPadding = gridBasePadding + parentData?.length * 2.55;
  const outerCirclePadding = parentData?.length > 11 ? gridPadding : 0;

  const [outsideList, insideItem] =
    reformatListForVisualTreeBubbles(treeListCopy);

  useEffect(() => {
    setIsOutsideBubbleEntering(droppedMember?.associate === idOfDraggedItem);
  }, [droppedMember, idOfDraggedItem]);

  const onDragStart = (item, level, uplineId) => {
    setIdOfDraggedItem(item?.legacyAssociateId);
    setIdOfDraggedItemForParent(item?.legacyAssociateId);
    setTopCirlceBorderColor(theme.primaryButtonBackgroundColor);
    setActiveBubbleMember({ ...item, level, uplineId });
    closeMenus();
    fadeDown();
    Analytics.logEvent('visual_tree_bubble_tapped');
  };

  const onDragEnd = () => {
    setIdOfDraggedItem(null);
    setIdOfDraggedItemForParent(null);
    setTopCirlceBorderColor(theme.disabledTextColor);
  };

  const onDragDrop = () => {
    setIdOfDraggedItem(null);
    setIdOfDraggedItemForParent(null);
    setTopCirlceBorderColor(theme.disabledTextColor);
  };

  const onDragStartFromBottom = (item, level, uplineId) => {
    setOuterCircleReceiveBorderColor(theme.primaryButtonBackgroundColor);
    setIdOfDraggedItem(item?.legacyAssociateId);
    setActiveBubbleMember({ ...item, level, uplineId });
    closeMenus();
    fadeDown();
    Analytics.logEvent('visual_tree_bubble_tapped');
  };

  const onDragEndFromBottom = () => {
    setOuterCircleReceiveBorderColor(theme.disabledTextColor);
    setIdOfDraggedItem(null);
  };

  const onDragDropFromBottom = () => {
    setOuterCircleReceiveBorderColor(theme.disabledTextColor);
    setIdOfDraggedItem(null);
  };

  const onReceiveDragDropOuterCircle = () => {
    if (idOfDraggedItem !== droppedMember?.legacyAssociateId) return;
    setIsBottomBubbleEnteringOuterCirlce(false);
    setTreeData(null);
    setDroppedMember(null);
    setSelectedPlacementUpline(prevPlacementUpline);
    setNextPlacementUpline(null);
    Analytics.logEvent('visual_tree_bubble_dropped');
  };

  const isAValidDropToBottomCirlce =
    isLegacyAssociateIdInArray(parentData, idOfDraggedItem) &&
    idOfDraggedItem !== droppedMember?.legacyAssociateId;

  useEffect(() => {
    setHidePlacementContainer(loading);
  }, [loading]);

  if (loading) {
    return <LoadingSpinner style={{ marginTop: 20 }} size="large" />;
  }
  return (
    <>
      <OuterCircle
        borderColor={outerCircleReceiveBorderColor}
        receivingStyle={
          droppedMember?.legacyAssociateId === idOfDraggedItem && {
            backgroundColor: theme.dropZoneBackgroundColor,
          }
        }
        padding={outsideList?.length > 11 ? outerCirclePadding : 0}
        wrap={outsideList?.length > 11 ? 'wrap' : 'nowrap'}
        style={{
          width: outerCircleDiameter,
          height: outerCircleDiameter,
          borderRadius: outerCircleDiameter / 2,
          justifyContent:
            (outsideList.length === 0 && insideItem === null) ||
            outsideList?.length > 11
              ? 'center'
              : null,
          alignItems:
            (outsideList.length === 0 && insideItem === null) ||
            outsideList?.length > 11
              ? 'center'
              : null,
        }}
        onReceiveDragEnter={() =>
          idOfDraggedItem === droppedMember?.legacyAssociateId &&
          setIsBottomBubbleEnteringOuterCirlce(true)
        }
        onReceiveDragExit={() => setIsBottomBubbleEnteringOuterCirlce(false)}
        onReceiveDragDrop={onReceiveDragDropOuterCircle}
      >
        {outsideList.length > 0 &&
          !isBottomBubbleEnteringOuterCirlce &&
          outsideList?.map((item, index) => (
            <VisualTreeBubble
              key={item?.associate?.associateId}
              member={{
                ...item?.associate,
                ovRankName: item?.rank?.rankName,
                ovRankId: item?.rank?.rankId,
                cvRankName: item?.customerSalesRank?.rankName,
                cvRankId: item?.customerSalesRank?.customerSalesRankId,
                cv: item?.cv,
                ov: item?.ov,
                uplineId: item?.uplineTreeNode?.associate?.legacyAssociateId,
                enrollerId:
                  item?.uplineEnrollmentTreeNode?.associate?.legacyAssociateId,
                dateSignedUp: item?.associate?.dateSignedUp,
              }}
              draggable={
                item?.associate?.legacyAssociateId !==
                droppedMember?.legacyAssociateId
              }
              onDragStart={() =>
                onDragStart(
                  item?.associate,
                  level,
                  item?.uplineTreeNode?.associate?.legacyAssociateId,
                )
              }
              onDragEnd={onDragEnd}
              onDragDrop={onDragDrop}
              payload={{
                ...item?.associate,
                ovRankName: item?.rank?.rankName,
                ovRankId: item?.rank?.rankId,
                cvRankName: item?.customerSalesRank?.rankName,
                cvRankId: item?.customerSalesRank?.customerSalesRankId,
                cv: item?.cv,
                ov: item?.ov,
                uplineId: item?.uplineTreeNode?.associate?.legacyAssociateId,
                enrollerId:
                  item?.uplineEnrollmentTreeNode?.associate?.legacyAssociateId,
                dateSignedUp: item?.associate?.dateSignedUp,
              }}
              isBeingDragged={
                idOfDraggedItem === item?.associate?.legacyAssociateId
              }
              isDroppedItem={
                droppedMember?.legacyAssociateId ===
                item?.associate?.legacyAssociateId
              }
              level={level}
              horizontalOffset={horizontalOffset}
              selected={
                activeBubbleMember?.associateId === item?.associate?.associateId
              }
              position={outsideList?.length > 11 ? 'relative' : 'absolute'}
              style={
                outsideList?.length < 12 && {
                  top:
                    radius -
                    radius *
                      Math.cos(
                        (360 / outsideList?.length) * ((index * Math.PI) / 180),
                      ),
                  left:
                    radius +
                    radius *
                      Math.sin(
                        (360 / outsideList?.length) * ((index * Math.PI) / 180),
                      ),
                }
              }
            />
          ))}
        {insideItem !== null && !isBottomBubbleEnteringOuterCirlce && (
          <VisualTreeBubble
            member={{
              ...insideItem?.associate,
              ovRankName: insideItem?.rank?.rankName,
              ovRankId: insideItem?.rank?.rankId,
              cvRankName: insideItem?.customerSalesRank?.rankName,
              cvRankId: insideItem?.customerSalesRank?.customerSalesRankId,
              cv: insideItem?.cv,
              ov: insideItem?.ov,
              uplineId:
                insideItem?.uplineTreeNode?.associate?.legacyAssociateId,
              enrollerId:
                insideItem?.uplineEnrollmentTreeNode?.associate
                  ?.legacyAssociateId,
              dateSignedUp: insideItem?.associate?.dateSignedUp,
            }}
            draggable={
              insideItem?.associate?.legacyAssociateId !==
              droppedMember?.legacyAssociateId
            }
            onDragStart={() =>
              onDragStart(
                insideItem?.associate,
                level,
                insideItem?.uplineTreeNode?.associate?.legacyAssociateId,
              )
            }
            onDragEnd={onDragEnd}
            onDragDrop={onDragDrop}
            payload={{
              ...insideItem?.associate,
              ovRankName: insideItem?.rank?.rankName,
              ovRankId: insideItem?.rank?.rankId,
              cvRankName: insideItem?.customerSalesRank?.rankName,
              cvRankId: insideItem?.customerSalesRank?.customerSalesRankId,
              cv: insideItem?.cv,
              ov: insideItem?.ov,
              uplineId:
                insideItem?.uplineTreeNode?.associate?.legacyAssociateId,
              enrollerId:
                insideItem?.uplineEnrollmentTreeNode?.associate
                  ?.legacyAssociateId,
              dateSignedUp: insideItem?.associate?.dateSignedUp,
            }}
            isBeingDragged={
              idOfDraggedItem === insideItem?.associate?.legacyAssociateId
            }
            isDroppedItem={
              droppedMember?.legacyAssociateId ===
              insideItem?.associate?.legacyAssociateId
            }
            level={level}
            horizontalOffset={horizontalOffset}
            selected={
              activeBubbleMember?.associateId ===
              insideItem?.associate?.associateId
            }
            style={{
              position: 'absolute',
              top: radius - 0,
              left: radius + 12,
            }}
          />
        )}
        {outsideList.length === 0 && insideItem === null && (
          <H6 style={{ textAlign: 'center' }}>
            {`${focusedMember?.firstName} ${
              focusedMember?.lastName
            }: ${Localized('has no team members')}`}
          </H6>
        )}
      </OuterCircle>

      <ReceivingCircle
        borderColor={
          isAValidDropToBottomCirlce
            ? theme.primaryButtonBackgroundColor
            : theme.disabledTextColor
        }
        receivingStyle={
          isAValidDropToBottomCirlce && {
            backgroundColor: theme.dropZoneBackgroundColor,
          }
        }
        onReceiveDragEnter={() => {
          isAValidDropToBottomCirlce && setIsOutsideBubbleEntering(true);
        }}
        onReceiveDragExit={() => {
          setIsOutsideBubbleEntering(false);
        }}
        onReceiveDragDrop={({ dragged: { payload } }) => {
          if (isAValidDropToBottomCirlce) {
            getUser({
              variables: { legacyAssociateId: payload?.legacyAssociateId },
            });
            setReloadSameData(true);
            setDroppedMember(payload);
            setPlacementUplineData(payload);
          }
          Analytics.logEvent('visual_tree_bubble_dropped');
        }}
      >
        {droppedMember && !isOutsideBubbleEntering && (
          <VisualTreeBubble
            style={{ position: 'absolute', top: -7, left: 3 }}
            member={droppedMember}
            draggable={true}
            onDragStart={() =>
              onDragStartFromBottom(
                droppedMember,
                level,
                droppedMember?.uplineId,
              )
            }
            onDragEnd={onDragEndFromBottom}
            onDragDrop={onDragDropFromBottom}
            payload={droppedMember}
            isBeingDragged={
              idOfDraggedItem === droppedMember?.legacyAssociateId
            }
            level={level}
            horizontalOffset={horizontalOffset}
            selected={
              activeBubbleMember?.associateId === droppedMember?.associateId
            }
          />
        )}
      </ReceivingCircle>
      {treeData !== null && (
        <>
          {treeData?.length > 0 ? (
            <VisualTreePaneSection
              level={level + 1}
              parentData={treeData}
              borderColor={outerCircleReceiveBorderColor}
              closeMenus={closeMenus}
              horizontalOffset={horizontalOffset}
              setActiveBubbleMember={setActiveBubbleMember}
              activeBubbleMember={activeBubbleMember}
              fadeDown={fadeDown}
              setHidePlacementContainer={setHidePlacementContainer}
              selectedPlacementUpline={selectedPlacementUpline}
              // prevPlacementUpline is used for when the expanded bubbles are dragged backward up a level
              prevPlacementUpline={nextPlacementUpline}
              setSelectedPlacementUpline={setSelectedPlacementUpline}
              isPlacementConfirmModalOpen={isPlacementConfirmModalOpen}
              setIsPlacementConfirmModalOpen={setIsPlacementConfirmModalOpen}
              selectedPlacementEnrolee={selectedPlacementEnrolee}
              getTopLevelUser={getTopLevelUser}
            />
          ) : (
            <OuterCircle
              padding={8}
              wrap="nowrap"
              borderColor={null}
              receivingStyle={
                !isLegacyAssociateIdInArray(treeData, idOfDraggedItem) && {
                  backgroundColor: theme.dropZoneBackgroundColor,
                }
              }
              style={{
                width: circularBaseDiameter,
                height: circularBaseDiameter,
                borderRadius: circularBaseDiameter / 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <H6 style={{ textAlign: 'center' }}>
                {`${droppedMember?.firstName} ${
                  droppedMember?.lastName
                }: ${Localized('has no team members')}`}
              </H6>
            </OuterCircle>
          )}
        </>
      )}
      {isPlacementConfirmModalOpen && (
        <PlacementConfirmModal
          visible={isPlacementConfirmModalOpen}
          onClose={() => setIsPlacementConfirmModalOpen(false)}
          onConfirm={() => {}}
          confirmButtonDisabled={false}
          selectedPlacementUpline={selectedPlacementUpline}
          selectedPlacementEnrolee={selectedPlacementEnrolee}
          getTopLevelUser={getTopLevelUser}
        />
      )}
    </>
  );
};

VisualTreePaneSection.propTypes = {
  level: PropTypes.number.isRequired,
  parentData: PropTypes.array,
  focusedMember: PropTypes.object,
  setTopCirlceBorderColor: PropTypes.func,
  setIdOfDraggedItemForParent: PropTypes.func,
  closeMenus: PropTypes.func.isRequired,
  horizontalOffset: PropTypes.number.isRequired,
  setActiveBubbleMember: PropTypes.func.isRequired,
  activeBubbleMember: PropTypes.object,
  fadeDown: PropTypes.func.isRequired,
  setHidePlacementContainer: PropTypes.func.isRequired,
  selectedPlacementUpline: PropTypes.object,
  prevPlacementUpline: PropTypes.object,
  setSelectedPlacementUpline: PropTypes.func.isRequired,
  isPlacementConfirmModalOpen: PropTypes.bool.isRequired,
  setIsPlacementConfirmModalOpen: PropTypes.func.isRequired,
  selectedPlacementEnrolee: PropTypes.object,
  getTopLevelUser: PropTypes.func.isRequired,
};

export default VisualTreePaneSection;
