import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { H5Black, H6Book } from '../../common';
// import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RemoveIcon from '../../../../assets/icons/remove-icon.svg';
import PinIcon from '../../../../assets/icons/pin-icon.svg';
import UnpinIcon from '../../../../assets/icons/UnpinIcon.svg';
import ViewProspectIcon from '../../../../assets/icons/ShowAllIcon.svg';
import AppContext from '../../../contexts/AppContext';
import { Localized } from '../../../translations/Localized';
import capitalizeFirstLetterOfEachWord from '../../../utils/capitalizeFirstLetterOfEachWord/capitalizeFirstLetterOfEachWord';
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
  isExpanded,
  //   toggleExpanded,
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

  const properlyCasedName = capitalizeFirstLetterOfEachWord(
    `${firstName} ${lastName}`,
  );
  return (
    <CardContainer
      {...props}
      // onPress={toggleExpanded}
      activeOpacity={1}
    >
      <OuterContainer isExpanded={isExpanded}>
        <Row>
          <InnerContainer>
            <TitleAndDateContainer>
              <H5Black>{properlyCasedName}</H5Black>
              {dateSent ? (
                <H6Book style={{ marginEnd: 16 }}>{dateSent}</H6Book>
              ) : null}
            </TitleAndDateContainer>
            {displayName ? (
              <H6Book>{`${Localized('Viewed')} ${displayName}`}</H6Book>
            ) : null}
            {/* <TouchableOpacity
              onPress={onViewProspect}
              style={{
                paddingRight: 12,
                paddingTop: 2,
                paddingBottom: 4,
                alignSelf: 'flex-start',
              }}>
              <H6Book>{Localized('View Contact Information')}</H6Book>
            </TouchableOpacity> */}
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
          {/* <MaterialCommunityIcon
            name="chevron-up"
            color={theme.primaryTextColor}
            size={24}
            style={{
              paddingRight: 4,
              paddingLeft: 4,
            }}
          /> */}
        </Row>
      </OuterContainer>
    </CardContainer>
  );
};

ExpandedNotificationCard.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  dateSent: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  handlePin: PropTypes.func.isRequired,
  onViewProspect: PropTypes.func.isRequired,
};

export default ExpandedNotificationCard;
