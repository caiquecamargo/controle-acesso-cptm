import { defineStore } from "pinia";

const asideMenuId = "aside-menu";

export const useAsideMenu = defineStore(asideMenuId, {
  state: () => ({
    state: false,
  }),
  getters: {
    isOpen: (state) => state.state,
  },
  actions: {
    toggle() {
      this.state = !this.state;
    },
    open() {
      this.state = true;
    },
    close() {
      this.state = false;
    },
  },
});
