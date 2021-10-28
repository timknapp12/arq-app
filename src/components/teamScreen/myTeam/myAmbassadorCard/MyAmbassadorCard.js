import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyAmbassadorExpandedInfo from './MyAmbassadorExpandedInfo';
import { CardContainer } from './myAmbassadorCard.styles';
import DownlineProfileInfo from './DownlineProfileInfo';
import { findMembersInDownlineOneLevel } from '../../../../utils/teamView/filterDownline';

const MyAmbassadorCard = ({ member, indent, level = 1 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded((state) => !state);

  const childData = findMembersInDownlineOneLevel(
    member?.childTreeNodes ?? [],
    'AMBASSADOR',
  );

  return (
    <>
      <CardContainer indent={indent}>
        <DownlineProfileInfo
          level={level}
          member={member}
          isExpanded={isExpanded}
          onPress={toggleExpanded}
        />
        {isExpanded && <MyAmbassadorExpandedInfo member={member} />}
      </CardContainer>
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
