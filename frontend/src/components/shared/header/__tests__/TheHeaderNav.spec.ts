import { mount } from "@vue/test-utils";
import TheHeaderNav from "../TheHeaderNav.vue";

describe("TheHeaderNav component test", () => {
  it("should render the default component", () => {
    const wrapper = mount(TheHeaderNav, {
      shallow: true,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
