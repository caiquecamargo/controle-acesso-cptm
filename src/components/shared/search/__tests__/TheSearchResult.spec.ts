import { mount } from "@vue/test-utils";
import TheSearchResult from "../TheSearchResult.vue";

describe("TheSearchResult component test.", () => {
  it("should render the default component.", async () => {
    const wrapper = mount(TheSearchResult, {
      props: {
        search: "teste",
      },
    });

    const pElement = wrapper.find("p").element;

    expect(pElement.innerHTML).toContain("teste");
    expect(wrapper.html()).toMatchSnapshot();
  });
});
