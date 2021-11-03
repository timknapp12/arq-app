import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DownlineProfileInfo from '../DownlineProfileInfo';
import { CardContainer } from '../myTeamCard.styles';

const MyCustomerCard = ({ member, nested, level }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded((state) => !state);

  return (
    <CardContainer nested={nested}>
      <DownlineProfileInfo
        level={level}
        member={member}
        isExpanded={isExpanded}
        onPress={toggleExpanded}
      />
    </CardContainer>
  );
};

MyCustomerCard.propTypes = {
  member: PropTypes.object.isRequired,
  nested: PropTypes.bool,
  level: PropTypes.number,
};

export default MyCustomerCard;
