import { shallowMount } from "@vue/test-utils";
import Comentarios from "@/components/Comentarios.vue";

describe("Comentarios.vue", () => {
  it("validate props.isLogged when passed", () => {
    const isLogged = true;
    const wrapper = shallowMount(Comentarios, {
      propsData: { isLogged },
    });
    expect(wrapper.text()).toMatch(isLogged);
  });
});
