import { countProductsInOrderDetails } from './countProductsInOrderDetails';
import {
  mockOrderHistoryOne,
  mockOrderHistoryTwo,
  mockOrderHistoryThree,
} from './mockDownlineData';

describe('count Products in Order Details', () => {
  test('return count 3', () => {
    const output = 3;

    expect(countProductsInOrderDetails(mockOrderHistoryOne)).toBe(output);
  });
  test('return count 14', () => {
    const output = 14;

    expect(countProductsInOrderDetails(mockOrderHistoryTwo)).toBe(output);
  });
  test('return count 2', () => {
    const output = 2;

    expect(countProductsInOrderDetails(mockOrderHistoryThree)).toBe(output);
  });
});
