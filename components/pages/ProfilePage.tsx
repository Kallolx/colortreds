import React from "react";
import { useState } from "react";
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

export default function ProfilePage() {
  const [transactionModalVisible, setTransactionModalVisible] = useState(false);
  const [profileEditModalVisible, setProfileEditModalVisible] = useState(false);
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [referralModalVisible, setReferralModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
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
              <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                  fill="#333"
                />
              </Svg>
            </View>
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>Md. Rocky</Text>
              <Text style={styles.profileLevel}>লেভেল: 5</Text>
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

          {/* Transaction Menu Item */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setTransactionModalVisible(true)}
          >
            <View style={styles.menuIconContainer}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M7 17L12 12L17 17M7 7L12 12L17 7"
                  stroke="#666"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
            <Text style={styles.menuText}>লেনদেন</Text>
            <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <Path
                d="m9 18 6-6-6-6"
                stroke="#999"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>

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
                      fontFamily: "HindSiliguri-Regular",
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
                        fontFamily: "HindSiliguri-Bold",
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
                        fontFamily: "HindSiliguri-Bold",
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
        </View>

        {/* Footer with Victor Logo */}
        <View style={styles.footer}>
          <Image
            source={require("../../assets/images/victor-logo.png")}
            style={styles.victorLogo}
            resizeMode="contain"
          />
        </View>
      </ScrollView>

      {/* Transaction History Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={transactionModalVisible}
        onRequestClose={() => setTransactionModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.transactionModalContent}>
            {/* Header */}
            <View style={styles.transactionHeader}>
              <Text style={styles.transactionTitle}>লেনদেনসমূহ</Text>
              <View style={styles.headerRight}>
                <Text style={styles.todayText}>দিন: আজ</Text>
                <TouchableOpacity
                  onPress={() => setTransactionModalVisible(false)}
                >
                </TouchableOpacity>
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
            >
              {/* Profile Picture */}
              <View style={styles.profilePictureSection}>
                <View style={styles.profilePictureContainer}>
                  <View style={styles.profileAvatarLarge}>
                    <Svg width={48} height={48} viewBox="0 0 24 24" fill="none">
                      <Path
                        d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                        fill="#333"
                      />
                    </Svg>
                    <View style={styles.purpleOverlay}>
                      <Text style={styles.overlayText}>CM</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Form Fields */}
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>নাম</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    value="Md. Rocky"
                    placeholder="আপনার নাম লিখুন"
                    placeholderTextColor="#999"
                  />
                </View>
              </View>

              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>লিঙ্গ</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    value="পুরুষ"
                    placeholder="লিঙ্গ নির্বাচন করুন"
                    placeholderTextColor="#999"
                  />
                  <Svg
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    style={styles.dropdownIcon}
                  >
                    <Path
                      d="m6 9 6 6 6-6"
                      stroke="#999"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
              </View>

              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>জন্মদিন</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    value="১৩/৮/২০০৫"
                    placeholder="জন্মতারিখ লিখুন"
                    placeholderTextColor="#999"
                  />
                </View>
              </View>

              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>ইমেইল</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    value="mdrocky123@gmail.com"
                    placeholder="ইমেইল ঠিকানা লিখুন"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                  />
                </View>
              </View>

              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>মোবাইল নাম্বার</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    value="০১৭৫১৫১৮০২১"
                    placeholder="মোবাইল নাম্বার লিখুন"
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>পাসওয়ার্ড</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    value="IMrocky12#|"
                    placeholder="নতুন পাসওয়ার্ড লিখুন"
                    placeholderTextColor="#999"
                    secureTextEntry={true}
                  />
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

              {/* Ads Section */}
              <View style={styles.adsCard}>
                <Text style={styles.adsText}>Native Ads</Text>
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

            <View style={styles.contactOptions}>
              <TouchableOpacity style={styles.contactOption}>
                <View style={styles.contactIcon}>
                  <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                      stroke="#666"
                      strokeWidth="2"
                    />
                    <Path d="m22 6-10 7L2 6" stroke="#666" strokeWidth="2" />
                  </Svg>
                </View>
                <Text style={styles.contactLabel}>ইমেইল</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.contactOption}>
                <View
                  style={[styles.contactIcon, { backgroundColor: "#0088cc" }]}
                >
                  <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.13-.31-1.09-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"
                      fill="#fff"
                    />
                  </Svg>
                </View>
                <Text style={styles.contactLabel}>টেলিগ্রাম</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.adsCard}>
              <Text style={styles.adsText}>Native Ads</Text>
            </View>

            <View style={styles.simpleModalFooter}>
              <Image
                source={require("../../assets/images/victor-logo.png")}
                style={styles.victorLogoSimple}
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
          <View style={styles.simpleModalContent}>
            <View style={styles.simpleModalHeader}>
              <Text style={styles.simpleModalTitle}>আমাদের সম্পর্কে জানুন</Text>
              <TouchableOpacity onPress={() => setAboutModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.aboutContent}>
              <Text style={styles.aboutText}>
                'Colour Trade' হলো "Victor Earn Way"-এর ভার্চুয়াল একটি বিশেষিত
                ডিজিটাল প্ল্যাটফর্ম, যেখানে রঙ রাউন্ডের মাধ্যমে আপনি অংশ নিতে
                পারেন এক নতুন ধরনের ট্রেডিং অভিজ্ঞতায়।
              </Text>

              <Text style={styles.aboutText}>
                এই অ্যাপে প্রতি ৩০ মিনিট পর পর একটি ট্রেডিং রাউন্ড হয়। প্রতিটি
                রাউন্ডে নিলিয়ে ৩ টি রঙ ট্রেডার থাকে। আপনি সেখান থেকে একটি রঙ
                নিতে পারেন, তবে আপনি যে রঙে বেট করবে সেই রাউন্ডে বিজয়ী হয়ে।
                রাউন্ড শেষ দেশা যাবে কোন রঙ বিজয়ী হয়েছে। যদি আপনি সঠিক রঙ বেছে
                নিতে পারেন, তাহলে আপনি পাবেন সেই ট্রেড করা নির্ভানোগের দ্বিগুণ
                টা*কা (১০% টা*কা কেটে নেওয়া হবে), যা আপনার অ্যাপ ব্যালেন্স যোগ
                হবে।
              </Text>

              <Text style={styles.aboutText}>
                এই প্ল্যাটফর্মটি এমনভাবে ডিজাইনের করা হয়েছে যেন সরাই - নতুন
                ব্যবহারকারী থেকে শুরু করে অভিজ্ঞতাও - সহজে অংশ নিতে পারেন।
              </Text>

              <Text style={styles.aboutHeading}>
                • অংশগ্রহণ করতে পারেন ঘর করে অ্যাপয়েন্ট দিয়েই
              </Text>
              <Text style={styles.aboutHeading}>
                • প্রতি ৩০ মিনিটে একটি নতুন রাউন্ড
              </Text>
              <Text style={styles.aboutHeading}>
                • প্রতিটি রাউন্ডে নতুন সুযোগ
              </Text>
              <Text style={styles.aboutHeading}>
                • রিভর্ট যা সহজ এবং স্বয়ংক্রিয়ভাবে
              </Text>
              <Text style={styles.aboutHeading}>
                • ব্যালেন্স ব্যবহার করে বাড়তি টা*কা ইন*কাম সুবর
              </Text>

              <Text style={styles.aboutText}>
                আমাদের অ্যাপে কিছু স্পেশাল ফিচারও বিন্যান্ত ও এমনেট দেখানো হয়,
                যেগুলো আমাদের অ্যাপে এবং অন্যদের চোখাভ্রান্ত চেনালে সাহায্য করে
                যায়। ব্যবহারকারীদের আরেকটি ঘর সহজ ও মজা পবরে
              </Text>
            </ScrollView>

            <View style={styles.adsCard}>
              <Text style={styles.adsText}>Native Ads</Text>
            </View>

            <View style={styles.simpleModalFooter}>
              <Image
                source={require("../../assets/images/victor-logo.png")}
                style={styles.victorLogoSimple}
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
                    height: 60,
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
                        fontFamily: "HindSiliguri-SemiBold",
                        fontSize: 15,
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
                        fontSize: 16,
                        fontFamily: "Outfit-Bold",
                        color: "#333",
                        marginRight: 4,
                      }}
                    >
                      5YRM1
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
                    height: 60,
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
                        fontFamily: "HindSiliguri-SemiBold",
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
    fontFamily: "HindSiliguri-Bold",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: "#ffffff",
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
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
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
    fontFamily: "HindSiliguri-Regular",
    color: "#666",
  },
  balanceSection: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
  },
  balanceLabel: {
    fontSize: 16,
    fontFamily: "HindSiliguri-SemiBold",
    color: "#333",
    marginRight: 10,
  },
  balanceContainer: {
    backgroundColor: "#eb01f6",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000",
  },
  balanceAmount: {
    fontSize: 16,
    fontFamily: "HindSiliguri-Bold",
    color: "#000",
  },
  menuSection: {
    backgroundColor: "#ffffff",
    margin: 15,
    borderRadius: 15,
    paddingVertical: 0,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: "HindSiliguri-Bold",
    color: "#333",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
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
    fontFamily: "HindSiliguri-Regular",
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
    fontFamily: "HindSiliguri-Regular",
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
    width: 120,
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
    fontFamily: "HindSiliguri-Bold",
    color: "#333",
  },
  
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  
  todayText: {
    fontSize: 16,
    fontFamily: "HindSiliguri-Medium",
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
    justifyContent: 'center',
    alignItems: 'center',
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
    fontFamily: "HindSiliguri-SemiBold",
    color: "#333",
    marginBottom: 2,
  },
  
  transactionDate: {
    fontSize: 13,
    fontFamily: "HindSiliguri-Regular",
    color: "#666",
    marginBottom: 2,
  },
  
  transactionTime: {
    fontSize: 13,
    fontFamily: "HindSiliguri-Regular",
    color: "#666",
  },
  
  transactionId: {
    fontSize: 11,
    fontFamily: "HindSiliguri-Regular",
    color: "#999",
  },
  
  transactionAmount: {
    alignItems: "flex-end",
  },
  
  amountText: {
    fontSize: 16,
    fontFamily: "HindSiliguri-Bold",
    marginBottom: 2,
  },
  
  statusText: {
    fontSize: 14,
    fontFamily: "HindSiliguri-Bold",
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
    alignItems: 'center',
    justifyContent: 'center',
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
    color: 'white',
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
    fontFamily: "HindSiliguri-Regular",
    color: "#999",
    marginBottom: 8,
  },
  
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  
  starIcon: {
    marginRight: 8,
  },
  
  victorText: {
    fontSize: 16,
    fontFamily: "HindSiliguri-SemiBold",
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
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 20,
    maxHeight: "90%",
    minHeight: "70%",
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
    fontFamily: "HindSiliguri-Bold",
    color: "#333",
  },
  profileEditForm: {
    flex: 1,
  },
  profilePictureSection: {
    alignItems: "center",
    marginBottom: 25,
  },
  profilePictureContainer: {
    position: "relative",
  },
  profileAvatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
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
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: "HindSiliguri-SemiBold",
    color: "#333",
    marginBottom: 2,
  },
  inputContainer: {
    backgroundColor: "#f8f8f8",
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: "HindSiliguri-Regular",
    color: "#333",
  },
  dropdownIcon: {
    marginLeft: 10,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: "HindSiliguri-SemiBold",
    color: "#666",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#eb01f6",
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: "HindSiliguri-SemiBold",
    color: "#fff",
  },
  profileEditFooter: {
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 30,
  },
  victorLogoProfile: {
    width: 120,
    height: 36,
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
    fontFamily: "HindSiliguri-Bold",
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
  contactOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 30,
  },
  contactOption: {
    alignItems: "center",
  },
  contactIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  contactLabel: {
    fontSize: 14,
    fontFamily: "HindSiliguri-SemiBold",
    color: "#333",
  },
  // About Modal Styles
  aboutContent: {
    flex: 1,
    paddingVertical: 10,
  },
  aboutText: {
    fontSize: 14,
    fontFamily: "HindSiliguri-Regular",
    color: "#333",
    lineHeight: 22,
    marginBottom: 15,
    textAlign: "justify",
  },
  aboutHeading: {
    fontSize: 14,
    fontFamily: "HindSiliguri-SemiBold",
    color: "#333",
    marginBottom: 8,
  },
  // Referral Modal Styles
  referralField: {
    marginBottom: 20,
  },
  referralLabel: {
    fontSize: 14,
    fontFamily: "HindSiliguri-SemiBold",
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
