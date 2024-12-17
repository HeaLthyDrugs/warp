"use server";
import { createAdminClient } from "@/appwrite/appwrite";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { OAuthProvider } from "node-appwrite";

export async function signUpWithGithub() {
    const origin = process.env.NEXT_SITE_URL || (await headers()).get("origin");
    const userAgent = (await headers()).get("User-Agent");
	const { account } = await createAdminClient(userAgent);

	const redirectUrl = await account.createOAuth2Token(
		OAuthProvider.Github,
		`${origin}/sucess`,
		`${origin}/connect`,
	);

	return redirect(redirectUrl);
}