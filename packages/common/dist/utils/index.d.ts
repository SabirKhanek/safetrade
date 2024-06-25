import { PermissionsType } from "../constants/accessctrl";
import { UserPayload } from "../types";
export declare function generateSlug(input: string): string;
export declare function isValidUUID(uuid: string): boolean;
export declare function GetPublicUrl(uri: string): string;
export declare const hasPermission: (user: UserPayload | null, permission: PermissionsType) => boolean;
export declare function areSetsEqual<T>(setA: Set<T>, setB: Set<T>): boolean;
export declare enum DateFormat {
    DD_MM_YYYY_HH_MM_AMPM = "dd-MM-yyyy hh:mm aa",
    DD_MON_YYYY_HH_MM_AMPM = "dd MMM, yyyy hh:mm aa",
    D_MONTH_YY_H_M_S_AMPM = "d MMMM, yy H:m:s aa",
    YYYY_MM_DD_HH_MM_SS = "yyyy-MM-dd HH:mm:ss",
    MM_DD_YYYY_HH_MM_SS = "MM/dd/yyyy HH:mm:ss",
    FULL_DATE_TIME = "MMMM dd, yyyy HH:mm:ss",
    SHORT_DATE = "MMM dd, yy",
    TIME_24_HR = "HH:mm:ss",
    TIME_12_HR = "hh:mm:ss aa"
}
