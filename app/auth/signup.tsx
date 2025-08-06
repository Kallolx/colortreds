import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function SignupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const rotationValue = useRef(new Animated.Value(0)).current;

  // State for form fields
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSexDropdown, setShowSexDropdown] = useState(false);
  const [selectedSex, setSelectedSex] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const sexOptions = ['পুরুষ', 'মহিলা', 'অন্যান্য'];

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

  const handleSignup = () => {
    // TODO: Implement signup logic
    router.replace('/auth/login');
  };

  const navigateToLogin = () => {
    router.back();
  };

  const handleBack = () => {
    router.back();
  };

  const handleImageUpload = () => {
    // TODO: Implement image upload logic
    console.log('Image upload clicked');
  };

  const selectSex = (sex: React.SetStateAction<string>) => {
    setSelectedSex(sex);
    setShowSexDropdown(false);
  };

  const handleDateSelect = () => {
    if (selectedDay && selectedMonth && selectedYear) {
      const formattedDate = `${selectedDay}/${selectedMonth}/${selectedYear}`;
      setSelectedDate(formattedDate);
      setShowDatePicker(false);
    }
  };

  const generateDateOptions = () => {
    const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
    const months = [
      { label: 'জানুয়ারি', value: '01' },
      { label: 'ফেব্রুয়ারি', value: '02' },
      { label: 'মার্চ', value: '03' },
      { label: 'এপ্রিল', value: '04' },
      { label: 'মে', value: '05' },
      { label: 'জুন', value: '06' },
      { label: 'জুলাই', value: '07' },
      { label: 'আগস্ট', value: '08' },
      { label: 'সেপ্টেম্বর', value: '09' },
      { label: 'অক্টোবর', value: '10' },
      { label: 'নভেম্বর', value: '11' },
      { label: 'ডিসেম্বর', value: '12' }
    ];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 80 }, (_, i) => String(currentYear - 18 - i));
    
    return { days, months, years };
  };

  const { days, months, years } = generateDateOptions();

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require('../../assets/images/onboarding-bg.png')}
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
            {/* Signup Title */}
            <Text style={styles.signupTitle}>সাইন আপ</Text>
            
            {/* Subtitle */}
            <Text style={styles.subtitle}>
              আপনার নতুন একটি অ্যাকাউন্ট তৈরি করুন
            </Text>

            {/* Signup Form */}
            <ScrollView 
              style={styles.scrollContainer}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.form}>
                {/* Full Name Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>পুরো নাম</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="আপনার পুরো নাম লিখুন"
                    placeholderTextColor="#666"
                    autoCapitalize="words"
                  />
                </View>
                
                {/* Email Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>ইমেইল ঠিকানা</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="ইমেইল ঠিকানা লিখুন"
                    placeholderTextColor="#666"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                {/* Password Input with Eye Icon */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>পাসওয়ার্ড</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="৮ সংখ্যার পাসওয়ার্ড লিখুন"
                      placeholderTextColor="#666"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁️'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Confirm Password Input with Eye Icon */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>পাসওয়ার্ড নিশ্চিত করুন</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="পাসওয়ার্ড আবার লিখুন"
                      placeholderTextColor="#666"
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <Text style={styles.eyeText}>{showConfirmPassword ? '🙈' : '👁️'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                
                {/* Sex Dropdown */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>লিঙ্গ</Text>
                  <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setShowSexDropdown(true)}
                  >
                    <Text style={styles.dropdownText}>
                      {selectedSex || 'লিঙ্গ নির্বাচন করুন'}
                    </Text>
                    <Text style={styles.dropdownArrow}>▼</Text>
                  </TouchableOpacity>
                </View>
                
                {/* Date of Birth Picker */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>জন্ম তারিখ</Text>
                  <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text style={styles.dropdownText}>
                      {selectedDate || 'জন্ম তারিখ নির্বাচন করুন'}
                    </Text>
                    <Text style={styles.dropdownArrow}>📅</Text>
                  </TouchableOpacity>
                </View>
                
                {/* Referral Code Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>রেফারেল কোড (ঐচ্ছিক)</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="রেফারেল কোড লিখুন"
                    placeholderTextColor="#666"
                  />
                </View>

                {/* Profile Image Upload Section */}
                <View style={styles.imageUploadSection}>
                  <Text style={styles.imageUploadLabel}>প্রোফাইল ছবি</Text>
                  <TouchableOpacity style={styles.imageUploadButton} onPress={handleImageUpload}>
                    <View style={styles.imageUploadPlaceholder}>
                      <Text style={styles.imageUploadIcon}>📷</Text>
                      <Text style={styles.imageUploadText}>ছবি আপলোড করুন</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                
                {/* Signup Button */}
                <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                  <Text style={styles.signupButtonText}>অ্যাকাউন্ট তৈরি করুন</Text>
                </TouchableOpacity>
                
                {/* Login Link */}
                <View style={styles.loginContainer}>
                  <Text style={styles.loginText}>ইতিমধ্যে অ্যাকাউন্ট আছে? </Text>
                  <TouchableOpacity onPress={navigateToLogin}>
                    <Text style={styles.loginLink}>লগ ইন করুন</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>

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

      {/* Sex Selection Modal */}
      <Modal
        visible={showSexDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSexDropdown(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowSexDropdown(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>লিঙ্গ নির্বাচন করুন</Text>
            {sexOptions.map((sex, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalOption}
                onPress={() => selectSex(sex)}
              >
                <Text style={styles.modalOptionText}>{sex}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowSexDropdown(false)}
            >
              <Text style={styles.modalCloseText}>বাতিল</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Date Selection Modal */}
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.dateModalContent}>
            <Text style={styles.modalTitle}>জন্ম তারিখ নির্বাচন করুন</Text>
            
            <View style={styles.datePickerContainer}>
              {/* Day Picker */}
              <View style={styles.datePickerColumn}>
                <Text style={styles.datePickerLabel}>দিন</Text>
                <ScrollView style={styles.dateScrollView} showsVerticalScrollIndicator={false}>
                  {days.map((day) => (
                    <TouchableOpacity
                      key={day}
                      style={[
                        styles.dateOption,
                        selectedDay === day && styles.selectedDateOption
                      ]}
                      onPress={() => setSelectedDay(day)}
                    >
                      <Text style={[
                        styles.dateOptionText,
                        selectedDay === day && styles.selectedDateOptionText
                      ]}>
                        {day}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Month Picker */}
              <View style={styles.datePickerColumn}>
                <Text style={styles.datePickerLabel}>মাস</Text>
                <ScrollView style={styles.dateScrollView} showsVerticalScrollIndicator={false}>
                  {months.map((month) => (
                    <TouchableOpacity
                      key={month.value}
                      style={[
                        styles.dateOption,
                        selectedMonth === month.value && styles.selectedDateOption
                      ]}
                      onPress={() => setSelectedMonth(month.value)}
                    >
                      <Text style={[
                        styles.dateOptionText,
                        selectedMonth === month.value && styles.selectedDateOptionText
                      ]}>
                        {month.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Year Picker */}
              <View style={styles.datePickerColumn}>
                <Text style={styles.datePickerLabel}>বছর</Text>
                <ScrollView style={styles.dateScrollView} showsVerticalScrollIndicator={false}>
                  {years.map((year) => (
                    <TouchableOpacity
                      key={year}
                      style={[
                        styles.dateOption,
                        selectedYear === year && styles.selectedDateOption
                      ]}
                      onPress={() => setSelectedYear(year)}
                    >
                      <Text style={[
                        styles.dateOptionText,
                        selectedYear === year && styles.selectedDateOptionText
                      ]}>
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={styles.dateModalButtons}>
              <TouchableOpacity
                style={[styles.dateConfirmButton, (!selectedDay || !selectedMonth || !selectedYear) && styles.disabledButton]}
                onPress={handleDateSelect}
                disabled={!selectedDay || !selectedMonth || !selectedYear}
              >
                <Text style={styles.dateConfirmText}>নিশ্চিত</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dateCancelButton}
                onPress={() => setShowDatePicker(false)}
              >
                <Text style={styles.dateCancelText}>বাতিল</Text>
              </TouchableOpacity>
            </View>
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
    flex: 0.25,
    paddingHorizontal: 20,
    paddingTop: 30,
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
    width: 100,
    height: 100,
  },
  bottomSection: {
    flex: 0.75,
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    paddingBottom: 0,
  },
  signupTitle: {
    fontSize: 32,
    color: '#000',
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: 'HindSiliguri-Bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 20,
    fontFamily: 'HindSiliguri-Medium',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 25,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 22,
    fontSize: 16,
    fontFamily: 'HindSiliguri-Medium',
  },
  eyeIcon: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  eyeText: {
    fontSize: 20,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 22,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'HindSiliguri-Medium',
  },
  dropdownArrow: {
    fontSize: 16,
    color: '#333',
  },
  imageUploadSection: {
    marginTop: 10,
    marginBottom: 15,
  },
  imageUploadLabel: {
    fontSize: 16,
    fontFamily: 'HindSiliguri-Bold',
    color: '#000',
    marginBottom: 8,
  },
  imageUploadButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#000',
    borderStyle: 'dashed',
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  imageUploadPlaceholder: {
    alignItems: 'center',
  },
  imageUploadIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  imageUploadText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'HindSiliguri-Medium',
  },
  signupButton: {
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

  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'HindSiliguri-Bold',
  },

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    flexWrap: 'wrap',
  },

  loginText: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'HindSiliguri-Medium',
  },

  loginLink: {
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: width * 0.8,
    maxHeight: height * 0.6,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'HindSiliguri-Bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalOptionText: {
    fontSize: 18,
    fontFamily: 'HindSiliguri-Medium',
    color: '#333',
    textAlign: 'center',
  },
  modalCloseButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: '#eb01f6',
    borderRadius: 25,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'HindSiliguri-Bold',
  },
  dateNote: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'HindSiliguri-Medium',
  },
  dateInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateInput: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'HindSiliguri-Medium',
  },
  dateConfirmButton: {
    flex: 1,
    backgroundColor: '#eb01f6',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dateConfirmText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'HindSiliguri-Bold',
  },
  // New Date Picker Styles
  dateModalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    width: '90%',
    maxHeight: '80%',
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    height: 200,
  },
  datePickerColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  datePickerLabel: {
    fontSize: 16,
    fontFamily: 'HindSiliguri-Bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  dateScrollView: {
    maxHeight: 160,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  dateOption: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  selectedDateOption: {
    backgroundColor: '#eb01f6',
  },
  dateOptionText: {
    fontSize: 14,
    fontFamily: 'HindSiliguri-Medium',
    color: '#333',
  },
  selectedDateOptionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dateModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  dateCancelButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#000',
    marginLeft: 10,
    alignItems: 'center',
  },
  dateCancelText: {
    fontSize: 16,
    fontFamily: 'HindSiliguri-Bold',
    color: '#000',
  },
  disabledButton: {
    backgroundColor: '#ccc',
    opacity: 0.6,
    borderColor: '#999',
  },
});