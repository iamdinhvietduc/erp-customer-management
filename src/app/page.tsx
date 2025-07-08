'use client';

import React from 'react';
import Link from 'next/link';
import { Users, FileText, Plus, TrendingUp, Calendar, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui';
import { useCustomers } from '@/hooks/useCustomers';
import { formatDate } from '@/utils';

export default function HomePage() {
  const { customers, templates } = useCustomers();

  const stats = {
    totalCustomers: customers.length,
    closedCustomers: customers.filter(c => c.category === 'CLOSED').length,
    potentialCustomers: customers.filter(c => c.category === 'POTENTIAL').length,
    promisingCustomers: customers.filter(c => c.category === 'PROMISING').length,
    totalTemplates: templates.length,
    recentCustomers: [...customers]
      .sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.valueOf() - dateA.valueOf();
      })
      .slice(0, 5)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Tổng quan hệ thống quản lý khách hàng ERP
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link href="/customers">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white hover:from-blue-600 hover:to-blue-700 transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Quản lý khách hàng</h3>
                  <p className="text-blue-100 mt-1">Thêm, sửa, xóa và quản lý thông tin khách hàng</p>
                </div>
                <Users className="h-10 w-10 text-blue-200" />
              </div>
            </div>
          </Link>
          
          <Link href="/templates">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white hover:from-green-600 hover:to-green-700 transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Quản lý biểu mẫu</h3>
                  <p className="text-green-100 mt-1">Tải lên và quản lý các biểu mẫu Word</p>
                </div>
                <FileText className="h-10 w-10 text-green-200" />
              </div>
            </div>
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng khách hàng</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalCustomers}</p>
                <p className="text-sm text-green-600 mt-1">
                  <TrendingUp className="h-4 w-4 inline mr-1" />
                  Đang hoạt động
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">KH đã chốt</p>
                <p className="text-3xl font-bold text-green-600">{stats.closedCustomers}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {stats.totalCustomers > 0 
                    ? `${Math.round((stats.closedCustomers / stats.totalCustomers) * 100)}% tổng số`
                    : '0% tổng số'
                  }
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">KH tiềm năng</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.potentialCustomers}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {stats.totalCustomers > 0 
                    ? `${Math.round((stats.potentialCustomers / stats.totalCustomers) * 100)}% tổng số`
                    : '0% tổng số'
                  }
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Biểu mẫu</p>
                <p className="text-3xl font-bold text-purple-600">{stats.totalTemplates}</p>
                <p className="text-sm text-gray-500 mt-1">Template đã tạo</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Customers */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Khách hàng mới nhất</h2>
                <Link href="/customers">
                  <Button variant="outline" size="sm">
                    Xem tất cả
                  </Button>
                </Link>
              </div>
            </div>
            <div className="p-6">
              {stats.recentCustomers.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentCustomers.map((customer) => (
                    <div key={customer.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{customer.name}</p>
                          <p className="text-sm text-gray-500">{customer.code}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          <Calendar className="h-4 w-4 inline mr-1" />
                          {formatDate(customer.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p>Chưa có khách hàng nào</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Thao tác nhanh</h2>
            </div>
            <div className="p-6 space-y-4">
              <Link href="/customers">
                <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                    <Plus className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Thêm khách hàng mới</p>
                    <p className="text-sm text-gray-500">Tạo hồ sơ khách hàng mới trong hệ thống</p>
                  </div>
                </div>
              </Link>
              
              <Link href="/templates">
                <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Tải biểu mẫu mới</p>
                    <p className="text-sm text-gray-500">Upload template Word cho khách hàng</p>
                  </div>
                </div>
              </Link>

              <div className="flex items-center p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Báo cáo thống kê</p>
                  <p className="text-sm text-gray-500">Xem báo cáo chi tiết (sắp ra mắt)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 