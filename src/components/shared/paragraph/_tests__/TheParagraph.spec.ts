import { mount } from "@vue/test-utils";
import TheParagraph from "../TheParagraph.vue";

describe("TheParagraph test suit", () => {
  it("should render the Paragraph if has first and second parameters", () => {
    const wrapper = mount(TheParagraph, {
      slots: {
        first: "<div> FIRST </div>",
        second: "<div> SECOND </div>",
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render only the first element if hasSecond equals to false", () => {
    const wrapper = mount(TheParagraph, {
      slots: {
        first: "<div> FIRST </div>",
        second: "<div> SECOND </div>",
      },
      props: {
        hasSecond: false,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render only the second element if hasFirst equals to false", () => {
    const wrapper = mount(TheParagraph, {
      slots: {
        first: "<div> FIRST </div>",
        second: "<div> SECOND </div>",
      },
      props: {
        hasFirst: false,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render first element with major class if the major setted to First", () => {
    const wrapper = mount(TheParagraph, {
      slots: {
        first: "<div> FIRST </div>",
        second: "<div> SECOND </div>",
      },
      props: {
        major: "First",
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
