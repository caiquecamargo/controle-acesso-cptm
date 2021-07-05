export function mockFetch(response: unknown = {}) {
  global.fetch = jest.fn(
    (input, init): Promise<Response> => Promise.resolve(response as Response)
  );
}

export function mockFetchRejected() {
  global.fetch = jest.fn((input, init): Promise<Response> => Promise.reject());
}
