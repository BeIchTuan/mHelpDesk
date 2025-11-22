import { Device, Room } from '@/types/device';

export const mockDevices: Device[] = [
  // Phòng khách
  {
    id: 'd1',
    name: 'Tủ lạnh AQUA Inverter',
    productCode: 'AQR-IG525AM',
    roomId: 'living-room',
    image: require('@/assets/images/devices/tu-lanh-aqua.png'), // Thêm ảnh
    type: 'Multi Door - 4 cánh',
    capacity: '516 lít',
    color: 'Đen',
    purchaseDate: '21/10/2024',
    warrantyExpiry: '21/10/2025',
    status: 'warning',
    maintenanceSchedule: [
      {
        id: 'm1',
        checkDate: '21/1/2025',
        nextCheckDate: '21/4/2025',
        status: 'upcoming',
        level: 2
      }
    ]
  },
  {
    id: 'd2',
    name: 'Máy Lọc Nước Kangaroo',
    productCode: 'KG100HI',
    roomId: 'living-room',
    image: require('@/assets/images/devices/may-loc-nuoc-kangaroo.png'), // Thêm ảnh
    type: 'Máy lọc nước',
    purchaseDate: '10/1/2024',
    warrantyExpiry: '10/1/2026',
    status: 'healthy',
  },
  {
    id: 'd3',
    name: 'Máy rửa bát Bosch',
    productCode: 'SMS68MI04E',
    roomId: 'living-room',
    type: 'Máy rửa bát',
    purchaseDate: '1/9/2025',
    warrantyExpiry: '1/9/2026',
    status: 'healthy',
  },
  {
    id: 'd4',
    name: 'Tivi Samsung QLED',
    productCode: 'QA65Q80C',
    roomId: 'living-room',
    type: 'QLED 4K',
    capacity: '65 inch',
    purchaseDate: '15/3/2024',
    warrantyExpiry: '15/3/2026',
    status: 'healthy',
  },
  {
    id: 'd5',
    name: 'Điều hòa Daikin Inverter',
    productCode: 'FTKC35UAVMV',
    roomId: 'living-room',
    type: 'Multi-Split',
    capacity: '12000 BTU',
    purchaseDate: '1/6/2024',
    warrantyExpiry: '1/6/2026',
    status: 'maintenance_due',
  },
  
  // Phòng ngủ
  {
    id: 'd6',
    name: 'Máy lạnh LG Inverter',
    productCode: 'V13API',
    roomId: 'bedroom',
    capacity: '12000 BTU',
    purchaseDate: '20/2/2024',
    warrantyExpiry: '20/2/2026',
    status: 'healthy',
  },
  {
    id: 'd7',
    name: 'Tủ quần áo IKEA',
    productCode: 'PAX001',
    roomId: 'bedroom',
    type: 'Tủ gỗ',
    purchaseDate: '10/5/2023',
    warrantyExpiry: '10/5/2025',
    status: 'healthy',
  },
  {
    id: 'd8',
    name: 'Quạt trần Panasonic',
    productCode: 'F-60XZN',
    roomId: 'bedroom',
    purchaseDate: '5/8/2024',
    warrantyExpiry: '5/8/2026',
    status: 'healthy',
  },
  {
    id: 'd9',
    name: 'Máy hút ẩm Sharp',
    productCode: 'DW-D20A-W',
    roomId: 'bedroom',
    capacity: '20 lít/ngày',
    purchaseDate: '12/11/2024',
    warrantyExpiry: '12/11/2026',
    status: 'healthy',
  },

  // Nhà bếp
  {
    id: 'd10',
    name: 'Bếp từ Sunhouse',
    productCode: 'SHB8888',
    roomId: 'kitchen',
    type: 'Bếp từ đôi',
    purchaseDate: '8/7/2024',
    warrantyExpiry: '8/7/2026',
    status: 'healthy',
  },
  {
    id: 'd11',
    name: 'Máy hút mùi Teka',
    productCode: 'DLV 98660 TOS',
    roomId: 'kitchen',
    purchaseDate: '8/7/2024',
    warrantyExpiry: '8/7/2026',
    status: 'warning',
  },
  {
    id: 'd12',
    name: 'Lò vi sóng Samsung',
    productCode: 'MG23K3575AS',
    roomId: 'kitchen',
    capacity: '23 lít',
    purchaseDate: '15/4/2024',
    warrantyExpiry: '15/4/2026',
    status: 'healthy',
  },

  // Nhà tắm
  {
    id: 'd13',
    name: 'Máy nước nóng Ariston',
    productCode: 'SL2 30 RS',
    roomId: 'bathroom',
    capacity: '30 lít',
    purchaseDate: '3/9/2024',
    warrantyExpiry: '3/9/2027',
    status: 'healthy',
  },
];

export const mockRooms: Room[] = [
  {
    id: 'living-room',
    name: 'Tại phòng khách',
    icon: 'sofa',
    devices: mockDevices.filter(d => d.roomId === 'living-room')
  },
  {
    id: 'bedroom',
    name: 'Tại phòng ngủ',
    icon: 'bed.double',
    devices: mockDevices.filter(d => d.roomId === 'bedroom')
  },
  {
    id: 'kitchen',
    name: 'Tại nhà bếp',
    icon: 'fork.knife',
    devices: mockDevices.filter(d => d.roomId === 'kitchen')
  },
  {
    id: 'bathroom',
    name: 'Tại nhà tắm',
    icon: 'shower',
    devices: mockDevices.filter(d => d.roomId === 'bathroom')
  },
];
