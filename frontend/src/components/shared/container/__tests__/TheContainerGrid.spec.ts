import { mount } from "@vue/test-utils";
import TheContainerGrid from "../TheContainerGrid.vue";

describe("TheContainerGrid component test", () => {
  it("should render the default component", async () => {
    const wrapper = mount(TheContainerGrid, {
      shallow: true,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
