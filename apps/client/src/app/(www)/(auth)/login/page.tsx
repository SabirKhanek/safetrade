import { SearchParamsNames } from "@/shared/constants/param";
import Link from "next/link";
import { IconButton } from "../components/icon_button";
import {
  FaApple,
  FaArrowLeft,
  FaEnvelope,
  FaFacebook,
  FaGoogle,
} from "react-icons/fa6";
import { Input } from "../../../../components/input";
import { EmailLogin } from "./emailLoginForm";
import {
  LoginFlows,
  extractStrategyFromSearchParam,
} from "@/shared/utils/authstrategies";
import { SearchParamType } from "@/shared/types/misc";
import { BackButton } from "../components/backbutton";

export default function Login({
  searchParams,
}: {
  searchParams: SearchParamType;
}) {
  const strategy = extractStrategyFromSearchParam(searchParams);
  if (strategy === LoginFlows.EMAIL) {
    return (
      <>
        <BackButton backLocation="/login" />
        <EmailLogin />
      </>
    );
  } else {
    return <ChooseLoginFlow />;
  }
}

function ChooseLoginFlow() {
  return (
    <div>
      {/* Head */}
      <div>
        <h4 className="leading-tight mb-1">Sign In to your account</h4>
        <p className="text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline-effect font-medium">
            Join Here
          </Link>
        </p>
      </div>

      <div className="mt-8">
        {/* Primary Options */}
        <IconButton icon={<FaGoogle></FaGoogle>}>
          Continue with google
        </IconButton>

        <Link
          href={`/login?${SearchParamsNames.LoginStrategy}=${LoginFlows.EMAIL}`}
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
  );
}
