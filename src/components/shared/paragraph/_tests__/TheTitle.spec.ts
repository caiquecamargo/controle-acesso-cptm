import { mount } from "@vue/test-utils";
import TheTitle from "../TheTitle.vue";

describe("TheTitle.vue", () => {
  it("render an h2 tag if a title prop is passed and an p tag if a subtitle prop is passed", () => {
    const wrapper = mount(TheTitle, {
      props: {
        title: "TheTitle",
        subtitle: "TheSubtitle",
      },
    });

    const title = wrapper.get("h2").text();
    const subtitle = wrapper.get("p").text();

    expect(title).toBe("TheTitle");
    expect(subtitle).toBe("TheSubtitle");
  });

  it("don't render neither the h2 tag neither p tag if no props is passed", () => {
    const wrapper = mount(TheTitle);

    expect(wrapper.find("h2").exists()).toBeFalsy();
    expect(wrapper.find("p").exists()).toBeFalsy();
  });
});
