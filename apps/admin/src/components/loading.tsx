import { Spinner } from "./ui/spinner";

export function Loading() {
  return (
    <div className="p-10 flex justify-center items-center">
      <Spinner size={"large"}></Spinner>
    </div>
  );
}
