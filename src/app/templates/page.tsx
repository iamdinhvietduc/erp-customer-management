'use client';

import React, { useState } from 'react';
import { Plus, FileText, Upload } from 'lucide-react';
import { Button, Modal } from '@/components/ui';
import { TemplateForm, TemplateList } from '@/components/template';
import { useCustomers } from '@/hooks/useCustomers';

export default function TemplatesPage() {
  const { templates, addTemplate, deleteTemplate } = useCustomers();
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleUploadTemplate = (templateData: { name: string; fileName: string; placeholders: string[] }) => {
    addTemplate(templateData);
    setShowUploadModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <FileText className="h-8 w-8 mr-3 text-blue-600" />
                Quản lý biểu mẫu
              </h1>
              <p className="text-gray-600 mt-2">
                Tải lên và quản lý các biểu mẫu Word cho khách hàng
              </p>
            </div>
            <Button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center"
            >
              <Upload className="h-5 w-5 mr-2" />
              Tải biểu mẫu mới
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng biểu mẫu</p>
                <p className="text-3xl font-bold text-gray-900">{templates.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng placeholders</p>
                <p className="text-3xl font-bold text-green-600">
                  {templates.reduce((total, template) => total + template.placeholders.length, 0)}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Biểu mẫu mới nhất</p>
                <p className="text-lg font-bold text-purple-600">
                  {templates.length > 0 
                    ? (() => {
                        const latestTemplate = [...templates]
                          .sort((a, b) => {
                            const dateA = new Date(a.createdAt);
                            const dateB = new Date(b.createdAt);
                            return dateB.valueOf() - dateA.valueOf();
                          })[0];
                        return latestTemplate.name.length > 20
                          ? latestTemplate.name.substring(0, 20) + '...'
                          : latestTemplate.name;
                      })()
                    : 'Chưa có'
                  }
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Cách thức hoạt động</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">1. Tải lên biểu mẫu</h3>
              <p className="text-sm text-gray-600">
                Tải lên file Word (.docx) chứa các biến như {`{Tên khách hàng}`}
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">2. Tự động phát hiện biến</h3>
              <p className="text-sm text-gray-600">
                Hệ thống tự động nhận diện các placeholder trong biểu mẫu
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">3. Tạo cho tất cả KH</h3>
              <p className="text-sm text-gray-600">
                Biểu mẫu sẽ được tạo tự động cho tất cả khách hàng hiện tại và mới
              </p>
            </div>
          </div>
        </div>

        {/* Template List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Danh sách biểu mẫu ({templates.length})
            </h2>
          </div>
          
          <div className="p-6">
            <TemplateList
              templates={templates}
              onDelete={deleteTemplate}
            />
          </div>
        </div>

        {/* Upload Template Modal */}
        <Modal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          title="Tải biểu mẫu mới"
          size="lg"
        >
          <TemplateForm
            onSubmit={handleUploadTemplate}
            onCancel={() => setShowUploadModal(false)}
          />
        </Modal>
      </div>
    </div>
  );
} 