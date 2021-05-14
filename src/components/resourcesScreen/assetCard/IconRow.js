import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
// TODO put heart icons back when we have backend support
// import HeartFillIcon from '../../../../assets/icons/heart-fill-icon.svg';
// import HeartOutlineIcon from '../../../../assets/icons/heart-outline-icon.svg';
import DownloadIcon from '../../../../assets/icons/download-icon.svg';
import ShareIcon from '../../../../assets/icons/share-icon.svg';
import RemoveIcon from '../../../../assets/icons/remove-icon.svg';
import EditIcon from '../../../../assets/icons/edit-icon.svg';
import AppContext from '../../../contexts/AppContext';

const Container = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const IconRow = ({
  // isFavorite,
  hasPermissions,
  contentType,
  onShare,
  onDownload,
  onEdit,
  onRemove,
}) => {
  const { theme } = useContext(AppContext);
  return (
    <Container>
      {hasPermissions && (
        <>
          <TouchableOpacity onPress={onEdit}>
            <EditIcon
              style={{
                marginEnd: 8,
                height: 24,
                width: 24,
                color: theme.activeTint,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onRemove}>
            <RemoveIcon
              style={{
                marginEnd: 8,
                height: 24,
                width: 24,
                color: theme.activeTint,
              }}
            />
          </TouchableOpacity>
        </>
      )}
      {/* {isFavorite ? (
        <TouchableOpacity onPress={() => {}}>
          <HeartFillIcon
            style={{
              marginEnd: 8,
              height: 24,
              width: 24,
              color: theme.favoriteFillColor,
            }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => {}}>
          <HeartOutlineIcon
            style={{
              marginEnd: 8,
              height: 24,
              width: 24,
              color: theme.primaryTextColor,
            }}
          />
        </TouchableOpacity>
      )} */}
      {contentType !== 'video' && (
        <TouchableOpacity onPress={onDownload}>
          <DownloadIcon
            style={{
              marginEnd: 8,
              height: 24,
              width: 24,
              color: theme.primaryTextColor,
            }}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={onShare}>
        <ShareIcon
          style={{
            marginEnd: 8,
            height: 24,
            width: 24,
            color: theme.primaryTextColor,
          }}
        />
      </TouchableOpacity>
    </Container>
  );
};

IconRow.propTypes = {
  isFavorite: PropTypes.bool,
  hasPermissions: PropTypes.bool,
  contentType: PropTypes.string,
  onShare: PropTypes.func,
  onDownload: PropTypes.func,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
};

export default IconRow;
