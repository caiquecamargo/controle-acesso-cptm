import { Provider } from "../../controllers/Provider";

export class ProviderMock extends Provider {
  constructor(name: symbol) {
    super(name);
  }
}
