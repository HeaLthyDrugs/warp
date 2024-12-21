import { Client, Databases, Storage, Account } from 'node-appwrite';

export const config = {
    appwriteUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    appwriteProjectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId: "6765b131003b7bee36ab",
    snippetsCollectionId: "6766638e003611dc02bd",
    tagsCollectionId: "6766639d001881491263",
    snippetsBucketId: "6766659f0036b094308a"
};

export function createClient(userAgent?: string | null) {
    const client = new Client()
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
    
    if (userAgent) {
        client.setForwardedUserAgent(userAgent);
    }
    
    return client;
}

export const databases = new Databases(createClient());
export const storage = new Storage(createClient());
export const account = new Account(createClient());

export default createClient();

