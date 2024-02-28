import { supabase } from "./supabaseClient";
import { Logger } from 'mayo-logger';
import { useVerifiedUser } from "../hooks/useVerifiedUser";

async function loadFromSupa() {
    const user = useVerifiedUser();
    try {
        Logger.info("Fetching data from Supabase...", user.email, { tag: 'loadFromSupa' });
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('email', user.email);

        if (error) {
            Logger.error("Error fetching data from Supabase", error, { tag: 'loadFromSupa' });
            throw error;
        }

        Logger.info("Data fetched from Supabase", data, { tag: 'loadFromSupa' });
        return data;
    } catch (error) {
        Logger.error('Error fetching data from Supabase:', error, { tag: 'loadFromSupa' });
        return null; // Return null or an appropriate error message
    }
}

export default loadFromSupa;
