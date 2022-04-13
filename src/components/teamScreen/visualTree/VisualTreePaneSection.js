import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/client';
import { LoadingSpinner, H6 } from '../../common';
import { GET_USER } from '../../../graphql/queries';
import VisualTreeBubble from './VisualTreeBubble';
import reformatListForVisualTreeBubbles from '../../../utils/teamView/reformatListForVisualTreeBubbles';
import { findMembersInDownlineOneLevel } from '../../../utils/teamView/filterDownline';
import isLegacyAssociateIdInArray from '../../../utils/teamView/isLegacyAssociateIdInArray';
import AppContext from '../../../contexts/AppContext';
import { OuterCircle, ReceivingCircle } from './visualTree.styles';
import { Localized } from '../../../translations/Localized';

const paddingOffset = 60;

const baseDiameter = 230;

const VisualTreePaneSection = ({
  level,
  parentData,
  focusedMember,
  setTopCirlceBorderColor = () => {},
  setIdOfDraggedItemForParent = () => {},
  closeMenus,
  contentOffsetX,
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

  const outerCircleDiameter = parentData?.length
    ? baseDiameter + parentData?.length * 24
    : baseDiameter;

  const radius = outerCircleDiameter / 2 - paddingOffset;

  const [outsideList, insideItem] =
    reformatListForVisualTreeBubbles(treeListCopy);

  useEffect(() => {
    setIsOutsideBubbleEntering(droppedMember?.associate === idOfDraggedItem);
  }, [droppedMember, idOfDraggedItem]);

  const onDragStart = (item) => {
    setIdOfDraggedItem(item?.legacyAssociateId);
    setIdOfDraggedItemForParent(item?.legacyAssociateId);
    setTopCirlceBorderColor(theme.primaryButtonBackgroundColor);
    closeMenus();
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

  const onDragStartFromBottom = (item) => {
    setOuterCircleReceiveBorderColor(theme.primaryButtonBackgroundColor);
    setIdOfDraggedItem(item?.legacyAssociateId);
    closeMenus();
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
  };

  const isAValidDropToBottomCirlce =
    isLegacyAssociateIdInArray(parentData, idOfDraggedItem) &&
    idOfDraggedItem !== droppedMember?.legacyAssociateId;

  if (loading) {
    setTimeout(() => {
      return <LoadingSpinner style={{ marginTop: 10 }} size="large" />;
    }, 500);
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
        style={{
          width: outerCircleDiameter,
          height: outerCircleDiameter,
          borderRadius: outerCircleDiameter / 2,
          justifyContent:
            outsideList.length === 0 && insideItem === null ? 'center' : null,
          alignItems:
            outsideList.length === 0 && insideItem === null ? 'center' : null,
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
              }}
              draggable={
                item?.associate?.legacyAssociateId !==
                droppedMember?.legacyAssociateId
              }
              onDragStart={() => onDragStart(item?.associate)}
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
              }}
              isBeingDragged={
                idOfDraggedItem === item?.associate?.legacyAssociateId
              }
              isDroppedItem={
                droppedMember?.legacyAssociateId ===
                item?.associate?.legacyAssociateId
              }
              level={level}
              contentOffsetX={contentOffsetX}
              style={{
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
              }}
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
            }}
            draggable={
              insideItem?.associate?.legacyAssociateId !==
              droppedMember?.legacyAssociateId
            }
            onDragStart={() => onDragStart(insideItem?.associate)}
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
            }}
            isBeingDragged={
              idOfDraggedItem === insideItem?.associate?.legacyAssociateId
            }
            isDroppedItem={
              droppedMember?.legacyAssociateId ===
              insideItem?.associate?.legacyAssociateId
            }
            level={level}
            contentOffsetX={contentOffsetX}
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
          }
        }}
      >
        {droppedMember && !isOutsideBubbleEntering && (
          <VisualTreeBubble
            style={{ position: 'absolute', top: -7, left: 3 }}
            member={droppedMember}
            draggable={true}
            onDragStart={() => onDragStartFromBottom(droppedMember)}
            onDragEnd={onDragEndFromBottom}
            onDragDrop={onDragDropFromBottom}
            payload={droppedMember}
            isBeingDragged={
              idOfDraggedItem === droppedMember?.legacyAssociateId
            }
            level={level}
            contentOffsetX={contentOffsetX}
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
              contentOffsetX={contentOffsetX}
            />
          ) : (
            <OuterCircle
              // TODO adjust borderColor and receiving style when the functionailty for placement suite is ready
              borderColor={null}
              receivingStyle={
                !isLegacyAssociateIdInArray(treeData, idOfDraggedItem) && {
                  backgroundColor: theme.dropZoneBackgroundColor,
                }
              }
              style={{
                width: baseDiameter,
                height: baseDiameter,
                borderRadius: baseDiameter / 2,
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
  contentOffsetX: PropTypes.number.isRequired,
};

export default VisualTreePaneSection;
