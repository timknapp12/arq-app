import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { H5Black, H6Book } from '../../common';
import RemoveIcon from '../../../../assets/icons/remove-icon.svg';
import PinIcon from '../../../../assets/icons/pin-icon.svg';
import UnpinIcon from '../../../../assets/icons/UnpinIcon.svg';
import ViewProspectIcon from '../../../../assets/icons/ShowAllIcon.svg';
import AppContext from '../../../contexts/AppContext';
import { Localized } from '../../../translations/Localized';
import properlyCaseName from '../../../utils/properlyCaseName/properlyCaseName';
import {
  CardContainer,
  OuterContainer,
  InnerContainer,
  TitleAndDateContainer,
  Row,
  IconRow,
  CalloutButton,
} from './notificationCard.styles';

const ExpandedNotificationCard = ({
  data,
  dateSent,
  onRemove,
  handlePin,
  onViewProspect,
  ...props
}) => {
  const { theme } = useContext(AppContext);
  const { prospect, sentLinks } = data;
  const { firstName, lastName } = prospect;
  const { displayName } = sentLinks;

  const iconStyle = {
    marginEnd: 4,
    height: 24,
    width: 24,
    color: theme.primaryTextColor,
  };

  return (
    <CardContainer {...props} activeOpacity={1}>
      <OuterContainer>
        <Row>
          <InnerContainer>
            <TitleAndDateContainer>
              <H5Black>{properlyCaseName(firstName, lastName)}</H5Black>
              {dateSent ? (
                <H6Book style={{ marginEnd: 16 }}>{dateSent}</H6Book>
              ) : null}
            </TitleAndDateContainer>
            {displayName ? (
              <H6Book>{`${Localized('Viewed')} ${displayName}`}</H6Book>
            ) : null}
            <IconRow>
              <CalloutButton onPress={onRemove}>
                <Row>
                  <RemoveIcon style={iconStyle} />
                  <H6Book>{Localized('Remove')}</H6Book>
                </Row>
              </CalloutButton>

              <CalloutButton onPress={handlePin}>
                {data?.isSaved ? (
                  <Row>
                    <UnpinIcon style={iconStyle} />
                    <H6Book>{Localized('Unpin')}</H6Book>
                  </Row>
                ) : (
                  <Row>
                    <PinIcon style={iconStyle} />
                    <H6Book>{Localized('Pin')}</H6Book>
                  </Row>
                )}
              </CalloutButton>

              <CalloutButton onPress={onViewProspect}>
                <Row>
                  <ViewProspectIcon style={iconStyle} />
                  <H6Book>{Localized('View Prospect')}</H6Book>
                </Row>
              </CalloutButton>
            </IconRow>
          </InnerContainer>
        </Row>
      </OuterContainer>
    </CardContainer>
  );
};

ExpandedNotificationCard.propTypes = {
  data: PropTypes.object.isRequired,
  dateSent: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  handlePin: PropTypes.func.isRequired,
  onViewProspect: PropTypes.func.isRequired,
};

export default ExpandedNotificationCard;
