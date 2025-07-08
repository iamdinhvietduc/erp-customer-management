# ERP Customer Management System

Hệ thống quản lý khách hàng ERP được xây dựng bằng Next.js 15, TypeScript và Tailwind CSS.

🔗 **Link demo**: [https://erp-customer-management.vercel.app](https://erp-customer-management.vercel.app)

## 🚀 Tính năng chính

### 1. Quản lý khách hàng
- ✅ Hiển thị danh sách khách hàng dạng bảng
- ✅ Thêm mới khách hàng với form validation
- ✅ Chỉnh sửa thông tin khách hàng
- ✅ Xóa khách hàng
- ✅ Xem chi tiết khách hàng trong popup
- ✅ Phân loại khách hàng (Tiềm năng / Đã chốt / Thường / Khả quan)
- ✅ Tự động generate mã khách hàng
- ✅ Quản lý biểu mẫu của từng khách hàng

### 2. Quản lý biểu mẫu
- ✅ Tải lên biểu mẫu Word (.docx)
- ✅ Tự động phát hiện placeholders (mock)
- ✅ Quản lý danh sách biểu mẫu
- ✅ Tự động tạo bản sao cho tất cả khách hàng
- ✅ Tải xuống và in biểu mẫu (mock)

### 3. Dashboard
- ✅ Tổng quan thống kê
- ✅ Biểu đồ phân loại khách hàng
- ✅ Danh sách khách hàng mới nhất
- ✅ Thao tác nhanh

## 🛠️ Công nghệ sử dụng

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks + localStorage
- **Data**: Mock data với localStorage persistence

## 📦 Cài đặt

### Yêu cầu hệ thống
- Node.js 18+ 
- npm hoặc yarn

### Các bước cài đặt

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd erp-customer-management
   ```

2. **Cài đặt dependencies**
   ```bash
   npm install
   ```

3. **Chạy development server**
   ```bash
   npm run dev
   ```

4. **Truy cập ứng dụng**
   Mở browser và vào `http://localhost:3000`

## 🏗️ Cấu trúc project

```
src/
├── app/                    # App Router pages
│   ├── customers/         # Trang quản lý khách hàng
│   ├── templates/         # Trang quản lý biểu mẫu
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── customer/          # Customer components
│   ├── template/          # Template components
│   └── ui/               # UI components
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
└── data/                  # Mock data
```

## 🎯 Tính năng chi tiết

### Quản lý khách hàng

**Thông tin khách hàng bao gồm:**
- Mã khách hàng (tự động generate)
- Tên khách hàng
- Mã số thuế
- Ngày cấp giấy ĐK kinh doanh
- Người đại diện & chức vụ
- Email & số điện thoại
- Địa chỉ
- Phân loại khách hàng
- Người phụ trách
- Người nhập liệu

**Chức năng:**
- Form validation đầy đủ
- Dropdown cho phân loại và người phụ trách
- Popup chi tiết với layout responsive
- Quản lý biểu mẫu cho từng khách hàng

### Quản lý biểu mẫu

**Chức năng:**
- Upload file Word (.doc, .docx)
- Mock phát hiện placeholders như `{Tên khách hàng}`, `{Mã số thuế}`
- Tự động tạo bản sao cho tất cả khách hàng
- Download và print biểu mẫu (mock functionality)

**Placeholders hỗ trợ:**
- `{Tên khách hàng}`
- `{Mã khách hàng}`
- `{Mã số thuế}`
- `{Ngày cấp GĐKKD}`
- `{Người đại diện}`
- `{Chức vụ}`
- `{Email}`
- `{Số điện thoại}`
- `{Địa chỉ}`
- `{Mã hợp đồng}`
- `{Ngày ký hợp đồng}`
- `{Giá trị hợp đồng}`

## 💾 Lưu trữ dữ liệu

Ứng dụng sử dụng localStorage để lưu trữ dữ liệu persistently:
- `customers`: Danh sách khách hàng
- `templates`: Danh sách biểu mẫu

Dữ liệu mẫu sẽ được load lần đầu tiên khi truy cập ứng dụng.

## 🎨 UI/UX

- **Design System**: Clean, modern với Tailwind CSS
- **Responsive**: Hoạt động tốt trên mobile và desktop
- **Accessibility**: Keyboard navigation, focus states
- **Loading States**: Loading indicators và empty states
- **Error Handling**: Form validation và error messages

## 🚦 Scripts

```bash
# Development
npm run dev

# Build production
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## 🔧 Customization

### Thêm trường dữ liệu mới
1. Cập nhật interface trong `src/types/index.ts`
2. Thêm field vào mock data trong `src/data/mockData.ts`
3. Cập nhật form trong `src/components/customer/CustomerForm.tsx`
4. Cập nhật table display trong `src/components/customer/CustomerTable.tsx`

### Thêm tính năng mới
1. Tạo components trong thư mục tương ứngc
2. Thêm routes trong `src/app/`
3. Cập nhật navigation trong `src/components/ui/Navigation.tsx`

## 📝 TODO

- [ ] Tích hợp database thực (PostgreSQL/MySQL)
- [ ] Authentication & Authorization
- [ ] Real file processing cho Word documents
- [ ] Export data (Excel, PDF)
- [ ] Advanced search & filtering
- [ ] Audit logs
- [ ] Email notifications
- [ ] Bulk operations

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Hỗ trợ

Nếu có vấn đề gì, vui lòng tạo issue trên GitHub repository.

---

**Lưu ý:** Đây là phiên bản demo với mock data. Trong production, cần tích hợp database và xử lý file Word thực tế. 
