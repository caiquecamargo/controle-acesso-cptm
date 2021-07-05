import { mount } from "@vue/test-utils";
import TheFooterHeader from "../TheFooterHeader.vue";

describe("TheFooterHeader component test", () => {
  it("should render the default component", () => {
    const wrapper = mount(TheFooterHeader, {
      props: {
        title: "TITLE",
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
