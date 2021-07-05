import { mount } from "@vue/test-utils";
import FormDefault from "../FormDefault.vue";

describe("FormDefault component test", () => {
  it("should render the default component.", () => {
    const wrapper = mount(FormDefault, {
      slots: {
        default: "<div> TEST </div>",
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
