import { User } from "./IUser";

export interface WebSocketData {
  data?: User[] | User;
  error?: string;
}
