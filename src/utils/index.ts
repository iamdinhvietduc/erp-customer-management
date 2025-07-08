import { CustomerCategory, CUSTOMER_CATEGORIES } from '@/types';

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN');
};

export const getCategoryLabel = (category: CustomerCategory) => {
  return CUSTOMER_CATEGORIES[category];
};

export const getCategoryColor = (category: CustomerCategory) => {
  const colors = {
    POTENTIAL: 'bg-yellow-100 text-yellow-800',
    CLOSED: 'bg-green-100 text-green-800',
    REGULAR: 'bg-blue-100 text-blue-800',
    PROMISING: 'bg-purple-100 text-purple-800'
  };
  return colors[category];
};

export const generateCustomerCode = (existingCodes: string[]) => {
  const numbers = existingCodes
    .map(code => parseInt(code.replace('KH', '')))
    .filter(num => !isNaN(num));
  
  const maxNumber = numbers.length > 0 ? Math.max(...numbers) : 0;
  return `KH${(maxNumber + 1).toString().padStart(3, '0')}`;
};

export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string) => {
  const phoneRegex = /^(\+84|84|0)(3|5|7|8|9)[0-9]{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const downloadFile = (fileName: string) => {
  const link = document.createElement('a');
  link.href = '#';
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  alert(`Đang tải xuống file: ${fileName}`);
};

export const printFile = (fileName: string) => {
  alert(`Đang in file: ${fileName}`);
}; 