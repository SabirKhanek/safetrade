import { SearchParamsNames } from "../constants/param";
import { SearchParamType } from "../types/misc";
export enum LoginFlows {
  EMAIL = "email",
}

export const extractStrategyFromSearchParam = (params: SearchParamType) => {
  const param = params[SearchParamsNames.LoginStrategy] as LoginFlows;
  if (!param) return;
  if (Object.values(LoginFlows).includes(param)) return param;
};
