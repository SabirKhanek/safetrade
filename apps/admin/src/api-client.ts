import { initQueryClient } from "@ts-rest/react-query";
import { contract } from "api-contract";

export const apiClient = initQueryClient(contract, {
  baseHeaders: {},
  baseUrl: "",
});

