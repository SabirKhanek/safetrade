import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export function BackButton({ backLocation }: { backLocation: string }) {
  return (
    <Link
      href={backLocation}
      className="flex gap-2 mb-4 items-center text-black"
    >
      <FaArrowLeft />
      Back
    </Link>
  );
}
