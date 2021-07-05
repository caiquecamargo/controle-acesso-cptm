import { mount } from "@vue/test-utils";
import { LocationAsRelativeRaw } from "vue-router";
import router from "../../../../router/__mocks__/router.mock";
import { mockWindowVisualViewport } from "../../../../__mocks__/window.mock";
import TheButtonLinkInternal from "../TheButtonLinkInternal.vue";

describe("TheButtonLinkInternal component test", () => {
  it("should render the default component", async () => {
    mockWindowVisualViewport();

    router.push("/");
    await router.isReady();

    const to: LocationAsRelativeRaw = {
      name: "Home",
    };

    const active = "teste";
    const mobileActive = "teste";

    const wrapper = mount(TheButtonLinkInternal, {
      props: {
        to,
        active,
        mobileActive,
      },
      global: {
        plugins: [router],
      },
    });

    const result = wrapper.vm.activeClasses;

    expect(result.toString()).toBe("teste,teste");
    expect(wrapper.html()).toMatchSnapshot();
  });
});
