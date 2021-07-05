import { mount } from "@vue/test-utils";
import TheFooter from "../TheFooter.vue";

describe("TheFooter test suit", () => {
  it("should render the default component", async () => {
    const wrapper = mount(TheFooter, {
      shallow: true,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
