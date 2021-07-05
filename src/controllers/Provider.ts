import { InjectionKey, provide } from "@vue/runtime-core";

export abstract class Provider {
  protected _name: InjectionKey<this>;

  constructor(name: Symbol) {
    this._name = name;
  }

  provide() {
    provide(this._name, this);
  }

  get name() {
    return this._name;
  }
}