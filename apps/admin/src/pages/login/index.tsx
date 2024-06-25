import { Logo } from "@/components/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { contract } from "api-contract";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { apiClient } from "@/api-client";
import { useAuthState } from "@/components/providers/authstate-provider";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
const LoginSchema = contract.system_auth.login.body;
export function Login() {
  return (
    <div className="min-h-screen bg-black relative flex justify-center items-center  ">
      <Card className="bg-[#1D1D1F] z-10 w-4/5 max-w-lg px-2">
        <CardHeader>
          <Logo />
          <CardDescription className="text-2xl text-card-foreground font-medium">
            Welcome to Safetrade Systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      <SmokeBlobsBackground />
    </div>
  );
}

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });
  const authState = useAuthState();
  const { toast } = useToast();

  async function handleSubmit({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setIsLoading(true);
    try {
      const res = await apiClient.system_auth.login({
        body: { email, password },
      });
      if (res.status === 200) {
        const freshAuthState = await authState.refreshState();
        toast({
          title: "Login success!",
          description: `Welcome back ${freshAuthState?.first_name}!`,
        });
      } else {
        throw new Error((res.body as any).message! || "Unknown error");
      }
    } catch (err: any) {
      toast({
        title: "Login failed!",
        description: `Couldn't login: ${err.message || "Unknown error"}`,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="my-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field}></Input>
              </FormControl>
              {form.formState.errors.email && (
                <FormMessage>{form.formState.errors.email.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="my-2">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  {...field}
                ></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full mt-2" disabled={isLoading} type="submit">
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
      </form>
    </Form>
  );
}

function SmokeBlobsBackground() {
  return (
    <div className="absolute pointer-events-none overflow-hidden w-full h-full top-0 left-0 grid grid-cols-2">
      <div className="flex justify-center rounded-full  items-center">
        <div className="bg-primary/40 blur-[120px] w-[80vw] rounded-full aspect-square "></div>
      </div>
      <div className="flex justify-center items-center">
        <div className="bg-secondary/90 aspect-square w-[80vw] rounded-full blur-[120px] "></div>
      </div>
    </div>
  );
}
