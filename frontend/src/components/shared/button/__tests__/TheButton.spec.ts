import { mount } from "@vue/test-utils";
import TheButton from "../TheButton.vue";

describe("TheButton.vue", () => {
  it("render a TheButton component with the passed ButtonLabel prop.", () => {
    const wrapper = mount(TheButton, {
      slots: {
        default: "Submit",
      },
    });

    const buttonLabel = wrapper.get("button").text();

    expect(buttonLabel).toBe("Submit");
    expect(wrapper.html()).toMatchSnapshot();
  });
});
