import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import HeartFillIcon from '../../../../assets/icons/heart-fill-icon.svg';
import HeartOutlineIcon from '../../../../assets/icons/heart-outline-icon.svg';
import DownloadIcon from '../../../../assets/icons/download-icon.svg';
import ShareIcon from '../../../../assets/icons/share-icon.svg';
import RemoveIcon from '../../../../assets/icons/remove-icon.svg';
import AppContext from '../../../contexts/AppContext';

const Container = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const IconRow = ({ isFavorite, isDownloaded, onShare, download }) => {
  const { theme } = useContext(AppContext);
  return (
    <Container>
      {isFavorite ? (
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
              color: theme.activeTint,
            }}
          />
        </TouchableOpacity>
      )}
      {isDownloaded ? (
        <TouchableOpacity onPress={() => {}}>
          <RemoveIcon
            style={{
              marginEnd: 8,
              height: 24,
              width: 24,
              color: theme.activeTint,
            }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={download}>
          <DownloadIcon
            style={{
              marginEnd: 8,
              height: 24,
              width: 24,
              color: theme.activeTint,
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
            color: theme.activeTint,
          }}
        />
      </TouchableOpacity>
    </Container>
  );
};

IconRow.propTypes = {
  isFavorite: PropTypes.bool,
  isDownloaded: PropTypes.bool,
  onShare: PropTypes.func,
  download: PropTypes.func,
};

export default IconRow;
