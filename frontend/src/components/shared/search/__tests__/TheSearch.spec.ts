import { mount } from "@vue/test-utils";
import TheSearch from "../TheSearch.vue";

describe("TheSearch component test.", () => {
  it("should render the default component.", async () => {
    const wrapper = mount(TheSearch);

    expect(wrapper.emitted()).not.toContain("onSearch");

    await wrapper.find("input").setValue("test");

    const emitted: Array<Array<string>> = wrapper.emitted("onSearch") || [[]];
    expect(emitted[0][0]).toBe("test");

    expect(wrapper.html()).toMatchSnapshot();
  });
});
