'use client';

import Sidebar from "@/components/Sidebar";
import { usePathname } from 'next/navigation';

export default function PrivadoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flexGrow: 1 }}>{children}</main>
    </div>
  );
}
