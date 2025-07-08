import React from 'react';
import { Download, Printer, Mail, Phone, MapPin, Calendar, User, Building, Hash } from 'lucide-react';
import { Customer } from '@/types';
import { Button } from '@/components/ui';
import { formatDate, getCategoryLabel, getCategoryColor, downloadFile, printFile } from '@/utils';

interface CustomerDetailProps {
  customer: Customer;
  onEdit: () => void;
}

export const CustomerDetail: React.FC<CustomerDetailProps> = ({
  customer,
  onEdit
}) => {
  const handleDownloadTemplate = (templateId: string) => {
    const template = customer.templates?.find(t => t.id === templateId);
    if (template) {
      downloadFile(template.fileName);
    }
  };

  const handlePrintTemplate = (templateId: string) => {
    const template = customer.templates?.find(t => t.id === templateId);
    if (template) {
      printFile(template.fileName);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{customer.name}</h2>
          <p className="text-sm text-gray-600 mt-1">Mã khách hàng: {customer.code}</p>
          <div className="mt-2">
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(customer.category)}`}>
              {getCategoryLabel(customer.category)}
            </span>
          </div>
        </div>
        <Button onClick={onEdit}>
          Chỉnh sửa
        </Button>
      </div>

      {/* Thông tin cơ bản */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Thông tin liên hệ */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin liên hệ</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">{customer.representative}</p>
                <p className="text-sm text-gray-600">{customer.position}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <a 
                  href={`mailto:${customer.email}`}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {customer.email}
                </a>
              </div>
            </div>
            
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <a 
                  href={`tel:${customer.phone}`}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {customer.phone}
                </a>
              </div>
            </div>
            
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-600">{customer.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin doanh nghiệp */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin doanh nghiệp</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Hash className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Mã số thuế</p>
                <p className="text-sm text-gray-600">{customer.taxNumber}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Ngày cấp GĐKKD</p>
                <p className="text-sm text-gray-600">{formatDate(customer.businessLicenseDate)}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Building className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Người phụ trách</p>
                <p className="text-sm text-gray-600">{customer.assignee}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Người nhập</p>
                <p className="text-sm text-gray-600">{customer.createdBy}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Ngày tạo</p>
                <p className="text-sm text-gray-600">{formatDate(customer.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Biểu mẫu */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Biểu mẫu ({customer.templates?.length || 0})</h3>
        
        {customer.templates && customer.templates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customer.templates.map((template) => (
              <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {template.templateName}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {template.fileName}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Tạo ngày: {formatDate(template.createdAt)}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadTemplate(template.id)}
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Tải xuống
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePrintTemplate(template.id)}
                    className="flex-1"
                  >
                    <Printer className="h-4 w-4 mr-1" />
                    In
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Building className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p>Chưa có biểu mẫu nào</p>
            <p className="text-sm">Biểu mẫu sẽ được tự động tạo khi bạn tải lên template mới</p>
          </div>
        )}
      </div>
    </div>
  );
}; 