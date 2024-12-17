'use server';

import { ID, Query } from "node-appwrite";

import { cookies } from "next/headers";
import { createAdminClient, createClient, createSessionClient } from "../appWrite";
import { parseStringify } from "../utils";
import { Client, Account, OAuthProvider } from "appwrite";
import { redirect } from 'next/navigation';
import { account } from '@/lib/appwrite-config';

const APPWRITE_PROJECT_ID = '6756e47f000db4e5ba7a'


const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
} = process.env;

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const { database } = await createAdminClient();

    const response = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal('userId', [userId])]
    );

    if (!response || !response.documents || response.documents.length === 0) {
      // Create new user document if not exists
      const newUser = await database.createDocument(
        DATABASE_ID!,
        USER_COLLECTION_ID!,
        ID.unique(),
        {
          userId,
          // Remove GitHub specific fields for now
        }
      );
      return newUser;
    }

    return response.documents[0];
  } catch (error) {
    console.error('GetUserInfo Error:', error);
    throw error;
  }
};

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();
    
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const session = await account.createEmailPasswordSession(email, password);

    if (!session) {
      throw new Error('Failed to create session');
    }

    // Set the session cookie
    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    // Get user info
    const user = await getUserInfo({ userId: session.userId });

    if (!user) {
      throw new Error('User not found');
    }

    const parsedUser = parseStringify(user);
    
    if (!parsedUser) {
      throw new Error('Error processing user data');
    }

    return parsedUser;
  } catch (error) {
    console.error('SignIn Error:', error);
    throw error;
  }
};

export const signUp = async ({ password, ...userData }: SignUpParams) => {
  const { email, firstName, lastName } = userData;
  
  try {
    const { account, database } = await createAdminClient();

    // Create user account
    const newUserAccount = await account.create(
      ID.unique(), 
      email, 
      password, 
      `${firstName} ${lastName}`
    );

    if(!newUserAccount) throw new Error('Error creating user account');

    // Create user document with only essential fields
    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        userId: newUserAccount.$id,
        firstName,
        lastName,
        email
      }
    );

    // Create session
    const session = await account.createEmailPasswordSession(email, password);

    // Set session cookie
    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUser);
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
}

export const getLoggedInUser = async () => {
  try {
    // Check if we have a session cookie
    const sessionCookie = (await cookies()).get('appwrite_session');
    
    if (!sessionCookie) {
      return null;
    }

    const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('6756e47f000db4e5ba7a')
      .setSession(sessionCookie.value);
    
    const account = new Account(client);

    try {
      const user = await account.get();
      return user;
    } catch {
      (await cookies()).delete('appwrite_session');
      return null;
    }

  } catch (error) {
    console.error('GetLoggedInUser Error:', error);
    return null;
  }
};

export const logoutAccount = async () => {
  try {
    await account.deleteSession('current');
    return true;
  } catch (error) {
    console.error('Logout Error:', error);
    return false;
  }
}

export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id
      },
      client_name: `${user.firstName} ${user.lastName}`,
      language: 'en',
      
    }

   
    // return parseStringify({ linkToken: response.data.link_token })
  } catch (error) {
    console.log(error);
  }
}

export const createOAuth2Session = async () => {
  try {
    const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject(APPWRITE_PROJECT_ID);

    const account = new Account(client);

    // Modify these URLs based on your environment
    const redirectUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000'
      : 'https://your-production-url.com';

    const session = await account.createOAuth2Session(
      OAuthProvider.Github,
      redirectUrl,
      `${redirectUrl}/connect`,
      ['read:user', 'user:email', 'repo']
    );
    
    return session;
  } catch (error) {
    console.error('OAuth Session Error:', error);
    throw error;
  }
}

export const getCurrentUser = async () => {
  try {
    // Create a new client instance with proper session
    const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject(APPWRITE_PROJECT_ID);
    
    // Get the session cookie
    const sessionCookie = (await cookies()).get('appwrite-session'); // Note: check the cookie name
    
    if (!sessionCookie) {
      return null;
    }

    // Set the session
    client.setSession(sessionCookie.value);
    const account = new Account(client);
    
    const user = await account.get();
    return user;
  } catch (error) {
    console.error('Get Current User Error:', error);
    return null;
  }
}

