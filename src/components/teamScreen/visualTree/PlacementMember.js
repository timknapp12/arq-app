import React from 'react';
import PropTypes from 'prop-types';
// Components
import { Gap, H5Secondary, Flexbox, PrimaryButtonSmall } from '../../common';
import PlacementStatBar from './PlacementStatBar';
import { PlacementCard } from './visualTree.styles';
// Utils
import properlyCaseName from '../../../utils/properlyCaseName/properlyCaseName';
import { Localized } from '../../../translations/Localized';

const PlacementMember = ({
  member,
  setIsPlacementConfirmModalOpen,
  setSelectedPlacementEnrolee,
  ...props
}) => {
  const name = properlyCaseName(member?.firstName, member?.lastName);

  const { associateId, firstName = '', lastName = '' } = member;
  const data = {
    associateId,
    name: `${firstName} ${lastName}`,
  };
  const onPlace = () => {
    setSelectedPlacementEnrolee(data);
    setIsPlacementConfirmModalOpen(true);
  };

  return (
    <PlacementCard {...props}>
      <Flexbox>
        <H5Secondary>{name}</H5Secondary>
      </Flexbox>
      <PlacementStatBar member={member} />
      <Gap height="12px" />
      <PrimaryButtonSmall onPress={onPlace}>
        {Localized('Place').toUpperCase()}
      </PrimaryButtonSmall>
      <Gap height="8px" />
    </PlacementCard>
  );
};

PlacementMember.propTypes = {
  member: PropTypes.object.isRequired,
  setIsPlacementConfirmModalOpen: PropTypes.func.isRequired,
  setSelectedPlacementEnrolee: PropTypes.func.isRequired,
};

export default PlacementMember;
