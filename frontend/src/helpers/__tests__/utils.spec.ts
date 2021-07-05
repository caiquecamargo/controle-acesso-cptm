import { elementObserverKey } from "../../components/shared/container/controller/elementObserver";
import {
  getElement,
  getGridColumnsQty,
  injectStrict,
  isMobile,
  isOdd,
  madeOddArray,
  numberToReal,
  onClickOutside,
} from "../../helpers/utils";
import { toBeStringEqual } from "../../__mocks__/customWhitespaceMatcher";
import { createElementMock } from "../../__mocks__/element.mock";

expect.extend({ toBeStringEqual });

describe("Utils suit test", () => {
  it("given a number 234.23 returns this formatted in BRL R$ 234,23.", () => {
    const number = 234.23;
    const numberInBRL = numberToReal(number);

    expect(numberInBRL).toBeStringEqual("R$ 234,23");
  });

  it("should return true if window.viewport.width < 800 otherwise false", () => {
    const mockedWindowTrue = { ...window };
    mockedWindowTrue.visualViewport = {
      ...mockedWindowTrue.visualViewport,
      width: 700,
    };

    const mockedWindowFalse = { ...window };
    mockedWindowFalse.visualViewport = {
      ...mockedWindowFalse.visualViewport,
      width: 1000,
    };

    const visualViewportSpy = jest
      .spyOn(global, "window", "get")
      .mockImplementationOnce(() => ({
        ...mockedWindowTrue,
      }))
      .mockImplementationOnce(() => ({
        ...mockedWindowFalse,
      }));

    expect(isMobile()).toBeTruthy();
    expect(isMobile()).toBeFalsy();
  });

  it("should return quantity of grid columns variyng with view width.", () => {
    const mockedWindowOne = { ...window };
    mockedWindowOne.visualViewport = {
      ...mockedWindowOne.visualViewport,
      width: 700,
    };

    const mockedWindowTwo = { ...window };
    mockedWindowTwo.visualViewport = {
      ...mockedWindowTwo.visualViewport,
      width: 900,
    };

    const mockedWindowThree = { ...window };
    mockedWindowThree.visualViewport = {
      ...mockedWindowThree.visualViewport,
      width: 1100,
    };

    const mockedWindowFour = { ...window };
    mockedWindowFour.visualViewport = {
      ...mockedWindowFour.visualViewport,
      width: 1300,
    };

    const visualViewportSpy = jest
      .spyOn(global, "window", "get")
      .mockImplementationOnce(() => ({
        ...mockedWindowOne,
      }))
      .mockImplementationOnce(() => ({
        ...mockedWindowTwo,
      }))
      .mockImplementationOnce(() => ({
        ...mockedWindowThree,
      }))
      .mockImplementationOnce(() => ({
        ...mockedWindowFour,
      }));

    expect(getGridColumnsQty()).toBe(1);
    expect(getGridColumnsQty()).toBe(2);
    expect(getGridColumnsQty()).toBe(3);
    expect(getGridColumnsQty()).toBe(4);
  });

  it("should return false if the trigger is the self or his child otherwise true", () => {
    let target = document.createElement("div");
    const self = document.createElement("div");
    const selfChild = document.createElement("div");
    self.appendChild(selfChild);

    expect(onClickOutside(target, self)).toBeTruthy();

    target = self;
    expect(onClickOutside(target, self)).toBeFalsy();

    target = selfChild;
    expect(onClickOutside(target, self)).toBeFalsy();
  });

  it("should return true if the number is odd.", () => {
    expect(isOdd(2)).toBeFalsy();
    expect(isOdd(4)).toBeFalsy();
    expect(isOdd(1)).toBeTruthy();
    expect(isOdd(3)).toBeTruthy();
  });

  it("should return an odd Array.", () => {
    const arr = [1, 2, 3];

    let odd = isOdd(madeOddArray(arr).length);
    expect(arr.length).toBe(3);
    expect(odd).toBeTruthy();

    arr.push(4);
    odd = isOdd(madeOddArray(arr).length);
    expect(arr.length).toBe(4);
    expect(odd).toBeTruthy();
  });

  it("should return an element if element exists, throws if not.", () => {
    const element = createElementMock();

    expect(getElement(element)).toBe(element);
    expect(() => getElement(undefined)).toThrow();
  });

  it("should return an object if the injection key exists.", () => {
    expect(() => injectStrict(elementObserverKey)).toThrow();
  });
});
