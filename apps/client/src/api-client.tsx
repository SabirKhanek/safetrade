import { InitClientArgs, initClient } from "@ts-rest/core";
import { contract } from "api-contract";

export const apiClientConfig: InitClientArgs = {
  baseHeaders: {},
  baseUrl: process.env.NODE_ENV ==="development" ? "http://localhost:3000": "https://api.safetrade.cloud",
};

export const apiClient = initClient(contract, apiClientConfig);
