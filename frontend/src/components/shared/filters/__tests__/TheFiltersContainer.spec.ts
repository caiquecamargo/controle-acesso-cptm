import { mount } from "@vue/test-utils";
import TheFiltersContainer from "../TheFiltersContainer.vue";

describe("TheFiltersContainer component test", () => {
  it("should render the default component", async () => {
    const wrapper = mount(TheFiltersContainer, {
      shallow: true,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
