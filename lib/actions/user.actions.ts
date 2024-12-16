'use server';

import { ID, Query } from "node-appwrite";

import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "../appWrite";
import { parseStringify } from "../utils";
import { Client, Account, OAuthProvider } from "appwrite";


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

export async function getLoggedInUser() {
  try {
    const { account } = createClient();
    const session = await account.getSession('current');
    
    if (!session) return null;

    const user = await getUserInfo({ userId: session.userId });
    return parseStringify(user);
  } catch (error) {
    console.log('GetLoggedInUser Error:', error);
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();

    (await cookies()).delete('appwrite-session');

    await account.deleteSession('current');
  } catch (error) {
    return null;
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

// export const signInWithGitHub = async () => {
//   try {
//     const { account } = await createAdminClient();
    
//     const session = await account.createOAuth2Session(
//       OAuthProvider.Github,
//       `${process.env.NEXT_PUBLIC_SITE_URL}/`,
//       `${process.env.NEXT_PUBLIC_SITE_URL}/sign-in`
//     );

//     if (session) {
//       // Set the session cookie like we do in email/password auth
//       (await cookies()).set("appwrite-session", session.secret, {
//         path: "/",
//         httpOnly: true,
//         sameSite: "strict",
//         secure: true,
//       });
//     }

//     return parseStringify(session);
//   } catch (error) {
//     console.error('GitHub SignIn Error:', error);
//     throw error;
//   }
// };

