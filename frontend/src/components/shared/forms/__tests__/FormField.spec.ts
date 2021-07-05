import { mount } from "@vue/test-utils";
import { mockMathRandom } from "../../../../__mocks__/math.mock";
import FormField from "../FormField.vue";

describe("FormField component test", () => {
  it("should render the default component", async () => {
    const dataFromParent = "";

    mockMathRandom();

    const wrapper = mount(FormField, {
      props: {
        dataFromParent,
      },
      shallow: true,
    });

    const input = wrapper.find("input");
    await input.setValue("teste");

    const emits: Array<Array<unknown>> = wrapper.emitted(
      "update:data-from-parent"
    ) || [[]];

    expect(emits[0][0]).toBe("teste");
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should dataFromParent was ' ' and type.value = number then its parsed to '' and then to number", async () => {
    const dataFromParent = " ";

    const wrapper = mount(FormField, {
      props: {
        dataFromParent,
        type: "number",
        labelName: "teste",
      },
      shallow: true,
    });

    const input = wrapper.find("input");
    await input.setValue(2);

    const emits: Array<Array<unknown>> = wrapper.emitted(
      "update:data-from-parent"
    ) || [[]];

    expect(emits[0][0]).toBe(2);
  });

  it("should dataFromParent change then watcher is triggered", async () => {
    const dataFromParent = "";

    const wrapper = mount(FormField, {
      props: {
        dataFromParent,
      },
      shallow: true,
    });

    await wrapper.setProps({ dataFromParent: "teste" });

    interface VM {
      filled: boolean;
    }
    const vm = (wrapper.vm as unknown) as VM;
    let filled = vm.filled;

    expect(filled).toBe(true);

    await wrapper.setProps({ dataFromParent: "" });
    filled = vm.filled;

    expect(filled).toBe(false);

    await wrapper.setProps({ dataFromParent: "teste", type: "number" });
    filled = vm.filled;

    expect(filled).toBe(true);
  });
});
