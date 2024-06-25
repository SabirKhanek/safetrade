import { initClient } from "@ts-rest/core";
import { initQueryClient } from "@ts-rest/react-query";
import { contract } from "api-contract";

export const apiQueryClient = initQueryClient(contract, {
  baseHeaders: {},
  baseUrl: "",
});

export const apiClient = initClient(contract, {
  baseHeaders: {},
  baseUrl: "",
  credentials: "include",
});
