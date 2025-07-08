import React from 'react';
import { FileText, Trash2, Download, Calendar, Tag } from 'lucide-react';
import { Template } from '@/types';
import { Button } from '@/components/ui';
import { formatDate, downloadFile } from '@/utils';

interface TemplateListProps {
  templates: Template[];
  onDelete: (id: string) => void;
}

export const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  onDelete
}) => {
  const handleDownload = (template: Template) => {
    downloadFile(template.fileName);
  };

  const handleDelete = (template: Template) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa biểu mẫu "${template.name}"?\n\nViệc này sẽ xóa biểu mẫu khỏi tất cả khách hàng.`)) {
      onDelete(template.id);
    }
  };

  if (templates.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có biểu mẫu nào</h3>
        <p className="text-gray-500 mb-6">Hãy tải lên biểu mẫu đầu tiên để bắt đầu sử dụng</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {templates.map((template) => (
        <div
          key={template.id}
          className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center mb-2">
                <FileText className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  {template.name}
                </h3>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Tạo ngày: {formatDate(template.createdAt)}</span>
                <span className="mx-2">•</span>
                <span>{template.fileName}</span>
              </div>
              
              {template.placeholders.length > 0 && (
                <div>
                  <div className="flex items-center mb-2">
                    <Tag className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm font-medium text-gray-700">
                      Biến trong biểu mẫu ({template.placeholders.length})
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {template.placeholders.map((placeholder, index) => (
                      <span
                        key={index}
                        className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                      >
                        {placeholder}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex space-x-2 ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(template)}
                title="Tải xuống"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(template)}
                title="Xóa"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Biểu mẫu này sẽ tự động được tạo cho tất cả khách hàng hiện tại và mới
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}; 