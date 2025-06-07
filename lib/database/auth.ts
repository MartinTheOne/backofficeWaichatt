import { supabase } from "../client-supabase";

export const login = async (email: string, password: string) => {
    const { data, error } = await supabase.rpc('loginfunc', {
        email_input: email,
        password_input: password
    });

    if (error) {
        console.error("Error during login:", error);
        return null;
    }
    console.log("Login successful:", data);
    return data;
}