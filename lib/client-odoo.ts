import axios from 'axios';


export const apiOdoo = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ODOO_API_URL || 'https://waichatt.odoo.com',
    headers: {
        'Content-Type': 'application/json'
    }
});

