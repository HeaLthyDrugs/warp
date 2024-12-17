import { SESSION_KEY } from "@/consts";
import { cookies } from "next/headers";
import { Models } from "node-appwrite";

// Set session cookie
export async function setSession(session: Models.Session) {
    (await cookies()).set(SESSION_KEY, session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        expires: new Date(session.expire),
    });
}

// Delete session cookie
export async function deleteSession() {
    (await cookies()).delete(SESSION_KEY);
}