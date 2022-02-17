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

const VisualTreePaneSection = ({ level, parentData }) => {
  const { theme } = useContext(AppContext);

  const [treeData, setTreeData] = useState(null);
  const [receiveCirlceBorderColor, setReceiveCirlceBorderColor] = useState(
    theme.disabledTextColor,
  );
  const [outerCircleReceiveBorderColor, setOuterCircleReceiveBorderColor] =
    useState(theme.disabledTextColor);
  const [idOfDraggedItem, setIdOfDraggedItem] = useState(null);
  const [droppedMember, setDroppedMember] = useState(null);
  const [isOutsideBubbleEntering, setIsOutsideBubbleEntering] = useState(false);

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

  const onDragStartFromBottom = (item) => {
    setOuterCircleReceiveBorderColor(theme.primaryButtonBackgroundColor);
    setIdOfDraggedItem(item?.legacyAssociateId);
  };

  const onDragEndFromBottom = () => {
    setOuterCircleReceiveBorderColor(theme.disabledTextColor);
    setIdOfDraggedItem(null);
  };

  const onDragDropFromBottom = () => {
    setOuterCircleReceiveBorderColor(theme.disabledTextColor);
    setIdOfDraggedItem(null);
  };

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
          !isLegacyAssociateIdInArray(treeData, idOfDraggedItem) && {
            backgroundColor: 'green',
          }
        }
        style={{
          width: outerCircleDiameter,
          height: outerCircleDiameter,
          borderRadius: outerCircleDiameter / 2,
        }}
        // onReceiveDragEnter={({ dragged: { payload } }) => {}}
        // onReceiveDragExit={({ dragged: { payload } }) => {}}
        // onReceiveDragDrop={({ dragged: { payload } }) => {}}
      >
        {outsideList.length > 0 &&
          outsideList?.map((item, index) => (
            <VisualTreeBubble
              key={item?.associate?.associateId}
              member={item?.associate}
              draggable={true}
              onDragStart={() => onDragStart(item?.associate)}
              onDragEnd={onDragEnd}
              onDragDrop={onDragDrop}
              payload={item?.associate}
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
        {insideItem !== null && (
          <VisualTreeBubble
            member={insideItem?.associate}
            draggable={true}
            onDragStart={() => onDragStart(insideItem?.associate)}
            onDragEnd={onDragEnd}
            onDragDrop={onDragDrop}
            payload={insideItem?.associate}
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
      </OuterCircle>

      <ReceivingCircle
        borderColor={receiveCirlceBorderColor}
        receivingStyle={{ backgroundColor: 'green' }}
        onReceiveDragEnter={() => {
          droppedMember?.legacyAssociateId !== idOfDraggedItem &&
            setIsOutsideBubbleEntering(true);
        }}
        onReceiveDragExit={() => {
          setIsOutsideBubbleEntering(false);
        }}
        onReceiveDragDrop={({ dragged: { payload } }) => {
          getUser({
            variables: { legacyAssociateId: payload?.legacyAssociateId },
          });
          setDroppedMember(payload);
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
              outerCircleReceiveBorderColor={outerCircleReceiveBorderColor}
            />
          ) : (
            <OuterCircle
              borderColor={outerCircleReceiveBorderColor}
              receivingStyle={
                !isLegacyAssociateIdInArray(treeData, idOfDraggedItem) && {
                  backgroundColor: 'green',
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
};

export default VisualTreePaneSection;
