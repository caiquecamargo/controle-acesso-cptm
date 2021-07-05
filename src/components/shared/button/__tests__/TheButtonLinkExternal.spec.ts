import { mount } from "@vue/test-utils";
import TheButtonLinkExternal from "../TheButtonLinkExternal.vue";

describe("TheButtonLinkExternal component test", () => {
  it("should render the default component", () => {
    const href = "https://test.com";
    const wrapper = mount(TheButtonLinkExternal, {
      props: {
        href,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
