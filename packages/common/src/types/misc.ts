import { UserAuthChallenge } from "./payloads";

export interface SessionAdditional {
  ip: {
    country_name: string;
    country_flag: string;
    state_prov: string;
    city: string;
    district: string;
    time_zone: {
      current_time: string;
      name: string;
      offset: number;
    };
  };
  ua: {
    browser: string;
    os: string;
  };
  deferred?: boolean;
  challenge?: { type: UserAuthChallenge; isCompleted?: boolean };
}

export interface UserPreferences {
  twofactor?: {
    enabled: boolean;
    methods: {
      type: UserAuthChallenge;
      mfasecret?: string;
      added_on?: string;
    }[];
  };
}
