import { HTMLProps, useEffect, useMemo } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";

export type InputProps = {
  label?: string;
  field?: any;
  isGood?: boolean;
  form?: {
    touched: { [key: string]: boolean };
    errors: { [key: string]: string };
  };
  containerClass?: string;
} & HTMLProps<HTMLInputElement>;

export function Input({
  label,
  containerClass = "",
  children,
  form,
  isGood,
  field = {},
  ...props
}: InputProps) {
  const errorClassName =
    "border-red-500 text-red-500 bg-red-50 focus:outline-red-500";
  const goodClassName =
    "border-green-500 text-green-500 bg-green-50 focus:outline-green-500";
  const neutralClassName =
    "border-text-400 text-text-500 bg-background-100 focus:outline-text-500";

  const className = "rounded-lg border placeholder:text-text-300 p-1.5";

  const isTouched = useMemo(() => {
    return form?.touched[field.name];
  }, [form?.touched[field.name], form?.touched]);

  const error = useMemo(() => {
    return form?.errors[field.name];
  }, [form?.errors[field.name]]);

  const stateClass = useMemo(() => {
    if (error && isTouched) return errorClassName;
    else if (isGood) return goodClassName;
    else return neutralClassName;
  }, [error, isTouched]);

  return (
    <div className={containerClass + " w-full my-2"}>
      {label && (
        <label className="font-medium text-sm font-inter">{label}</label>
      )}
      <input
        {...(props as any)}
        name={field.name || props.name}
        className={`${props.className || ""} disabled:cursor-not-allowed transition-all duration-150 w-full my-0.5 ${className} ${stateClass}`}
      />
      {isTouched && error && (
        <span className="text-red-500 items-center text-sm inline-flex gap-2">
          <IoAlertCircleOutline></IoAlertCircleOutline>
          {error}
        </span>
      )}
    </div>
  );
}
