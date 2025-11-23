import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Mock data
const categories = [
  { 
    id: '1', 
    name: 'Điện tử,\nđiện máy', 
    image: require('@/assets/images/muasam/Điện tử, điện máy.png'),
    color: '#E3F2FD' 
  },
  { 
    id: '2', 
    name: 'Điện\ngia dụng', 
    image: require('@/assets/images/muasam/Điện gia dụng.png'),
    color: '#FCE4EC' 
  },
  { 
    id: '3', 
    name: 'Điện tử\nviễn thông', 
    image: require('@/assets/images/muasam/Điện tử viễn thông.png'),
    color: '#F3E5F5' 
  },
  { 
    id: '4', 
    name: 'Đồ\ngia dụng', 
    image: require('@/assets/images/muasam/Đồ gia dụng.png'),
    color: '#E8F5E9' 
  },
  { 
    id: '5', 
    name: 'Phụ kiện', 
    image: require('@/assets/images/muasam/Phụ kiện.png'),
    color: '#FFF3E0' 
  },
  { 
    id: '6', 
    name: 'Làm đẹp,\nchăm sóc', 
    image: require('@/assets/images/muasam/lam-dep-cham-soc.png'),
    color: '#E0F2F1' 
  },
  { 
    id: '7', 
    name: 'Máy cũ', 
    image: require('@/assets/images/muasam/may-cu.png'),
    color: '#F1F8E9' 
  },
];

const brands = [
  { id: '1', name: 'Toshiba', logo: require('@/assets/images/muasam/toshiba.png') },
  { id: '2', name: 'Sony', logo: require('@/assets/images/muasam/Sony.png') },
  { id: '3', name: 'Panasonic', logo: require('@/assets/images/muasam/Panasonic.png') },
  { id: '4', name: 'LG', logo: require('@/assets/images/muasam/lg.png') },
  { id: '5', name: 'Sharp', logo: require('@/assets/images/muasam/sharp .png') },
  { id: '6', name: 'iPhone', logo: require('@/assets/images/muasam/Iphone.png') },
  { id: '7', name: 'Samsung', logo: require('@/assets/images/muasam/samsung.png') },
];

const products = [
  { 
    id: '1', 
    name: 'Máy giặt AQUA Inverter 11kg', 
    currentPrice: '29.990.000', 
    originalPrice: '34.490.000',
    discount: '-24%',
    rating: 4.8,
    sold: 'Đã bán 2,4k',
    image: require('@/assets/images/muasam/sanphambanchay/ảnh_máy giặt .png'),
    paymentTag: 'Trả trước',
    hasNewTag: true
  },
  { 
    id: '2', 
    name: 'Máy rửa chén Sanaky 13 bộ', 
    currentPrice: '12.650.000', 
    originalPrice: '14.900.000',
    discount: '-18%',
    rating: 4.9,
    sold: 'Đã bán 1,7k',
    image: require('@/assets/images/muasam/sanphambanchay/Ảnh_Máy rửa chén.png'),
    paymentTag: 'Trả trước',
    hasNewTag: true
  },
  { 
    id: '3', 
    name: 'LG Inverter 335 lít', 
    currentPrice: '10.640.000', 
    originalPrice: '14.690.000',
    discount: '-27%',
    rating: 4.6,
    sold: 'Đã bán 16k',
    image: require('@/assets/images/muasam/sanphambanchay/Ảnh_tủ lạnh.png'),
    paymentTag: 'Trả trước',
    hasNewTag: false
  },
  { 
    id: '4', 
    name: 'Smart Tivi LG 4K 55 inch', 
    currentPrice: '78.650.000', 
    originalPrice: '95.990.000',
    discount: '-20%',
    rating: 4.6,
    sold: 'Đã bán 6k',
    image: require('@/assets/images/muasam/sanphambanchay/Ảnh_Tivi.png'),
    paymentTag: 'Trả trước',
    hasNewTag: false
  },
  { 
    id: '5', 
    name: 'Máy nước nóng Ferroli', 
    currentPrice: '1.800.000', 
    originalPrice: '1.990.000',
    discount: '-10%',
    rating: 4.9,
    sold: 'Đã bán 52k',
    image: require('@/assets/images/muasam/sanphambanchay/Ảnh_Máy nước nóng.png'),
    paymentTag: 'Trả trước',
    hasNewTag: true
  },
  { 
    id: '6', 
    name: 'Tủ cấp đông Sanaky Inverter 305 lít', 
    currentPrice: '8.490.000', 
    originalPrice: '9.650.000',
    discount: '-13%',
    rating: 4.9,
    sold: 'Đã bán 31k',
    image: require('@/assets/images/muasam/sanphambanchay/Ảnh_Tủ đông.png'),
    paymentTag: 'Trả trước',
    hasNewTag: false
  },
  { 
    id: '7', 
    name: 'Máy giặt AQUA Inverter 11kg', 
    currentPrice: '29.990.000', 
    originalPrice: '34.490.000',
    discount: '-24%',
    rating: 4.8,
    sold: 'Đã bán 2,4k',
    image: require('@/assets/images/muasam/sanphambanchay/ảnh_máy giặt .png'),
    paymentTag: 'Trả trước',
    hasNewTag: true
  },
  { 
    id: '8', 
    name: 'Máy rửa chén Sanaky 13 bộ', 
    currentPrice: '12.650.000', 
    originalPrice: '14.900.000',
    discount: '-18%',
    rating: 4.9,
    sold: 'Đã bán 1,7k',
    image: require('@/assets/images/muasam/sanphambanchay/Ảnh_Máy rửa chén.png'),
    paymentTag: 'Trả trước',
    hasNewTag: true
  },
  { 
    id: '9', 
    name: 'LG Inverter 335 lít', 
    currentPrice: '10.640.000', 
    originalPrice: '14.690.000',
    discount: '-27%',
    rating: 4.6,
    sold: 'Đã bán 16k',
    image: require('@/assets/images/muasam/sanphambanchay/Ảnh_tủ lạnh.png'),
    paymentTag: 'Trả trước',
    hasNewTag: false
  },
  { 
    id: '10', 
    name: 'Smart Tivi LG 4K 55 inch', 
    currentPrice: '9.650.000', 
    originalPrice: '12.090.000',
    discount: '-13%',
    rating: 4.7,
    sold: 'Đã bán 22k',
    image: require('@/assets/images/muasam/sanphambanchay/Ảnh_Tivi.png'),
    paymentTag: 'Trả trước',
    hasNewTag: false
  },
  { 
    id: '11', 
    name: 'Máy nước nóng Ferroli', 
    currentPrice: '1.800.000', 
    originalPrice: '1.990.000',
    discount: '-10%',
    rating: 4.9,
    sold: 'Đã bán 52k',
    image: require('@/assets/images/muasam/sanphambanchay/Ảnh_Máy nước nóng.png'),
    paymentTag: 'Trả trước',
    hasNewTag: true
  },
  { 
    id: '12', 
    name: 'Tủ cấp đông Sanaky Inverter 305 lít', 
    currentPrice: '8.490.000', 
    originalPrice: '9.650.000',
    discount: '-13%',
    rating: 4.9,
    sold: 'Đã bán 31k',
    image: require('@/assets/images/muasam/sanphambanchay/Ảnh_Tủ đông.png'),
    paymentTag: 'Trả trước',
    hasNewTag: false
  },
];

