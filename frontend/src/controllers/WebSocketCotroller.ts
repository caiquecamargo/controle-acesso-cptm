import { User } from "../models/IUser";
import { WebSocketData } from "../models/IWebSocketData";
import Log from "./Log";

const WEBSOCKET_REQUEST_TIMEOUT = 35000;

export default class WebSocketController {
  private websocket: WebSocket | undefined;
  private _beforeEach: Function = () => {};
  private _afterEach: Function = () => {};
  private _send: Function = () => {};

  constructor(private url: string, private log: Log) {}

  beforeEach(callback: Function) {
    this._beforeEach = () => {
      callback();
    };
  }

  afterEach(callback: Function) {
    this._afterEach = () => {
      callback();
    };
  }

  private onopen() {
    this._send();
  }

  private onmessage(event: MessageEvent<string>) {
    if (event.data) {
      const message: WebSocketData = JSON.parse(event.data);

      if (message.error) {
        this.log.error(message.error);
      } else if (message.data) {
        const user = message.data as User;

        this.log.success(`Usuário ${user.name} criado com sucesso!`);
      } else {
        this.log.error("Algo inesperado aconteceu");
      }

      this._afterEach();
    }
  }

  private onerror() {
    this.log.error("Algo inesperado aconteceu");
    this._afterEach();
  }

  private onclose = (event: CloseEvent) => {
    console.log("Event closed", event);
  };

  private init() {
    if (this.websocket) {
      this.websocket.onopen = this.onopen.bind(this);
      this.websocket.onmessage = this.onmessage.bind(this);
      this.websocket.onerror = this.onerror;
      this.websocket.onclose = this.onclose;
    }
  }

  private setTimeout() {
    setTimeout(() => {
      this.websocket?.close();
      this._afterEach();

      if (!this.log.onSuccess.value)
        this.log.error("Tempo de espera para leitura estourado!");
    }, WEBSOCKET_REQUEST_TIMEOUT);
  }

  sendOnCreate(message: string) {
    this._send = () => {
      if (this.websocket?.readyState !== WebSocket.OPEN) return;

      this._beforeEach();
      this.log.info("Aguardando leitura do cartão...");
      this.websocket?.send(message);
      this.setTimeout();
    };
  }

  close() {
    this.websocket?.close();
  }

  createConnection() {
    this.log.info("Estabelecendo conexão...");
    this.websocket = new WebSocket(this.url);
    this.init();
  }
}
