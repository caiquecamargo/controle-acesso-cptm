enum errors {
  NOT_AUTHORIZED = "Usuário não autorizado a realizar essa operação.",
  SERVER_COMMUNICATION = "Erro ao comunicar com servidor.",
  OPERATION_ERROR = "Erro ao realizar operação.",
}

export default errors;

interface CODE {
  code?: string,
}

interface ERROR {
  extensions?: CODE,
}

export function forbidenError(errors: ERROR[] | undefined): boolean {
  if (errors?.shift()?.extensions?.code === "forbidden") return true;

  return false;
}