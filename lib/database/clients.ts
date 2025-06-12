import { supabase } from "../client-supabase";


export const getLenghtClients = async () => {
  const { data, error } = await supabase
    .from('waichatt_vista_completa_clientes')
    .select('*', { count: 'exact' });

  if (error) {
    console.error("Error fetching clients length:", error);
    return 0;
  }

  return data?.length || 0;
}




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