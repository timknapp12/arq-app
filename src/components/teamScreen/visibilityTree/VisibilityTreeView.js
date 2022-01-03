import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Flexbox } from '../../common';

const dimensions = 60;

const Wrapper = styled.View`
  border: 1px solid white;
  padding: 0 12px 12px 12px;
  border-radius: 43px;
`;

const Cirlce = styled.View`
  height: ${dimensions}px;
  width: ${dimensions}px;
  border-radius: ${dimensions / 2}px;
  background-color: red;
  margin-top: 12px;
`;

const VisibilityTreeView = () => {
  const measureView = (event) => {
    // console.log('event properties: ', event);
    console.log('width: ', event.nativeEvent.layout.width);
    console.log('height: ', event.nativeEvent.layout.height);
  };
  return (
    <Flexbox
      //   align="flex-start"
      justify="flex-start"
      width="95%"
      height="100%"
      padding={4}
      style={{ zIndex: -1, maxWidth: 425 }}
    >
      <Wrapper onLayout={(event) => measureView(event)}>
        <TouchableOpacity
          onPress={() => console.log('hello there red')}
          onLongPress={() => console.log('loooooong press red')}
        >
          <Cirlce />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log('hello there blue')}
          onLongPress={() => console.log('loooooong press blue')}
        >
          <Cirlce style={{ backgroundColor: 'blue' }} />
        </TouchableOpacity>
      </Wrapper>
    </Flexbox>
  );
};

export default VisibilityTreeView;
