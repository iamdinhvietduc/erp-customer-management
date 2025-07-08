'use client';

import React, { useState } from 'react';
import { Plus, Users } from 'lucide-react';
import { Customer, CustomerCategory } from '@/types';
import { Button, Modal } from '@/components/ui';
import { CustomerTable, CustomerForm, CustomerDetail } from '@/components/customer';
import { useCustomers } from '@/hooks/useCustomers';

export default function CustomersPage() {
  const {
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
  } = useCustomers();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);

  const handleAddCustomer = (customerData: Omit<Customer, 'id' | 'createdAt' | 'templates'>) => {
    addCustomer(customerData);
    setShowAddModal(false);
  };

  const handleEditCustomer = (customerData: Omit<Customer, 'id' | 'createdAt' | 'templates'>) => {
    if (editingCustomer) {
      updateCustomer(editingCustomer.id, customerData);
      setEditingCustomer(null);
    }
  };

  const handleDeleteCustomer = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
      deleteCustomer(id);
    }
  };

  const handleEditFromDetail = () => {
    if (viewingCustomer) {
      setEditingCustomer(viewingCustomer);
      setViewingCustomer(null);
    }
  };

  const handleUpdateCategory = (id: string, category: CustomerCategory) => {
    updateCustomer(id, { category });
  };

  const existingCodes = customers.map(c => c.code);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Users className="h-8 w-8 mr-3 text-blue-600" />
                Quản lý khách hàng
              </h1>
              <p className="text-gray-600 mt-2">
                Quản lý thông tin khách hàng trong hệ thống ERP
              </p>
            </div>
            <Button
              onClick={() => setShowAddModal(true)}
              className="flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Thêm mới khách hàng
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng khách hàng</p>
                <p className="text-3xl font-bold text-gray-900">{customers.length}</p>
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
                <p className="text-3xl font-bold text-green-600">
                  {customers.filter(c => c.category === 'CLOSED').length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">KH tiềm năng</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {customers.filter(c => c.category === 'POTENTIAL').length}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">KH khả quan</p>
                <p className="text-3xl font-bold text-purple-600">
                  {customers.filter(c => c.category === 'PROMISING').length}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Danh sách khách hàng ({customers.length})
            </h2>
          </div>
          
          <CustomerTable
            customers={customers}
            onEdit={setEditingCustomer}
            onDelete={handleDeleteCustomer}
            onViewDetails={setViewingCustomer}
            onUpdateCategory={handleUpdateCategory}
          />
        </div>

        {/* Add Customer Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Thêm mới khách hàng"
          size="xl"
        >
          <CustomerForm
            existingCodes={existingCodes}
            onSubmit={handleAddCustomer}
            onCancel={() => setShowAddModal(false)}
          />
        </Modal>

        {/* Edit Customer Modal */}
        <Modal
          isOpen={!!editingCustomer}
          onClose={() => setEditingCustomer(null)}
          title="Chỉnh sửa khách hàng"
          size="xl"
        >
          {editingCustomer && (
            <CustomerForm
              customer={editingCustomer}
              existingCodes={existingCodes}
              onSubmit={handleEditCustomer}
              onCancel={() => setEditingCustomer(null)}
            />
          )}
        </Modal>

        {/* Customer Detail Modal */}
        <Modal
          isOpen={!!viewingCustomer}
          onClose={() => setViewingCustomer(null)}
          title="Chi tiết khách hàng"
          size="xl"
        >
          {viewingCustomer && (
            <CustomerDetail
              customer={viewingCustomer}
              onEdit={handleEditFromDetail}
            />
          )}
        </Modal>
      </div>
    </div>
  );
} 