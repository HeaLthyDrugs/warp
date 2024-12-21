'use server'

import { cookies } from 'next/headers';
import { createSessionClient } from '@/appwrite/appwrite.server';
import { SESSION_KEY } from '@/consts';

export async function getProviderDetailsAction() {
    try {
        const session = (await cookies()).get(SESSION_KEY);
        if (!session?.value) return null;

        const { account } = await createSessionClient('');
        const currentSession = await account.getSession('current');

        // Return only the plain data we need
        return {
            provider: currentSession.provider,
            providerUid: currentSession.providerUid,
            providerAccessToken: currentSession.providerAccessToken,
            providerAccessTokenExpiry: currentSession.providerAccessTokenExpiry
        };
    } catch (error) {
        console.error('Failed to get provider details:', error);
        return null;
    }
} 