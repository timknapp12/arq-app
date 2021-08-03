import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { H5Black, H6Book, Link } from '../../common';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RemoveIcon from '../../../../assets/icons/remove-icon.svg';
import PinIcon from '../../../../assets/icons/pin-icon.svg';
import UnpinIcon from '../../../../assets/icons/UnpinIcon.svg';
import ViewProspectIcon from '../../../../assets/icons/ShowAllIcon.svg';
import AppContext from '../../../contexts/AppContext';
import { Localized } from '../../../translations/Localized';
import {
  CardContainer,
  OuterContainer,
  InnerContainer,
  TitleAndDateContainer,
  Row,
  IconRow,
} from './notificationCard.styles';

const ExpandedNotificationCard = ({
  isExpanded,
  toggleExpanded,
  data,
  dateSent,
  onRemove,
  handlePin,
  onViewProspect,
  ...props
}) => {
  const { theme } = useContext(AppContext);
  const iconStyle = {
    marginEnd: 8,
    height: 24,
    width: 24,
    color: theme.primaryTextColor,
  };
  return (
    <CardContainer {...props} onPress={toggleExpanded} activeOpacity={1}>
      <OuterContainer isExpanded={isExpanded}>
        <Row>
          <InnerContainer>
            <TitleAndDateContainer>
              <H5Black>{data?.title}</H5Black>
              {dateSent ? (
                <H6Book style={{ marginEnd: 16 }}>{dateSent}</H6Book>
              ) : null}
            </TitleAndDateContainer>
            {data?.description ? <H6Book>{data?.description}</H6Book> : null}
            <TouchableOpacity
              onPress={onViewProspect}
              style={{
                paddingRight: 12,
                paddingTop: 2,
                paddingBottom: 4,
                alignSelf: 'flex-start',
              }}>
              <Link>{Localized('View Contact Information')}</Link>
            </TouchableOpacity>
          </InnerContainer>
          <MaterialCommunityIcon
            name="chevron-up"
            color={theme.primaryTextColor}
            size={24}
            style={{
              paddingRight: 4,
              paddingLeft: 4,
            }}
          />
        </Row>
        <IconRow>
          <TouchableOpacity onPress={onRemove}>
            <RemoveIcon style={iconStyle} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePin}>
            {data?.isSaved ? (
              <UnpinIcon style={iconStyle} />
            ) : (
              <PinIcon style={iconStyle} />
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={onViewProspect}>
            <ViewProspectIcon style={iconStyle} />
          </TouchableOpacity>
        </IconRow>
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
