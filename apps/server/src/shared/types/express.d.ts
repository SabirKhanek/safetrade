import { SystemAuthModule } from 'src/modules/system-auth/auth.module';
import { SystemAuthPayload } from 'src/modules/system-auth/auth.service';
import { OtpPayload, UserAuthPayload } from 'common';

declare global {
  namespace Express {
    interface Request {
      systemUser: SystemAuthPayload;
      verifiedOtp?: OtpPayload;
    }
    interface User extends UserAuthPayload {}
  }
}
