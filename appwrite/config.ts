import { Client, Databases, Storage, Account } from 'appwrite';

export const config = {
    appwriteUrl: "https://cloud.appwrite.io/v1",
    appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    databaseId: "6765b131003b7bee36ab",
    snippetsCollectionId: "6766638e003611dc02bd",
    tagsCollectionId: "6766639d001881491263",
    snippetsBucketId: "6766659f0036b094308a"
};

const client = new Client()
    .setEndpoint(config.appwriteUrl)
    .setProject(config.appwriteProjectId);

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);

export default client;

