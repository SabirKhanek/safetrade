"use client";
import { HTMLProps } from "react";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import { Input } from "../../../../components/input";
import Link from "next/link";
import { Button } from "@/components/button";
import { apiClient } from "@/api-client";
import { useToast } from "@/components/ui/use-toast";
import { useAuthState } from "@/components/providers/authstate-provider";
import { useRouter } from "next/navigation";
const loginSchema = Yup.object({
  email: Yup.string().required().label("Email").email(),
  password: Yup.string().required().label("Password"),
});

export interface EmailLoginProps extends HTMLProps<HTMLElement> {}

export function EmailLogin({ children, ...props }: EmailLoginProps) {
  const { toast } = useToast();
  const authState = useAuthState();
  const router = useRouter();
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const authRes = await apiClient.auth.login({
            body: { email: values.email, password: values.password },
          });
          if (authRes.status === 200) {
            const freshState = await authState.refreshState();
            router.push("/dashboard");
            if (freshState?.uid) {
              toast({
                title: "Authenticated",
                description: "Welcome Back",
              });
            }
          } else {
            throw new Error((authRes.body as any).message);
          }
        } catch (err: any) {
          toast({
            title: "Authentication failed!",
            description: err.message || "unknown error",
          });
        } finally {
          setSubmitting(false);
        }
      }}
      validationSchema={loginSchema}
    >
      {(props) => {
        const {
          values,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              component={Input}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <p className="text-right">
              <Link
                className="underline-effect text-sm"
                href={"/reset-account"}
              >
                Forget Password?
              </Link>
            </p>

            <Button
              isLoading={isSubmitting}
              disableOnLoading
              className="w-full my-3"
              type="submit"
              onClick={() => console.log("button clicked")}
            >
              Login
            </Button>
          </form>
        );
      }}
    </Formik>
  );
}
