"use client";
import { HTMLProps, useMemo } from "react";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import { Input } from "../../../../components/input";
import { Button } from "@/components/button";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";

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
  dob: Yup.date()
    .max(getCurrentDateString())
    .min("1800-01-01")
    .required()
    .label("Date of Birth"),
});

export interface EmailRegisterProps extends HTMLProps<HTMLElement> {}

export function EmailRegister() {
  const today = useMemo(() => {
    return getCurrentDateString();
  }, []);
  const minDay = "1800-01-01";
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        dob: undefined,
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setTimeout(() => {
          setSubmitting(false);
        }, 3000);
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
              label="Date of Birth"
              name="dob"
              type="date"
              disabled={isSubmitting}
              min={minDay}
              max={today}
              placeholder="mm/dd/yyyy"
              component={Input}
              className="muted-placeholder date-input--has-value"
              value={values.dob}
              onChange={handleChange}
              onBlur={handleBlur}
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
              isLoading={isSubmitting}
              disabled={Object.keys(errors).length > 1}
              disableOnLoading
              className="w-full my-3"
              type="submit"
            >
              Register
            </Button>
          </form>
        );
      }}
    </Formik>
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
