import { mount } from "@vue/test-utils";
import TheImageBackground from "../TheImageBackground.vue";
import { srcsetMock } from "../__mocks__/srcset.mock";

describe("TheImageBackground test suit", () => {
  it("renders the component with src prop", () => {
    const wrapper = mount(TheImageBackground, {
      props: {
        src: "https:/localhost/test",
        alt: "image",
      },
      shallow: true,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders the component with src prop", () => {
    const srcset = srcsetMock;

    const wrapper = mount(TheImageBackground, {
      props: {
        srcset,
        alt: "image",
      },
      shallow: true,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
