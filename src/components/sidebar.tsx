'use client';

import React from 'react';
import { LayoutDashboard, Wrench, Package, Gauge, Droplet, BookOpen, Calendar, Users, BarChart3, Ship, Settings } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, isActive: false },
  { id: 'maintenance', label: 'Planned Maintenance', icon: <Wrench size={20} />, isActive: false },
  { id: 'spares', label: 'Spares Inventory', icon: <Package size={20} />, isActive: false },
  { id: 'machinery', label: 'Machinery Running Hrs', icon: <Gauge size={20} />, isActive: false },
  { id: 'lube', label: 'Lube oil Summary', icon: <Droplet size={20} />, isActive: false },
  { id: 'library', label: 'Library', icon: <BookOpen size={20} />, isActive: false },
  { id: 'pms', label: 'PMS Calendar', icon: <Calendar size={20} />, isActive: false },
  { id: 'users', label: 'User Management Roles', icon: <Users size={20} />, isActive: false },
  { id: 'reports', label: 'Reports', icon: <BarChart3 size={20} />, isActive: false },
  { id: 'fleet', label: 'Fleet Management', icon: <Ship size={20} />, isActive: true },
  { id: 'settings', label: 'Settings', icon: <Settings size={20} />, isActive: false },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">

      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-16 h-16 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 text-6xl font-bold">3</span>
            <span className="text-green-300 text-6xl font-bold">S</span>
          </div>
          <div>
            <p className="uppercase text-xl font-semibold text-gray-500">Smart Ship</p>
            <p className="uppercase text-xl font-semibold text-gray-500">Solutions</p>
          </div>
        </div>
      </div>

      <nav className="p-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
              item.isActive
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className={`${item.isActive ? 'text-blue-600' : 'text-gray-400'}`}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
