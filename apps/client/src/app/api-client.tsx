import { InitClientArgs, initClient } from "@ts-rest/core";
import { contract } from "api-contract";

export const apiClientConfig: InitClientArgs = {
  baseHeaders: {},
  baseUrl: "http://localhost:3000",
};

export const apiClientServer = initClient(contract, apiClientConfig);
