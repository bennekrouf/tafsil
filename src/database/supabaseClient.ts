import { createClient } from "@supabase/supabase-js";

import * as config from '../../supabaseConfig.json';

export const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: "Tafsil",
    storage: window.localStorage,
    flowType: "pkce",
  },
});
