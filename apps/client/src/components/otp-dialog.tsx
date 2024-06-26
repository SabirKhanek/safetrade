import React, { useEffect, useState, Dispatch } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";

import { Button, Button as ShadCnButton } from "@/components/ui/button";
import { apiClient } from "@/api-client";
import { Loading } from "./loading";
import { ReloadingIcon } from "./reloading-icon";
import { REGEXP_ONLY_DIGITS } from "input-otp";

function OtpDialog({
  open,
  setOpen,
  email,
  onVerified,
}: {
  open: boolean;
  email: string;
  onVerified: (verified_token: string) => any;
  setOpen: Dispatch<boolean>;
}) {
  const [otp_id, setOtpId] = useState<string | null>(null);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    setOtpId(null);
    setValue("");
  }, [email]);

  useEffect(() => {
    async function generateOtp() {
      if (isLoading) return;
      setIsLoading(true);
      try {
        const res = await apiClient.otp.generate({ body: { email } });
        if (res.status === 200) {
          setOtpId(res.body.otp_id);
          toast({
            title: "Otp Generation",
            description: "Otp was generated and sent to user",
          });
        } else {
          throw new Error((res.body as any).message);
        }
      } catch (err: any) {
        toast({
          title: "Otp Generation",
          description: "Couldn't generate OTP",
        });
      } finally {
        setIsLoading(false);
      }
    }
    if (open && !otp_id) {
      generateOtp();
    }
  }, [open]);

  useEffect(() => {
    async function verifyToken() {
      try {
        setIsVerifying(true);
        const res = await apiClient.otp.verify({
          query: { otp_id: otp_id || "", otp: value || "" },
        });
        if (res.status === 200) {
          toast({ title: "OTP verification was successful" });
          setOpen(false);
          if (onVerified) onVerified(res.body.verified_token);
        } else {
          throw new Error((res.body as any).message);
        }
      } catch (err: any) {
        toast({
          title: "OTP verification failed",
          description: err.message || "Unknown error",
        });
      } finally {
        setIsVerifying(false);
      }
    }
    if (value.length === 6) {
      verifyToken();
    }
  }, [value]);

  async function resendOtp() {
    try {
      setIsResending(true);
      const res = await apiClient.otp.resend({
        body: { otp_id: otp_id || "" },
      });
      if (res.status === 200) {
        toast({ title: "OTP was resent!" });
      } else {
        throw new Error((res.body as any).message);
      }
    } catch (err: any) {
      toast({
        title: "OTP couldn't be resent",
        description: err.message || "Unknown error",
      });
    } finally {
      setIsResending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            OTP verification
            {isVerifying && <ReloadingIcon></ReloadingIcon>}
          </DialogTitle>
          <DialogDescription>
            An OTP for verification was sent to{" "}
            <span className="font-bold">{email}</span>
          </DialogDescription>
        </DialogHeader>
        <div>
          {isLoading && <Loading />}
          {!isLoading && otp_id && (
            <>
              <div className="flex justify-center">
                <InputOTP
                  value={value}
                  onChange={setValue}
                  className=""
                  maxLength={6}
                  disabled={isLoading || isVerifying}
                  pattern={REGEXP_ONLY_DIGITS}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <p className="text-sm">
                Didn't get it?{" "}
                <ShadCnButton
                  className="text-sm gap-2 px-0"
                  onClick={resendOtp}
                  variant={"linkHover1"}
                >
                  Resend OTP
                  {isResending && <ReloadingIcon></ReloadingIcon>}
                </ShadCnButton>
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default OtpDialog;
