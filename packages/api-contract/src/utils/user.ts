import { z } from "zod";

export const UserShortInfo = z.object({
  avatar: z.string(),
  first_name: z.string().min(1),
  last_name: z.string(),
  email: z.string().min(1),
  user_uid: z.string(),
});
