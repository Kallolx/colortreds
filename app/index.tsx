import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Easing
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const rotationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startRotation = () => {
      Animated.loop(
        Animated.timing(rotationValue, {
          toValue: 1,
          duration: 4000, // 4 seconds for smoother rotation
          useNativeDriver: true,
          easing: Easing.linear, // Linear easing for constant speed
        })
      ).start();
    };

    startRotation();
  }, [rotationValue]);

  const rotate = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleSignup = () => {
    router.push('/auth/signup');
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require('../assets/images/onboarding-bg.png')} // You'll need to add this image
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Top Logo Section */}
          <View style={styles.topSection}>
            <Animated.Image
              source={require('../assets/images/logo.png')} // You'll need to add this image
              style={[styles.topLogo, { transform: [{ rotate }] }]}
              resizeMode="contain"
            />
          </View>

          {/* Bottom Content Section */}
          <View style={styles.bottomSection}>
            {/* App Title */}
            <Text style={styles.appTitle}>
              <Text style={{ fontFamily: 'Outfit-Bold' }}>Colour</Text>
              <Text style={{ fontFamily: 'Outfit-Medium' }}>Trade</Text>
            </Text>
            
            {/* Description */}
            <Text style={styles.description}>
              <Text style={{ fontFamily: 'HindSiliguri-Bold' }}>কালার ট্রেড: </Text>
              <Text style={{ fontFamily: 'HindSiliguri-Medium' }}>
                রঙের সাথে অর্থউপার্জনের{'\n'}
                দারুণ সুযোগ, সান্ধ্যকের নতুন দিগন্ত উন্মোচন{'\n'}
                করুন। আজই থেকে আপনার অর্থনৈতিক মুক্তির{'\n'}
                যাত্রা শুরু করুন!
              </Text>
            </Text>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>লগ ইন</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                <Text style={styles.signupButtonText}>সাইন আপ</Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Logo */}
            <View style={styles.bottomLogoContainer}>
              <Image
                source={require('../assets/images/victor-logo.png')} // You'll need to add this image
                style={styles.bottomLogo}
                resizeMode="contain"
              />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  topSection: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  topLogo: {
    width: 120,
    height: 120,
  },
  bottomSection: {
    flex: 0.6,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 0,
  },
  appTitle: {
    fontSize: 36,
    color: '#333333',
    marginBottom: 8,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  description: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'left',
    lineHeight: 22,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#eb01f6',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: '100%',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#000',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'HindSiliguri-Bold',
  },
  signupButton: {
    backgroundColor: 'orange',
    borderRadius: 25,
    paddingVertical: 13,
    paddingHorizontal: 40,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'HindSiliguri-Bold',
  },
  bottomLogoContainer: {
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
  },
  bottomLogo: {
    width: width * 0.5,
    height: (width * 0.5) * 300 / 1060,
  },
});