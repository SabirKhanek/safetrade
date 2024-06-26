import { Cookies, UserAuthPayload } from "common";
import { cookies } from "next/headers";
import { validateToken } from "./jwt";
import { redirect } from "next/navigation";

export function AuthGuard(): UserAuthPayload {
  const cookie = cookies();
  const token = cookie.get(Cookies.UserAuthCookie)?.value;
  if (!token) {
    redirect("/login");
  }
  try {
    const payload = validateToken<UserAuthPayload>(token);
    return payload;
  } catch (err: any) {
    redirect("/login");
  }
}

export function AuthGuardNullable(returnsUndefined = false): UserAuthPayload {
  const cookie = cookies();
  const token = cookie.get(Cookies.UserAuthCookie)?.value;
  if (!token) {
    redirect("/login");
  }
  try {
    const payload = validateToken<UserAuthPayload>(token);
    return payload;
  } catch (err: any) {
    redirect("/login");
  }
}