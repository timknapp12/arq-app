import React from 'react';
import { render, fireEvent } from '../../../utils/test-utils';
import { PrimaryButton } from '../buttons';

describe('Primary Button', () => {
  it('onPress works nad has required children props', async () => {
    const onPressMock = jest.fn();

    const { getByText } = render(
      <PrimaryButton onPress={onPressMock}>Press Me</PrimaryButton>,
    );

    fireEvent.press(getByText('Press Me'));
    expect(onPressMock).toHaveBeenCalled();
  });
});
