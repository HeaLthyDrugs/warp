import { createAdminClient, createSessionClient } from "@/appwrite/appwrite.server";
import { SESSION_KEY } from "@/consts";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId") ?? "";
    const secret = request.nextUrl.searchParams.get("secret") ?? "";
    const userAgent = (await headers()).get("User-Agent");

    const { account } = await createAdminClient(userAgent);
    
    // Create the session
    const session = await account.createSession(userId, secret);
    
    // Get the OAuth2 session information
    const { account: userAccount } = await createSessionClient(userAgent);
    const sessions = await userAccount.listSessions();
    
    // Find the OAuth2 session that contains the provider's access token
    const oAuthSession = sessions.sessions.find(
      (session) => session.provider === 'github'
    );

    if (!oAuthSession?.providerAccessToken) {
      throw new Error('GitHub access token not found');
    }

    const cookieStore = await cookies();
    
    // Store the session
    cookieStore.set(SESSION_KEY, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    // Store the GitHub access token
    cookieStore.set('github_token', oAuthSession.providerAccessToken, {
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