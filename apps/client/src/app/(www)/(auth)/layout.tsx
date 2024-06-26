import welcome_to_safetrade from "./assets/welcome_to_safetrade.svg";
import Image from "next/image";
import login_desk_girl from "./assets/login_desk_girl.png";
import { RouteOnLogin } from "@/components/providers/authstate-provider";
import { cookies } from "next/headers";
import { Cookies } from "common";
import { redirect } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = cookies();
  if (cookie.get(Cookies.UserAuthCookie)) {
    redirect("/dashboard");
  }
  return (
    <div
      className={`min-h-screen pt-28 py-24 overflow-hidden box-border bg-contrast flex justify-center items-center`}
    >
      <RouteOnLogin></RouteOnLogin>
      <div className="max-w-4xl mx-4  w-full grid md:grid-cols-2 rounded-xl bg-background-50 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div
          style={{
            background:
              "linear-gradient(180deg, #9a00bd 0%, #D00091 50%, #FFAD6A 100%)",
          }}
          className="rounded-tl-xl  max-md:hidden rounded-bl-xl px-10 flex flex-col justify-between gap-6 relative pt-12"
        >
          <div>
            <h4 className="sr-only">Welcome to safetrade</h4>
            <Image
              alt="Welcome to Safetrade"
              width={welcome_to_safetrade.width}
              height={welcome_to_safetrade.height}
              src={welcome_to_safetrade.src}
              className="!w-full !h-auto"
            />
            <h5 className="text-white font-medium my-4">
              Ready to get started?
            </h5>
            <p className="text-white leading-tight text-sm">
              Login now to experience safe, seamless and secure transactions
              experience with safetrade.
            </p>
          </div>

          <div className="desk-girl-illustration">
            <Image
              src={login_desk_girl.src}
              width={login_desk_girl.width}
              height={login_desk_girl.height}
              className=" !w-auto !max-h-[50vh] mx-auto"
              alt="Login girl illustration"
            />
          </div>
        </div>
        <div className="p-10 ">{children}</div>
      </div>
    </div>
  );
}
