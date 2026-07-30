import { ID, OAuthProvider, Query } from "appwrite";
import { account, appwriteConfig, tablesDB } from "./client";

const USERS_TABLE_ID =
  (import.meta.env.VITE_APPWRITE_USERS_TABLE_ID as string | undefined) ??
  "users";

export const loginWithGoogle = async () => {
  if (typeof window === "undefined") {
    throw new Error("Google login can only be started in the browser.");
  }

  try {
    return await account.createOAuth2Session(
      OAuthProvider.Google,
      `${window.location.origin}/`,
      `${window.location.origin}/404`
    );
  } catch (error) {
    console.error("Error logging in with Google:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch (error) {
    return null;
  }
};

const getGooglePicture = async (accessToken: string) => {
  try {
    const response = await fetch(
      "https://people.googleapis.com/v1/people/me?personFields=photos",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Google profile picture");
    }

    const { photos } = await response.json();
    return photos?.[0]?.url || null;
  } catch (error) {
    console.error("Error fetching Google picture:", error);
    return null;
  }
};

export const storeUserData = async () => {
  if (!appwriteConfig.databaseId) {
    return null;
  }

  try {
    const user = await account.get();
    if (!user) {
      throw new Error("User not found");
    }

    const session = await account.getSession("current");
    const profilePicture = session?.providerAccessToken
      ? await getGooglePicture(session.providerAccessToken)
      : null;

    const existingUser = await getExistingUserData(user.$id);

    const payload = {
      accountId: user.$id,
      email: user.email,
      name: user.name,
      imageUrl: profilePicture,
      joinedAt: new Date().toISOString(),
    };

    if (existingUser) {
      return tablesDB.updateRow({
        databaseId: appwriteConfig.databaseId,
        tableId: USERS_TABLE_ID,
        rowId: existingUser.$id,
        data: payload,
      });
    }

    return tablesDB.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: USERS_TABLE_ID,
      rowId: ID.unique(),
      data: payload,
    });
  } catch (error) {
    console.error("Error storing user data:", error);
    return null;
  }
};

export const getExistingUserData = async (userId: string) => {
  if (!appwriteConfig.databaseId || !userId) {
    return null;
  }

  try {
    const rows = await tablesDB.listRows({
      databaseId: appwriteConfig.databaseId,
      tableId: USERS_TABLE_ID,
      queries: [Query.equal("accountId", userId)],
    });

    return rows.rows?.[0] ?? null;
  } catch (error: any) {
    if (error?.code === 404 || error?.status === 404) {
      return null;
    }

    console.error("Error fetching existing user data:", error);
    return null;
  }
};

export const getUser = async () => {
  try {
    const user = await account.get();
    if (!user) {
      return null;
    }

    const existingUser = await getExistingUserData(user.$id);

    if (!existingUser) {
      return null;
    }

    return {
      accountId: existingUser.accountId,
      name: existingUser.name,
      email: existingUser.email,
      imageUrl: existingUser.imageUrl,
      joinedAt: existingUser.joinedAt,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const getAllUsers = async (limit: number, offset: number) => {
  if (!appwriteConfig.databaseId) {
    return { users: [], total: 0 };
  }

  try {
    const rows = await tablesDB.listRows({
      databaseId: appwriteConfig.databaseId,
      tableId: USERS_TABLE_ID,
      queries: [Query.limit(limit), Query.offset(offset)],
    });

    return {
      users: rows.rows ?? [],
      total: rows.total ?? rows.rows?.length ?? 0,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { users: [], total: 0 };
  }
};