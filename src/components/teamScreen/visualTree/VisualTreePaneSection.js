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

  const [getUser, { loading, data }] = useLazyQuery(GET_USER, {
    onError: (error) =>
      console.log('error in get user in VisualTreePane.js', error),
  });

  useEffect(() => {
    if (data) {
      const filteredData = findMembersInDownlineOneLevel(
        data?.treeNodeFor?.childTreeNodes,
        'AMBASSADOR',
      );
      setTreeData(filteredData);
    }
  }, [data]);

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
    closeMenus();
  };

  const onDragDrop = () => {
    setIdOfDraggedItem(null);
    setIdOfDraggedItemForParent(null);
    setTopCirlceBorderColor(theme.disabledTextColor);
    closeMenus();
  };

  const onDragStartFromBottom = (item) => {
    setOuterCircleReceiveBorderColor(theme.primaryButtonBackgroundColor);
    setIdOfDraggedItem(item?.legacyAssociateId);
    closeMenus();
  };

  const onDragEndFromBottom = () => {
    setOuterCircleReceiveBorderColor(theme.disabledTextColor);
    setIdOfDraggedItem(null);
    closeMenus();
  };

  const onDragDropFromBottom = () => {
    setOuterCircleReceiveBorderColor(theme.disabledTextColor);
    setIdOfDraggedItem(null);
    closeMenus();
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
        onReceiveDragDrop={() => {
          if (idOfDraggedItem === droppedMember?.legacyAssociateId) {
            setIsBottomBubbleEnteringOuterCirlce(false);
            setTreeData(null);
            setDroppedMember(null);
          }
        }}
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
                qov: item?.qoV,
              }}
              draggable={true}
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
                qov: item?.qoV,
              }}
              isBeingDragged={
                idOfDraggedItem === item?.associate?.legacyAssociateId
              }
              isDroppedItem={
                droppedMember?.legacyAssociateId ===
                item?.associate?.legacyAssociateId
              }
              level={level}
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
              qov: insideItem?.qoV,
            }}
            draggable={true}
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
              qov: insideItem?.qoV,
            }}
            isBeingDragged={
              idOfDraggedItem === insideItem?.associate?.legacyAssociateId
            }
            isDroppedItem={
              droppedMember?.legacyAssociateId ===
              insideItem?.associate?.legacyAssociateId
            }
            level={level}
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
};

export default VisualTreePaneSection;
