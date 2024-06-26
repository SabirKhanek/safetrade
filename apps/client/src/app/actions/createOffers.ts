import { AuthGuard, AuthGuardNullable } from "@/shared/utils/authguard";
import { db } from "@/shared/utils/db";
import { schema } from "db-schema";

// export async function createOffer({ category }: { category: string }) {
//   const auth = AuthGuardNullable();
//   if (!auth) return { success: false, message: "Unauthorized" };
//   const offer = await db.transaction(async (txn) => {
//     const category_in_db = await txn
//       .insert(schema.product_category)
//       .values({ category_name: category })
//       .onConflictDoNothing({});
//     txn.insert(schema.sell_offer).values({ category: category });
//   });
// }
