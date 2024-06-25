import { PermissionsType } from "../constants/accessctrl";
export interface OtpPayload {
    otp_id: string;
    email: string;
    iat: number;
    exp: number;
}
export interface AuthPayload {
    email: string;
    user_uid: string;
    session_id: string;
    user: {
        first_name: string;
        last_name: string;
        joined_at: Date;
    };
    iat: number;
    exp: number;
}
export declare enum UserAuthChallenge {
    TwoFactorOtp = "2fa-otp",
    TwoFactorAuthenticator = "2fa-authenticator",
    Verification = "email-verification"
}
export interface UserAuthPayload extends AuthPayload {
    challenge?: {
        type: UserAuthChallenge;
        verified: boolean;
    };
    deferred?: boolean;
    user: AuthPayload["user"] & {
        joined_at: Date;
        kyc_level: number;
    };
    display_name?: string;
}
export interface SystemAuthPayload extends AuthPayload {
    user: AuthPayload["user"] & {
        role?: string;
    };
    permissions?: PermissionsType[];
}
