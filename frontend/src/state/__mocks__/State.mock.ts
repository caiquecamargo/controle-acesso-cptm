import { State } from "../State";

export interface IStateMock extends Record<string, unknown> {
  name: string;
}

export class StateMock extends State<IStateMock> {
  constructor() {
    super(Symbol(StateMock.name));
  }

  protected data(): IStateMock {
    return {
      name: StateMock.name,
    };
  }
}
