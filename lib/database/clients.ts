import { supabase } from "../client-supabase";

export const getClients = async () => {
  const { data, error } = await supabase
    .from('waichatt_vista_completa_clientes')
    .select('*')

  if (error) {
    console.error("Error fetching clients:", error);
    return [];
  }

  return data;
}