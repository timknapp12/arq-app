import styled from 'styled-components/native';

export const CardContainer = styled.View`
  width: ${(props) => (props.indent ? '95%' : '100%')};
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 10px;
  height: auto;
  align-self: flex-end;
`;

const diameter = 48;

const imageDimensions = {
  width: diameter,
  height: diameter,
  borderRadius: diameter / 2,
};

export const ThumbnailImage = styled.Image`
  ${imageDimensions};
`;

export const DefaultThumbnailBackground = styled.View`
  ${imageDimensions};
  background-color: ${(props) => props.theme.disabledTextColor};
  justify-content: center;
  align-items: center;
`;

export const LevelIndicatorContainer = styled.View`
  ${imageDimensions};
  justify-content: flex-end;
  align-items: flex-end;
  position: absolute;
  top: 0px;
  overflow: hidden;
`;

export const LevelIndicator = styled.View`
  background-color: ${(props) => props.theme.primaryButtonBackgroundColor};
  justify-content: center;
  align-items: center;
  height: ${diameter / 3}px;
  width: 100%;
`;

export const ProfileInfoTouchable = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
`;

export const NameAndRankContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  margin: 0 4px;
`;
