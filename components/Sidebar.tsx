'use client';
import { useState } from "react";
import { Users, Calculator, LogOut, LayoutDashboardIcon } from 'lucide-react';
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";


const Sidebar= () => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboardIcon },
    { id: 'clients', label: 'Clientes', icon: Users },
    { id: 'accounting', label: 'Contabilidad', icon: Calculator },
  ];
  const router = useRouter();

  const handleItems = (id: string) => {
    setActiveItem(id);
    // Aquí podrías agregar lógica para navegar a la sección correspondiente
    // Por ejemplo, usando useRouter de Next.js:
    router.push(`/${id}`);
  }

  return (
    <div className="h-screen bg-gradient-to-b from-green-600 to-green-700 w-64 shadow-2xl flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-green-500">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-300 to-green-400 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-green-800 rounded-full"></div>
            </div>
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Sistema</h2>
            <p className="text-green-200 text-sm">Panel de Control</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleItems(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                activeItem === item.id
                  ? 'bg-white text-green-700 shadow-lg transform scale-105'
                  : 'text-white hover:bg-green-500 hover:scale-102'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-green-500">
        <button          
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-white hover:bg-red-500 transition-all duration-200 group"
          onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
        >
          <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar