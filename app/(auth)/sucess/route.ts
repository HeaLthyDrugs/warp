
import { createAdminClient } from "@/appwrite/appwrite";
import { SESSION_KEY } from "@/consts";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId") ?? "";
  const secret = request.nextUrl.searchParams.get("secret") ?? "";

  const userAgent = (await headers()).get("User-Agent");

  const { account } = await createAdminClient(userAgent);
  const session = await account.createSession(userId, secret);

  (await cookies()).set(SESSION_KEY, session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  return NextResponse.redirect(`${request.nextUrl.origin}/`);
}