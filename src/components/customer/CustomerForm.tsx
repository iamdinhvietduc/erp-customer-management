import React, { useState, useEffect } from 'react';
import { Customer, CustomerCategory, CUSTOMER_CATEGORIES } from '@/types';
import { Button, Input, Select } from '@/components/ui';
import { mockUsers } from '@/data/mockData';
import { isValidEmail, isValidPhone, generateCustomerCode } from '@/utils';

interface CustomerFormProps {
  customer?: Customer | null;
  existingCodes: string[];
  onSubmit: (customer: Omit<Customer, 'id' | 'createdAt' | 'templates'>) => void;
  onCancel: () => void;
}

interface FormData {
  code: string;
  name: string;
  taxNumber: string;
  businessLicenseDate: string;
  representative: string;
  position: string;
  email: string;
  phone: string;
  address: string;
  category: CustomerCategory | '';
  assignee: string;
  createdBy: string;
}

interface FormErrors {
  [key: string]: string;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
  customer,
  existingCodes,
  onSubmit,
  onCancel
}) => {
  const isEditing = !!customer;

  const [formData, setFormData] = useState<FormData>({
    code: '',
    name: '',
    taxNumber: '',
    businessLicenseDate: '',
    representative: '',
    position: '',
    email: '',
    phone: '',
    address: '',
    category: '',
    assignee: '',
    createdBy: 'Nguyễn Văn A' // Mock current user
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (customer) {
      setFormData({
        code: customer.code,
        name: customer.name,
        taxNumber: customer.taxNumber,
        businessLicenseDate: customer.businessLicenseDate,
        representative: customer.representative,
        position: customer.position,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        category: customer.category,
        assignee: customer.assignee,
        createdBy: customer.createdBy
      });
    } else {
      // Generate new customer code for new customer
      const newCode = generateCustomerCode(existingCodes);
      setFormData(prev => ({ ...prev, code: newCode }));
    }
  }, [customer, existingCodes]);

  const categoryOptions = Object.entries(CUSTOMER_CATEGORIES).map(([key, label]) => ({
    value: key,
    label
  }));

  const userOptions = mockUsers.map(user => ({
    value: user.name,
    label: user.name
  }));

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Tên khách hàng là bắt buộc';
    }

    if (!formData.taxNumber.trim()) {
      newErrors.taxNumber = 'Mã số thuế là bắt buộc';
    }

    if (!formData.businessLicenseDate) {
      newErrors.businessLicenseDate = 'Ngày cấp giấy ĐK kinh doanh là bắt buộc';
    }

    if (!formData.representative.trim()) {
      newErrors.representative = 'Người đại diện là bắt buộc';
    }

    if (!formData.position.trim()) {
      newErrors.position = 'Chức vụ là bắt buộc';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Số điện thoại là bắt buộc';
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Địa chỉ là bắt buộc';
    }

    if (!formData.category) {
      newErrors.category = 'Phân loại khách hàng là bắt buộc';
    }

    if (!formData.assignee) {
      newErrors.assignee = 'Người phụ trách là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        category: formData.category as CustomerCategory
      });
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {/* Thông tin chung */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Thông tin chung</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Mã khách hàng"
            value={formData.code}
            onChange={(e) => handleInputChange('code', e.target.value)}
            error={errors.code}
            required
            disabled={isEditing}
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Người phụ trách <span className="text-red-500">*</span>
            </label>
            <Select
              options={userOptions}
              value={formData.assignee}
              onChange={(value) => handleInputChange('assignee', value)}
              placeholder="Chọn người phụ trách"
            />
            {errors.assignee && (
              <p className="text-sm text-red-600 mt-1">{errors.assignee}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phân loại khách hàng <span className="text-red-500">*</span>
            </label>
            <Select
              options={categoryOptions}
              value={formData.category}
              onChange={(value) => handleInputChange('category', value)}
              placeholder="Chọn phân loại"
            />
            {errors.category && (
              <p className="text-sm text-red-600 mt-1">{errors.category}</p>
            )}
          </div>
        </div>
      </div>

      {/* Thông tin khách hàng */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Thông tin khách hàng</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Tên khách hàng"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={errors.name}
            required
          />

          <Input
            label="Mã số thuế"
            value={formData.taxNumber}
            onChange={(e) => handleInputChange('taxNumber', e.target.value)}
            error={errors.taxNumber}
            required
          />

          <Input
            label="Ngày cấp giấy ĐK kinh doanh"
            type="date"
            value={formData.businessLicenseDate}
            onChange={(e) => handleInputChange('businessLicenseDate', e.target.value)}
            error={errors.businessLicenseDate}
            required
          />

          <Input
            label="Người đại diện"
            value={formData.representative}
            onChange={(e) => handleInputChange('representative', e.target.value)}
            error={errors.representative}
            required
          />

          <Input
            label="Chức vụ"
            value={formData.position}
            onChange={(e) => handleInputChange('position', e.target.value)}
            error={errors.position}
            required
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
            required
          />

          <Input
            label="Số điện thoại"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            error={errors.phone}
            required
          />

          <div className="md:col-span-2">
            <Input
              label="Địa chỉ"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              error={errors.address}
              required
            />
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
          {isEditing ? 'Cập nhật' : 'Thêm mới'}
        </Button>
      </div>
    </form>
  );
}; 