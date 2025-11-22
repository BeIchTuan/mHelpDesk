import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function IntroScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const taglineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation sequence
    Animated.sequence([
      // Logo fade in và scale
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
      // Tagline fade in
      Animated.timing(taglineAnim, {
        toValue: 1,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to main app after 3 seconds
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-background">
      {/* Text "Care made easy" ở góc phải trên */}
      <Animated.Text 
        className="absolute right-5 z-10 text-sm text-secondary font-medium"
        style={{
          top: height * 0.05,
          opacity: fadeAnim,
          transform: [{ rotate: '5deg' }],
        }}
      >
        Care made easy
      </Animated.Text>

      {/* Logo và nội dung chính */}
      <View className="flex-1 justify-center items-center px-10">
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
        >
          <Image
            source={require('@/assets/images/logo.png')}
            className="mb-5"
            style={{ width: width * 0.8, height: height * 0.25 }}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Tagline */}
        <Animated.Text
          className="text-base text-primary text-center font-medium"
          style={{
            opacity: taglineAnim,
            lineHeight: 24,
            transform: [{
              translateY: taglineAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            }],
          }}
        >
          Giúp bạn hiểu và chăm sóc ngôi nhà chủ động và{'\n'}dễ dàng hơn mỗi ngày!
        </Animated.Text>
      </View>
    </View>
  );
}
