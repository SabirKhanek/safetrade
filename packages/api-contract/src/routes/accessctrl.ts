import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { commonZodResponse } from "../utils/common";
import { Groups, Permissions } from "common";
extendZodWithOpenApi(z);

const c = initContract();

export const accessCtrl = c.router(
  {
    getGroupsPermission: {
      path: "/group/permissions",
      query: z.object({ groupName: z.string().optional() }),
      method: "GET",
      responses: {
        200: z.object({
          ...commonZodResponse,
          groups: z.array(
            z.object({
              group_name: z.nativeEnum(Groups),
              permissions: z.array(z.nativeEnum(Permissions)),
            })
          ),
        }),
      },
    },
    updatePermissionsInGroup: {
      path: "/group/permissions",
      method: "PUT",
      responses: { 200: z.object({ ...commonZodResponse }) },
      body: z.object({
        permissions: z
          .array(z.nativeEnum(Permissions))
          .min(1, "At least 1 permission should be given"),
        group: z.string().min(1),
      }),
    },
    getUsersPermissions: {
      path: "/user/permissions",
      method: "GET",
      query: z.object({ user_name_or_email: z.string() }),
      responses: {
        200: z.object({
          ...commonZodResponse,
          users: z.array(
            z.object({
              user_email: z.string().email().min(1),
              user_f_name: z.string().min(1),
              permissions: z.array(z.nativeEnum(Permissions)),
            })
          ),
        }),
      },
    },
    updateUserPermissions: {
      path: "/user/permissions",
      method: "PUT",
      responses: { 200: z.object({ ...commonZodResponse }) },
      body: z.object({
        permissions: z
          .array(z.nativeEnum(Permissions))
          .min(1, "At least 1 permission should be given"),
        user_uid: z.string().min(1),
      }),
    },
  },
  { pathPrefix: "/accessctrl" }
);
