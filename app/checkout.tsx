import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

export default function CheckoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [requestInvoice, setRequestInvoice] = useState(false);
  const [noteText, setNoteText] = useState('');

  // Mock data theo Figma
  const addressData = {
    name: 'Thiên Thanh',
    phone: '0123456789',
    address: 'Kí túc xá khu A ĐHQG, đường Tạ Quang Bửu, khu phố 6, phường Linh Trung, Thành phố Thủ Đức, TP. Hồ Chí Minh'
  };

  const productData = {
    name: 'Bravia 9 Tivi Mini LED (QLED) Sony 75 inch K-75XR90',
    originalPrice: '95.990.000',
    currentPrice: '75.650.000',
    quantity: 1,
    dealer: 'ĐẠI LÝ MINH MẪN',
    image: require('@/assets/images/Ảnh_Tivi.png')
  };

  const paymentMethods = [
    { id: 'cod', label: 'Thanh toán khi nhận hàng' },
    { id: 'momo', label: 'Thanh toán qua MoMo' },
    { id: 'credit', label: 'Thẻ tín dụng' },
    { id: 'atm', label: 'Thẻ ATM/Internet banking' },
  ];

  const handleCheckout = () => {
    if (!agreeTerms) {
      Alert.alert('Thông báo', 'Vui lòng đồng ý với điều khoản và chính sách mua hàng');
      return;
    }
    // Navigate đến màn hình đặt hàng thành công
    router.replace('/order-success');
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <StatusBar style="dark" />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/(tabs)/cart');
              }
            }}
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
          
          <Text style={styles.headerTitle}>
            THANH TOÁN
          </Text>
          
          <TouchableOpacity 
            onPress={() => router.push('/(tabs)/my-items')}
            style={styles.headerHomeBtn}
          >
            <View style={styles.headerHomeCircle}>
              <Ionicons name="home-outline" size={20} color={COLORS.primary} />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* Address Section */}
          <TouchableOpacity 
            style={styles.addressCard}
            onPress={() => router.push('/shipping-address')}
          >
            <Image 
              source={require('@/assets/images/product_detail/local.png')}
              style={styles.addressIcon}
              resizeMode="contain"
            />
            <View style={{ flex: 1 }}>
              <View style={styles.addressHeader}>
                <Text style={styles.addressName}>
                  {addressData.name}
                </Text>
                <View style={styles.addressDivider} />
                <Text style={styles.addressPhone}>
                  {addressData.phone}
                </Text>
              </View>
              <Text style={styles.addressText}>
                {addressData.address}
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={COLORS.gray} />
          </TouchableOpacity>

          {/* Dealer & Product Section */}
          <View style={styles.card}>
            {/* Dealer Name */}
            <View style={styles.dealerHeader}>
              <Text style={styles.dealerName}>
                {productData.dealer}
              </Text>
            </View>

            {/* Product Info */}
            <View style={styles.productRow}>
              <View style={styles.productImageContainer}>
                <Image 
                  source={productData.image}
                  style={styles.productImage}
                  resizeMode="contain"
                />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.productName} numberOfLines={2}>
                  {productData.name}
                </Text>
                <View style={styles.priceRow}>
                  <View>
                    <Text style={styles.productPrice}>
                      {productData.currentPrice}đ
                    </Text>
                  </View>
                  <Text style={styles.productQuantity}>
                    x{productData.quantity}
                  </Text>
                </View>
              </View>
            </View>

            {/* Voucher của Đại lý */}
            <TouchableOpacity style={styles.rowItem}>
              <Text style={styles.rowLabel}>Voucher của Đại lý</Text>
              <View style={styles.rowRight}>
                <Text style={styles.rowPlaceholder}>Chọn hoặc Nhập mã Voucher</Text>
                <MaterialIcons name="chevron-right" size={20} color="#CCCCCC" />
              </View>
            </TouchableOpacity>

            {/* Lời nhắn cho Đại lý */}
            <TouchableOpacity style={styles.rowItem}>
              <Text style={styles.rowLabel}>Lời nhắn cho Đại lý</Text>
              <View style={styles.rowRight}>
                <Text style={styles.rowPlaceholder}>Để lại lời nhắn</Text>
                <MaterialIcons name="chevron-right" size={20} color="#CCCCCC" />
              </View>
            </TouchableOpacity>

            {/* Tổng tiền sản phẩm */}
            <View style={styles.rowItemLast}>
              <Text style={styles.rowLabel}>Tổng tiền sản phẩm</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.oldPrice}>{productData.originalPrice}đ</Text>
                <Text style={styles.totalPrice}>
                  {productData.currentPrice}đ
                </Text>
              </View>
            </View>
          </View>

          {/* EzCare Voucher Section */}
          <TouchableOpacity style={styles.voucherCard}>
            <View style={styles.voucherIconContainer}>
              <Ionicons name="pricetag" size={16} color={COLORS.primary} />
            </View>
            <Text style={styles.voucherTitle}>EzCare Voucher</Text>
            <View style={styles.rowRight}>
              <Text style={styles.rowPlaceholder}>Chọn hoặc Nhập mã Voucher</Text>
              <MaterialIcons name="chevron-right" size={20} color="#CCCCCC" />
            </View>
          </TouchableOpacity>

          {/* Payment Methods Section */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>
              Hình thức thanh toán
            </Text>
            <View style={styles.paymentGrid}>
              {paymentMethods.map((method) => (
                <TouchableOpacity
                  key={method.id}
                  onPress={() => setSelectedPayment(method.id)}
                  style={[
                    styles.paymentOption,
                    selectedPayment === method.id && styles.paymentOptionSelected
                  ]}
                >
                  <Text style={[
                    styles.paymentLabel,
                    selectedPayment === method.id && styles.paymentLabelSelected
                  ]}>
                    {method.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Terms Checkbox */}
          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.checkboxRow}
              onPress={() => setAgreeTerms(!agreeTerms)}
            >
              <View style={[
                styles.checkbox,
                agreeTerms && styles.checkboxChecked
              ]}>
                {agreeTerms && <MaterialIcons name="check" size={14} color={COLORS.white} />}
              </View>
              <Text style={styles.checkboxText}>
                Tôi đồng ý với thỏa thuận{' '}
                <Text style={styles.linkText}>
                  bảo mật và chính sách mua hàng
                </Text>
                {' '}của EzCare
              </Text>
            </TouchableOpacity>
          </View>

          {/* Request Invoice - Section riêng */}
          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.checkboxRow}
              onPress={() => setRequestInvoice(!requestInvoice)}
            >
              <View style={[
                styles.checkbox,
                requestInvoice && styles.checkboxChecked
              ]}>
                {requestInvoice && <MaterialIcons name="check" size={14} color={COLORS.white} />}
              </View>
              <Text style={styles.checkboxText}>
                Yêu cầu xuất hoá đơn GTGT cho đơn hàng này
              </Text>
            </TouchableOpacity>
          </View>

          {/* Payment Details Section */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>
              Chi tiết thanh toán
            </Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Tổng tiền sản phẩm</Text>
              <Text style={styles.detailValue}>{productData.currentPrice}đ</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Phí vận chuyển, lắp đặt</Text>
              <Text style={styles.detailValue}>0đ</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tổng thanh toán</Text>
              <Text style={styles.totalValue}>{productData.currentPrice}đ</Text>
            </View>
          </View>
        </ScrollView>

        {/* Checkout Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={handleCheckout}
            style={styles.checkoutButton}
            activeOpacity={0.8}
          >
            <Text style={styles.checkoutButtonText}>
              Thanh toán và đặt hàng
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
  },
  headerBackBtn: {
    position: 'absolute',
    left: 16,
  },
  headerBackCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(176, 212, 242, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  headerHomeBtn: {
    position: 'absolute',
    right: 16,
  },
  headerHomeCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(176, 212, 242, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Card
  card: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    padding: 16,
  },

  // Address Section
  addressCard: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  addressIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },
  addressDivider: {
    width: 1,
    height: 14,
    backgroundColor: COLORS.text,
    marginHorizontal: 10,
  },
  addressPhone: {
    fontSize: 14,
    color: COLORS.text,
  },
  addressText: {
    fontSize: 13,
    color: COLORS.text,
    lineHeight: 20,
  },

  // Dealer & Product
  dealerHeader: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingBottom: 12,
    marginBottom: 12,
  },
  dealerName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  productRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingBottom: 16,
    marginBottom: 12,
  },
  productImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: 'rgba(176, 212, 242, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: 70,
    height: 70,
  },
  productName: {
    fontSize: 13,
    color: COLORS.primary,
    lineHeight: 18,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 'auto',
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.highlight,
  },
  productQuantity: {
    fontSize: 13,
    color: COLORS.text,
  },

  // Row Items
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  rowItemLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
  },
  rowLabel: {
    fontSize: 13,
    color: COLORS.text,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowPlaceholder: {
    fontSize: 12,
    color: COLORS.gray,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  oldPrice: {
    fontSize: 12,
    color: COLORS.gray,
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  totalPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },

  // Voucher Card
  voucherCard: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  voucherIconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  voucherTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },

  // Payment Methods
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
  },
  paymentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  paymentOption: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  paymentOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  paymentLabel: {
    fontSize: 12,
    color: COLORS.primary,
  },
  paymentLabelSelected: {
    color: COLORS.white,
    fontWeight: '600',
  },

  // Checkbox
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  checkboxChecked: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  checkboxText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.text,
    lineHeight: 20,
  },
  linkText: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },

  // Payment Details
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 13,
    color: COLORS.text,
  },
  detailValue: {
    fontSize: 13,
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.highlight,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.highlight,
  },

  // Bottom Button
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  checkoutButton: {
    backgroundColor: COLORS.highlight,
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 16,
  },
});
