"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

import {
  Building,
  ClipboardPlusIcon,
  HomeIcon,
  LayoutGridIcon,
  MicroscopeIcon,
  ScrollTextIcon,
  ShoppingBasketIcon,
  UsersIcon,
  PackageIcon,
  LayersIcon,
  TagIcon,
  ChevronDown,
  TruckIcon,
  ArrowLeftRight
} from "lucide-react";
import Logout from "@/actions/auth/logout";

type Role = 'SuperAdmin' | 'Oficina';

const rolePermissions: Record<Role, { 
  users?: boolean, 
  employee?: boolean
}> = {
  SuperAdmin: { 
    employee: true, 
    users: true, 
  },
  Oficina: { 
    employee: true, 
  },
};

interface MainNavProps {
  role: Role;
}

export default function MainNav({ role }: MainNavProps) {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const permissions = rolePermissions[role];

  const toggleInventory = () => setIsInventoryOpen((prev) => !prev);

  const Log = async () => {
    await Logout();
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <Link
          href="/"
          className="items-center gap-2 font-bold hidden lg:flex"
          prefetch={false}
        >
          <span className="text-lg">Ferreteria, Transporte, Producción Empresa AMHER</span>
        </Link>

        <nav className="space-y-1">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
            prefetch={false}
          >
            <HomeIcon className="h-5 w-5 stroke-slate-500 stroke-[2px]" />
            Inicio
          </Link>

          {permissions.employee && (
            <div>
              <button
                onClick={toggleInventory}
                className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
              >
                <div className="flex items-center gap-2">
                  <LayoutGridIcon className="h-5 w-5" />
                  Empleados
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isInventoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isInventoryOpen ? "max-h-50" : "max-h-0"
                }`}
              >
                <ul className="ml-6 mt-2 space-y-1">
                  <li>
                    <Link
                      href="/category"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-200 rounded-md dark:hover:bg-gray-700"
                      prefetch={false}
                    >
                      <TagIcon className="h-4 w-4" />
                      Usuarios
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/inventory"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-200 rounded-md dark:hover:bg-gray-700"
                      prefetch={false}
                    >
                      <PackageIcon className="h-4 w-4" />
                      Tipos de puestos
                    </Link>
                  </li>
                  <li>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {permissions.users && (
            <Link
              href="/user"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
              prefetch={false}
            >
              <UsersIcon className="h-5 w-5" />
              Usuarios
            </Link>
          )}
        </nav>
      </div>

      <div className="space-y-4">
        <Button onClick={Log} variant="default" size="sm" className="w-full">
          Cerrar sesión
        </Button>
      </div>
    </>
  );
}