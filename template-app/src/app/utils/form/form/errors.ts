export enum ErrorNames {
  NotFromList = "not-from-list",
  Required = "required",
  Min = "min",
  Email = "email"
}

export const ErrorHelpers = {
  [ErrorNames.NotFromList]: "Selecione uma opção da lista",
  [ErrorNames.Min]: ({ min }: { min: number }) => `Valor mínimo: ${min}`,
  [ErrorNames.Required]: "Obrigatório",
  [ErrorNames.Email]: "Email Inválido",
};