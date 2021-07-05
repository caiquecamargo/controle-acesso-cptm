import { flushPromises, mount } from "@vue/test-utils";
import router from "../../../../router/__mocks__/router.mock";
import { mockWindowVisualViewport } from "../../../../__mocks__/window.mock";
import TheHeaderNavMobile from "../TheHeaderNavMobile.vue";

describe("TheHeaderNavMobile component test", () => {
  it("should render the default component", async () => {
    router.push("/");
    await router.isReady();

    const wrapper = mount(TheHeaderNavMobile, {
      global: {
        stubs: {
          CHeaderNavMobile: true,
        },
        plugins: [router],
      },
    });

    const routerSpy = jest.spyOn(router, "push");
    const buttonSandwich = wrapper.vm.buttonSandwich;
    const navMenu = wrapper.vm.navMenu;

    if (buttonSandwich && navMenu) {
      const navMenuCloseSpy = jest.spyOn(navMenu.animationController, "close");
      const navMenuSwapSpy = jest.spyOn(navMenu.animationController, "swap");
      const buttonSandwichCloseSpy = jest.spyOn(
        buttonSandwich.animationController,
        "close"
      );
      const buttonSandwichSwapSpy = jest.spyOn(
        buttonSandwich.animationController,
        "swap"
      );

      router.push("/contato");
      await router.isReady();
      await wrapper.find(".cursor-pointer").trigger("click.prevent");
      await flushPromises();

      expect(navMenuSwapSpy).toHaveBeenCalled();
      expect(navMenuCloseSpy).toHaveBeenCalled();
      expect(buttonSandwichSwapSpy).toHaveBeenCalled();
      expect(buttonSandwichCloseSpy).toHaveBeenCalled();
    }

    expect(wrapper.html()).toMatchSnapshot();
    expect(routerSpy).toHaveBeenCalled();
  });

  it("should render the default component without refs defined.", async () => {
    mockWindowVisualViewport();

    router.push("/");
    await router.isReady();

    const wrapper = mount(TheHeaderNavMobile, {
      global: {
        plugins: [router],
      },
    });

    const buttonSandwich = wrapper.vm.buttonSandwich;
    const navMenu = wrapper.vm.navMenu;

    if (buttonSandwich && navMenu) {
      const navMenuCloseSpy = jest.spyOn(navMenu.animationController, "close");
      const navMenuSwapSpy = jest.spyOn(navMenu.animationController, "swap");
      const buttonSandwichCloseSpy = jest.spyOn(
        buttonSandwich.animationController,
        "close"
      );
      const buttonSandwichSwapSpy = jest.spyOn(
        buttonSandwich.animationController,
        "swap"
      );

      wrapper.vm.navMenu = undefined;
      wrapper.vm.buttonSandwich = undefined;

      wrapper.vm.close();
      wrapper.vm.swapState();

      expect(navMenuSwapSpy).not.toHaveBeenCalled();
      expect(navMenuCloseSpy).not.toHaveBeenCalled();
      expect(buttonSandwichSwapSpy).not.toHaveBeenCalled();
      expect(buttonSandwichCloseSpy).not.toHaveBeenCalled();
    }

    expect(wrapper.html()).toMatchSnapshot();
  });
});
