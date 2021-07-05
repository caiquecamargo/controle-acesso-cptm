import { mount } from "@vue/test-utils";
import { ISrcset } from "../model/ISrcset";
import ThePicture from "../ThePicture.vue";

describe("ThePicture test suit", () => {
  it("render a picture tag if a srcset is passed, accordingly with your properties.", () => {
    const srcset: ISrcset = {
      minimal: "minimal",
      medium: "medium",
      large: "large",
      huge: "huge",
      default: "default",
    };
    const wrapper = mount(ThePicture, {
      props: {
        srcset: srcset,
      },
    });

    const srcsets = Array.from(
      wrapper.get("picture").element.childNodes as NodeListOf<HTMLSourceElement>
    ).map((element: HTMLSourceElement) => element.srcset || element.src);
    expect(srcsets.find((src) => srcset.minimal === src)).toBe(srcset.minimal);
    expect(srcsets.find((src) => srcset.medium === src)).toBe(srcset.medium);
    expect(srcsets.find((src) => srcset.large === src)).toBe(srcset.large);
    expect(srcsets.find((src) => srcset.huge === src)).toBe(srcset.huge);
    expect(
      srcsets
        .find(
          (src) =>
            srcset.default ===
            src
              .match(/([\/])([\w]+)$/g)
              ?.pop()
              ?.replace("/", "")
        )
        ?.match(/([\/])([\w]+)$/g)
        ?.pop()
        ?.replace("/", "")
    ).toBe(srcset.default);
  });

  it("don't render any srcset tag if de properties of srcset is null", () => {
    const srcset: ISrcset = {
      minimal: "",
      medium: "",
      large: "",
      huge: "",
      default: "",
    };
    const wrapper = mount(ThePicture, {
      props: {
        srcset: srcset,
      },
    });

    const srcsets = Array.from(
      wrapper.get("picture").element.childNodes
    ).filter((element) => element.textContent !== "v-if");
    expect(srcsets.length).toBe(0);
  });
});
