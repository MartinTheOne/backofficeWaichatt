import { getClients } from "@/lib/database/clients"
import ClientesComponent from "./client";
export default async function Client() {
    const clients = await getClients();

    if(!clients) return null;
    console.log(clients);
    return (<ClientesComponent clientes={clients}/>)

}