// Modified version of this Stack Overflow response:
// https://stackoverflow.com/a/48459005/1950503
// (Removes ramda dependency, adds .trim() to string replacer, adds it to Jest global var instead of exporting)

// To use:
// Put `<rootDir>/path/to/customWhitespaceMatcher.js` in your Jest config under setupFiles
// Call it in your tests like this:
//    expect(
//      customMatchers.whitespaceMatcher(receivedResult, expectedResult).pass
//    ).toBeTruthy();

import { matcherHint, printReceived, printExpected } from 'jest-matcher-utils';
import diff from 'jest-diff';

const replaceWhitespace = (str: string) => str.replace(/\s+/g, ' ').trim();
const compressWhitespace = (arr: string[]) => arr.map(replaceWhitespace);

const name = `toEqualWithCompressedWhitespace`;

export const toBeStringEqual = (received: string, expected: string) => {
  const [
    receivedWithCompresssedWhitespace,
    expectedWithCompresssedWhitespace
  ] = compressWhitespace([received, expected]);
  let pass =
    receivedWithCompresssedWhitespace === expectedWithCompresssedWhitespace;

  const message = pass
    ? () =>
      `${matcherHint(`.not.${name}`)}\n\n` +
      `Uncompressed expected value:\n` +
      `  ${printExpected(expected)}\n` +
      `Expected value with compressed whitespace to not equal:\n` +
      `  ${printExpected(expectedWithCompresssedWhitespace)}\n` +
      `Uncompressed received value:\n` +
      `  ${printReceived(received)}\n` +
      `Received value with compressed whitespace:\n` +
      `  ${printReceived(receivedWithCompresssedWhitespace)}`
    : () => {
      const diffString = diff(
        expectedWithCompresssedWhitespace,
        receivedWithCompresssedWhitespace
      );
      return (
        `${matcherHint(`.${name}`)}\n\n` +
        `Uncompressed expected value:\n` +
        `  ${printExpected(expected)}\n` +
        `Expected value with compressed whitespace to equal:\n` +
        `  ${printExpected(expectedWithCompresssedWhitespace)}\n` +
        `Uncompressed received value:\n` +
        `  ${printReceived(received)}\n` +
        `Received value with compressed whitespace:\n` +
        `  ${printReceived(receivedWithCompresssedWhitespace)}${diffString ? `\n\nDifference:\n\n${diffString}` : ``
        }`
      );
    };
  return {
    message,
    pass
  };
};

// global.customMatchers = { whitespaceMatcher };