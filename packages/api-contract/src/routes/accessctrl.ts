import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { commonZodResponse } from "../utils/common";
extendZodWithOpenApi(z);

const c = initContract();

export const accessCtrl = c.router(
  {
    getGroupsPermission: {
      path: "/group/permissions",
      query: z.object({ groupName: z.string() }),
      method: "GET",
      responses: {
        200: z.object({ ...commonZodResponse }),
      },
    },
    updatePermissionsInGroup: {
      path: "/group/permissions",
      method: "PUT",
      responses: { 200: z.object({ ...commonZodResponse }) },
      body: z.object({
        permissions: z
          .array(z.string().min(1))
          .min(1, "At least 1 permission should be given"),
        group: z.string().min(1),
      }),
    },
    getUsersPermissions: {
      path: "/user/permissions",
      method: "GET",
      query: z.object({ user_name_or_email: z.string() }),
      responses: { 200: z.object({ ...commonZodResponse }) },
    },
    addUsersToGroup: {
      path: "/group/addusers",
      method: "POST",
      body: z.object({
        users: z.array(z.string().email().min(1)),
        group: z.string().min(1),
      }),
      responses: { 200: z.object({ ...commonZodResponse }) },
    },
  },
  { pathPrefix: "/accessctrl" }
);
