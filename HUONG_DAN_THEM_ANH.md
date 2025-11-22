# 📸 HƯỚNG DẪN THÊM ẢNH CHO THIẾT BỊ

## 1. CẤU TRÚC THƯ MỤC

Tạo thư mục mới cho ảnh thiết bị:
```
c:\source tham khảo\mHelpDesk\assets\images\devices\
```

## 2. CHUẨN BỊ ẢNH

### Yêu cầu ảnh:
- **Format**: PNG, JPG, hoặc JPEG
- **Kích thước khuyến nghị**: 300x300px đến 500x500px
- **Dung lượng**: < 500KB để tối ưu performance
- **Background**: Nền trắng hoặc trong suốt

### Cách đặt tên file:
**Option 1: Tên mô tả (Khuyến nghị)**
```
tu-lanh-aqua.png
may-loc-nuoc-kangaroo.png
may-rua-bat-bosch.png
tivi-samsung.png
dieu-hoa-daikin.png
may-lanh-lg.png
tu-quan-ao-ikea.png
quat-tran-panasonic.png
may-hut-am-sharp.png
bep-tu-sunhouse.png
may-hut-mui-teka.png
lo-vi-song-samsung.png
may-nuoc-nong-ariston.png
```

**Option 2: Tên đơn giản**
```
device1.png
device2.png
device3.png
...
device13.png
```

## 3. THÊM ẢNH VÀO CODE

Mở file: `data/mockDevices.ts`

### Ví dụ thêm ảnh:

```typescript
{
  id: 'd1',
  name: 'Tủ lạnh AQUA Inverter',
  productCode: 'AQR-IG525AM',
  roomId: 'living-room',
  image: require('@/assets/images/devices/tu-lanh-aqua.png'), // ← THÊM DÒNG NÀY
  type: 'Multi Door - 4 cánh',
  capacity: '516 lít',
  color: 'Đen',
  purchaseDate: '21/10/2024',
  warrantyExpiry: '21/10/2025',
  status: 'warning',
}
```

## 4. DANH SÁCH THIẾT BỊ CẦN THÊM ẢNH

### Phòng khách (5 thiết bị):
- **d1**: Tủ lạnh AQUA Inverter → `tu-lanh-aqua.png` ✅ (đã thêm)
- **d2**: Máy Lọc Nước Kangaroo → `may-loc-nuoc-kangaroo.png` ✅ (đã thêm)
- **d3**: Máy rửa bát Bosch → `may-rua-bat-bosch.png`
- **d4**: Tivi Samsung QLED → `tivi-samsung.png`
- **d5**: Điều hòa Daikin Inverter → `dieu-hoa-daikin.png`

### Phòng ngủ (4 thiết bị):
- **d6**: Máy lạnh LG Inverter → `may-lanh-lg.png`
- **d7**: Tủ quần áo IKEA → `tu-quan-ao-ikea.png`
- **d8**: Quạt trần Panasonic → `quat-tran-panasonic.png`
- **d9**: Máy hút ẩm Sharp → `may-hut-am-sharp.png`

### Nhà bếp (3 thiết bị):
- **d10**: Bếp từ Sunhouse → `bep-tu-sunhouse.png`
- **d11**: Máy hút mùi Teka → `may-hut-mui-teka.png`
- **d12**: Lò vi sóng Samsung → `lo-vi-song-samsung.png`

### Nhà tắm (1 thiết bị):
- **d13**: Máy nước nóng Ariston → `may-nuoc-nong-ariston.png`

## 5. TEMPLATE CODE ĐẦY ĐỦ

Copy và paste vào từng device trong `mockDevices.ts`:

```typescript
// Phòng khách
{
  id: 'd1',
  name: 'Tủ lạnh AQUA Inverter',
  image: require('@/assets/images/devices/tu-lanh-aqua.png'),
  ...
},
{
  id: 'd2',
  name: 'Máy Lọc Nước Kangaroo',
  image: require('@/assets/images/devices/may-loc-nuoc-kangaroo.png'),
  ...
},
{
  id: 'd3',
  name: 'Máy rửa bát Bosch',
  image: require('@/assets/images/devices/may-rua-bat-bosch.png'),
  ...
},
{
  id: 'd4',
  name: 'Tivi Samsung QLED',
  image: require('@/assets/images/devices/tivi-samsung.png'),
  ...
},
{
  id: 'd5',
  name: 'Điều hòa Daikin Inverter',
  image: require('@/assets/images/devices/dieu-hoa-daikin.png'),
  ...
},

// Phòng ngủ
{
  id: 'd6',
  name: 'Máy lạnh LG Inverter',
  image: require('@/assets/images/devices/may-lanh-lg.png'),
  ...
},
{
  id: 'd7',
  name: 'Tủ quần áo IKEA',
  image: require('@/assets/images/devices/tu-quan-ao-ikea.png'),
  ...
},
{
  id: 'd8',
  name: 'Quạt trần Panasonic',
  image: require('@/assets/images/devices/quat-tran-panasonic.png'),
  ...
},
{
  id: 'd9',
  name: 'Máy hút ẩm Sharp',
  image: require('@/assets/images/devices/may-hut-am-sharp.png'),
  ...
},

// Nhà bếp
{
  id: 'd10',
  name: 'Bếp từ Sunhouse',
  image: require('@/assets/images/devices/bep-tu-sunhouse.png'),
  ...
},
{
  id: 'd11',
  name: 'Máy hút mùi Teka',
  image: require('@/assets/images/devices/may-hut-mui-teka.png'),
  ...
},
{
  id: 'd12',
  name: 'Lò vi sóng Samsung',
  image: require('@/assets/images/devices/lo-vi-song-samsung.png'),
  ...
},

// Nhà tắm
{
  id: 'd13',
  name: 'Máy nước nóng Ariston',
  image: require('@/assets/images/devices/may-nuoc-nong-ariston.png'),
  ...
},
```

## 6. CHECKLIST

- [ ] Tạo thư mục `assets/images/devices/`
- [ ] Thêm 13 file ảnh vào thư mục
- [ ] Mở file `data/mockDevices.ts`
- [ ] Thêm `image: require(...)` cho mỗi device
- [ ] Save file
- [ ] Reload app: `r` trong terminal

## 7. LƯU Ý

- Không cần khai báo import, React Native tự động handle `require()`
- Path luôn bắt đầu với `@/assets/images/`
- Nếu không có ảnh, app sẽ hiển thị icon 📦 mặc định
- Ảnh sẽ tự động resize về 96x96px trong DeviceCard

## 8. NẾU GẶP LỖI

**Lỗi: Cannot find module**
- Kiểm tra path có đúng không
- Kiểm tra tên file có match không (case sensitive)

**Ảnh không hiển thị:**
- Clear cache: `npx expo start -c`
- Reload app: `r`

---

🎉 **Hoàn thành!** Ảnh sẽ hiển thị trong DeviceCard và màn hình chi tiết.
