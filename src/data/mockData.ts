import { Customer, Template, User } from '@/types';

export const mockUsers: User[] = [
  { id: '1', name: 'Nguyễn Văn A', role: 'Trưởng phòng kinh doanh' },
  { id: '2', name: 'Trần Thị B', role: 'Nhân viên kinh doanh' },
  { id: '3', name: 'Lê Văn C', role: 'Nhân viên tư vấn' },
  { id: '4', name: 'Phạm Thị D', role: 'Quản lý khách hàng' },
];

export const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Biểu mẫu đánh giá sơ bộ',
    fileName: 'bieu-mau-danh-gia-so-bo.docx',
    placeholders: ['{Tên khách hàng}', '{Mã số thuế}', '{Ngày cấp GĐKKD}', '{Người đại diện}'],
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Hợp đồng dịch vụ',
    fileName: 'hop-dong-dich-vu.docx',
    placeholders: ['{Tên khách hàng}', '{Mã hợp đồng}', '{Địa chỉ}', '{Email}', '{Số điện thoại}'],
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    name: 'Báo giá dịch vụ',
    fileName: 'bao-gia-dich-vu.docx',
    placeholders: ['{Tên khách hàng}', '{Người đại diện}', '{Chức vụ}', '{Email}'],
    createdAt: '2024-01-05'
  }
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    code: 'KH001',
    name: 'Công ty TNHH ABC',
    taxNumber: '0123456789',
    businessLicenseDate: '2020-01-15',
    representative: 'Nguyễn Văn An',
    position: 'Giám đốc',
    email: 'contact@abc.com.vn',
    phone: '0901234567',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    category: 'CLOSED',
    assignee: 'Nguyễn Văn A',
    createdBy: 'Trần Thị B',
    createdAt: '2024-01-20',
    templates: [
      {
        id: '1',
        templateId: '1',
        templateName: 'Biểu mẫu đánh giá sơ bộ',
        fileName: 'danh-gia-so-bo-abc.docx',
        createdAt: '2024-01-21'
      },
      {
        id: '2',
        templateId: '2',
        templateName: 'Hợp đồng dịch vụ',
        fileName: 'hop-dong-abc.docx',
        createdAt: '2024-01-22'
      }
    ]
  },
  {
    id: '2',
    code: 'KH002',
    name: 'Công ty Cổ phần XYZ',
    taxNumber: '0987654321',
    businessLicenseDate: '2019-05-20',
    representative: 'Trần Thị Bích',
    position: 'Tổng giám đốc',
    email: 'info@xyz.vn',
    phone: '0912345678',
    address: '456 Đường XYZ, Quận 3, TP.HCM',
    category: 'POTENTIAL',
    assignee: 'Lê Văn C',
    createdBy: 'Nguyễn Văn A',
    createdAt: '2024-01-18',
    templates: [
      {
        id: '3',
        templateId: '3',
        templateName: 'Báo giá dịch vụ',
        fileName: 'bao-gia-xyz.docx',
        createdAt: '2024-01-19'
      }
    ]
  },
  {
    id: '3',
    code: 'KH003',
    name: 'Doanh nghiệp DEF',
    taxNumber: '0555666777',
    businessLicenseDate: '2021-03-10',
    representative: 'Lê Văn Cường',
    position: 'Chủ doanh nghiệp',
    email: 'contact@def.com',
    phone: '0923456789',
    address: '789 Đường DEF, Quận 7, TP.HCM',
    category: 'REGULAR',
    assignee: 'Phạm Thị D',
    createdBy: 'Trần Thị B',
    createdAt: '2024-01-15',
    templates: []
  },
  {
    id: '4',
    code: 'KH004',
    name: 'Công ty TNHH GHI',
    taxNumber: '0333444555',
    businessLicenseDate: '2022-07-25',
    representative: 'Phạm Thị Dao',
    position: 'Giám đốc điều hành',
    email: 'admin@ghi.vn',
    phone: '0934567890',
    address: '321 Đường GHI, Quận 2, TP.HCM',
    category: 'PROMISING',
    assignee: 'Nguyễn Văn A',
    createdBy: 'Lê Văn C',
    createdAt: '2024-01-12',
    templates: [
      {
        id: '4',
        templateId: '1',
        templateName: 'Biểu mẫu đánh giá sơ bộ',
        fileName: 'danh-gia-so-bo-ghi.docx',
        createdAt: '2024-01-13'
      }
    ]
  }
]; 