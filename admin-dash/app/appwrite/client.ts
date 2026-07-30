
import { Account, Client, Storage, TablesDB } from "appwrite";

const configuredEndpoint =
  (import.meta.env.VITE_APPWRITE_ENDPOINT_URL as string | undefined) ??
  (import.meta.env.VITE_APPWRITE_ENDPOINT as string | undefined);

const appwriteRegion =
  (import.meta.env.VITE_APPWRITE_REGION as string | undefined)?.trim();

const appwriteEndpoint =
  configuredEndpoint && configuredEndpoint !== "https://cloud.appwrite.io/v1"
    ? configuredEndpoint
    : appwriteRegion
      ? `https://${appwriteRegion}.cloud.appwrite.io/v1`
      : "https://sgp.cloud.appwrite.io/v1";

const appwriteProjectId =
  (import.meta.env.VITE_APPWRITE_PROJECT_ID as string | undefined) ?? "";

export const appwriteConfig = {
  endpoint: appwriteEndpoint,
  endpointUrl: appwriteEndpoint,
  projectId: appwriteProjectId,
  region: appwriteRegion ?? "",
  apiKey: (import.meta.env.VITE_APPWRITE_API_KEY as string | undefined) ?? "",
  databaseId:
    (import.meta.env.VITE_APPWRITE_DATABASE_ID as string | undefined) ?? "",
};

export const appwriteClient = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

export const account = new Account(appwriteClient);
export const storage = new Storage(appwriteClient);
export const tablesDB = new TablesDB(appwriteClient);
export const client = appwriteClient;