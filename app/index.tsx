import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Easing,
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const rotationValue = useRef(new Animated.Value(0)).current;
  const [showSplash, setShowSplash] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [showNoInternetModal, setShowNoInternetModal] = useState(false);

  // Check internet connectivity
  const checkInternetConnection = async () => {
    try {
      // Simple fetch test to check connectivity
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('https://www.google.com', {
        method: 'HEAD',
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      setIsConnected(response.ok);
      if (!response.ok) {
        setShowNoInternetModal(true);
      }
    } catch (error) {
      console.log('Error checking internet:', error);
      setIsConnected(false);
      setShowNoInternetModal(true);
    }
  };

  useEffect(() => {
    // Start splash screen timer and internet check
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 4000); // 4 seconds

    checkInternetConnection();

    return () => clearTimeout(splashTimer);
  }, []);

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

  const handleCloseModal = () => {
    setShowNoInternetModal(false);
  };

  // Splash Screen Component
  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <View style={styles.splashContent}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.splashLogo}
            resizeMode="contain"
          />
          <Text style={styles.splashTitle}>ColourTrade</Text>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={40} color="#FFD700" />
            <Text style={styles.loadingText}>Checking connection...</Text>
          </View>
        </View>
        <View style={styles.splashBottomLogoContainer}>
          <Image
            source={require('../assets/images/victor-logo.png')}
            style={styles.splashBottomLogo}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }

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
                রঙের সাথে অর্থ উপার্জনের{'\n'}
                দারুন সুযোগ, সাফল্যের নতুন দিগন্ত উন্মোচন{'\n'}
                করুন । আজ থেকেই আপনার অর্থনৈতিক মুক্তির{'\n'}
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

      {/* No Internet Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showNoInternetModal}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image
                source={require('../assets/images/icons/no-internet.png')} // You'll need to add this image
                style={{ height: 100, width: 100 }}
                resizeMode="contain"
              />
            <Text style={styles.modalTitle}>No Internet Connection</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    borderRadius: 50,
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
    borderRadius: 50,
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
  // Splash Screen Styles
  splashContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashLogo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  splashTitle: {
    fontSize: 32,
    fontFamily: 'Outfit-Bold',
    color: '#333333',
    marginBottom: 40,
  },
  loadingContainer: {
    alignItems: 'center',
    gap: 15,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'HindSiliguri-Medium',
    color: '#666666',
  },
  splashBottomLogoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
  },
  splashBottomLogo: {
    width: width * 0.5,
    height: (width * 0.5) * 300 / 1060,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Outfit-Bold',
    color: '#333333',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    fontFamily: 'HindSiliguri-Medium',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 25,
  },
  modalButton: {
    backgroundColor: '#eb01f6',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 30,
    minWidth: 100,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'HindSiliguri-Bold',
  },
});