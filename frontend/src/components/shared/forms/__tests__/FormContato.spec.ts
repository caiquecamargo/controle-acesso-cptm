import { flushPromises, mount } from "@vue/test-utils";
import {
  mockFetch,
  mockFetchRejected,
} from "../../../../__mocks__/global.mock";
import { mockWindowAlert } from "../../../../__mocks__/window.mock";
import FormContato from "../FormContato.vue";

describe("FormContato component test", () => {
  it("should render the default component.", () => {
    const wrapper = mount(FormContato);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should send the form when click the button submit.", async () => {
    mockWindowAlert();
    mockFetch();

    const wrapper = mount(FormContato);

    const windowAlertSpy = jest.spyOn(window, "alert");

    await wrapper.find("button").trigger("click.prevent");
    await flushPromises();

    expect(windowAlertSpy).toHaveBeenCalledWith(
      "Formulário enviado com sucesso!"
    );
  });

  it("should error if the fetch fails.", async () => {
    mockWindowAlert();
    mockFetchRejected();

    const wrapper = mount(FormContato);

    const windowAlertSpy = jest.spyOn(window, "alert");

    await wrapper.find("button").trigger("click.prevent");
    await flushPromises();

    expect(windowAlertSpy).toHaveBeenCalledWith("Erro ao enviar formulário!");
  });
});
