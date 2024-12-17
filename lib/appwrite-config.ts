import { Client, Account } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6756e47f000db4e5ba7a');

export const account = new Account(client);

export const getAccount = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    return null;
  }
};
