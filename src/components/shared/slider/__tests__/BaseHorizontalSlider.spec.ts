import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { optimizedResizeEvent } from "../../../../helpers/optimizedResizeEvent";
import { mockTouchEvent } from "../../../../__mocks__/event.mock";
import BaseHorizontalSlider from "../BaseHorizontalSlider.vue";

describe("BaseHorizontalSlider component test", () => {
  it("should swap position when touch the screen.", async () => {
    const wrapper = mount(BaseHorizontalSlider, {
      props: {
        resizeEvent: optimizedResizeEvent,
        visibleElements: 1,
      },
      slots: {
        default:
          "<div style='width: 100px' class='test'>Test</div><div style='width: 100px'>Test</div><div style='width: 100px'>Test</div><div style='width: 100px'>Test</div><div style='width: 100px'>Test</div>",
      },
    });

    expect(wrapper.html()).toMatchSnapshot();

    const divElement = wrapper.find("div").element;
    const element = divElement.querySelector(".test") as HTMLElement;
    expect(element?.parentElement?.style.opacity).toBe("1");

    wrapper.vm.onTouchStart(mockTouchEvent(0));
    await nextTick();
    wrapper.vm.onTouchEnd(mockTouchEvent(100));
    await nextTick();

    expect(element?.parentElement?.style.opacity).toBe("1");

    wrapper.vm.onTouchStart(mockTouchEvent(100));
    await nextTick();
    wrapper.vm.onTouchEnd(mockTouchEvent(0));
    await nextTick();

    expect(divElement.querySelector("span")?.style.opacity).toBe("1");
  });

  it("should swap position when click the controller.", async () => {
    const wrapper = mount(BaseHorizontalSlider, {
      slots: {
        default: "<div>Test</div>",
      },
    });

    const divElement = wrapper.find("div").element;
    expect(divElement.querySelector("span")?.style.opacity).toBe("1");

    wrapper.vm.turn("right");
    await nextTick();

    expect(divElement.querySelector("span")?.style.opacity).toBe("0");
  });

  it("should disable controllers when visibleElements equals items length.", async () => {
    const wrapper = mount(BaseHorizontalSlider, {
      slots: {
        default: "<div>TEST</div>",
      },
      props: {
        visibleElements: 1,
      },
    });

    expect(wrapper.vm.enableControllers).toBeFalsy();

    const divElement = wrapper.find("div").element;
    expect(divElement.querySelector("span")?.style.opacity).toBe("1");

    wrapper.vm.onTouchStart(mockTouchEvent(0));
    await nextTick();
    wrapper.vm.onTouchEnd(mockTouchEvent(100));
    await nextTick();

    expect(divElement.querySelector("span")?.style.opacity).toBe("1");
  });
});
