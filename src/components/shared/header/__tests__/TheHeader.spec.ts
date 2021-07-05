import { mount } from "@vue/test-utils";
import router from "../../../../router/__mocks__/router.mock";
import {
  mockWindowIntersectionObserver,
  mockWindowVisualViewport,
} from "../../../../__mocks__/window.mock";
import {
  HeaderObserver,
  HeaderObserverKey,
} from "../controllers/HeaderObserver";
import TheHeader from "../TheHeader.vue";

describe("TheHeader suit test", () => {
  let headerObserver: HeaderObserver;

  beforeEach(() => {
    mockWindowIntersectionObserver();
    mockWindowVisualViewport();

    headerObserver = new HeaderObserver();
  });

  it("should render the component with this default state", async () => {
    router.push("/contato");
    await router.isReady();

    const wrapper = mount(TheHeader, {
      global: {
        stubs: {
          TheHeaderNav: true,
          TheHeaderNavMobile: true,
          TheHeaderLogo: true,
        },
        provide: {
          [HeaderObserverKey as symbol]: headerObserver,
        },
        plugins: [router],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
