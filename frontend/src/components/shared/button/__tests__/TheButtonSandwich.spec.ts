import { mount } from "@vue/test-utils";
import TheButtonSandwich from "../TheButtonSandwich.vue";

describe("TheButtonSandwich component test", () => {
  it("should render the component default state", () => {
    const wrapper = mount(TheButtonSandwich);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
