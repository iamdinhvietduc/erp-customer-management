import React from 'react';
import { Edit, Trash2, FileText, Download, Printer } from 'lucide-react';
import { Customer, CustomerCategory, CUSTOMER_CATEGORIES } from '@/types';
import { Button, Select } from '@/components/ui';
import { formatDate, downloadFile, printFile } from '@/utils';

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
  onViewDetails: (customer: Customer) => void;
  onUpdateCategory: (id: string, category: CustomerCategory) => void;
}

export const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  onEdit,
  onDelete,
  onViewDetails,
  onUpdateCategory
}) => {
  const categoryOptions = Object.entries(CUSTOMER_CATEGORIES).map(([key, label]) => ({
    value: key,
    label
  }));

  const handleCategoryChange = (customerId: string, category: string) => {
    onUpdateCategory(customerId, category as CustomerCategory);
  };

  const handleDownloadTemplate = (customer: Customer, templateId: string) => {
    const template = customer.templates?.find(t => t.id === templateId);
    if (template) {
      downloadFile(template.fileName);
    }
  };

  const handlePrintTemplate = (customer: Customer, templateId: string) => {
    const template = customer.templates?.find(t => t.id === templateId);
    if (template) {
      printFile(template.fileName);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              STT
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mã KH
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Thông tin KH
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ngày tạo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phân loại
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Người nhập
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Người phụ trách
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {customers.map((customer, index) => (
            <tr key={customer.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {customer.code}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onViewDetails(customer)}
                  className="text-blue-600 hover:text-blue-900 hover:underline text-sm"
                >
                  {customer.name}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(customer.createdAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Select
                  options={categoryOptions}
                  value={customer.category}
                  onChange={(value) => handleCategoryChange(customer.id, value)}
                  className="w-40"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {customer.createdBy}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {customer.assignee}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(customer)}
                    className="p-2"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(customer.id)}
                    className="p-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  
                  {/* Templates dropdown */}
                  {customer.templates && customer.templates.length > 0 && (
                    <div className="relative group">
                      <Button
                        variant="outline"
                        size="sm"
                        className="p-2"
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                        <div className="p-2">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Biểu mẫu</h4>
                          {customer.templates.map((template) => (
                            <div key={template.id} className="flex items-center justify-between py-1">
                              <span className="text-xs text-gray-600 truncate flex-1">
                                {template.templateName}
                              </span>
                              <div className="flex space-x-1 ml-2">
                                <button
                                  onClick={() => handleDownloadTemplate(customer, template.id)}
                                  className="p-1 text-gray-400 hover:text-blue-600"
                                  title="Tải xuống"
                                >
                                  <Download className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={() => handlePrintTemplate(customer, template.id)}
                                  className="p-1 text-gray-400 hover:text-green-600"
                                  title="In"
                                >
                                  <Printer className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {customers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Chưa có khách hàng nào
        </div>
      )}
    </div>
  );
}; 