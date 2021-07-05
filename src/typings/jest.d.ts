declare namespace jest {
  interface Matchers<R> {
    toBeStringEqual: (expected: string) => CustomMatcherResult;
  }
}