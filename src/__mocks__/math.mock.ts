export function mockMathRandom() {
  Math.random = jest.fn().mockReturnValue(1);
}
