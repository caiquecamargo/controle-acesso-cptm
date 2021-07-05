import { mount } from "@vue/test-utils";
import TheBannerContent from "../TheBannerContent.vue";

describe("TheBannerContent component test", () => {
  it("should render the default component", () => {
    const wrapper = mount(TheBannerContent);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
