import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const rotationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startRotation = () => {
      Animated.loop(
        Animated.timing(rotationValue, {
          toValue: 1,
          duration: 4000, // 4 seconds for smooth rotation
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
    // TODO: Implement login logic
    router.replace('/(tabs)');
  };

  const handleBack = () => {
    router.back();
  };

  const navigateToSignup = () => {
    router.push('/auth/signup');
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require('../../assets/images/login-bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Top Section with Back Button and Logo */}
          <View style={styles.topSection}>
            {/* Back Button at top */}
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text>
                <Text style={styles.arrowIcon}>‹ </Text>
              </Text> 
            </TouchableOpacity>
            
            {/* Logo centered with rotation */}
            <View style={styles.logoContainer}>
              <Animated.Image
                source={require('../../assets/images/logo.png')}
                style={[styles.topLogo, { transform: [{ rotate }] }]}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Bottom Content Section */}
          <View style={styles.bottomSection}>
            {/* Login Title */}
            <Text style={styles.loginTitle}>লগ ইন</Text>
            
            {/* Subtitle */}
            <Text style={styles.subtitle}>
              আপনার সুবর্ণ একটি আকাউন্ট লগ ইন করুন
            </Text>

            {/* Login Form */}
            <View style={styles.form}>
              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>নম্বর বা ইমেইল</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="মোবাইল নম্বর বা ইমেইল ঠিকানা লিখুন"
                  placeholderTextColor="#666"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              
              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>পাসওয়ার্ড</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="৮ সংখ্যার পাসওয়ার্ড লিখুন"
                  placeholderTextColor="#666"
                  secureTextEntry
                  autoCapitalize="none"
                />
                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>পাসওয়ার্ড ভুলে গেছি</Text>
                </TouchableOpacity>
              </View>
              
              {/* Login Button */}
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>লগ ইন</Text>
              </TouchableOpacity>
              
              {/* Signup Link */}
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>একটি অ্যাকাউন্ট নেই? </Text>
                <TouchableOpacity onPress={navigateToSignup}>
                  <Text style={styles.signupLink}>সাইন আপ করুন</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Bottom Logo */}
            <View style={styles.bottomLogoContainer}>
              <Image
                source={require('../../assets/images/victor-logo.png')}
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
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },

  arrowIcon: {
    fontSize: 48,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 52,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topLogo: {
    width: 120,
    height: 120,
  },
  bottomSection: {
    flex: 0.6,
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
    paddingBottom: 0,
  },
  loginTitle: {
    fontSize: 36,
    color: '#000',
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: 'HindSiliguri-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 20,
    fontFamily: 'HindSiliguri-Medium',
  },
  form: {
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
    fontFamily: 'HindSiliguri-Bold',
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 22,
    fontSize: 16,
    fontFamily: 'HindSiliguri-Medium',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  forgotPasswordText: {
    color: '#eb01f6',
    fontSize: 14,
    fontFamily: 'HindSiliguri-Bold',
    textDecorationLine: 'underline',
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
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    flexWrap: 'wrap',
  },
  signupText: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'HindSiliguri-Medium',
  },
  signupLink: {
    color: '#eb01f6',
    fontSize: 16,
    fontFamily: 'HindSiliguri-Bold',
    textDecorationLine: 'underline',
  },
  bottomLogoContainer: {
    alignItems: 'center',
    marginTop: 15,
    paddingBottom: 10,
  },
  bottomLogo: {
    width: width * 0.4,
    height: 35,
  },
});