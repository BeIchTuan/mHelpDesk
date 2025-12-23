import {
    ArrowRightCircle,
    Edit2
} from 'lucide-react-native';
import { useState } from 'react';
import {
    FlatList,
    Image,
    ImageSourcePropType,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Color Constants ---
const COLORS = {
  primary: '#39A3FF',
  secondary: '#B0D4F2',
  background: '#FFFFFF',
  highlight: '#FF9149',
  textDark: '#333333',
  textLight: '#999999',
  textGray: '#666666',
  white: '#FFFFFF',
  tabInactive: '#F5F5F5',
  tabTextInactive: '#666666',
};

// --- Types ---
type NotificationCategory = 'personal' | 'promotion' | 'news';

interface Notification {
  id: string;
  category: NotificationCategory;
  categoryLabel: string;
  title: string;
  message: string;
  image: ImageSourcePropType;
  read: boolean;
}

// --- Local Images ---
// Using require with alias @/assets...
const IMAGES = {
  canhan1: require('@/assets/images/thong_bao/canhan1.png'),
  canhan2: require('@/assets/images/thong_bao/canhan2.png'),
  khuyenmai1: require('@/assets/images/thong_bao/khuyen_mai1.png'),
  khuyenmai2: require('@/assets/images/thong_bao/khuyen_mai2.png'),
  khuyenmai3: require('@/assets/images/thong_bao/khuyen_mai3.png'),
  tintuc1: require('@/assets/images/thong_bao/tin_tuc1.png'),
  tintuc2: require('@/assets/images/thong_bao/tin_tuc2.png'),
};

// --- Mock Data ---
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    category: 'personal',
    categoryLabel: 'Cá nhân',
    title: 'Sắp đến lịch sửa chữa',
    message: '⏰ Ngày mai bạn có lịch sửa máy lạnh phòng ngủ khách theo kế hoạch đã đăng ký.',
    image: IMAGES.canhan1,
    read: false,
  },
  {
    id: '2',
    category: 'personal',
    categoryLabel: 'Cá nhân',
    title: 'Xác nhận lịch sửa chữa',
    message: '🛠 Lịch sửa máy giặt đã được xác nhận với cửa hàng đối tác EzCare.',
    image: IMAGES.canhan2,
    read: false,
  },
  {
    id: '3',
    category: 'promotion',
    categoryLabel: 'Khuyến mãi',
    title: 'Giảm giá bảo trì máy lạnh',
    message: '🏷 Giảm 25% chi phí vệ sinh, kiểm tra máy lạnh trong tháng này tại đối tác EzCare.',
    image: IMAGES.khuyenmai1,
    read: true,
  },
  {
    id: '4',
    category: 'promotion',
    categoryLabel: 'Khuyến mãi',
    title: 'Ưu đãi trọn gói chăm sóc nhà',
    message: '👨‍🔧 Đặt lịch sửa chữa nhiều thiết bị, tiết kiệm chi phí với gói ưu đãi EzCare.',
    image: IMAGES.khuyenmai2,
    read: true,
  },
  {
    id: '5',
    category: 'promotion',
    categoryLabel: 'Khuyến mãi',
    title: 'Quà tặng khi đặt lịch sớm',
    message: '🎁 Đặt lịch sửa chữa trước 7 ngày, nhận ngay ưu đãi hấp dẫn từ EzCare.',
    image: IMAGES.khuyenmai3,
    read: true,
  },
  {
    id: '6',
    category: 'news',
    categoryLabel: 'Tin tức',
    title: 'Ra mắt máy lạnh tiết kiệm điện',
    message: '🆕 Dòng máy lạnh mới giúp giảm điện năng, phù hợp gia đình hiện đại.',
    image: IMAGES.tintuc1,
    read: true,
  },
  {
    id: '7',
    category: 'news',
    categoryLabel: 'Tin tức',
    title: 'Cách sử dụng tủ lạnh tiết kiệm điện',
    message: '⚡ Mẹo đơn giản giúp tủ lạnh hoạt động hiệu quả và giảm chi phí điện hàng tháng.',
    image: IMAGES.tintuc2,
    read: true,
  },
];

// --- Components ---

const FilterTab = ({ 
  label, 
  isActive, 
  onPress 
}: { 
  label: string; 
  isActive: boolean; 
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`px-2 py-3 rounded-lg justify-center items-center flex-1 min-h-[44px] ${
      isActive ? 'bg-[#39A3FF]' : 'bg-[#F0F0F0]'
    }`}
  >
    <Text
      className={`font-semibold text-sm text-center ${
        isActive ? 'text-white' : 'text-[#999999]'
      }`}
      numberOfLines={1}
      adjustsFontSizeToFit
      minimumFontScale={0.8}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const NotificationItem = ({ item }: { item: Notification }) => {
  // Determine category color
  let categoryColor = '#39A3FF'; // Default Blue
  if (item.category === 'personal') categoryColor = '#39A3FF';
  else if (item.category === 'promotion') categoryColor = '#39A3FF'; // Or different if needed
  else if (item.category === 'news') categoryColor = '#39A3FF';

  return (
    <TouchableOpacity 
      className="flex-row p-5 mb-0 bg-white border-b border-gray-100 items-center"
      activeOpacity={0.7}
    >
      {/* Image Section */}
      <View className="mr-4">
        <Image
          source={item.image}
          className="w-20 h-20 rounded-xl"
          resizeMode="contain"
        />
      </View>

      {/* Content Section */}
      <View className="flex-1 mr-3">
        <Text style={{ color: categoryColor }} className="text-sm font-bold mb-2">
          {item.categoryLabel}
        </Text>
        
        <Text className="text-lg font-bold text-[#333333] mb-2 leading-6" numberOfLines={1}>
          {item.title}
        </Text>
        
        <Text className="text-sm text-[#666666] leading-5" numberOfLines={2}>
          {item.message}
        </Text>
      </View>

      {/* Arrow Icon */}
      <View className="">
        <ArrowRightCircle size={24} color={COLORS.highlight} strokeWidth={1.5} />
      </View>
    </TouchableOpacity>
  );
};

export default function NotificationsScreen() {
  const [activeFilter, setActiveFilter] = useState<'all' | NotificationCategory>('all');

  const filteredNotifications = MOCK_NOTIFICATIONS.filter(item => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header Section */}
      <View className="px-5 pt-3 pb-6 bg-white">
        {/* Title Bar */}
        <View className="flex-row items-center justify-between mb-6">
            <View className="w-12" /> 
            
            <Text className="text-2xl font-bold text-[#39A3FF] uppercase tracking-wide">
              THÔNG BÁO
            </Text>

            <TouchableOpacity className="flex-row items-center justify-end w-16">
                 <Edit2 size={16} color={COLORS.highlight} className="mr-1" />
                 <Text className="text-[#FF9149] font-medium text-base">Sửa</Text>
            </TouchableOpacity>
        </View>
        
        {/* Filter Tabs */}
        <View className="flex-row mb-5" style={{ gap: 8 }}>
            {[
                { key: 'all', label: 'Tất cả' },
                { key: 'personal', label: 'Cá nhân' },
                { key: 'promotion', label: 'Khuyến mãi' },
                { key: 'news', label: 'Tin tức' },
            ].map((item) => (
                <View key={item.key} className="flex-1">
                    <FilterTab 
                        label={item.label} 
                        isActive={activeFilter === item.key} 
                        onPress={() => setActiveFilter(item.key as any)}
                    />
                </View>
            ))}
        </View>
      </View>

      {/* Notification List */}
      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem item={item} />}
        contentContainerStyle={{ paddingHorizontal: 0, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
