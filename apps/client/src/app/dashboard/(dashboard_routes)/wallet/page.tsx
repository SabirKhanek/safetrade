"use client";
import {
  WalletActivityResult,
  createDeposit,
  fetchWalletActivity,
} from "@/app/actions/wallet";
import { DataTable } from "@/components/datatable-global";
import { RouteLayoutName } from "@/components/layout/route-layout";
import { Loading } from "@/components/loading";
import { useAuthState } from "@/components/providers/authstate-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  createPaymentSession,
  getStripeCustomerFromEmail,
} from "@/shared/utils/stripe";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { activityColumns } from "./columns";

export default function WalletPage() {
  const [data, setData] = useState<WalletActivityResult | null>(null);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { toast } = useToast();
  useEffect(() => {
    async function _fetch() {
      try {
        const res = await fetchWalletActivity();
        if (res.wallet) {
          setData(res);
        } else {
          throw new Error("unknown error");
        }
      } catch (errr: any) {
        setError("unknown error");
        toast({ title: "Something went worng" });
      } finally {
        setIsLoading(false);
      }
    }
    _fetch();
  }, []);
  if (error) {
    return (
      <Alert>
        <AlertTitle>There was an error fetching chat thread!</AlertTitle>
        <AlertDescription>
          <pre>{error}</pre>
        </AlertDescription>
      </Alert>
    );
  }
  if (loading) return <Loading></Loading>;
  if (!data) return;
  console.log(data);
  return (
    <>
      <RouteLayoutName>Wallet</RouteLayoutName>
      <div className="my-3">
        <Card className="w-64">
          <CardHeader>
            <CardTitle>Wallet Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="flex justify-center my-3 items-center">
                <h2 className="text-3xl text-primary font-bold">
                  {data.wallet?.balance ? data.wallet.balance / 100 : 0} $
                </h2>
              </div>
              <Deposit />
            </div>
          </CardContent>
        </Card>

        <div className="my-3">
          <DataTable
            columns={activityColumns}
            data={data.activity || []}
          ></DataTable>
        </div>
      </div>
    </>
  );
}

export function Deposit() {
  const [value, setValue] = useState("");
  const [loading, setIsLoading] = useState(false);
  const authState = useAuthState();
  const { toast } = useToast();
  async function redirecToCheckout() {
    if (!authState.user) {
      toast({ title: "Not logged in" });
      return;
    }
    try {
      setIsLoading(true);
      const stripesession = await createPaymentSession(
        authState.user.email,
        parseInt(value),
        authState.user?.first_name
      );
      window.open(stripesession, "_blank");
      const val = await createDeposit(parseInt(value));
    } catch (err: any) {
      toast({
        title: "Something went wrong!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Deposit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deposit Funcds</DialogTitle>
          <DialogDescription>
            Enter amount you want to deposit. You will be redirected to Stripe
            Hosted Page.
          </DialogDescription>
          <div className="grid my-3 w-full max-w-sm items-center gap-2">
            <Label htmlFor="amount">Enter amount (in cents)</Label>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="number"
              id="amount"
              placeholder="Amount"
            />
            <Button onClick={redirecToCheckout} variant={"outline"}>
              Go To Payment
              {loading && <ReloadIcon className="w-6 h-6 animate-spin" />}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
