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
        
        return {
            success: true,
            error: null
        };
    } catch (error: any) {
        console.error('deleteSession error:', error);
        return {
            success: false,
            error: error.message
        }
    }
} 