import { mount } from "@vue/test-utils";
import TheFooterContainer from "../TheFooterContainer.vue";

describe("TheFooterContainer component test", () => {
  it("should render the default component", () => {
    const wrapper = mount(TheFooterContainer, {
      slots: {
        default: "<div> SLOT </div>",
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
