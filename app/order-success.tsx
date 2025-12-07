import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
    Dimensions,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Colors theo Figma
const COLORS = {
  primary: '#39A3FF',
  secondary: '#B0D4F2',
  background: '#FFFFFF',
  cardBg: '#FFFAF6',
  highlight: '#FF9149',
  text: '#666666',
  white: '#FFFFFF',
  lightGray: '#F0F0F0',
  gray: '#999999',
};

// Mock data sản phẩm gợi ý
const suggestedProducts = [
  { 
    id: '1', 
    name: 'Máy giặt AQUA Inverter 11kg', 
    currentPrice: '29.990.000', 
    originalPrice: '34.490.000',
    discount: '-24%',
    rating: 4.8,
    sold: 'Đã bán 2,4k',
    image: require('@/assets/images/muasam/sanphambanchay/ảnh_máy giặt .png'),
    hasNewTag: true
  },
  { 
    id: '2', 
    name: 'Máy rửa chén Sanaky 13 bộ', 
    currentPrice: '12.650.000', 
    originalPrice: '14.990.000',
    discount: '-16%',
    rating: 4.9,
    sold: 'Đã bán 1,7k',
    image: require('@/assets/images/muasam/sanphambanchay/Ảnh_Máy rửa chén.png'),
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
    hasNewTag: false
  },
  { 
    id: '4', 
    name: 'Bravia 9 Tivi Mini LED Sony 75 inch', 
    currentPrice: '75.650.000', 
    originalPrice: '95.990.000',
    discount: '-20%',
    rating: 5,
    sold: 'Đã bán 6k+',
    image: require('@/assets/images/Ảnh_Tivi.png'),
    hasNewTag: true
  },
  { 
    id: '5', 
    name: 'Máy nước nóng trực tiếp Ferroli', 
    currentPrice: '1.800.000', 
    originalPrice: '1.990.000',
    discount: '-13%',
    rating: 4.9,
    sold: 'Đã bán 52k',
    image: require('@/assets/images/muasam/sanphambanchay/Ảnh_Máy nước nóng.png'),
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
    hasNewTag: false
  },
];

export default function OrderSuccessScreen() {
  const router = useRouter();

  const handleGoBack = () => {
    // Về màn hình tổng quan của tab mua sắm
    router.replace('/(tabs)/cart');
  };

  const handleGoHome = () => {
    router.replace('/(tabs)/my-items');
  };

  const handleProductPress = (productId: string) => {
    router.push({ pathname: '/product-detail', params: { id: productId } });
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />
      
      {/* Header với background có sẵn phần uốn cong */}
      <ImageBackground 
        source={require('@/assets/images/muasam/Background header.png')}
        style={styles.headerBackground}
        resizeMode="stretch"
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.headerRow}>
            {/* Back Button */}
            <TouchableOpacity 
              onPress={handleGoBack}
              style={styles.headerBackBtn}
            >
              <View style={styles.headerBackCircle}>
                <Image 
                  source={require('@/assets/images/Vector.png')}
                  style={styles.backIcon}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
            
            {/* Cart Icon - Center */}
            <Image 
              source={require('@/assets/images/product_detail/cart-checkout.png')}
              style={styles.cartIcon}
              resizeMode="contain"
            />
            
            {/* Home Button */}
            <TouchableOpacity 
              onPress={handleGoHome}
              style={styles.headerHomeBtn}
            >
              <View style={styles.headerHomeCircle}>
                <Image 
                  source={require('@/assets/images/home.png')}
                  style={styles.homeIcon}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* Success Message */}
          <Text style={styles.successMessage}>
            Đơn hàng đã được đặt hàng thành công!
          </Text>
        </SafeAreaView>
      </ImageBackground>

      {/* Content */}
      <ScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Section Title */}
        <Text style={styles.sectionTitle}>
          CÓ THỂ BẠN SẼ QUAN TÂM
        </Text>

        {/* Products Grid */}
        <View style={styles.productsGrid}>
          {suggestedProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => handleProductPress(product.id)}
              activeOpacity={0.7}
            >
              {/* Discount badge */}
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{product.discount}</Text>
              </View>
              
              {/* Product Image */}
              <View style={styles.productImageContainer}>
                <Image
                  source={product.image}
                  style={styles.productImage}
                  resizeMode="contain"
                />
              </View>

              {/* Product Info */}
              <View style={styles.productInfo}>
                {/* Product Name */}
                <Text style={styles.productName} numberOfLines={2}>
                  {product.name}
                </Text>

                {/* Price Row */}
                <View style={styles.priceRow}>
                  <Text style={styles.currentPrice}>{product.currentPrice}đ</Text>
                  <Text style={styles.discountPercent}>{product.discount}</Text>
                </View>
                <Text style={styles.originalPrice}>{product.originalPrice}đ</Text>

                {/* Rating & Sold */}
                <View style={styles.ratingRow}>
                  <Image 
                    source={require('@/assets/images/product_detail/star.png')}
                    style={styles.starIcon}
                  />
                  <Text style={styles.ratingText}>{product.rating}</Text>
                  <View style={styles.dotSeparator} />
                  <Text style={styles.soldText}>{product.sold}</Text>
                </View>
              </View>

              {/* New Tag */}
              {product.hasNewTag && (
                <View style={styles.newTagContainer}>
                  <View style={styles.newTagOutline}>
                    <Text style={styles.newTagText}>Mẫu mới</Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Header
  headerBackground: {
    paddingBottom: 30,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  headerBackBtn: {},
  headerBackCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: '#39A3FF',
  },
  cartIcon: {
    width: 56,
    height: 56,
  },
  headerHomeBtn: {},
  headerHomeCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIcon: {
    width: 22,
    height: 22,
    tintColor: '#39A3FF',
  },
  successMessage: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  // Section Title
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 16,
    letterSpacing: 0.5,
  },

  // Products Grid
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 10,
    backgroundColor: '#FFF0E6',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.highlight,
  },
  productImageContainer: {
    width: '100%',
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  productImage: {
    width: '80%',
    height: 100,
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 12,
    color: '#333',
    marginBottom: 6,
    lineHeight: 16,
    height: 32,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.highlight,
    marginRight: 6,
  },
  discountPercent: {
    fontSize: 10,
    color: COLORS.highlight,
  },
  originalPrice: {
    fontSize: 11,
    color: COLORS.gray,
    textDecorationLine: 'line-through',
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  starIcon: {
    width: 12,
    height: 12,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 11,
    color: COLORS.secondary,
    fontWeight: '600',
  },
  dotSeparator: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: COLORS.secondary,
    marginHorizontal: 6,
  },
  soldText: {
    fontSize: 11,
    color: COLORS.secondary,
  },

  // New Tag
  newTagContainer: {
    position: 'absolute',
    bottom: 70,
    left: 10,
  },
  newTagOutline: {
    borderWidth: 1,
    borderColor: COLORS.highlight,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  newTagText: {
    fontSize: 9,
    color: COLORS.highlight,
  },
});
