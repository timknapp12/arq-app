import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import KebobIcon from '../../../../assets/icons/kebob-icon.svg';
import { H2Book, H4Book, H6 } from '../../common';
import AppContext from '../../../contexts/AppContext';
import {
  CardContainer,
  Row,
  Stack,
  IconColumn,
  CollapsedImage,
  CollapsedImageDefault,
} from './card.styles';

const CollapsedContactCard = ({ setIsExpanded, data, initials }) => {
  const { image, firstName, lastName, phone, email } = data;
  const { theme } = useContext(AppContext);
  return (
    <CardContainer>
      <Row>
        {image.url ? (
          <CollapsedImage source={{ uri: image.url }} />
        ) : (
          <CollapsedImageDefault>
            <H2Book>{initials}</H2Book>
          </CollapsedImageDefault>
        )}
        <Stack>
          <H4Book>{`${firstName} ${lastName}`}</H4Book>
          <H6>{phone}</H6>
          <H6>{email}</H6>
        </Stack>
        <IconColumn>
          <TouchableOpacity onPress={() => setIsExpanded(true)}>
            <MaterialCommunityIcon
              name="chevron-down"
              color={theme.primaryTextColor}
              size={24}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsExpanded(true)}>
            <KebobIcon
              style={{
                height: 20,
                width: 20,
                color: theme.primaryTextColor,
              }}
            />
          </TouchableOpacity>
        </IconColumn>
      </Row>
    </CardContainer>
  );
};

CollapsedContactCard.propTypes = {
  setIsExpanded: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  initials: PropTypes.string.isRequired,
};

export default CollapsedContactCard;
