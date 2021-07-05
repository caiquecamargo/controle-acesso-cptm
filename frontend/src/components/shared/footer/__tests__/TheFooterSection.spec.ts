import { mount } from "@vue/test-utils";
import TheFooterSection from "../TheFooterSection.vue";

describe("TheFooterSection component test", () => {
  it("should render the default component", () => {
    const wrapper = mount(TheFooterSection, {
      slots: {
        default: "<div> SLOT </div>",
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
