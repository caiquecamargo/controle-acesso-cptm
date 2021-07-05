import { mount } from "@vue/test-utils";
import TheFooterDeveloperDescription from "../TheFooterDeveloperDescription.vue";

describe("TheFooterDeveloperDescription component test", () => {
  it("should render the default component", () => {
    const wrapper = mount(TheFooterDeveloperDescription);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
