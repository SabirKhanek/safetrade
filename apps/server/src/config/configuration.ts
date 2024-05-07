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
  root_user: process.env.ROOT_USER,
  host: process.env.ROOT_DOMAIN || 'safetrade.cloud',
});
