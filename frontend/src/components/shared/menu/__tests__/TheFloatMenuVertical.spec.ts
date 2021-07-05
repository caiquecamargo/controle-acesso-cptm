import { mount } from "@vue/test-utils";
import { AnimationController } from "../../../../controllers/AnimationController";
import { mockEvent } from "../../../../__mocks__/event.mock";
import { mockWindowVisualViewport } from "../../../../__mocks__/window.mock";
import { AnimeMenu } from "../controllers/AnimeMenu";
import TheFloatMenuVertical from "../TheFloatMenuVertical.vue";

describe("TheFloatMenuVertical component test", () => {
  beforeEach(() => {
    mockWindowVisualViewport();
  });

  it("should render the component default state", async () => {
    const wrapper = mount(TheFloatMenuVertical, {
      slots: {
        default: "<div> DEFAULT </div>",
      },
    });

    expect(wrapper.html()).toMatchSnapshot();

    const closeOnClickOutside: (event: Event) => void =
      wrapper.vm.closeOnClickOutside;

    const outside = document.createElement("div");
    const inside = wrapper.vm.navMenu;
    let event = mockEvent(inside);

    closeOnClickOutside(event);
    expect(wrapper.emitted()).not.toHaveProperty("click-outside");

    closeOnClickOutside(event);
    expect(wrapper.emitted()).not.toHaveProperty("click-outside");

    event = mockEvent(outside);
    closeOnClickOutside(event);
    expect(wrapper.emitted()).toHaveProperty("click-outside");

    const animationController = wrapper.vm
      .animationController as AnimationController<AnimeMenu>;
    await animationController.swap();
    await animationController.swap();
  });
});
