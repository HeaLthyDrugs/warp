"use server";

import { config } from "./config";
import { SESSION_KEY } from "@/consts"; 
import { deleteSession } from "@/lib/session";
import { cookies } from "next/headers";
import { Client, Account } from "node-appwrite";

export async function createSessionClient(userAgent: string | null) {
    const client = new Client()
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);

    const session = (await cookies()).get(SESSION_KEY);
    if (!session || !session.value) {
        throw new Error("No session");
    }

    if (userAgent) client.setForwardedUserAgent(userAgent);

    client.setSession(session.value);

    return {
        get account() {
            return new Account(client);
        },
    };
}

export async function createAdminClient(userAgent: string | null) {
    const client = new Client()
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)
        .setKey(process.env.APPWRITE_API_KEY!);

    if (userAgent) client.setForwardedUserAgent(userAgent);

    return {
        get account() {
            return new Account(client);
        },
    };
}

export async function getCurrentUser() {
    try {
        const session = (await cookies()).get(SESSION_KEY);
        if (!session || !session.value) {
            return null;
        }
        const { account } = await createSessionClient('');
        
        // Get current session with provider details
        const currentSession = await account.getSession('current');
        const user = await account.get();

        return {
            ...user,
            provider: currentSession.provider,
            providerUid: currentSession.providerUid,
            providerAccessToken: currentSession.providerAccessToken
        };
    } catch (error: any) {
        console.log('getCurrentUser error', error);
        return null;
    }
}

export async function deleteServerSession(userAgent: string | null) {
    try {
        const client = new Client()
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        if (userAgent) client.setForwardedUserAgent(userAgent);

        const session = (await cookies()).get(SESSION_KEY);
        if (!session || !session.value) {
            throw new Error("No session");
        }

        client.setSession(session.value);
        const account = new Account(client);
        
        await account.deleteSession('current');
        await deleteSession(); // This deletes the cookie

        return {
            success: true,
            error: null
        };
    } catch (error: any) {
        console.error('deleteServerSession error:', error);
        return {
            success: false,
            error: error.message
        }
    }
} 