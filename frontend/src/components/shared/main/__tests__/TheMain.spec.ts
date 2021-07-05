import { mount } from "@vue/test-utils";
import TheMain from "../TheMain.vue";

describe("TheMain component test", () => {
  it("should render the default component.", () => {
    const wrapper = mount(TheMain, {
      shallow: true,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
