'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, FileText, Home } from 'lucide-react';

const navItems = [
  {
    name: 'Trang chủ',
    href: '/',
    icon: Home
  },
  {
    name: 'Quản lý khách hàng',
    href: '/customers',
    icon: Users
  },
  {
    name: 'Quản lý biểu mẫu',
    href: '/templates',
    icon: FileText
  }
];

export const Navigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">ERP Customer</span>
              </Link>
            </div>
            
            {/* Navigation items */}
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          
          {/* User info */}
          <div className="flex items-center">
            <div className="flex items-center text-sm text-gray-700">
              <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <span>Nguyễn Văn A</span>
            </div>
          </div>
        </div>
        
        {/* Mobile navigation */}
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                  }`}
                >
                  <div className="flex items-center">
                    <Icon className="h-4 w-4 mr-3" />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}; 