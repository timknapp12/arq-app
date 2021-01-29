import React from 'react';
import renderer from 'react-test-renderer';
import { View, Text } from 'react-native';

import Home from '.';

describe('<Home />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
