import { mount } from "@vue/test-utils";
import TheContainerGridTwo from "../TheContainerGridTwo.vue";

describe("TheContainerGridTwo component test", () => {
  it("should render the default component", async () => {
    const wrapper = mount(TheContainerGridTwo, {
      shallow: true,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
