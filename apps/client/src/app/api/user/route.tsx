import { schema, getPoolConnection } from "db-schema";
import { NextResponse } from "next/server";

export async function GET() {
  const { db } = await getPoolConnection({ logging: true });
  const res = await db.query.user.findFirst();
  if (res) {
    // const obj = {
    //   username: res.username,
    //   about: res.about,
    //   createdAt: res.createdAt,
    // };
    // return NextResponse.json(obj);
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false }, { status: 404 });
  }
}
