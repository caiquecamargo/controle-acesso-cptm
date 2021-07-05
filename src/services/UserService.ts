import { Api, ApiRequestParameters } from ".";
import { User } from "../models/IUser";

const ENDPOINT = "/user";

enum RequestType {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

interface RequestOptions {
  pathParam?: string;
  parameters?: string;
  timeout?: number;
}

export class UserService {
  private static async makeRequest(
    requestType: RequestType,
    options?: RequestOptions
  ) {
    try {
      const params: ApiRequestParameters = {
        endpoint: ENDPOINT,
        parameters: options?.parameters,
        pathParam: options?.pathParam,
        timeout: options?.timeout,
      };

      const response = await Api[requestType](params);

      return response.data;
    } catch (error) {
      console.error("Error: " + error);

      return [];
    }
  }

  static async findAll(): Promise<User[]> {
    return UserService.makeRequest(RequestType.GET);
  }

  static async findByName(name: string): Promise<User[]> {
    return UserService.makeRequest(RequestType.GET, {
      parameters: `name=${name}`,
    });
  }

  static async findById(id: string): Promise<User> {
    return UserService.makeRequest(RequestType.GET, {
      pathParam: id,
    });
  }

  static async update(user: User): Promise<User> {
    return UserService.makeRequest(RequestType.PUT, {
      parameters: `name=${user.name}`,
      pathParam: user.cardId,
    });
  }

  static async delete(id: string): Promise<string> {
    return UserService.makeRequest(RequestType.DELETE, {
      pathParam: id,
    });
  }
}
