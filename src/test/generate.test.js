// import { screen } from '@testing-library/react';
import { createWorkingQueens } from '../generate.js';

test('generate playable matrix of queens', () => {
  const [regions, pairs] = createWorkingQueens(6);
  expect(regions.length).toBe(6);
  expect(pairs.length).toBe(6);
});

test('generates one queen per row', () => {
  const [regions] = createWorkingQueens(6);
  regions.forEach(element => {
    expect(element.filter((char) => char === 'Q').length).toBe(1)
  });
});