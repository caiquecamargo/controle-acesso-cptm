import { mount } from "@vue/test-utils";
import TheImageGallery from "../TheImageGallery.vue";

describe("TheImageGallery test suit", () => {
  it("renders the component with the props passed", async () => {
    const wrapper = mount(TheImageGallery, {
      props: {
        image: "https:/localhost/test",
        imageGallery: ["https:/localhost/test"],
        description: "image",
      },
      shallow: true,
    });

    await wrapper.vm.changeImage(0);
    const emitted: Array<Array<number>> = wrapper.emitted("change-image") || [
      [],
    ];

    expect(emitted[0][0]).toBe(0);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
