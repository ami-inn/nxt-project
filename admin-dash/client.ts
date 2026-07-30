
import { Account, Client, Databases, Storage } from "appwrite";

const appwriteEndpoint =
  (import.meta.env.VITE_APPWRITE_ENDPOINT_URL as string | undefined) ??
  (import.meta.env.VITE_APPWRITE_ENDPOINT as string | undefined) ??
  "https://cloud.appwrite.io/v1";

const appwriteProjectId =
  (import.meta.env.VITE_APPWRITE_PROJECT_ID as string | undefined) ?? "";

export const appwriteConfig = {
  endpoint: appwriteEndpoint,
  endpointUrl: appwriteEndpoint,
  projectId: appwriteProjectId,
  apiKey: (import.meta.env.VITE_APPWRITE_API_KEY as string | undefined) ?? "",
  databaseId:
    (import.meta.env.VITE_APPWRITE_DATABASE_ID as string | undefined) ?? "",
};

export const appwriteClient = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

export const account = new Account(appwriteClient);
export const databases = new Databases(appwriteClient);
export const storage = new Storage(appwriteClient);
export const client = appwriteClient;