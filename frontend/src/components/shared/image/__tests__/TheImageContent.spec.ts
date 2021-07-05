import { mount } from "@vue/test-utils";
import TheImageContent from "../TheImageContent.vue";

describe("TheImageContent test suit", () => {
  it("renders the component with the props passed", () => {
    const wrapper = mount(TheImageContent, {
      props: {
        src: "https:/localhost/test",
        description: "image",
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
