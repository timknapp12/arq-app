import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ExpandedContactCard from './ExpandedContactCard';
import CollapsedContactCard from './CollapsedContactCard';

const ContactCard = ({ data }) => {
  const { firstName = '', lastName = '' } = data;
  const initials = firstName.slice(0, 1) + lastName.slice(0, 1);
  const [isExpanded, setIsExpanded] = useState(false);
  if (isExpanded) {
    return (
      <ExpandedContactCard
        setIsExpanded={setIsExpanded}
        data={data}
        initials={initials}
      />
    );
  }
  return (
    <CollapsedContactCard
      setIsExpanded={setIsExpanded}
      data={data}
      initials={initials}
    />
  );
};

ContactCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ContactCard;
