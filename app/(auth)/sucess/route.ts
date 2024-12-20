import { createAdminClient } from "@/appwrite/appwrite.server";
import { SESSION_KEY } from "@/consts";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId") ?? "";
    const secret = request.nextUrl.searchParams.get("secret") ?? "";
    const accessToken = request.nextUrl.searchParams.get("accessToken") ?? "";

    const userAgent = (await headers()).get("User-Agent");

    const { account } = await createAdminClient(userAgent);
    const session = await account.createSession(userId, secret);

    const cookieStore = await cookies();
    cookieStore.set(SESSION_KEY, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    
    cookieStore.set('github_token', accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return NextResponse.redirect(`${request.nextUrl.origin}/`);
  } catch (error) {
    console.error("Success route error:", error);
    return NextResponse.redirect(`${request.nextUrl.origin}/connect`);
  }
}