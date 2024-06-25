import { PermissionsType } from "../constants/accessctrl";
import { UserPayload } from "../types";

export function generateSlug(input: string): string {
  return input
    .toLowerCase() // Convert to lowercase
    .trim() // Trim leading and trailing whitespace
    .replace(/[^\w\s-]/g, "") // Remove all non-word characters (alphanumeric and underscore)
    .replace(/[\s_-]+/g, "-") // Replace spaces, underscores, and multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
}

export function isValidUUID(uuid: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

export function GetPublicUrl(uri: string) {
  if (!uri) return "";
  const asset_prefix =
    process.env.PUBLIC_ASSET_PREFIX || "https://cdn.safetrade.cloud";
  return `${asset_prefix}/${uri}`;
}

export const hasPermission = (
  user: UserPayload | null,
  permission: PermissionsType
): boolean => {
  if (!user) return false;
  return user.permissions.includes(permission);
};

export function areSetsEqual<T>(setA: Set<T>, setB: Set<T>): boolean {
  try {
    if (setA.size !== setB.size) {
      return false;
    }

    let isEqual = true;
    setA.forEach((elem) => {
      if (!setB.has(elem)) {
        isEqual = false;
      }
    });

    return isEqual;
  } catch (err) {
    return false;
  }
}

export enum DateFormat {
  DD_MM_YYYY_HH_MM_AMPM = "dd-MM-yyyy hh:mm aa",
  DD_MON_YYYY_HH_MM_AMPM = "dd MMM, yyyy hh:mm aa",
  D_MONTH_YY_H_M_S_AMPM = "d MMMM, yy H:m:s aa",
  YYYY_MM_DD_HH_MM_SS = "yyyy-MM-dd HH:mm:ss",
  MM_DD_YYYY_HH_MM_SS = "MM/dd/yyyy HH:mm:ss",
  FULL_DATE_TIME = "MMMM dd, yyyy HH:mm:ss",
  SHORT_DATE = "MMM dd, yy",
  TIME_24_HR = "HH:mm:ss",
  TIME_12_HR = "hh:mm:ss aa",
}
