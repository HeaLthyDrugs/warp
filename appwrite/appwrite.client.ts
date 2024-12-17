"use client";

import { config } from "./config";
import { Client, Account } from "node-appwrite";
import { SESSION_KEY } from "@/consts";

const client = new Client()
    .setEndpoint(config.appwriteUrl)
    .setProject(config.appwriteProjectId);

export async function deleteCurrentSession(userAgent: string | null) {
    try {
        if (userAgent) client.setForwardedUserAgent(userAgent);
        const account = new Account(client);
        await account.deleteSession('current');
        
        // Clear the cookie on client side
        document.cookie = `${SESSION_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        
        return {
            success: true
        };
    } catch (error: any) {
        console.log('deleteSession error', error);
        return {
            error: error.message
        }
    }
} 