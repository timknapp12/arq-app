import styled from 'styled-components/native';
import { TouchableOpacity, Platform } from 'react-native';
import { TouchableOpacity as GestureTouchable } from 'react-native-gesture-handler';

export const CardContainer = styled.TouchableOpacity`
  width: 100%;
`;

export const OuterContainer = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  border-radius: 5px;
  margin-bottom: 2px;
`;

export const Row = styled.View`
  flex-direction: row;
  flex: 1;
  padding: 16px 12px 4px 12px;
  align-items: center;
`;

export const InnerContainer = styled.View`
  justify-content: flex-start;
  width: 100%;
`;

export const TitleAndDateContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const IconColumn = styled.View`
  justify-content: space-between;
  align-items: center;
`;

export const IconRow = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

// The TouchableOpacity from react native works on ios and the TouchableOpacity from react-native-gesture-hanlder works on android
export const CalloutButton = styled(
  Platform.OS === 'ios' ? TouchableOpacity : GestureTouchable,
)``;
