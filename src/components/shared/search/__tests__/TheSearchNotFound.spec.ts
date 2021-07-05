import { mount } from "@vue/test-utils";
import TheSearchNotFound from "../TheSearchNotFound.vue";

describe("TheSearchNotFound component test.", () => {
  it("should render the default component.", () => {
    const wrapper = mount(TheSearchNotFound);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
