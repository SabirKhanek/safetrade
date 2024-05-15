import { SearchParamType } from "@/app/shared/types/misc";
import {
  LoginFlows,
  extractStrategyFromSearchParam,
} from "@/app/shared/utils/authstrategies";
import { HTMLProps } from "react";
import { BackButton } from "../components/backbutton";
import Link from "next/link";
import { IconButton } from "../components/icon_button";
import { SearchParamsNames } from "@/app/shared/constants/param";
import { FaApple, FaEnvelope, FaFacebook, FaGoogle } from "react-icons/fa6";
import { EmailRegister } from "./emailRegisterForm";

export default function Register({
  searchParams,
}: {
  searchParams: SearchParamType;
}) {
  const strategy = extractStrategyFromSearchParam(searchParams);
  if (strategy === LoginFlows.EMAIL) {
    return (
      <>
        <BackButton backLocation="/register" />
        <EmailRegister />
      </>
    );
  } else {
    return <ChooseRegisterFlow />;
  }
}

function ChooseRegisterFlow() {
  return (
    <div className="flex flex-col justify-between">
      <div>
        {/* Head */}
        <div>
          <h4 className="leading-tight mb-1">Create an account</h4>
          <p className="text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline-effect font-medium">
              login here
            </Link>
          </p>
        </div>
        <div className="mt-8">
          {/* Primary Options */}
          <IconButton icon={<FaGoogle></FaGoogle>}>
            Continue with google
          </IconButton>
          <Link
            href={`/register?${SearchParamsNames.LoginStrategy}=${LoginFlows.EMAIL}`}
          >
            <IconButton className="my-3" icon={<FaEnvelope></FaEnvelope>}>
              Continue with email
            </IconButton>
          </Link>
        </div>
        <p className="uppercase font-xl font-semibold text-text-400 text-center my-5">
          OR
        </p>
        {/* Secondary Options */}
        <div className="gap-3 flex justify-between items-center gap-y-2 flex-wrap">
          <IconButton
            className="flex-1 shrink-0 min-w-fit"
            icon={<FaApple className="text-xl"></FaApple>}
          >
            Apple
          </IconButton>
          <IconButton
            className="flex-1 shrink-0 min-w-fit"
            icon={<FaFacebook className=""></FaFacebook>}
          >
            Facebook
          </IconButton>
        </div>
      </div>

      <p className="text-text-300 text-sm">
        By joining you agree to Safetrade Terms of Service and to occasionally
        receive emails from us. Please read our Privacy Policy to learn how we
        use your personal data.
      </p>
    </div>
  );
}
