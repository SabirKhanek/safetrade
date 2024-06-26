import Image from "next/image";

export default function Preloader() {
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center">
      <Image
        width={100}
        height={100}
        alt="safetrade-logo"
        className=""
        src={"/assets/images/safetrade-logo-animated.svg"}
      ></Image>
    </div>
  );
}
