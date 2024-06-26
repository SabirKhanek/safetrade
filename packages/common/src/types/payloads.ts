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
export enum UserAuthChallenge {
  TwoFactorOtp = "2fa-otp",
  TwoFactorAuthenticator = "2fa-authenticator",
  Verification = "email-verification",
}
export interface UserAuthPayload extends AuthPayload {
  challenge?: { type: UserAuthChallenge; verified: boolean };
  deferred?: boolean;
  user: AuthPayload["user"] & { joined_at: Date; kyc_level: number };
  display_name?: string;
}
export interface SystemAuthPayload extends AuthPayload {
  user: AuthPayload["user"] & {
    role?: string;
  };
  permissions?: PermissionsType[];
}
export interface UserPayload {
  uid: string;
  email: string;
  first_name: string;
  avatar: string | null;
  last_name: string;
  role_group: string;
  created_at: string;
  updated_at: string;
  audit_trail_logs: string;
  permissions: PermissionsType[];
  authState: SystemAuthPayload;
}

export interface PublicUserPayload {
  uid: string;
  email: string;
  first_name: string;
  avatar: string | null;
  last_name: string;
  display_name?: string;
  slug?: string;
  total_ratings?: string;
  created_at: string;
  updated_at: string;
  authState: UserAuthPayload;
}
