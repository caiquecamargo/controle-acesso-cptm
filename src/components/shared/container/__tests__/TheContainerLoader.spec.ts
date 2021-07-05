import { mount } from "@vue/test-utils";
import { mockWindowIntersectionObserver } from "../../../../__mocks__/window.mock";
import {
  ElementObserver,
  elementObserverKey,
} from "../controller/elementObserver";
import TheContainerLoader from "../TheContainerLoader.vue";

describe("TheContainerLoader component test", () => {
  it("should render the default component", async () => {
    mockWindowIntersectionObserver();
    const elementObserver = new ElementObserver();

    const wrapper = mount(TheContainerLoader, {
      shallow: true,
      global: {
        provide: {
          [elementObserverKey as symbol]: elementObserver,
        },
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
