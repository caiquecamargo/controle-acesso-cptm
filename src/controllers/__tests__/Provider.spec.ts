import { ProviderMock } from "../__mocks__/Provider.mock";

describe("Provider test suit", () => {
  it("should call the provide method from Provider", () => {
    const name = Symbol("ProviderMock");
    const provider = new ProviderMock(name);
    const provideSpy = jest.spyOn(provider, provider.provide.name as never);

    provider.provide();

    expect(provideSpy).toHaveBeenCalled();
  });

  it("should return the name propertie of the class", () => {
    const name = Symbol("ProviderMock");
    const provider = new ProviderMock(name);

    expect(provider.name).toBe(name);
  });
});
