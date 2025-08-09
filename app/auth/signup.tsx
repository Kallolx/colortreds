import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
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
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function SignupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const rotationValue = useRef(new Animated.Value(0)).current;

  // Step state
  const [step, setStep] = useState(1);

  // Step 1 fields
  const [fullName, setFullName] = useState("");
  const [selectedSex, setSelectedSex] = useState("");
  const [showSexDropdown, setShowSexDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [referralCode, setReferralCode] = useState("");

  // Step 2 fields
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Step 3 fields
  const [profileImage, setProfileImage] = useState(null);

  // Username for step 3 (use email before @ or fullName)
  const username = email
    ? email.split("@")[0]
    : fullName.split(" ")[0] || "Md Rockey";

  const sexOptions = ["পুরুষ", "মহিলা", "অন্যান্য"];

  useEffect(() => {
    const startRotation = () => {
      Animated.loop(
        Animated.timing(rotationValue, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
          easing: Easing.linear,
        })
      ).start();
    };
    startRotation();
  }, [rotationValue]);

  const rotate = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // Date picker helpers
  const generateDateOptions = () => {
    const days = Array.from({ length: 31 }, (_, i) =>
      String(i + 1).padStart(2, "0")
    );
    const months = [
      { label: "জানুয়ারি", value: "01" },
      { label: "ফেব্রুয়ারি", value: "02" },
      { label: "মার্চ", value: "03" },
      { label: "এপ্রিল", value: "04" },
      { label: "মে", value: "05" },
      { label: "জুন", value: "06" },
      { label: "জুলাই", value: "07" },
      { label: "আগস্ট", value: "08" },
      { label: "সেপ্টেম্বর", value: "09" },
      { label: "অক্টোবর", value: "10" },
      { label: "নভেম্বর", value: "11" },
      { label: "ডিসেম্বর", value: "12" },
    ];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 80 }, (_, i) =>
      String(currentYear - 18 - i)
    );
    return { days, months, years };
  };
  const { days, months, years } = generateDateOptions();

  // Step navigation
  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => setStep(step - 1);

  // Date select
  const handleDateSelect = () => {
    if (selectedDay && selectedMonth && selectedYear) {
      const formattedDate = `${selectedDay}/${selectedMonth}/${selectedYear}`;
      setSelectedDate(formattedDate);
      setShowDatePicker(false);
    }
  };

  // Sex select
  const selectSex = (sex: string) => {
    setSelectedSex(sex);
    setShowSexDropdown(false);
  };

  // Image upload stub
  const handleImageUpload = () => {
    // TODO: Implement image upload logic
    alert("Image upload clicked");
  };

  // Signup logic (step 2)
  const handleSignup = () => {
    // TODO: Implement signup logic (API call etc)
    setStep(3);
  };

  // Save info (step 3)
  const handleSaveInfo = () => {
    router.replace("/auth/login");
  };

  // Login link
  const navigateToLogin = () => {
    router.back();
  };

  // Back button
  const handleBack = () => {
    if (step === 1) router.back();
    else setStep(step - 1);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/onboarding-bg.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.topSection}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text>
                <Text style={styles.arrowIcon}>‹ </Text>
              </Text>
            </TouchableOpacity>
            <View style={styles.logoContainer}>
              <Animated.Image
                source={require("../../assets/images/logo.png")}
                style={[styles.topLogo, { transform: [{ rotate }] }]}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.bottomSection}>
            <Text style={styles.signupTitle}>সাইন আপ</Text>
            <Text style={styles.subtitle}>
              সাইন আপ করতে ফর্মটি পূরণ করুন
            </Text>
            <ScrollView
              style={styles.scrollContainer}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.form}>
                {step === 1 && (
                  <>
                    {/* Full Name */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>পুরো নাম</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder="আপনার পুরো নাম লিখুন"
                        placeholderTextColor="#666"
                        autoCapitalize="words"
                        value={fullName}
                        onChangeText={setFullName}
                      />
                    </View>
                    {/* Gender */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>লিঙ্গ</Text>
                      <TouchableOpacity
                        style={styles.dropdownButton}
                        onPress={() => setShowSexDropdown(true)}
                      >
                        <Text style={styles.dropdownText}>
                          {selectedSex || "লিঙ্গ নির্বাচন করুন"}
                        </Text>
                        <Text style={styles.dropdownArrow}>▼</Text>
                      </TouchableOpacity>
                    </View>
                    {/* Date of Birth as 3 boxes */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>জন্ম তারিখ</Text>
                      <View style={styles.dobRow}>
                        <TouchableOpacity
                          style={styles.dobBox}
                          onPress={() => setShowDatePicker(true)}
                        >
                          <Text style={styles.dobBoxText}>
                            {selectedDay || "তারিখ"}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.dobBox}
                          onPress={() => setShowDatePicker(true)}
                        >
                          <Text style={styles.dobBoxText}>
                            {selectedMonth || "মাস"}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.dobBox}
                          onPress={() => setShowDatePicker(true)}
                        >
                          <Text style={styles.dobBoxText}>
                            {selectedYear || "বছর"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {/* Referral Code and Next Button Side by Side */}
                    <View style={styles.referralRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.inputLabel}>
                          রেফারেল কোড (ঐচ্ছিক)
                        </Text>
                        <TextInput
                          style={styles.referralInput}
                          placeholder="রেফারেল কোড লিখুন"
                          placeholderTextColor="#666"
                          value={referralCode}
                          onChangeText={setReferralCode}
                        />
                      </View>
                      <TouchableOpacity
                        style={styles.nextButton}
                        onPress={handleNextStep}
                      >
                        <Text style={styles.nextButtonText}>পরবর্তী</Text>
                        <Ionicons
                          name="arrow-forward"
                          size={22}
                          color="#fff"
                          style={styles.nextButtonIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  </>
                )}
                {step === 2 && (
                  <>
                    {/* Email */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>ইমেইল ঠিকানা</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder="ইমেইল ঠিকানা লিখুন"
                        placeholderTextColor="#666"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                      />
                    </View>
                    {/* Mobile */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>মোবাইল নম্বর</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder="মোবাইল নম্বর লিখুন"
                        placeholderTextColor="#666"
                        keyboardType="phone-pad"
                        value={mobile}
                        onChangeText={setMobile}
                      />
                    </View>
                    {/* Password */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>পাসওয়ার্ড</Text>
                      <View style={styles.passwordContainer}>
                        <TextInput
                          style={styles.passwordInput}
                          placeholder="৮ সংখ্যার পাসওয়ার্ড লিখুন"
                          placeholderTextColor="#666"
                          secureTextEntry={!showPassword}
                          autoCapitalize="none"
                          value={password}
                          onChangeText={setPassword}
                        />
                        <TouchableOpacity
                          style={styles.eyeIcon}
                          onPress={() => setShowPassword(!showPassword)}
                        >
                          <Text style={styles.eyeText}>
                            {showPassword ? "🙈" : "👁️"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/*Confirm Password */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>
                        পাসওয়ার্ড নিশ্চিত করুন
                      </Text>
                      <View style={styles.passwordContainer}>
                        <TextInput
                          style={styles.passwordInput}
                          placeholder="৮ সংখ্যার পাসওয়ার্ড লিখুন"
                          placeholderTextColor="#666"
                          secureTextEntry={!showPassword}
                          autoCapitalize="none"
                          value={confirmPassword}
                          onChangeText={setConfirmPassword}
                        />
                        <TouchableOpacity
                          style={styles.eyeIcon}
                          onPress={() => setShowPassword(!showPassword)}
                        >
                          <Text style={styles.eyeText}>
                            {showPassword ? "🙈" : "👁️"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {/* Create Account Button */}
                    <TouchableOpacity
                      style={styles.signupButton}
                      onPress={handleSignup}
                    >
                      <Text style={styles.signupButtonText}>
                        অ্যাকাউন্ট তৈরি করুন
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
                {step === 3 && (
                  <>
                    {/* Profile Image Upload */}
                    <View style={styles.imageUploadSection}>
                      <Text style={styles.imageUploadLabel}>প্রোফাইল ছবি</Text>
                      <TouchableOpacity
                        style={styles.imageUploadButton}
                        onPress={handleImageUpload}
                      >
                        <View style={styles.imageUploadPlaceholder}>
                          <Text style={styles.imageUploadIcon}>📷</Text>
                          <Text style={styles.imageUploadText}>
                            ছবি আপলোড করুন
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    {/* Username Display */}
                    <View style={{ alignItems: "center", marginBottom: 20 }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontFamily: "HindSiliguri-Bold",
                          color: "#000",
                        }}
                      >
                        {username}
                      </Text>
                    </View>
                    {/* Save Info Button */}
                    <TouchableOpacity
                      style={styles.signupButton}
                      onPress={handleSaveInfo}
                    >
                      <Text style={styles.signupButtonText}>সংরক্ষণ করুন</Text>
                    </TouchableOpacity>
                  </>
                )}
                {/* Login Link (only on step 1 and 2) */}
                {(step === 1 || step === 2) && (
                  <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>
                      ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
                    </Text>
                    <TouchableOpacity onPress={navigateToLogin}>
                      <Text style={styles.loginLink}>লগ ইন করুন</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </ScrollView>
            <View style={styles.bottomLogoContainer}>
              <Image
                source={require("../../assets/images/victor-logo.png")}
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
                <ScrollView
                  style={styles.dateScrollView}
                  showsVerticalScrollIndicator={false}
                >
                  {days.map((day) => (
                    <TouchableOpacity
                      key={day}
                      style={[
                        styles.dateOption,
                        selectedDay === day && styles.selectedDateOption,
                      ]}
                      onPress={() => setSelectedDay(day)}
                    >
                      <Text
                        style={[
                          styles.dateOptionText,
                          selectedDay === day && styles.selectedDateOptionText,
                        ]}
                      >
                        {day}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              {/* Month Picker */}
              <View style={styles.datePickerColumn}>
                <Text style={styles.datePickerLabel}>মাস</Text>
                <ScrollView
                  style={styles.dateScrollView}
                  showsVerticalScrollIndicator={false}
                >
                  {months.map((month) => (
                    <TouchableOpacity
                      key={month.value}
                      style={[
                        styles.dateOption,
                        selectedMonth === month.value &&
                          styles.selectedDateOption,
                      ]}
                      onPress={() => setSelectedMonth(month.value)}
                    >
                      <Text
                        style={[
                          styles.dateOptionText,
                          selectedMonth === month.value &&
                            styles.selectedDateOptionText,
                        ]}
                      >
                        {month.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              {/* Year Picker */}
              <View style={styles.datePickerColumn}>
                <Text style={styles.datePickerLabel}>বছর</Text>
                <ScrollView
                  style={styles.dateScrollView}
                  showsVerticalScrollIndicator={false}
                >
                  {years.map((year) => (
                    <TouchableOpacity
                      key={year}
                      style={[
                        styles.dateOption,
                        selectedYear === year && styles.selectedDateOption,
                      ]}
                      onPress={() => setSelectedYear(year)}
                    >
                      <Text
                        style={[
                          styles.dateOptionText,
                          selectedYear === year &&
                            styles.selectedDateOptionText,
                        ]}
                      >
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
            <View style={styles.dateModalButtons}>
              <TouchableOpacity
                style={[
                  styles.dateConfirmButton,
                  (!selectedDay || !selectedMonth || !selectedYear) &&
                    styles.disabledButton,
                ]}
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
    width: "100%",
    height: "100%",
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
    backgroundColor: "transparent",
    borderWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  arrowIcon: {
    fontSize: 48,
    color: "#000",
    fontWeight: "bold",
    textAlign: "left",
    lineHeight: 52,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  topLogo: {
    width: 100,
    height: 100,
  },
  bottomSection: {
    flex: 0.75,
    justifyContent: "flex-start",
    paddingHorizontal: 30,
    paddingBottom: 0,
  },
  signupTitle: {
    fontSize: 32,
    color: "#000",
    textAlign: "left",
    alignSelf: "flex-start",
    fontFamily: "HindSiliguri-Bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: 20,
    fontFamily: "HindSiliguri-Medium",
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
    color: "#000",
    marginBottom: 5,
    fontFamily: "HindSiliguri-Bold",
  },
  textInput: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 22,
    fontSize: 16,
    fontFamily: "HindSiliguri-Medium",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 50,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 22,
    fontSize: 16,
    fontFamily: "HindSiliguri-Medium",
  },
  eyeIcon: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  eyeText: {
    fontSize: 20,
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 22,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "HindSiliguri-Medium",
  },
  dropdownArrow: {
    fontSize: 16,
    color: "#333",
  },
  dobRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 2,
    marginBottom: 8,
  },
  dobBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  dobBoxText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "HindSiliguri-Medium",
  },
  imageUploadSection: {
    marginTop: 10,
    marginBottom: 15,
  },
  imageUploadLabel: {
    fontSize: 16,
    fontFamily: "HindSiliguri-Bold",
    color: "#000",
    marginBottom: 8,
  },
  imageUploadButton: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#000",
    borderStyle: "dashed",
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  imageUploadPlaceholder: {
    alignItems: "center",
  },
  imageUploadIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  imageUploadText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "HindSiliguri-Medium",
  },
  signupButton: {
    backgroundColor: "#eb01f6",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 10,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#000",
  },

  signupButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "HindSiliguri-Bold",
  },

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    flexWrap: "wrap",
  },

  loginText: {
    color: "#333",
    fontSize: 16,
    fontFamily: "HindSiliguri-Medium",
  },

  loginLink: {
    color: "#eb01f6",
    fontSize: 16,
    fontFamily: "HindSiliguri-Bold",
  },
  bottomLogoContainer: {
    alignItems: "center",
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: width * 0.8,
    maxHeight: height * 0.6,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "HindSiliguri-Bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalOptionText: {
    fontSize: 18,
    fontFamily: "HindSiliguri-Medium",
    color: "#333",
    textAlign: "center",
  },
  modalCloseButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: "#eb01f6",
    borderRadius: 25,
    alignItems: "center",
  },
  modalCloseText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "HindSiliguri-Bold",
  },
  dateNote: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 15,
    fontFamily: "HindSiliguri-Medium",
  },
  dateInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dateInput: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "HindSiliguri-Medium",
  },
  dateConfirmButton: {
    flex: 1,
    backgroundColor: "#eb01f6",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000",
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dateConfirmText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "HindSiliguri-Bold",
  },
  // New Date Picker Styles
  dateModalContent: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 25,
    width: "90%",
    maxHeight: "80%",
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    height: 200,
  },
  datePickerColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  datePickerLabel: {
    fontSize: 16,
    fontFamily: "HindSiliguri-Bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  dateScrollView: {
    maxHeight: 160,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  dateOption: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  selectedDateOption: {
    backgroundColor: "#eb01f6",
  },
  dateOptionText: {
    fontSize: 14,
    fontFamily: "HindSiliguri-Medium",
    color: "#333",
  },
  selectedDateOptionText: {
    color: "white",
    fontWeight: "bold",
  },
  dateModalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  dateCancelButton: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#000",
    marginLeft: 10,
    alignItems: "center",
  },
  dateCancelText: {
    fontSize: 16,
    fontFamily: "HindSiliguri-Bold",
    color: "#000",
  },
  disabledButton: {
    backgroundColor: "#ccc",
    opacity: 0.6,
    borderColor: "#999",
  },
  referralRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 10,
    gap: 10,
  },
  referralInput: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    fontFamily: "HindSiliguri-Medium",
    height: 60,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eb01f6",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 22,
    height: 60,
    marginLeft: 4,
    alignSelf: "flex-end",
    borderWidth: 1,
    borderColor: "#000",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "HindSiliguri-Bold",
    marginRight: 6,
  },
  nextButtonIcon: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 1,
  },
});
