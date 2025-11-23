import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
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
  { id: '1', name: 'Toshiba', logo: '🔵' },
  { id: '2', name: 'Sony', logo: '⚫' },
  { id: '3', name: 'Panasonic', logo: '🔷' },
  { id: '4', name: 'LG', logo: '🔴' },
  { id: '5', name: 'Sharp', logo: '🟥' },
  { id: '6', name: 'iPhone', logo: '🍎' },
  { id: '7', name: 'Samsung', logo: '🔵' },
];

const products = [
  { id: '1', name: 'Máy giặt Samsung 9kg', price: '5.990.000', discount: '-24%', image: '🌀' },
  { id: '2', name: 'Máy rửa bát Bosch', price: '12.990.000', discount: '-18%', image: '🍽️' },
  { id: '3', name: 'Tủ lạnh LG Inverter', price: '8.990.000', discount: '-15%', image: '❄️' },
  { id: '4', name: 'Điều hòa Daikin 12000BTU', price: '7.500.000', discount: '-20%', image: '💨' },
];

const bannerImages = [
  { id: '1', title: 'DEAL CỰC CHẤT\nSALE CỰC CHÁY', subtitle: '30% - 15% - 66K', bg: '#1E3A8A' },
  { id: '2', title: 'FLASH SALE\nHOT DEAL', subtitle: 'Giảm đến 50%', bg: '#DC2626' },
  { id: '3', title: 'SIÊU PHẨM\nMỚI VỀ', subtitle: 'Mua ngay', bg: '#7C3AED' },
];

export default function ShoppingScreen() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const scrollRef = useRef<FlatList>(null);

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
        <View className="px-4 mb-4">
          <FlatList
            ref={scrollRef}
            data={bannerImages}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / (width - 32));
              setCurrentBanner(index);
            }}
            renderItem={({ item }) => (
              <View 
                className="rounded-2xl p-6 mr-4 justify-center"
                style={{ 
                  width: width - 32, 
                  height: 140,
                  backgroundColor: item.bg 
                }}
              >
                <Text className="text-2xl font-bold text-white mb-1">
                  {item.title}
                </Text>
                <Text className="text-lg text-white font-semibold">
                  {item.subtitle}
                </Text>
                <Text className="text-sm text-white mt-2">MUA NGAY ●●●●</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
          
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
          <Text className="text-lg font-bold mb-3" style={{ color: '#FF9149' }}>
            ƯU ĐÃI CỦA BOSS XỊN
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
          >
            {brands.map((brand) => (
              <TouchableOpacity
                key={brand.id}
                className="bg-white rounded-xl p-3 mr-3 items-center justify-center"
                style={{ width: 100, height: 100 }}
              >
                <Text className="text-3xl mb-2">{brand.logo}</Text>
                <Text className="text-xs font-semibold text-center" style={{ color: '#39A3FF' }}>
                  {brand.name}
                </Text>
                <View className="absolute top-2 right-2 bg-red-500 rounded-full px-1.5 py-0.5">
                  <Text className="text-xs text-white font-bold">-20%</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Sản phẩm bán chạy */}
        <View className="px-4 pb-6">
          <Text className="text-lg font-bold mb-3" style={{ color: '#FF9149' }}>
            SẢN PHẨM BÁN CHẠY
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {products.map((product) => (
              <TouchableOpacity
                key={product.id}
                className="bg-white rounded-xl p-3 mb-3"
                style={{ width: '48%' }}
              >
                {/* Discount badge */}
                <View className="absolute top-2 left-2 z-10 bg-red-500 rounded-md px-2 py-1">
                  <Text className="text-xs text-white font-bold">{product.discount}</Text>
                </View>
                
                <View className="w-full h-32 bg-gray-100 rounded-lg items-center justify-center mb-2">
                  <Text className="text-5xl">{product.image}</Text>
                </View>
                
                <Text className="text-sm font-semibold mb-1" numberOfLines={2} style={{ color: '#39A3FF' }}>
                  {product.name}
                </Text>
                <Text className="text-base font-bold" style={{ color: '#FF9149' }}>
                  {product.price}₫
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
