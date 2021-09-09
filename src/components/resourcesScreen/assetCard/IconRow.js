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
import SendIcon from '../../../../assets/icons/send-icon.svg';
import LeadCaptureIcon from '../../../../assets/icons/enrollment-icon.svg';
import AppContext from '../../../contexts/AppContext';

const Container = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const IconRow = ({
  // isFavorite,
  isOwner,
  contentType,
  onShare,
  onDownload,
  onEdit,
  onRemove,
  onSend,
  onLeadCapture,
}) => {
  const { theme } = useContext(AppContext);

  const iconStyle = {
    marginEnd: 8,
    height: 36,
    width: 36,
    color: theme.primaryTextColor,
  };

  return (
    <Container>
      {isOwner && (
        <>
          <TouchableOpacity onPress={onEdit}>
            <EditIcon style={iconStyle} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onRemove}>
            <RemoveIcon style={iconStyle} />
          </TouchableOpacity>
        </>
      )}
      {/* {isFavorite ? (
        <TouchableOpacity onPress={() => {}}>
          <HeartFillIcon
            style={iconStyle}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => {}}>
          <HeartOutlineIcon
            style={iconStyle}
          />
        </TouchableOpacity>
      )} */}
      {contentType !== 'video' && contentType !== 'podcast' && (
        <TouchableOpacity onPress={onDownload}>
          <DownloadIcon style={iconStyle} />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={onShare}>
        <ShareIcon style={iconStyle} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onSend}>
        <SendIcon style={iconStyle} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onLeadCapture}>
        <LeadCaptureIcon style={iconStyle} />
      </TouchableOpacity>
    </Container>
  );
};

IconRow.propTypes = {
  isFavorite: PropTypes.bool,
  isOwner: PropTypes.bool,
  contentType: PropTypes.string,
  onShare: PropTypes.func,
  onDownload: PropTypes.func,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  onSend: PropTypes.func,
  onLeadCapture: PropTypes.func,
};

export default IconRow;
