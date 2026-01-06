# EzCare - Ứng dụng Chăm sóc Vật dụng Gia đình

> **"Giúp bạn hiểu và chăm sóc ngôi nhà chủ động và dễ dàng hơn mỗi ngày."**

## 📖 Giới thiệu

EzCare là ứng dụng mobile giúp người dùng quản lý, theo dõi và chăm sóc vật dụng gia đình một cách thông minh. Ứng dụng cung cấp các tính năng:

- **Quản lý thiết bị** theo phòng (phòng khách, phòng ngủ, nhà bếp, nhà tắm)
- **Nhắc lịch bảo dưỡng** định kỳ cho từng thiết bị
- **Đặt dịch vụ sửa chữa** tận nơi từ các đối tác
- **Marketplace** mua sắm thiết bị điện tử, điện máy
- **Trung tâm thông báo** cá nhân hóa

---

## 🛠️ Công nghệ sử dụng

| Công nghệ | Phiên bản | Mô tả |
|-----------|-----------|-------|
| React Native | 0.81.5 | Framework mobile cross-platform |
| Expo | ~54.0.27 | Development platform & toolchain |
| Expo Router | ~6.0.17 | File-based routing |
| NativeWind | ^4.2.1 | Tailwind CSS cho React Native |
| TypeScript | ~5.9.2 | Static typing |
| React Navigation | ^7.x | Navigation library |
| Lucide React Native | ^0.562.0 | Icon library |

---

## 📁 Cấu trúc thư mục

```
mHelpDesk/
├── app/                          # Màn hình ứng dụng (file-based routing)
│   ├── (tabs)/                   # Tab navigation screens
│   │   ├── _layout.tsx           # Tab layout configuration
│   │   ├── index.tsx             # Sổ tay EzCare (Trang chủ)
│   │   ├── my-items.tsx          # Đồ của tôi
│   │   ├── cart.tsx              # Mua sắm (Marketplace)
│   │   ├── notifications.tsx     # Thông báo
│   │   └── account.tsx           # Tài khoản
│   ├── device-detail.tsx         # Chi tiết thiết bị
│   ├── add-device.tsx            # Thêm vật dụng mới
│   ├── repair-detail.tsx         # Chi tiết bảo dưỡng/sửa chữa
│   ├── book-service.tsx          # Đặt lịch dịch vụ
│   ├── select-store.tsx          # Chọn đại lý/cửa hàng
│   ├── product-detail.tsx        # Chi tiết sản phẩm
│   ├── category-products.tsx     # Danh sách sản phẩm theo danh mục
│   ├── checkout.tsx              # Thanh toán
│   ├── order-success.tsx         # Đặt hàng thành công
│   ├── shipping-address.tsx      # Địa chỉ giao hàng
│   └── ...
├── components/                   # Components tái sử dụng
│   ├── devices/                  # Components liên quan đến thiết bị
│   │   ├── DeviceCard.tsx        # Card hiển thị thiết bị
│   │   └── RoomItem.tsx          # Phòng chứa thiết bị
│   ├── maintenance/              # Components bảo trì
│   │   └── ChevronStepper.tsx    # Stepper hiển thị tiến độ bảo dưỡng
│   ├── ui/                       # UI components cơ bản
│   │   ├── collapsible.tsx
│   │   └── icon-symbol.tsx
│   └── ...
├── constants/                    # Hằng số ứng dụng
│   └── theme.ts                  # Brand colors, fonts
├── data/                         # Mock data
│   └── mockDevices.ts            # Dữ liệu giả lập thiết bị
├── hooks/                        # Custom hooks
│   ├── use-color-scheme.ts
│   └── use-theme-color.ts
├── types/                        # TypeScript type definitions
│   └── device.ts                 # Device, Room, MaintenanceSchedule types
└── assets/                       # Tài nguyên tĩnh (icons, images)
```

---

## 🎨 Design System

### Bảng màu (Brand Colors)

| Tên | Mã màu | Sử dụng |
|-----|--------|---------|
| Primary | `#39A3FF` | Màu chính, buttons, links, header |
| Secondary | `#B0D4F2` | Màu phụ, backgrounds nhẹ |
| Background | `#FFF4E9` | Background chung |
| Highlight | `#FF9149` | Điểm nhấn, CTAs quan trọng |
| Text | `#666666` | Màu chữ chính |
| Text Light | `#999999` | Màu chữ phụ |

### Typography

Sử dụng system fonts theo từng platform:
- **iOS**: SF Pro (sans, serif, rounded, mono)
- **Android**: Roboto (system default)

---

## 📱 Các màn hình chính

### 1. Sổ tay EzCare (Trang chủ)
- Hiển thị lịch bảo dưỡng sắp tới
- Thống kê tổng chi phí và số lượng thiết bị
- Filter theo trạng thái: Tất cả / Chưa đặt lịch / Đã đặt lịch / Hoàn tất

### 2. Đồ của tôi
- Quản lý thiết bị theo phòng
- Tìm kiếm thiết bị
- Thêm vật dụng mới

### 3. Mua sắm (Marketplace)
- Danh mục sản phẩm: Điện tử, Gia dụng, Đồ nhà bếp...
- Banner slideshow khuyến mãi
- Thương hiệu nổi bật
- Sản phẩm bán chạy

### 4. Thông báo
- Phân loại: Tất cả / Cá nhân / Khuyến mãi / Tin tức
- Thông báo lịch sửa chữa, ưu đãi

### 5. Tài khoản
- Thông tin cá nhân
- Quick actions: Đơn hàng, Khuyến mãi, Yêu thích
- Cài đặt: Thông tin cá nhân, Địa chỉ, Bảo mật
- Hỗ trợ: Trung tâm hỗ trợ, Điều khoản, Giới thiệu

---

## 🚀 Hướng dẫn cài đặt

### Yêu cầu hệ thống
- Node.js >= 18.x
- npm hoặc yarn
- Expo CLI
- Android Studio (cho Android) hoặc Xcode (cho iOS)

### Cài đặt

```bash
# Clone repository
git clone <repository-url>
cd mHelpDesk

# Cài đặt dependencies
npm install

# Chạy ứng dụng
npx expo start
```

### Các lệnh thường dùng

```bash
# Chạy trên Android
npm run android

# Chạy trên iOS  
npm run ios

# Chạy trên Web
npm run web

# Kiểm tra lint
npm run lint

# Reset project (xóa code example)
npm run reset-project
```

---


## 🔗 Navigation Flow

```
[Tabs Navigation]
├── Sổ tay EzCare ──→ Repair Detail ──→ Select Store ──→ Service Confirmation
├── Đồ của tôi ──→ Device Detail ──→ Repair Detail / Part Replacement
│                └── Add Device
├── Mua sắm ──→ Category Products ──→ Product Detail ──→ Checkout ──→ Order Success
│            └── Shipping Address
├── Thông báo
└── Tài khoản
```

---
## 📄 License

Private - All rights reserved.

---