const bannerImages = [
  { id: '1', image: require('@/assets/images/muasam/slideshow/slideshow1.png') },
  { id: '2', image: require('@/assets/images/muasam/slideshow/slideshow2.png') },
  { id: '3', image: require('@/assets/images/muasam/slideshow/slideshow3.png') },
  { id: '4', image: require('@/assets/images/muasam/slideshow/slideshow4.png') },
  { id: '5', image: require('@/assets/images/muasam/slideshow/slideshow5.png') },
  { id: '6', image: require('@/assets/images/muasam/slideshow/slideshow6.png') },
];

export default function ShoppingScreen() {
  const [currentBanner, setCurrentBanner] = useState(0);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#39A3FF" />
      
      {/* Header with Background Image */}
      <ImageBackground
        source={require('@/assets/images/muasam/Background header.png')}
        style={{ paddingBottom: 20 }}
        resizeMode="stretch"
      >
        <Text className="text-xl font-bold text-white text-center pt-2 pb-3">
          CỬA HÀNG EZCARE
        </Text>
        
        {/* Search Bar */}
        <View className="px-4">
          <View 
            className="bg-white rounded-full px-4 flex-row items-center"
            style={{ height: 38 }}
          >
            <MaterialIcons name="search" size={18} color="#999" />
            <TextInput
              className="flex-1 ml-2 text-sm"
              placeholder="Tìm kiếm"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Banner Quảng cáo - Transparent */}
        <View className="px-8 pt-3 flex-row items-center justify-center">
          <View className="flex-1">
            <Text className="font-extrabold" style={{ color: '#FF9149', fontSize: 16 }}>BRAND XỊN ĐÃI DEAL</Text>
            <Text className="font-semibold" style={{ color: '#FFFFFF', fontSize: 12, marginTop: 2 }}>Loạt thương hiệu giảm lên đến 35%</Text>
          </View>
          <Image 
            source={require('@/assets/images/muasam/price-tag 1.png')}
            style={{ width: 60, height: 60 }}
            resizeMode="contain"
          />
        </View>
      </ImageBackground>

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Categories */}
        <View className="py-4">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 12 }}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                className="items-center mr-4"
                style={{ width: 70 }}
              >
                <View className="mb-2 items-center justify-center">
                  <Image 
                    source={cat.image}
                    style={{ width: 60, height: 60 }}
                    resizeMode="contain"
                  />
                </View>
                <Text className="text-xs text-center font-medium" style={{ color: '#FF9149', lineHeight: 14 }}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Banner Slideshow */}
        <View className="mb-4">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setCurrentBanner(index);
            }}
          >
            {bannerImages.map((item) => (
              <View 
                key={item.id}
                className="px-4"
                style={{ width: width }}
              >
                <View className="rounded-2xl overflow-hidden" style={{ height: 140 }}>
                  <Image
                    source={item.image}
                    style={{ width: '100%', height: 140 }}
                    resizeMode="cover"
                  />
                </View>
              </View>
            ))}
          </ScrollView>
          
          {/* Dots indicator */}
          <View className="flex-row justify-center mt-3">
            {bannerImages.map((_, index) => (
              <View
                key={index}
                className="w-2 h-2 rounded-full mx-1"
                style={{
                  backgroundColor: currentBanner === index ? '#39A3FF' : '#D1D5DB',
                }}
              />
            ))}
          </View>
        </View>

        {/* Ưu đãi của boss xịn */}
        <View className="px-4 mb-4">
          <Text className="font-bold mb-3" style={{ color: '#FF9149', fontSize: 20 }}>
            ƯU ĐÃI CỦA BOSS XỊN
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
          >
            {brands.map((brand) => (
              <TouchableOpacity
                key={brand.id}
                style={{ marginRight: 12 }}
              >
                <Image
                  source={brand.logo}
                  style={{ width: 140, height: 140 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Sản phẩm bán chạy */}
        <View className="px-4 pb-6">
          <Text className="font-bold mb-3" style={{ color: '#FF9149', fontSize: 20 }}>
            SẢN PHẨM BÁN CHẠY
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {products.map((product) => (
              <TouchableOpacity
                key={product.id}
                className="bg-white rounded-2xl p-3 mb-3"
                style={{ width: '48%', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}
              >
                {/* Discount badge góc trái */}
                <View 
                  className="absolute top-2 left-2 z-10 rounded px-2 py-1"
                  style={{ backgroundColor: '#FFE5E5' }}
                >
                  <Text className="text-xs font-bold" style={{ color: '#FF4444' }}>
                    {product.discount}
                  </Text>
                </View>
                
                {/* Ảnh sản phẩm */}
                <View className="w-full items-center justify-center mb-2" style={{ height: 110 }}>
                  <Image
                    source={product.image}
                    style={{ width: '100%', height: 110 }}
                    resizeMode="contain"
                  />
                </View>
                
                {/* Tên sản phẩm */}
                <Text 
                  className="text-sm mb-1" 
                  numberOfLines={2}
                  style={{ color: '#7EC8F5', lineHeight: 18 }}
                >
                  {product.name}
                </Text>
                
                {/* Giá */}
                <View className="mb-2">
                  <View className="flex-row items-center">
                    <Text className="text-base font-bold" style={{ color: '#FF9149' }}>
                      {product.currentPrice}đ
                    </Text>
                  </View>
                  <View className="flex-row items-center mt-1">
                    <Text 
                      className="text-xs mr-2" 
                      style={{ color: '#999999', textDecorationLine: 'line-through' }}
                    >
                      {product.originalPrice}đ
                    </Text>
                    <Text className="text-xs font-semibold" style={{ color: '#FF4444' }}>
                      {product.discount}
                    </Text>
                  </View>
                </View>
                
                {/* Tags: Mẫu mới và Trả trước */}
                <View className="flex-row mb-2" style={{ gap: 6 }}>
                  {product.hasNewTag && (
                    <View 
                      className="rounded px-2 py-1"
                      style={{ 
                        borderWidth: 1, 
                        borderColor: '#FF9149',
                        backgroundColor: '#FFFFFF'
                      }}
                    >
                      <Text className="text-xs font-medium" style={{ color: '#FF9149' }}>
                        Mẫu mới
                      </Text>
                    </View>
                  )}
                  <View 
                    className="rounded px-2 py-1"
                    style={{ backgroundColor: '#FF9149' }}
                  >
                    <Text className="text-xs font-medium" style={{ color: '#FFFFFF' }}>
                      {product.paymentTag}
                    </Text>
                  </View>
                </View>
                
                {/* Rating và đã bán */}
                <View className="flex-row items-center">
                  <Text style={{ color: '#FFD700', fontSize: 14 }}>⭐</Text>
                  <Text className="text-xs ml-1" style={{ color: '#7EC8F5', fontWeight: '600' }}>
                    {product.rating}
                  </Text>
                  <Text className="text-xs ml-1" style={{ color: '#7EC8F5' }}>
                    - {product.sold}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
