import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";

interface ProfilePageProps {
  transactionsModalVisible: boolean;
  setTransactionsModalVisible: (visible: boolean) => void;
}

export default function ProfilePage({
  transactionsModalVisible,
  setTransactionsModalVisible,
}: ProfilePageProps) {
  const [profileEditModalVisible, setProfileEditModalVisible] = useState(false);
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [referralModalVisible, setReferralModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [sexDropdownVisible, setSexDropdownVisible] = useState(false);
  const [selectedSex, setSelectedSex] = useState("পুরুষ");
  const [termsModalVisible, setTermsModalVisible] = useState(false);
  const [privacyModalVisible, setPrivacyModalVisible] = useState(false);
  // Helper to convert English digits to Bengali
  const toBengaliNumber = (num: number) =>
    num
      .toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[parseInt(d)]);

  const menuItems = [
    {
      icon: (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
            fill="#666"
          />
        </Svg>
      ),
      title: "প্রোফাইল সম্পাদনা করুন",
    },
    {
      icon: (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z"
            fill="#666"
          />
        </Svg>
      ),
      title: "যোগাযোগ করুন",
    },
    {
      icon: (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 6.5V9.5L21 9ZM3 9L9 9.5V6.5L3 7V9ZM12 8C12.55 8 13 8.45 13 9V22H11V9C11 8.45 11.45 8 12 8Z"
            fill="#666"
          />
        </Svg>
      ),
      title: "আমাদের সম্পর্কে জানুন",
    },
    {
      icon: (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path
            d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"
            fill="#666"
          />
        </Svg>
      ),
      title: "শর্তাবলী",
    },
    {
      icon: (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path
            d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM16 11H8V13H16V11ZM16 15H8V17H16V15ZM10 7H8V9H10V7Z"
            fill="#666"
          />
        </Svg>
      ),
      title: "গোপনীয়তা নীতি",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <View style={styles.profileIcon}>
              <Image
                source={require("../../assets/images/user.png")}
                style={styles.profileIconImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>Md. Rocky</Text>
              <View style={styles.profileLevelContainer}>
                <Text style={styles.profileLevel}>লেভেল:</Text>
                <Text style={styles.levelValue}>5</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Balance Section */}
        <View style={styles.balanceSection}>
          <Text style={styles.balanceLabel}>কালার কোড:-</Text>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceAmount}>KM6.0√0548L</Text>
          </View>
        </View>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>অন্যান্য</Text>

          {/*  Menu Item */}
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                if (item.title === "প্রোফাইল সম্পাদনা করুন") {
                  setProfileEditModalVisible(true);
                } else if (item.title === "যোগাযোগ করুন") {
                  setContactModalVisible(true);
                } else if (item.title === "আমাদের সম্পর্কে জানুন") {
                  setAboutModalVisible(true);
                } else if (item.title === "শর্তাবলী") {
                  setTermsModalVisible(true);
                } else if (item.title === "গোপনীয়তা নীতি") {
                  setPrivacyModalVisible(true);
                }
              }}
            >
              <View style={styles.menuIconContainer}>{item.icon}</View>
              <Text style={styles.menuText}>{item.title}</Text>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z"
                  fill="#ccc"
                />
              </Svg>
            </TouchableOpacity>
          ))}

          {/* Special menu item for "বন্ধুদের রেফার করুন" */}
          <TouchableOpacity
            style={[styles.menuItem, styles.specialMenuItem]}
            onPress={() => setReferralModalVisible(true)}
          >
            <View style={styles.menuIconContainer}>
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M16 4C18.2 4 20 5.8 20 8C20 10.2 18.2 12 16 12C13.8 12 12 10.2 12 8C12 5.8 13.8 4 16 4ZM16 14C18.67 14 24 15.34 24 18V20H8V18C8 15.34 13.33 14 16 14ZM8 12C10.21 12 12 10.21 12 8C12 5.79 10.21 4 8 4C5.79 4 4 5.79 4 8C4 10.21 5.79 12 8 12ZM8 14C5.33 14 0 15.34 0 18V20H6V18.24C6 17.35 6.67 16.24 8 14Z"
                  fill="#666"
                />
              </Svg>
            </View>
            <View style={styles.referralContent}>
              <Text style={styles.menuText}>বন্ধুদের রেফার করুন</Text>
              <Text style={styles.referralSubtext}>
                আপনার রেফার করা কেউ ট্রেড করলে, তার প্রথম ট্রেডের 10% টাকা আপনি
                বোনাস পাবেন ।
              </Text>
            </View>
          </TouchableOpacity>

          {/* Logout Menu Item */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setLogoutModalVisible(true)}
          >
            <View style={styles.menuIconContainer}>
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.59L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z"
                  fill="#FF00FF"
                />
              </Svg>
            </View>
            <Text style={[styles.menuText, { color: "#FF00FF" }]}>লগ আউট</Text>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path
                d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z"
                fill="#ccc"
              />
            </Svg>
            
          </TouchableOpacity>

          {/* Logout Confirmation Modal (bottom positioned) */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={logoutModalVisible}
            onRequestClose={() => setLogoutModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                {/* Header with close button and title */}
                <View style={styles.headerSection}>
                  <View style={styles.headerBar} />
                  <View style={styles.headerRow}>
                    <Text style={styles.headerTitle}>লগ আউট</Text>
                  </View>
                </View>
                <View style={{ marginBottom: 24, alignItems: "flex-start" }}>
                  <Text
                    style={{
                      fontFamily: "NotoSerifBengali-Regular",
                      fontSize: 16,
                      color: "#222",
                      textAlign: "center",
                    }}
                  >
                    আপনার অ্যাকাউন্ট থেকে লগ আউট করবেন?
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: "#000",
                      borderRadius: 50,
                      paddingVertical: 12,
                      marginRight: 8,
                      backgroundColor: "#fff",
                      alignItems: "center",
                    }}
                    onPress={() => setLogoutModalVisible(false)}
                  >
                    <Text
                      style={{
                        fontFamily: "NotoSerifBengali-Bold",
                        fontSize: 18,
                        color: "#222",
                      }}
                    >
                      বাতিল
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      borderRadius: 50,
                      paddingVertical: 12,
                      marginLeft: 8,
                      alignItems: "center",
                      backgroundColor: "#eb01f6",
                    }}
                    onPress={() => {
                      setLogoutModalVisible(false);
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "NotoSerifBengali-Bold",
                        fontSize: 18,
                        color: "#fff",
                        backgroundColor: "transparent",
                      }}
                    >
                      নিশ্চিত
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    marginBottom: 0,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#afacac",
                      width: "100%",
                      height: 100,
                      borderRadius: 8,
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 28,
                        fontFamily: "Outfit-Bold",
                      }}
                    >
                      Native Ads
                    </Text>
                  </View>
                  <View style={{ alignItems: "center", marginBottom: 8 }}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={require("../../assets/images/victor-logo.png")}
                        style={{
                          width: 140,
                          height: 40,
                          resizeMode: "contain",
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          {/* Victor Logo */}
          <View style={styles.headerSection}>
            <Image
              source={require("../../assets/images/victor-logo.png")}
              style={styles.victorLogo}
            />
          </View>
        </View>
      </ScrollView>
  
      {/* Transaction History Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={transactionsModalVisible}
        onRequestClose={() => setTransactionsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.transactionModalContent}>
            {/* Header */}
            <View style={styles.transactionHeader}>
              <Text style={styles.transactionTitle}>লেনদেনসমূহ</Text>
              <View style={styles.headerRight}>
                <Text style={styles.todayText}>দিন: আজ</Text>
                <TouchableOpacity
                  onPress={() => setTransactionsModalVisible(false)}
                ></TouchableOpacity>
              </View>
            </View>

            {/* Transaction List */}
            <ScrollView
              style={styles.transactionsList}
              showsVerticalScrollIndicator={false}
            >
              {/* Trade Win - Blue */}
              <View style={styles.transactionItem}>
                <View style={styles.transactionIcon}>
                  <Image
                    source={require("../../assets/images/logo.png")}
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionType}>ট্রেড আনপ্রেডিক্ট</Text>
                  <Text style={styles.transactionTime}>সময়: 5:42</Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text style={[styles.amountText, { color: "#f44336" }]}>
                    - ৳৪০০
                  </Text>
                  <Text style={[styles.statusText, { color: "#666" }]}>
                    রঙ: কমলা
                  </Text>
                </View>
              </View>

              {/* Trade Win - Green */}
              <View style={styles.transactionItem}>
                <View style={styles.transactionIcon}>
                  <Image
                    source={require("../../assets/images/logo.png")}
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionType}>ট্রেড বিজয়া</Text>
                  <Text style={styles.transactionTime}>সময়: ৫.৩১</Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text style={[styles.amountText, { color: "#4CAF50" }]}>
                    + ৳৩,৩০০
                  </Text>
                  <Text style={[styles.statusText, { color: "#666" }]}>
                    জয়: গোলাপী
                  </Text>
                </View>
              </View>

              {/* Withdrawal - Blue */}
              <View style={styles.transactionItem}>
                <View style={styles.transactionIcon}>
                  <Image
                    source={require("../../assets/images/logo.png")}
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionType}>উত্তোলন</Text>
                  <Text style={styles.transactionTime}>নম্বর: 01730679652</Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text style={[styles.amountText, { color: "#f44336" }]}>
                    - ৳৩৮০০
                  </Text>
                  <Text style={[styles.statusText, { color: "#666" }]}>
                    অ্যাকাউন্ট: রকেট
                  </Text>
                </View>
              </View>

              {/* Digital Payment - Green */}
              <View style={styles.transactionItem}>
                <View style={styles.transactionIcon}>
                  <Image
                    source={require("../../assets/images/logo.png")}
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionType}>ডিজিটাল পেমেন্ট</Text>
                  <Text style={styles.transactionTime}>
                    ট্রানজেকশন: CCV935KFER
                  </Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text style={[styles.amountText, { color: "#4CAF50" }]}>
                    + ৳৮০০০
                  </Text>
                  <Text style={[styles.statusText, { color: "#666" }]}>
                    অ্যাকাউন্ট: নগদ
                  </Text>
                </View>
              </View>
            </ScrollView>

            {/* Native Ads Section */}
            <View
              style={{
                backgroundColor: "#afacac",
                width: "100%",
                height: 100,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 28,
                  fontFamily: "Outfit-Bold",
                }}
              >
                Native Ads
              </Text>
            </View>

            {/* Footer with Victor Logo */}
            <View style={styles.transactionFooter}>
              <View style={{ alignItems: "center", marginBottom: 8 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("../../assets/images/victor-logo.png")}
                    style={{ width: 140, height: 40, resizeMode: "contain" }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Profile Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={profileEditModalVisible}
        onRequestClose={() => setProfileEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.profileEditModalContent}>
            {/* Header */}
            <View style={styles.profileEditHeader}>
              <Text style={styles.profileEditTitle}>
                প্রোফাইল সম্পাদনা করুন
              </Text>
              <TouchableOpacity
                onPress={() => setProfileEditModalVisible(false)}
              >
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.profileEditForm}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.profileEditScrollContent}
              bounces={true}
              alwaysBounceVertical={false}
              keyboardShouldPersistTaps="handled"
              scrollEnabled={true}
              keyboardDismissMode="interactive"
            >
              {/* Profile Picture */}
              <View style={styles.profilePictureSection}>
                <View style={styles.profilePictureContainer}>
                  <Image
                    source={require("../../assets/images/user.png")}
                    style={styles.profileAvatarLarge}
                  />
                  <View style={styles.cameraIconOverlay}>
                    <Ionicons name="camera" size={22} color="#fff" />
                  </View>
                </View>
              </View>

              {/* Form Fields */}
              <View style={styles.formField}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Md. Rocky"
                    placeholderTextColor="#999"
                    defaultValue="Md. Rocky"
                  />
                  <Text style={styles.inputLabel}>নাম</Text>
                </View>
              </View>

              <View style={styles.formField}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputValue}>{selectedSex}</Text>
                  <TouchableOpacity
                    style={styles.labelWithIcon}
                    onPress={() => setSexDropdownVisible(!sexDropdownVisible)}
                  >
                    <Text style={styles.inputLabel}>লিঙ্গ</Text>
                    <Svg
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      fill="none"
                      style={styles.dropdownIcon}
                    >
                      <Path d="M7 10l5 5 5-5z" fill="#666" />
                    </Svg>
                  </TouchableOpacity>
                </View>

                {/* Sex Dropdown */}
                {sexDropdownVisible && (
                  <View style={styles.dropdownContainer}>
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedSex("পুরুষ");
                        setSexDropdownVisible(false);
                      }}
                    >
                      <Text style={styles.dropdownText}>পুরুষ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedSex("মহিলা");
                        setSexDropdownVisible(false);
                      }}
                    >
                      <Text style={styles.dropdownText}>মহিলা</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedSex("অন্যান্য");
                        setSexDropdownVisible(false);
                      }}
                    >
                      <Text style={styles.dropdownText}>অন্যান্য</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <View style={styles.formField}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="১০/৪/২০০৫"
                    placeholderTextColor="#999"
                    defaultValue="১০/৪/২০০৫"
                  />
                  <Text style={styles.inputLabel}>জন্মদিন</Text>
                </View>
              </View>

              <View style={styles.formField}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="mdrocky123@gmail.com"
                    placeholderTextColor="#999"
                    defaultValue="mdrocky123@gmail.com"
                    keyboardType="email-address"
                  />
                  <Text style={styles.inputLabel}>ইমেইল</Text>
                </View>
              </View>

              <View style={styles.formField}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="০১৭৫১৫১৮০২১"
                    placeholderTextColor="#999"
                    defaultValue="০১৭৫১৫১৮০২১"
                    keyboardType="phone-pad"
                  />
                  <Text style={styles.inputLabel}>মোবাইল নাম্বার</Text>
                </View>
              </View>

              <View style={styles.formField}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="IMrocky12#"
                    placeholderTextColor="#999"
                    defaultValue="IMrocky12#"
                    secureTextEntry={true}
                  />
                  <Text style={styles.inputLabel}>পাসওয়ার্ড</Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setProfileEditModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>বাতিল</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton}>
                  <Text style={styles.saveButtonText}>নিশ্চিত</Text>
                </TouchableOpacity>
              </View>

              {/* Native Ads Section */}
              <View
                style={{
                  backgroundColor: "#afacac",
                  width: "100%",
                  height: 100,
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 28,
                    fontFamily: "Outfit-Bold",
                  }}
                >
                  Native Ads
                </Text>
              </View>

              {/* Footer with Victor Logo */}
              <View style={styles.profileEditFooter}>
                <Image
                  source={require("../../assets/images/victor-logo.png")}
                  style={styles.victorLogoProfile}
                  resizeMode="contain"
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Contact Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={contactModalVisible}
        onRequestClose={() => setContactModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.simpleModalContent}>
            <View style={styles.simpleModalHeader}>
              <Text style={styles.simpleModalTitle}>যোগাযোগ করুন</Text>
              <TouchableOpacity onPress={() => setContactModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* যোগাযোগ করুন Section */}
            <View style={styles.contactSection}>
              <View style={styles.contactOptions}>
                <TouchableOpacity style={styles.contactOption}>
                  <View style={styles.contactIcon}>
                    <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
                      <Path
                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                        stroke="#000"
                        strokeWidth="2"
                      />
                      <Path d="m22 6-10 7L2 6" stroke="#000" strokeWidth="2" />
                    </Svg>
                  </View>
                  <Text style={styles.contactLabel}>ইমেইল</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.contactOption}>
                  <View
                    style={[
                      styles.contactIcon,
                      { backgroundColor: "transparent" },
                    ]}
                  >
                    <Image
                      source={require("../../assets/images/social/telegram.png")}
                      style={[
                        styles.contactIconImage,
                        { width: 60, height: 60, borderRadius: 50 },
                      ]}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.contactLabel}>টেলিগ্রাম</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Separator Line */}
            <View style={styles.separatorLine} />

            {/* সংযুক্ত থাকুন Section */}
            <View style={styles.socialSection}>
              <Text style={styles.socialSectionTitle}>সংযুক্ত থাকুন</Text>
              <View style={styles.socialIcons}>
                <TouchableOpacity style={styles.socialOption}>
                  <Image
                    source={require("../../assets/images/social/facebook.png")}
                    style={styles.socialIconImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.socialLabel}>ফেসবুক</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialOption}>
                  <Image
                    source={require("../../assets/images/social/instagram.png")}
                    style={styles.socialIconImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.socialLabel}>ইনস্টাগ্রাম</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialOption}>
                  <Image
                    source={require("../../assets/images/social/tiktok.png")}
                    style={styles.socialIconImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.socialLabel}>টিকটক</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialOption}>
                  <Image
                    source={require("../../assets/images/social/youtube.png")}
                    style={styles.socialIconImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.socialLabel}>ইউটিউব</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialOption}>
                  <Image
                    source={require("../../assets/images/social/twitter.png")}
                    style={styles.socialIconImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.socialLabel}>টুইটার</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Native Ads Section */}
            <View
              style={{
                backgroundColor: "#afacac",
                width: "100%",
                height: 100,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 28,
                  fontFamily: "Outfit-Bold",
                }}
              >
                Native Ads
              </Text>
            </View>

            <View style={styles.profileEditFooter}>
              <Image
                source={require("../../assets/images/victor-logo.png")}
                style={styles.victorLogoProfile}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* About Us Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={aboutModalVisible}
        onRequestClose={() => setAboutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.aboutModalContent}>
            <View style={styles.simpleModalHeader}>
              <Text style={styles.simpleModalTitle}>Colour Trade সম্পর্কে</Text>
              <TouchableOpacity onPress={() => setAboutModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.aboutContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.aboutText}>
                'Colour Trade' হলো "Victor Earn Way"-এর তৈরি একটি আধুনিক ডিজিটাল
                ট্রেডিং প্ল্যাটফর্ম, যেখানে রঙ বাছাইয়ের মাধ্যমে আপনি অংশ নিতে
                পারেন এক নতুন ধরণের ট্রেডিং অভিজ্ঞতায়।
              </Text>

              <Text style={styles.aboutText}>
                এই অ্যাপে প্রতি ৩০ মিনিট পর পর একটি ট্রেডিং রাউন্ড হয়। প্রতিটি
                রাউন্ডে নির্দিষ্ট ৩ টি রঙ ট্রেডের জন্য উন্মুক্ত থাকে। আপনি সেখান
                থেকে একটি রঙ বেছে নিতে পারেন, যেটা আপনি মনে করেন ওই রাউন্ডে
                বিজয়ী হবে। রাউন্ড শেষে দেখা হয় কোন রঙ বিজয়ী হয়েছে। যদি আপনি
                সঠিক রঙ বেছে নিতে পারেন, তাহলে আপনি পাবেন সেই ট্রেডে করা
                বিনিয়োগের দ্বিগুন টাকা (১০% ভ্যাট কেটে নেওয়া হবে), যা আপনার
                অ্যাপ ব্যালেন্সে যোগ হবে।
              </Text>

              <Text style={styles.aboutText}>
                এই প্ল্যাটফর্মটি এমনভাবে ডিজাইন করা হয়েছে যেন সবাই - নতুন
                ব্যবহারকারী থেকে শুরু করে অভিজ্ঞরাও সহজে অংশ নিতে পারেন।
              </Text>

              <Text style={styles.aboutHeading}>
                • অংশগ্রহণ করতে পারেন খুব কম অ্যামাউন্ট দিয়েই
              </Text>
              <Text style={styles.aboutHeading}>
                • প্রতি ৩০ মিনিটে একটি নতুন রাউন্ড
              </Text>
              <Text style={styles.aboutHeading}>
                • প্রতিটি রাউন্ডে নতুন সুযোগ
              </Text>
              <Text style={styles.aboutHeading}>
                • রেজাল্ট হয় স্বচ্ছ এবং স্বয়ংক্রিয়ভাবে
              </Text>
              <Text style={styles.aboutHeading}>
                • রেফারেল ব্যবহার করে বাড়তি টাকা ইনকাম সম্ভব
              </Text>

              <Text style={styles.aboutText}>
                আমাদের অ্যাপে কিছু স্পন্সরকৃত বিজ্ঞাপন ও কনটেন্ট দেখানো হয়,
                যেগুলো আমাদের আয় এবং অপারেশন চালাতে সাহায্য করে। এর ফলে
                ব্যবহারকারীরা অ্যাপটি খুব সহজে ও স্বল্প খরচে ব্যবহার করতে পারেন।
              </Text>

              <Text style={styles.aboutText}>
                "Victor Earn Way" একটি সম্পূর্ণ অনলাইন-ভিত্তিক কোম্পানি, যার মূল
                লক্ষ্য - তরুণ প্রজন্মকে প্রযুক্তির মাধ্যমে নতুন কিছু শেখানো ও
                টাকা উপার্জনের সুযোগ করে দেওয়া। আমাদের স্লোগানই সেটি বোঝায় -
                Change Your Luck!
              </Text>

              <Text style={styles.aboutText}>
                'Colour Trade'-এ আপনি শুধু ট্রেড করেন না, বরং নিজের সিদ্ধান্ত
                গ্রহণের ক্ষমতা, কৌশল আর দূরদর্শিতা দিয়ে নিজের পথ নিজেই তৈরি
                করেন
              </Text>
            </ScrollView>

            {/* Native Ads Section */}
            <View
              style={{
                backgroundColor: "#afacac",
                width: "100%",
                height: 100,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 28,
                  fontFamily: "Outfit-Bold",
                }}
              >
                Native Ads
              </Text>
            </View>

            <View style={styles.profileEditFooter}>
              <Image
                source={require("../../assets/images/victor-logo.png")}
                style={styles.victorLogoProfile}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Terms and Conditions Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={termsModalVisible}
        onRequestClose={() => setTermsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.aboutModalContent}>
            <View style={styles.simpleModalHeader}>
              <Text style={styles.simpleModalTitle}>শর্তাবলী</Text>
              <TouchableOpacity onPress={() => setTermsModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.aboutContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.aboutHeading}>১. সেবা গ্রহণের শর্তাবলী:</Text>

              <Text style={styles.aboutText}>
                • Colour Trade শুধুমাত্র তার সেবার কার্যক্রম এবং পরিচালনার জন্য
                দায়বদ্ধ। টেলিগ্রাম ম্যাসেজিং মাধ্যম দ্বারা এই সেবা ব্যবহৃত
                হলেও, এই চুক্তির শর্তাবলী শুধুমাত্র Colour Trade এর কার্যক্রমের
                ওপর প্রযোজ্য হবে।
              </Text>

              <Text style={styles.aboutText}>
                • আপনার দ্বারা এই শর্তাবলী মেনে সেবা গ্রহণের সময় Colour Trade
                কোনও প্রকার বাধ্যবাধকতা বা দায়ভার গ্রহণ করবে না যদি আপনি সেবা
                ব্যবহারে কোনও অনৈতিক কাজ করেন অথবা কোনও অননুমোদিত ডিভাইস ব্যবহার
                করেন। Colour Trade এর সেবা ব্যবহার করতে হলে আপনি অবশ্যই একটি বৈধ
                ব্যবহারকারী হিসেবে নিবন্ধিত হতে হবে এবং সমস্ত বৈধ প্রক্রিয়ার
                মাধ্যমে অ্যাকাউন্ট তৈরি করতে হবে।
              </Text>

              <Text style={styles.aboutHeading}>
                ২. রক্ষণাবেক্ষণ এবং সহায়তা:
              </Text>

              <Text style={styles.aboutText}>
                • Colour Trade তার ব্যবহারকারীদের জন্য রক্ষণাবেক্ষণ এবং সহায়তা
                প্রদান করার প্রতিশ্রুতি দেয়। আপনার ট্রেডিং কার্যক্রমে যদি কোনও
                ত্রুটি দেখা দেয় তবে আপনাকে অবিলম্বে আমাদের ইমেল ঠিকানা
                (office@victorearnway.com) মাধ্যমে সমস্যার বিষয়ে অবহিত করতে
                হবে।
              </Text>

              <Text style={styles.aboutText}>
                • Colour Trade স্বতন্ত্রভাবে তার ব্যবহারকারীদের সহায়তা প্রদান
                করে এবং প্রতিটি সমস্যা সমাধানের জন্য দায়ী থাকে। যদি কোনও
                ব্যবহারকারী এই শর্তাবলীর কোনও অংশ লঙ্ঘন করেন বা চুক্তির শর্তাবলী
                অনুযায়ী সেবা গ্রহণ না করেন, Colour Trade তার সেবা প্রদান বন্ধ
                করে দিতে পারে।
              </Text>

              <Text style={styles.aboutHeading}>৩. ব্যবহারকারীর দায়িত্ব:</Text>

              <Text style={styles.aboutText}>
                • ব্যবহারকারীকে অবশ্যই সঠিক এবং সত্য তথ্য প্রদান করতে হবে। কোনও
                মিথ্যা তথ্য প্রদানের ক্ষেত্রে অ্যাকাউন্ট বাতিল করা হতে পারে।
              </Text>

              <Text style={styles.aboutText}>
                • ব্যবহারকারী তার অ্যাকাউন্টের নিরাপত্তার জন্য দায়ী থাকবেন।
                পাসওয়ার্ড এবং অন্যান্য নিরাপত্তা তথ্য কারও সাথে শেয়ার করা যাবে
                না।
              </Text>

              <Text style={styles.aboutHeading}>৪. সেবা ব্যবহারের নিয়ম:</Text>

              <Text style={styles.aboutText}>
                • Colour Trade এর সেবা শুধুমাত্র বৈধ উদ্দেশ্যে ব্যবহার করা যাবে।
                কোনও অবৈধ কার্যক্রমে অংশগ্রহণ করা যাবে না।
              </Text>

              <Text style={styles.aboutText}>
                • ব্যবহারকারীকে অবশ্যই বাংলাদেশের আইন এবং নিয়মাবলী মেনে চলতে
                হবে। আন্তর্জাতিক ব্যবহারকারীদের জন্য তাদের দেশের আইনও প্রযোজ্য
                হবে।
              </Text>

              <Text style={styles.aboutHeading}>
                ৫. গোপনীয়তা এবং তথ্য সুরক্ষা:
              </Text>

              <Text style={styles.aboutText}>
                • Colour Trade ব্যবহারকারীদের ব্যক্তিগত তথ্য সর্বোচ্চ সুরক্ষা
                প্রদান করে। এই তথ্য তৃতীয় পক্ষের সাথে শেয়ার করা হয় না।
              </Text>

              <Text style={styles.aboutText}>
                • শুধুমাত্র আইনগত প্রয়োজন বা ব্যবহারকারীর অনুমতি সাপেক্ষে তথ্য
                প্রকাশ করা হতে পারে।
              </Text>
            </ScrollView>

            {/* Native Ads Section */}
            <View
              style={{
                backgroundColor: "#afacac",
                width: "100%",
                height: 100,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 28,
                  fontFamily: "Outfit-Bold",
                }}
              >
                Native Ads
              </Text>
            </View>

            <View style={styles.profileEditFooter}>
              <Image
                source={require("../../assets/images/victor-logo.png")}
                style={styles.victorLogoProfile}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={privacyModalVisible}
        onRequestClose={() => setPrivacyModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.aboutModalContent}>
            <View style={styles.simpleModalHeader}>
              <Text style={styles.simpleModalTitle}>গোপনীয়তা নীতি</Text>
              <TouchableOpacity onPress={() => setPrivacyModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.aboutContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.aboutHeading}>
                ১. তথ্য সংগ্রহ ও ব্যবহারের উদ্দেশ্য:
              </Text>

              <Text style={styles.aboutText}>
                • Colour Trade আমাদের ব্যবহারকারীদের সর্বোচ্চ সেবা নিশ্চিত করার
                জন্য কিছু ব্যক্তিগত এবং অপারেশনাল তথ্য সংগ্রহ করে। এই তথ্যগুলি
                অন্তর্ভুক্ত:
              </Text>

              <Text style={styles.aboutText}>
                1. ব্যক্তিগত তথ্য: নাম, ইমেইল, ফোন নম্বর, প্রোফাইল ডেটা, এবং
                অর্থনৈতিক তথ্য যেমন ব্যাংক অ্যাকাউন্ট বা মোবাইল পেমেন্ট
                সংক্রান্ত বিবরণ।
              </Text>

              <Text style={styles.aboutText}>
                2. ব্যবহারের তথ্য: Colour Trade এর মাধ্যমে আপনার ট্রেডিং
                কার্যক্রম, লেনদেনের হিসাব, এবং আপনার ট্রেডিং পছন্দসমূহের তথ্য।
              </Text>

              <Text style={styles.aboutText}>• ব্যবহার উদ্দেশ্য:</Text>

              <Text style={styles.aboutText}>
                1. Colour Trade সঠিকভাবে পরিচালনা করা, আপনার ট্রেডিং অভিজ্ঞতা
                কাস্টমাইজ করা এবং আপনার জন্য সেরা অফারগুলি নিশ্চিত করা।
              </Text>

              <Text style={styles.aboutText}>
                2. প্রযুক্তিগত সাপোর্ট প্রদান এবং পরিষেবার উন্নতি করা।
              </Text>

              <Text style={styles.aboutText}>
                3. বিপণন ও বিজ্ঞাপনী কৌশল উন্নত করার জন্য ব্যবহারকারীর কার্যকলাপ
                বিশ্লেষণ।
              </Text>

              <Text style={styles.aboutHeading}>
                ২. তথ্য সুরক্ষা এবং সংরক্ষণ:
              </Text>

              <Text style={styles.aboutText}>
                • আমরা আপনার তথ্যের গোপনীয়তা ও সুরক্ষার জন্য আধুনিক প্রযুক্তি
                ব্যবহার করি। Colour Trade আপনার তথ্য রক্ষা করতে নিচের ব্যবস্থা
                নেয়:
              </Text>

              <Text style={styles.aboutText}>
                1. এনক্রিপশন: ব্যবহারকারীর তথ্য সংরক্ষণ এবং লেনদেনের ক্ষেত্রে
                সর্বশেষ এনক্রিপশন প্রযুক্তি ব্যবহার করা হয়।
              </Text>

              <Text style={styles.aboutText}>
                2. নিয়মিত মনিটরিং ও আপডেট: Colour Trade নিয়মিতভাবে আমাদের
                নিরাপত্তা ব্যবস্থা আপডেট করে যাতে কোনোরকম অননুমোদিত অ্যাক্সেস বা
                হ্যাকিং থেকে তথ্য সুরক্ষিত থাকে।
              </Text>

              <Text style={styles.aboutText}>
                3. ডেটা সংরক্ষণ: আপনার তথ্য Colour Trade সার্ভারে সীমিত সময়
                পর্যন্ত সংরক্ষণ করা হয় এবং এরপর ব্যবহারের প্রয়োজন না হলে তা
                মুছে ফেলা হয়।
              </Text>

              <Text style={styles.aboutHeading}>
                ৩. তৃতীয় পক্ষের সাথে তথ্য শেয়ারিং:
              </Text>

              <Text style={styles.aboutText}>
                • Colour Trade তৃতীয় পক্ষের সাথে আপনার তথ্য শুধুমাত্র তখনই
                শেয়ার করবে যখন তা আইনানুগ বাধ্যবাধকতা বা সেবার সুবিধার্থে
                অত্যাবশ্যক হয়। এটি অন্তর্ভুক্ত:
              </Text>

              <Text style={styles.aboutText}>
                1. আইনগত প্রয়োজন: আইন প্রয়োগকারী সংস্থা বা সরকারি প্রতিষ্ঠানের
                আদেশে।
              </Text>

              <Text style={styles.aboutText}>
                2. সেবা প্রদানকারীদের জন্য: আমাদের পার্টনার বা সেবা প্রদানকারী
                সংস্থাগুলি, যারা Colour Trade এর বিভিন্ন কার্যক্রম পরিচালনা করে,
                যেমন পেমেন্ট গেটওয়ে বা ডেটা এনালাইটিকস টুল।
              </Text>

              <Text style={styles.aboutHeading}>
                ৪. কুকিজ এবং ট্র্যাকিং প্রযুক্তি:
              </Text>

              <Text style={styles.aboutText}>
                • Colour Trade ব্যবহারকারীর সেবার মান বৃদ্ধির জন্য কুকিজ এবং
                ট্র্যাকিং টুলস ব্যবহার করে, যা আপনার ব্রাউজিং পছন্দসই তথ্য
                সংগ্রহ করে। এর উদ্দেশ্য:
              </Text>

              <Text style={styles.aboutText}>
                1. অভিজ্ঞতা কাস্টমাইজ করা: ব্যবহারকারীর জন্য কাস্টমাইজড কন্টেন্ট
                এবং বিজ্ঞাপন প্রদান।
              </Text>

              <Text style={styles.aboutText}>
                2. বিশ্লেষণ: Colour Trade-এর কার্যকারিতা বিশ্লেষণ।
              </Text>

              <Text style={styles.aboutHeading}>
                ৫. তথ্য অ্যাক্সেস এবং নিয়ন্ত্রণের অধিকার:
              </Text>

              <Text style={styles.aboutText}>
                • আপনার Colour Trade এর অ্যাকাউন্টের উপর সম্পূর্ণ নিয়ন্ত্রণ
                রয়েছে। এর মধ্যে অন্তর্ভুক্ত:
              </Text>

              <Text style={styles.aboutText}>
                1. অ্যাকাউন্ট ডেটা আপডেট: আপনি চাইলে আপনার ব্যক্তিগত তথ্য আপডেট
                করতে পারেন।
              </Text>

              <Text style={styles.aboutText}>
                2. অ্যাকাউন্ট বন্ধ করা: আপনি যে কোন সময় Colour Trade অ্যাকাউন্ট
                বন্ধ করে তথ্য মুছে ফেলার অনুরোধ করতে পারেন।
              </Text>

              <Text style={styles.aboutHeading}>
                ৬. গোপনীয়তা নীতির পরিবর্তন:
              </Text>

              <Text style={styles.aboutText}>
                • Colour Trade সময় সময়ে এই গোপনীয়তা নীতি আপডেট করতে পারে। যদি
                আমরা বড় পরিবর্তন করি, তবে আমরা ইমেইল বা Colour Trade এর
                অফিশিয়াল টেলিগ্রাম চ্যানেলে আপনাকে জানাবো।
              </Text>

              <Text style={styles.aboutHeading}>৭. পেমেন্ট নীতি:</Text>

              <Text style={styles.aboutText}>
                • আমরা আপনার ব্যক্তিগত তথ্যের নিরাপত্তা ও গোপনীয়তা রক্ষা করতে
                প্রতিশ্রুতিবদ্ধ।
              </Text>

              <Text style={styles.aboutText}>1. আমরা কী তথ্য সংগ্রহ করি:</Text>

              <Text style={styles.aboutText}>• ব্যবহারকারীর নাম</Text>

              <Text style={styles.aboutText}>
                • মোবাইল নম্বর (যেটিতে অর্থ পাঠানো বা গ্রহণ করা হয়)
              </Text>

              <Text style={styles.aboutText}>
                • পেমেন্ট সম্পর্কিত সীমিত তথ্য (যেমন: ট্রানজেকশন আইডি, পেমেন্ট
                মাধ্যম)
              </Text>

              <Text style={styles.aboutText}>2. এই তথ্য কী কাজে লাগে:</Text>

              <Text style={styles.aboutText}>
                • অর্থ জমা ও উত্তোলনের প্রক্রিয়া সম্পন্ন করতে
              </Text>

              <Text style={styles.aboutText}>• ইউজার ভেরিফিকেশন করতে</Text>

              <Text style={styles.aboutText}>
                • লেনদেন সংক্রান্ত যেকোনো জিজ্ঞাসার সমাধান করতে
              </Text>

              <Text style={styles.aboutText}>3. আমরা কী করি না:</Text>

              <Text style={styles.aboutText}>
                • আমরা কোনো পাসওয়ার্ড, পিন, OTP, বা আর্থিক একাউন্টের অ্যাক্সেস
                সংগ্রহ বা সংরক্ষণ করি না।
              </Text>

              <Text style={styles.aboutText}>
                • আমরা কোনো তৃতীয় পক্ষের সঙ্গে আপনার ব্যক্তিগত তথ্য শেয়ার করি
                না।
              </Text>

              <Text style={styles.aboutText}>4. তথ্য সংরক্ষণ ও নিরাপত্তা:</Text>

              <Text style={styles.aboutText}>
                • আমরা ইউজারের তথ্য নিরাপদ সার্ভারে সংরক্ষণ করি। কেবল নির্দিষ্ট
                অথরাইজড অ্যাডমিন টিম এই তথ্য অ্যাক্সেস করতে পারে।
              </Text>

              <Text style={styles.aboutHeading}>৮. যোগাযোগের মাধ্যম:</Text>

              <Text style={styles.aboutText}>
                • Colour Trade এর গোপনীয়তা নীতি বা আপনার তথ্য ব্যবহারের পদ্ধতি
                সম্পর্কে আরও প্রশ্ন থাকলে, আমাদের সাথে ইমেইলে যোগাযোগ করুন।
              </Text>
            </ScrollView>

            {/* Native Ads Section */}
            <View
              style={{
                backgroundColor: "#afacac",
                width: "100%",
                height: 100,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 28,
                  fontFamily: "Outfit-Bold",
                }}
              >
                Native Ads
              </Text>
            </View>

            <View style={styles.profileEditFooter}>
              <Image
                source={require("../../assets/images/victor-logo.png")}
                style={styles.victorLogoProfile}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Referral Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={referralModalVisible}
        onRequestClose={() => setReferralModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Header with close button and title */}
            <View style={styles.headerSection}>
              <View style={styles.headerBar} />
              <View style={styles.headerRow}>
                <Text style={styles.headerTitle}>বন্ধুদের রেফার করুন</Text>
                <TouchableOpacity
                  onPress={() => setReferralModalVisible(false)}
                ></TouchableOpacity>
              </View>
            </View>
            <View
              style={{ marginBottom: 16, alignItems: "center", width: "100%" }}
            >
              {/* Referral Code Input */}
              <View style={{ width: "100%", marginBottom: 12 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#f8f8f8",
                    borderRadius: 50,
                    borderWidth: 1,
                    borderColor: "#000",
                    height: 80,
                    marginTop: 12,
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      paddingLeft: 16,
                      paddingRight: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "NotoSerifBengali-SemiBold",
                        fontSize: 18,
                        color: "#888",
                      }}
                    >
                      রেফারেল কোড
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                      paddingRight: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: "Outfit-Bold",
                        color: "#333",
                        marginRight: 4,
                      }}
                    >
                      5YRM1
                    </Text>
                    <TouchableOpacity style={{ padding: 12 }}>
                      <Svg
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <Path
                          d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
                          fill="#666"
                        />
                      </Svg>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* Referral Link Input */}
              <View style={{ width: "100%", marginBottom: 12 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#f8f8f8",
                    borderRadius: 50,
                    borderWidth: 1,
                    borderColor: "#000",
                    height: 80,
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      paddingLeft: 16,
                      paddingRight: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "NotoSerifBengali-SemiBold",
                        fontSize: 15,
                        color: "#888",
                      }}
                    >
                      রেফারেল লিংক
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                      paddingRight: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "Outfit-Bold",
                        color: "#000",
                        marginRight: 4,
                      }}
                    >
                      https://url................
                    </Text>
                    <TouchableOpacity style={{ padding: 8 }}>
                      <Svg
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <Path
                          d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
                          fill="#666"
                        />
                      </Svg>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{ width: "100%", alignItems: "center", marginBottom: 0 }}
            >
              <View
                style={{
                  backgroundColor: "#afacac",
                  width: "100%",
                  height: 100,
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 28,
                    fontFamily: "Outfit-Bold",
                  }}
                >
                  Native Ads
                </Text>
              </View>
              <View style={{ alignItems: "center", marginBottom: 8 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("../../assets/images/victor-logo.png")}
                    style={{ width: 140, height: 40, resizeMode: "contain" }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // Modal styles for bottom-positioned modal (logout)
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 20,
    width: "100%",
    alignSelf: "flex-end",
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 0,
  },
  headerBar: {
    width: 40,
    height: 4,
    backgroundColor: "#D0D0D0",
    borderRadius: 2,
    marginBottom: 15,
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "NotoSerifBengali-Bold",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  container: {
    flex: 1,
    // Background color removed since it's now handled by the floating wrapper
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: "#ededed",
    margin: 15,
    borderRadius: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#000",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  profileIconImage: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontFamily: "Outfit-Bold",
    color: "#333",
  },
  profileLevel: {
    fontSize: 14,
    fontFamily: "NotoSerifBengali-Regular",
    color: "#666",
  },
  levelValue: {
    fontSize: 14,
    fontFamily: "NotoSerifBengali-Bold",
    color: "#000",
  },
  profileLevelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  balanceSection: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
  },
  balanceLabel: {
    fontSize: 24,
    fontFamily: "NotoSerifBengali-SemiBold",
    color: "#333",
    marginRight: 10,
  },
  balanceContainer: {
    backgroundColor: "#eb01f6",
    paddingHorizontal: 30,
    paddingVertical: 6,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#000",
  },
  balanceAmount: {
    fontSize: 24,
    fontFamily: "NotoSerifBengali-Bold",
    color: "#000",
  },
  menuSection: {
    margin: 10,
    borderRadius: 15,
    paddingVertical: 0,
  },
  menuTitle: {
    fontSize: 20,
    fontFamily: "NotoSerifBengali-Bold",
    color: "#666",
    paddingHorizontal: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  menuIconContainer: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 18,
    fontFamily: "NotoSerifBengali-Bold",
    color: "#333",
  },
  specialMenuItem: {
    alignItems: "flex-start",
    paddingVertical: 20,
  },
  referralContent: {
    flex: 1,
  },
  referralSubtext: {
    fontSize: 12,
    fontFamily: "NotoSerifBengali-Regular",
    color: "#666",
    marginTop: 5,
    lineHeight: 18,
  },
  footer: {
    alignItems: "center",
    paddingBottom: 150,
    paddingVertical: 10,
  },
  victorLogo: {
    marginTop: 20,
    width: 140,
    height: 40,
  },

  //Transaction Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },

  transactionModalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 15,
    paddingHorizontal: 15,
    maxHeight: "95%",
    minHeight: "80%",
  },

  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  transactionTitle: {
    fontSize: 20,
    fontFamily: "NotoSerifBengali-Bold",
    color: "#333",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  todayText: {
    fontSize: 16,
    fontFamily: "NotoSerifBengali-Medium",
    color: "#666",
  },

  closeButton: {
    fontSize: 24,
    color: "#666",
    fontWeight: "bold",
  },

  transactionsList: {
    flex: 1,
  },

  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    paddingBottom: 20,
    paddingTop: 20,
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  transactionIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#f8f9fa",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },

  transactionDetails: {
    flex: 1,
  },

  transactionType: {
    fontSize: 16,
    fontFamily: "NotoSerifBengali-SemiBold",
    color: "#333",
    marginBottom: 2,
  },

  transactionDate: {
    fontSize: 13,
    fontFamily: "NotoSerifBengali-Regular",
    color: "#666",
    marginBottom: 2,
  },

  transactionTime: {
    fontSize: 13,
    fontFamily: "NotoSerifBengali-Regular",
    color: "#666",
  },

  transactionId: {
    fontSize: 11,
    fontFamily: "NotoSerifBengali-Regular",
    color: "#999",
  },

  transactionAmount: {
    alignItems: "flex-end",
  },

  amountText: {
    fontSize: 16,
    fontFamily: "NotoSerifBengali-Bold",
    marginBottom: 2,
  },

  statusText: {
    fontSize: 14,
    fontFamily: "NotoSerifBengali-Bold",
    color: "#4CAF50",
  },

  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 15,
    marginBottom: 10,
  },

  nativeAdsCard: {
    backgroundColor: "#666",
    margin: 15,
    marginBottom: 10,
    marginTop: 10,
    paddingVertical: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  adsCard: {
    backgroundColor: "#f8f9fa",
    margin: 15,
    marginBottom: 10,
    marginTop: 10,
    padding: 20,
    borderRadius: 12,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e9ecef",
  },

  nativeAdsText: {
    color: "white",
    fontSize: 24,
    fontFamily: "Outfit-Bold",
    letterSpacing: 1,
  },

  adsText: {
    fontSize: 16,
    fontFamily: "Outfit-Bold",
    color: "#888",
    letterSpacing: 1,
  },

  transactionFooter: {
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    marginTop: 5,
  },

  footerFromText: {
    fontSize: 12,
    fontFamily: "NotoSerifBengali-Regular",
    color: "#999",
    marginBottom: 8,
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  starIcon: {
    marginRight: 8,
  },

  victorText: {
    fontSize: 16,
    fontFamily: "NotoSerifBengali-SemiBold",
    color: "#333",
  },

  taglineText: {
    fontSize: 10,
    fontFamily: "Outfit-Regular",
    color: "#666",
    letterSpacing: 0.5,
    marginTop: 2,
  },

  victorLogoTransaction: {
    width: 120,
    height: 36,
  },
  // Profile Edit Modal Styles
  profileEditModalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    maxHeight: "100%",
    minHeight: "90%",
  },
  profileEditHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  profileEditTitle: {
    fontSize: 18,
    fontFamily: "NotoSerifBengali-Bold",
    color: "#333",
  },
  profileEditForm: {
    flex: 1,
  },
  profileEditScrollContent: {
    paddingBottom: 20,
  },
  profilePictureSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  profilePictureContainer: {
    position: "relative",
  },
  profileAvatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: "relative",
  },
  cameraIconOverlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#eb01f6",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  purpleOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: "#eb01f6",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  overlayText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Outfit-Bold",
  },
  formField: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 18,
    fontFamily: "NotoSerifBengali-SemiBold",
    color: "#333",
  },
  inputContainer: {
    backgroundColor: "#ededed",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 50,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "NotoSerifBengali-Bold",
    color: "#333",
    paddingVertical: 0,
  },
  inputValue: {
    fontSize: 16,
    fontFamily: "NotoSerifBengali-Bold",
    color: "#333",
    flex: 1,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: "NotoSerifBengali-Regular",
    color: "#666",
    textAlign: "right",
  },
  dropdownIcon: {
    marginLeft: 8,
  },
  labelWithIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: "NotoSerifBengali-Regular",
    color: "#333",
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 0,
    marginBottom: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingVertical: 12,
    borderRadius: 50,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 18,
    fontFamily: "NotoSerifBengali-Bold",
    color: "#666666",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#eb01f6",
    paddingVertical: 12,
    borderRadius: 50,
    marginLeft: 8,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 18,
    fontFamily: "NotoSerifBengali-Bold",
    color: "white",
  },
  profileEditFooter: {
    alignItems: "center",
  },
  victorLogoProfile: {
    width: 140,
    height: 40,
  },

  // Simple Modal Styles (Contact, About, Referral)
  simpleModalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 20,
    maxHeight: "80%",
    minHeight: "50%",
  },
  simpleModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  simpleModalTitle: {
    fontSize: 18,
    fontFamily: "NotoSerifBengali-Bold",
    color: "#333",
  },
  simpleModalFooter: {
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 20,
  },
  victorLogoSimple: {
    width: 120,
    height: 36,
  },
  // Contact Modal Styles
  contactSection: {
    marginBottom: 15,
  },
  contactOptions: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  contactOption: {
    alignItems: "center",
    marginRight: 20,
  },
  contactIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  contactIconImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  contactLabel: {
    fontSize: 14,
    fontFamily: "NotoSerifBengali-SemiBold",
    color: "#333",
  },
  separatorLine: {
    height: 0.5,
    backgroundColor: "#000",
    marginVertical: 10,
  },
  socialSection: {
    marginBottom: 0,
  },
  socialSectionTitle: {
    fontSize: 18,
    fontFamily: "NotoSerifBengali-Bold",
    color: "#333",
    textAlign: "left",
    marginBottom: 5,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  socialOption: {
    alignItems: "center",
    marginBottom: 20,
  },
  socialIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  socialIconImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  socialLabel: {
    fontSize: 14,
    fontFamily: "NotoSerifBengali-SemiBold",
    color: "#333",
    marginTop: 8,
    textAlign: "center",
  },
  // About Modal Styles
  aboutModalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 20,
    maxHeight: "95%",
    minHeight: "90%",
  },
  aboutContent: {
    flex: 1,
    paddingVertical: 10,
    marginBottom: 20,
  },
  aboutText: {
    fontSize: 18,
    fontFamily: "NotoSerifBengali-Regular",
    color: "#333",
    lineHeight: 26,
    marginBottom: 20,
    textAlign: "justify",
  },
  aboutHeading: {
    fontSize: 18,
    fontFamily: "NotoSerifBengali-Bold",
    color: "#000",
    marginBottom: 12,
    lineHeight: 24,
  },
  // Referral Modal Styles
  referralField: {
    marginBottom: 20,
  },
  referralLabel: {
    fontSize: 14,
    fontFamily: "NotoSerifBengali-SemiBold",
    color: "#333",
    marginBottom: 8,
  },
  referralInputContainer: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  referralCode: {
    fontSize: 16,
    fontFamily: "Outfit-Bold",
    color: "#333",
    flex: 1,
  },
  referralLink: {
    fontSize: 14,
    fontFamily: "Outfit-Regular",
    color: "#666",
    flex: 1,
  },
  copyButton: {
    padding: 8,
  },
});
