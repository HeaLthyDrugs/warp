import { Client, Databases, Account } from 'appwrite';
const client = new Client()
   .setEndpoint('https://cloud.appwrite.io/v1')
   .setProject('6761411900386879c31c');
export const databases = new Databases(client);

export const deleteCurrentSession = async () => {
    try {
        const account = new Account(client);
        await account.deleteSession('current');
        return { deleted: true };
    } catch (error) {
        throw error;
    }
};