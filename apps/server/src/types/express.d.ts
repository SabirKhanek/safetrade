import { SystemAuthModule } from 'src/system-auth/auth.module';
import { SystemAuthPayload } from 'src/system-auth/auth.service';
import { OtpPayload, UserAuthPayload } from 'common';

declare global {
  namespace Express {
    interface Request {
      systemUser: SystemAuthPayload;
      verifiedOtp?: OtpPayload
    }
    interface User extends UserAuthPayload {}
  }
}
