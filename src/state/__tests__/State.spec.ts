import { IStateMock, StateMock } from "../__mocks__/State.mock";

describe("State test suit", () => {
  it("should return the state", () => {
    const state = new StateMock();

    const expectedState: IStateMock = {
      name: StateMock.name,
    };

    expect(state.state).toMatchObject(expectedState);
  });
});
