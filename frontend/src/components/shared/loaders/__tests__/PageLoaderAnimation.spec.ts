import { flushPromises, mount } from "@vue/test-utils";
import { nextTick } from "vue";
import router from "../../../../router/__mocks__/router.mock";
import PageLoaderAnimation from "../PageLoaderAnimation.vue";

describe("PageLoaderAnimation test suit", () => {
  it("renders the default componenent", async () => {
    jest.useFakeTimers();
    router.push("/");
    await router.isReady();

    const beforeEachSpy = jest.spyOn(router, "beforeEach");

    const wrapper = mount(PageLoaderAnimation, {
      slots: {
        default: "<div> TESTE </div>",
      },
      global: {
        plugins: [router],
      },
    });

    router.push("/contato");
    await router.isReady();

    await nextTick();
    await flushPromises();
    jest.advanceTimersByTime(1500);

    expect(beforeEachSpy).toHaveBeenCalled();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should animation must be undefined if slot is not passed", async () => {
    jest.useFakeTimers();

    const wrapper = mount(PageLoaderAnimation, {
      global: {
        plugins: [router],
      },
    });

    await nextTick();
    await flushPromises();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
