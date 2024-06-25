export type SignUpParams = {
  email: string;
  first_name: string;
  last_name: string;
  dob: Date;
  password: string;
  is_verified?: boolean;
};
