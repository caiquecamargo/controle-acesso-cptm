import { mount } from "@vue/test-utils";
import {
  mockWindowIntersectionObserver,
  mockWindowVisualViewport,
} from "../../../../__mocks__/window.mock";
import TheContainerGridLoader from "../TheContainerGridLoader.vue";

describe("TheContainerGridLoader component test", () => {
  beforeEach(() => {
    mockWindowIntersectionObserver();
    mockWindowVisualViewport({ width: 1500 });
  });

  it("should render the default component", async () => {
    const wrapper = mount(TheContainerGridLoader, {
      shallow: true,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should call CalcDelay and this returns 0 to 0, 100 to 1 and 200 to 2", () => {
    const wrapper = mount(TheContainerGridLoader);

    const returnedValueZero = wrapper.vm.calcDelay(0);
    const returnedValueOne = wrapper.vm.calcDelay(1);
    const returnedValueTwo = wrapper.vm.calcDelay(2);

    expect(returnedValueZero).toBe(0);
    expect(returnedValueOne).toBe(100);
    expect(returnedValueTwo).toBe(200);
  });

  it("should emit 'loadMore' if loadMore function was called", () => {
    const wrapper = mount(TheContainerGridLoader);

    wrapper.vm.loadMore();

    expect(wrapper.emitted()).toHaveProperty("loadMore");
  });
});
