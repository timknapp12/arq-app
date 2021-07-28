import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { H5Black, H6Book } from '../../common';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import KebobIcon from '../../../../assets/icons/kebob-icon.svg';
import AppContext from '../../../contexts/AppContext';
import NotificationCalloutMenu from './NotificationCalloutMenu';
import {
  CardContainer,
  OuterContainer,
  InnerContainer,
  TitleAndDateContainer,
  Row,
  IconColumn,
} from './notificationCard.styles';

const CollapsedNotificationCard = ({
  toggleExpanded,
  data,
  dateSent,
  onRemove,
  handlePin,
  onViewProspect,
  isCalloutOpen,
  onCallout,
  ...props
}) => {
  const { theme } = useContext(AppContext);
  return (
    <CardContainer {...props}>
      <OuterContainer>
        <Row>
          <InnerContainer>
            <TitleAndDateContainer>
              <H5Black>{data?.title}</H5Black>
              {dateSent ? (
                <H6Book style={{ marginEnd: 16 }}>{dateSent}</H6Book>
              ) : null}
            </TitleAndDateContainer>
            {data?.description ? (
              <H6Book
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{ marginBottom: 4, flex: 1 }}>
                {data?.description}
              </H6Book>
            ) : null}
          </InnerContainer>
          <IconColumn>
            <MaterialCommunityIcon
              onPress={toggleExpanded}
              name="chevron-down"
              color={theme.primaryTextColor}
              size={24}
              style={{
                paddingRight: 4,
                paddingLeft: 4,
              }}
            />
            <TouchableOpacity onPress={onCallout}>
              <KebobIcon
                style={{
                  height: 20,
                  width: 20,
                  color: theme.primaryTextColor,
                  padding: 4,
                }}
              />
            </TouchableOpacity>
          </IconColumn>
        </Row>
      </OuterContainer>
      {isCalloutOpen && (
        <NotificationCalloutMenu
          onRemove={onRemove}
          handlePin={handlePin}
          onViewProspect={onViewProspect}
          isSaved={data?.isSaved}
        />
      )}
    </CardContainer>
  );
};

CollapsedNotificationCard.propTypes = {
  toggleExpanded: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  dateSent: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  handlePin: PropTypes.func.isRequired,
  onViewProspect: PropTypes.func.isRequired,
  isCalloutOpen: PropTypes.bool.isRequired,
  onCallout: PropTypes.func.isRequired,
};

export default CollapsedNotificationCard;
