import { Store as Cache } from "tauri-plugin-store-api";
import { Logger } from 'mayo-logger';
import { useVerifiedUser } from "../hooks/useVerifiedUser";

export const loadFromCache = async (key?: string): Promise<any> => {
  const user = useVerifiedUser();
  try {
    // If a specific key is provided, use it; otherwise, use the full user key
    const storageKey = key ? `${user.email}-${user.appId}-${key}` : `${user.email}-${user.appId}`;
    Logger.info(`Loading data from store with key: ${storageKey}`, null, { tag: 'loadFromCache' });

    const store = new Cache(".settings.json");
    await store.load();
    
    let value;
    if (key) {
      // Try to load specific data for the given key
      value = await store.get(storageKey).catch(() => null);
    } else {
      // Load the entire user object if no specific key is provided
      const allData = await store.get(`${user.email}-${user.appId}`).catch(() => null);
      value = allData;
    }

    Logger.info(`Data loaded from store with key: ${storageKey}`, value, { tag: 'loadFromCache' });

    return typeof value === 'string' ? JSON.parse(value) : value;
  } catch (error) {
    Logger.error(`Error loading data from store: ${error}`, error, { tag: 'loadFromCache' });
    throw error;
  }
};
