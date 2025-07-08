import React, { useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { Button, Input } from '@/components/ui';

interface TemplateFormProps {
  onSubmit: (template: { name: string; fileName: string; placeholders: string[] }) => void;
  onCancel: () => void;
}

export const TemplateForm: React.FC<TemplateFormProps> = ({
  onSubmit,
  onCancel
}) => {
  const [templateName, setTemplateName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [placeholders, setPlaceholders] = useState<string[]>([]);
  const [newPlaceholder, setNewPlaceholder] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Mock placeholders phổ biến
  const commonPlaceholders = [
    '{Tên khách hàng}',
    '{Mã khách hàng}',
    '{Mã số thuế}',
    '{Ngày cấp GĐKKD}',
    '{Người đại diện}',
    '{Chức vụ}',
    '{Email}',
    '{Số điện thoại}',
    '{Địa chỉ}',
    '{Mã hợp đồng}',
    '{Ngày ký hợp đồng}',
    '{Giá trị hợp đồng}'
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Kiểm tra định dạng file
      if (!file.name.toLowerCase().endsWith('.docx') && !file.name.toLowerCase().endsWith('.doc')) {
        setErrors({ file: 'Chỉ chấp nhận file Word (.doc, .docx)' });
        return;
      }
      
      setSelectedFile(file);
      setErrors({ ...errors, file: '' });
      
      // Tự động phát hiện placeholders (mock)
      // Trong thực tế, bạn sẽ cần parse file Word để tìm placeholders
      const mockDetectedPlaceholders = [
        '{Tên khách hàng}',
        '{Mã số thuế}',
        '{Người đại diện}'
      ];
      setPlaceholders(mockDetectedPlaceholders);
    }
  };

  const addPlaceholder = () => {
    if (newPlaceholder.trim() && !placeholders.includes(newPlaceholder.trim())) {
      setPlaceholders([...placeholders, newPlaceholder.trim()]);
      setNewPlaceholder('');
    }
  };

  const removePlaceholder = (placeholder: string) => {
    setPlaceholders(placeholders.filter(p => p !== placeholder));
  };

  const addCommonPlaceholder = (placeholder: string) => {
    if (!placeholders.includes(placeholder)) {
      setPlaceholders([...placeholders, placeholder]);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!templateName.trim()) {
      newErrors.templateName = 'Tên biểu mẫu là bắt buộc';
    }

    if (!selectedFile) {
      newErrors.file = 'Vui lòng chọn file biểu mẫu';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm() && selectedFile) {
      onSubmit({
        name: templateName.trim(),
        fileName: selectedFile.name,
        placeholders
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {/* Tên biểu mẫu */}
      <Input
        label="Tên biểu mẫu"
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
        placeholder="VD: Biểu mẫu đánh giá sơ bộ"
        error={errors.templateName}
        required
      />

      {/* Upload file */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Chọn file biểu mẫu <span className="text-red-500">*</span>
        </label>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <input
            type="file"
            accept=".doc,.docx"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600">
              Kéo thả file vào đây hoặc{' '}
              <span className="text-blue-600 underline">chọn file</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Chỉ chấp nhận file Word (.doc, .docx)
            </p>
          </label>
        </div>
        
        {selectedFile && (
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <FileText className="h-4 w-4 mr-2" />
            <span>{selectedFile.name}</span>
            <button
              type="button"
              onClick={() => setSelectedFile(null)}
              className="ml-2 text-red-600 hover:text-red-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        
        {errors.file && (
          <p className="text-sm text-red-600 mt-1">{errors.file}</p>
        )}
      </div>

      {/* Placeholders */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Biến trong biểu mẫu (Placeholders)
        </label>
        
        {/* Placeholders đã phát hiện */}
        {placeholders.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Biến đã phát hiện:</p>
            <div className="flex flex-wrap gap-2">
              {placeholders.map((placeholder) => (
                <span
                  key={placeholder}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {placeholder}
                  <button
                    type="button"
                    onClick={() => removePlaceholder(placeholder)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Thêm placeholder mới */}
        <div className="flex space-x-2 mb-4">
          <Input
            value={newPlaceholder}
            onChange={(e) => setNewPlaceholder(e.target.value)}
            placeholder="VD: {Tên khách hàng}"
            className="flex-1"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addPlaceholder();
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={addPlaceholder}
            disabled={!newPlaceholder.trim()}
          >
            Thêm
          </Button>
        </div>
        
        {/* Placeholders phổ biến */}
        <div>
          <p className="text-sm text-gray-600 mb-2">Hoặc chọn từ danh sách phổ biến:</p>
          <div className="flex flex-wrap gap-2">
            {commonPlaceholders
              .filter(p => !placeholders.includes(p))
              .map((placeholder) => (
              <button
                key={placeholder}
                type="button"
                onClick={() => addCommonPlaceholder(placeholder)}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {placeholder}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Hủy
        </Button>
        <Button type="submit">
          Tải lên biểu mẫu
        </Button>
      </div>
    </form>
  );
}; 