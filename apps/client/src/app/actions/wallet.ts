"use server";
import { AuthGuard, AuthGuardNullable } from "@/shared/utils/authguard";
import { getPoolConnection, schema } from "db-schema";
import { eq } from "drizzle-orm";

export async function createDeposit(amount: number) {
  const auth = AuthGuardNullable();
  if (!auth.user_uid) return { success: false, message: "unauthorized" };
  const { db } = await getPoolConnection({
    logging: true,
    timeout: 3 * 60 * 1000,
  });
  const deposit = await db.transaction(async (txn) => {
    const [wallet] = await txn
      .select()
      .from(schema.wallet)
      .where(eq(schema.wallet.user_id, auth.user_uid));
    if (!wallet) return { success: false, message: "Wallet not found" };
    const [dep] = await txn
      .insert(schema.deposit)
      .values({
        deposit_amount: amount,
        wallet_id: wallet.wallet_id,
        deposit_src: "Stripe",
      })
      .returning();
    const wallet_activity = await txn.insert(schema.wallet_activity).values({
      activity_reference: dep.deposit_id,
      activity_status: "active",
      activity_subject: "Deposit",
      activity_type: "credit",
      amount: amount,
      wallet_id: wallet.wallet_id,
    });
    const update = await txn
      .update(schema.wallet)
      .set({ balance: wallet.balance + amount })
      .returning();
    return { success: true, deposit_id: dep.deposit_id };
  });
  return { deposit };
}

export async function fetchDeposits() {
  const auth = AuthGuardNullable();
  if (!auth.user_uid) return { success: false, message: "unauthorized" };
  const { db } = await getPoolConnection({
    logging: true,
    timeout: 3 * 60 * 1000,
  });
  const [wallet] = await db
    .select()
    .from(schema.wallet)
    .where(eq(schema.wallet.user_id, auth.user_uid));
  if (!wallet) return { success: false };
  const result = await db
    .select()
    .from(schema.deposit)
    .where(eq(schema.deposit.wallet_id, wallet.wallet_id));
  return result;
}

export async function fetchWalletActivity() {
  const auth = AuthGuardNullable();
  if (!auth.user_uid) return { success: false, message: "unauthorized" };
  const { db } = await getPoolConnection({
    logging: true,
    timeout: 3 * 60 * 1000,
  });
  const [wallet] = await db
    .select()
    .from(schema.wallet)
    .where(eq(schema.wallet.user_id, auth.user_uid));
  if (!wallet) return { success: false };
  const result = await db
    .select()
    .from(schema.wallet_activity)
    .where(eq(schema.wallet_activity.wallet_id, wallet.wallet_id));
  return { activity: result, wallet };
}

export type WalletActivityResult = Awaited<
  ReturnType<typeof fetchWalletActivity>
>;

export async function createTransaction() {}
