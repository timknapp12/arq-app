import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MyAmbassadorExpandedInfo from './MyAmbassadorExpandedInfo';
import {
  CardContainer,
  ZoomContainer,
  ZoomContainerDivider,
  ZoomIconButton,
} from './myAmbassadorCard.styles';
import ZoomInIcon from '../../../../../assets/icons/icZoomIn.svg';
import ZoomOutIcon from '../../../../../assets/icons/icZoomOut.svg';
import DownlineProfileInfo from './DownlineProfileInfo';
import { findMembersInDownlineOneLevel } from '../../../../utils/teamView/filterDownline';

const MyAmbassadorCard = ({ member, indent, level = 1 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded((state) => !state);

  const childData = findMembersInDownlineOneLevel(
    member?.childTreeNodes ?? [],
    'AMBASSADOR',
  );

  // https://snack.expo.dev/@adamgrzybowski/react-native-gesture-handler-demo?
  const RenderRight = (_, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-70, 0.5],
      outputRange: [1, 0.5],
    });
    const transformStyle = {
      transform: [{ scale }],
    };
    return (
      <ZoomContainer>
        <ZoomIconButton onPress={() => console.log('zoom in')}>
          <Animated.View style={[transformStyle]}>
            <ZoomInIcon />
          </Animated.View>
        </ZoomIconButton>
        <ZoomContainerDivider />
        <ZoomIconButton onPress={() => console.log('zoom out')}>
          <Animated.View style={[transformStyle]}>
            <ZoomOutIcon />
          </Animated.View>
        </ZoomIconButton>
      </ZoomContainer>
    );
  };

  return (
    <>
      <Swipeable overshootRight={false} renderRightActions={RenderRight}>
        <CardContainer indent={indent}>
          <DownlineProfileInfo
            level={level}
            member={member}
            isExpanded={isExpanded}
            onPress={toggleExpanded}
          />
          {isExpanded && <MyAmbassadorExpandedInfo member={member} />}
        </CardContainer>
      </Swipeable>
      {childData.map((child) => (
        <MyAmbassadorCard
          member={child}
          key={child?.associate?.associateId}
          indent
          level={level + 1}
        />
      ))}
    </>
  );
};

MyAmbassadorCard.propTypes = {
  member: PropTypes.object.isRequired,
  indent: PropTypes.bool,
  level: PropTypes.number,
};

export default MyAmbassadorCard;
