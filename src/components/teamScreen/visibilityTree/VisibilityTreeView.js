import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Flexbox } from '../../common';
import mockTreeData from './mockTreeData';

// source for finding coordinates https://stackoverflow.com/questions/26599782/positioning-divs-in-a-circle-using-javascript

const dimensions = 60;

const radius = 150 - 42;

const Wrapper = styled.View`
  margin-top: 20px;
  border: 1px solid white;
  padding: 0 12px 12px 12px;
  position: relative;
`;

const Cirlce = styled.View`
  height: ${dimensions}px;
  width: ${dimensions}px;
  border-radius: ${dimensions / 2}px;
  background-color: ${({ color }) => color};
  margin-top: 12px;
  position: absolute;
`;

const VisibilityTreeView = () => {
  const dimensions = 300;

  return (
    <Flexbox
      justify="flex-start"
      width="95%"
      height="100%"
      padding={4}
      style={{ zIndex: -1, maxWidth: 425 }}
    >
      <Wrapper
        style={{
          width: dimensions,
          height: dimensions,
          borderRadius: dimensions / 2,
        }}
      >
        {mockTreeData.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => console.log(`hello there ${item.firstName}`)}
            onLongPress={() => console.log(`loooooong press ${item.firstName}`)}
            style={{
              top:
                radius -
                radius *
                  Math.cos(
                    (360 / mockTreeData.length) * ((index * Math.PI) / 180),
                  ),
              left:
                radius +
                radius *
                  Math.sin(
                    (360 / mockTreeData.length) * ((index * Math.PI) / 180),
                  ),
            }}
          >
            <Cirlce color={item.color} />
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: radius - 0,
            left: radius + 12,
          }}
        >
          <Cirlce color="gray" />
        </TouchableOpacity>
      </Wrapper>
    </Flexbox>
  );
};

export default VisibilityTreeView;
