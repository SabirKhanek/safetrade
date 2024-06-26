"use client";
import {
  Dispatch,
  HTMLProps,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import { Input } from "../../../../components/input";
import { Button } from "@/components/button";
import { Button as ShadCnButton } from "@/components/ui/button";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";

import OtpDialog from "@/components/otp-dialog";
import { toast } from "@/components/ui/use-toast";
import { apiClient } from "@/api-client";
import { useAuthState } from "@/components/providers/authstate-provider";
import { useRouter } from "next/navigation";
function getCurrentDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return [year, month, day].join("-");
}

const RegisterSchema = Yup.object({
  firstName: Yup.string().min(3).label("First Name").required(),
  lastName: Yup.string().min(3).label("Last Name").required(),
  email: Yup.string().required().label("Email").email(),
  password: Yup.string()
    .required()
    .label("Password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password is not secure enough"
    ),
});

interface FormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface EmailRegisterProps extends HTMLProps<HTMLElement> {}

export function EmailRegister() {
  const today = useMemo(() => {
    return getCurrentDateString();
  }, []);
  const minDay = "1800-01-01";
  const [open, setOpen] = useState<boolean>(false);
  const [verifiedToken, setVerifiedToken] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<FormValues | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const authState = useAuthState();
  const handleOtpVerified = (token: string) => {
    setVerifiedToken(token);
  };

  useEffect(() => {
    if (formValues) {
      submitForm(formValues);
    }
  }, [verifiedToken]);

  const submitForm = async (values: FormValues) => {
    if (!formValues) return;
    if (!verifiedToken) return;
    setIsLoading(true);
    try {
      console.log("Form submitted with values:", values);
      console.log("Verified token:", verifiedToken);
      const res = await apiClient.auth.signup({
        headers: { "x-verified-otp-token": verifiedToken },
        body: {
          dob: "2002-11-20",
          email: formValues.email,
          f_name: formValues.firstName,
          l_name: formValues.lastName,
          password: formValues.password,
        },
      });
      if (res.status === 200) {
        toast({ title: "Welcome to Safetrade!" });
        await authState.refreshState();
        router.push("/dashboard");
      }
    } catch (err: any) {
      toast({
        title: "Couldn't register",
        description: err.message || "Unknown Error",
      });
    } finally {
      setIsLoading(false);
    }
    // Replace with your form submission logic
  };
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          firstName: "",
          lastName: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setFormValues(values); // Store form values in state
          console.log("form values are set");
          setOpen(true); // Open the OTP dialog
          console.log("opening dialog");
          setSubmitting(false);
        }}
        validationSchema={RegisterSchema}
      >
        {(props) => {
          const {
            values,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            dirty,
            touched,
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              {
                <OtpDialog
                  email={values.email}
                  open={open}
                  onVerified={handleOtpVerified}
                  setOpen={setOpen}
                ></OtpDialog>
              }

              <Field
                label="First Name"
                name="firstName"
                component={Input}
                placeholder="Enter your name"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />

              <Field
                label="Last Name"
                name="lastName"
                component={Input}
                placeholder="Enter your last name"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />

              <Field
                label="Email"
                name="email"
                component={Input}
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />

              <Field
                label="Password"
                name="password"
                type="password"
                disabled={isSubmitting}
                isGood={errors.password ? false : touched.password && true}
                placeholder="Enter your password"
                component={Input}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <PasswordChecker
                isError={errors.password ? true : false}
                password={values.password}
              />

              <Button
                isLoading={isSubmitting || isLoading}
                disabled={Object.keys(errors).length > 1}
                disableOnLoading
                className="w-full my-3 bg-primary"
                type="submit"
              >
                Register
              </Button>
            </form>
          );
        }}
      </Formik>
    </>
  );
}

export function PasswordChecker({
  password,
  isError,
}: {
  password: string;
  isError: boolean;
}) {
  const result = useMemo(() => {
    const resultObj: Record<string, boolean> = {};
    checks.forEach((check) => {
      resultObj[check.desc] = check.regex.test(password);
    });
    return resultObj;
  }, [password]);

  return (
    <ul className="my-4 transition-all duration-300 ">
      {checks.map((check) => (
        <li
          key={check.desc}
          className={
            (result[check.desc]
              ? "text-green-400"
              : `${isError ? "text-red-400" : "text-text-300"}`) +
            " text-sm  transition-colors duration-300 flex gap-2 items-center "
          }
        >
          {!result[check.desc] ? (
            <FaRegCircleXmark className="shrink-0" />
          ) : (
            <FaRegCheckCircle />
          )}
          <span className="min-w-fit">{check.desc}</span>
        </li>
      ))}
    </ul>
  );
}
const checks = [
  { desc: "At least 8 characters long", regex: /^.{8,}$/ },
  { desc: "Contains at least one uppercase letter", regex: /[A-Z]/ },
  { desc: "Contains at least one lowercase letter", regex: /[a-z]/ },
  { desc: "Contains at least one number", regex: /\d/ },
];
