"use server";

import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

const APPWRITE_PROJECT_ID = '6756e47f000db4e5ba7a'

export const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

  const account = new Account(client);
  
  try {
    await account.get();
    return { account };
  } catch (error) {
    return { account };
  }
};

export const createClient = async () => {
  if (!APPWRITE_PROJECT_ID) {
    throw new Error('Appwrite project ID is not defined');
  }

  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(APPWRITE_PROJECT_ID);

  const account = new Account(client);
  
  return { client, account };
};

export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

  return { 
    account: new Account(client),
    database: new Databases(client)
  };
};
