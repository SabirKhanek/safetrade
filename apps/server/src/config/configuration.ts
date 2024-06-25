import { config } from 'dotenv';
import path from 'path';

config({ path: path.join(__dirname, '..', '..', '..', '..', '.env') });
// console.log(path.join(__dirname, '..', '..', '..', '..', '.env'));
// console.log({
//   port: parseInt(process.env.PORT, 10) || 3000,
//   email: {
//     user: process.env.SYSTEM_EMAIL,
//     pass: process.env.SYSTEM_EMAIL_PASSWORD,
//   },
//   development: process.env.NODE_ENV === 'development',
//   jwt: process.env.JWT_SECRET,
//   root_user: process.env.ROOT_USER,
// });
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  email: {
    user: process.env.SYSTEM_EMAIL,
    pass: process.env.SYSTEM_EMAIL_PASSWORD,
  },
  development: process.env.NODE_ENV === 'development',
  jwt: process.env.JWT_SECRET,
  root_uid: process.env.ROOT_USER_UID,
  root_user_group: process.env.ROOT_USER_GROUP,
  root_user: process.env.ROOT_USER,
  root_domain: process.env.ROOT_DOMAIN,
  host:
    process.env.ROOT_DOMAIN || process.env.NODE_ENV === 'development'
      ? 'localhost:3000'
      : 'safetrade.cloud',
  domain:
    process.env.ROOT_DOMAIN || process.env.NODE_ENV === 'development'
      ? 'localhost'
      : 'safetrade.cloud',
  api_ipgeo: process.env.API_IPGEO,
});
