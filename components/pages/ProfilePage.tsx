import { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function ProfilePage() {
  const [transactionModalVisible, setTransactionModalVisible] = useState(false);
  const [profileEditModalVisible, setProfileEditModalVisible] = useState(false);
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [referralModalVisible, setReferralModalVisible] = useState(false);
  // Helper to convert English digits to Bengali
  const toBengaliNumber = (num: number) =>
    num
      .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      .replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]);

  const menuItems = [
    {
      icon: (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#666"/>
        </Svg>
      ),
      title: 'প্রোফাইল সম্পাদনা করুন',
    },
    {
      icon: (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z" fill="#666"/>
        </Svg>
      ),
      title: 'যোগাযোগ করুন',
    },
    {
      icon: (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 6.5V9.5L21 9ZM3 9L9 9.5V6.5L3 7V9ZM12 8C12.55 8 13 8.45 13 9V22H11V9C11 8.45 11.45 8 12 8Z" fill="#666"/>
        </Svg>
      ),
      title: 'আমাদের সম্পর্কে জানুন',
    },
    {
      icon: (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" fill="#666"/>
        </Svg>
      ),
      title: 'শর্তাবলী',
    },
    {
      icon: (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM16 11H8V13H16V11ZM16 15H8V17H16V15ZM10 7H8V9H10V7Z" fill="#666"/>
        </Svg>
      ),
      title: 'গোপনীয়তা নীতি',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <View style={styles.profileIcon}>
              <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
                <Path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#333"/>
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
            <Text style={styles.balanceAmount}>KM6.00548L</Text>
          </View>
        </View>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>অন্যান্য</Text>
          
          {/* Transaction Menu Item */}
          <TouchableOpacity style={styles.menuItem} onPress={() => setTransactionModalVisible(true)}>
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
              <Path d="m9 18 6-6-6-6" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </TouchableOpacity>

          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.menuItem}
              onPress={() => {
                if (item.title === 'প্রোফাইল সম্পাদনা করুন') {
                  setProfileEditModalVisible(true);
                } else if (item.title === 'যোগাযোগ করুন') {
                  setContactModalVisible(true);
                } else if (item.title === 'আমাদের সম্পর্কে জানুন') {
                  setAboutModalVisible(true);
                }
              }}
            >
              <View style={styles.menuIconContainer}>
                {item.icon}
              </View>
              <Text style={styles.menuText}>{item.title}</Text>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="#ccc"/>
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
                <Path d="M16 4C18.2 4 20 5.8 20 8C20 10.2 18.2 12 16 12C13.8 12 12 10.2 12 8C12 5.8 13.8 4 16 4ZM16 14C18.67 14 24 15.34 24 18V20H8V18C8 15.34 13.33 14 16 14ZM8 12C10.21 12 12 10.21 12 8C12 5.79 10.21 4 8 4C5.79 4 4 5.79 4 8C4 10.21 5.79 12 8 12ZM8 14C5.33 14 0 15.34 0 18V20H6V18.24C6 17.35 6.67 16.24 8 14Z" fill="#666"/>
              </Svg>
            </View>
            <View style={styles.referralContent}>
              <Text style={styles.menuText}>বন্ধুদের রেফার করুন</Text>
              <Text style={styles.referralSubtext}>
                আপনার বন্ধুর কর্মী কোড বেশি করুন, তার
                প্রতি রেফারে ১০% টাকা আমাদের নেওয়া পার্বেন।
              </Text>
            </View>
          </TouchableOpacity>

          {/* Logout Menu Item */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.59L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="#e74c3c"/>
              </Svg>
            </View>
            <Text style={[styles.menuText, { color: '#e74c3c' }]}>লগ আউট</Text>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="#ccc"/>
            </Svg>
          </TouchableOpacity>
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
              <Text style={styles.transactionTitle}>লেনদেনের ইতিহাস</Text>
              <TouchableOpacity onPress={() => setTransactionModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Transaction List */}
            <ScrollView style={styles.transactionsList}>
              {/* Winning Trade */}
              <View style={styles.transactionItem}>
                <View style={[styles.transactionIcon, { backgroundColor: '#e8f5e8' }]}>
                  <View style={[styles.colorCircle, { backgroundColor: '#4CAF50' }]} />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionType}>ট্রেড জিতেছেন</Text>
                  <Text style={styles.transactionDate}>২৪ জুলাই, ২০২৤</Text>
                  <Text style={styles.transactionId}>রং: সবুজ • বেট: ৫০০</Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text style={[styles.amountText, { color: '#4CAF50' }]}>+৳৯০০</Text>
                  <Text style={styles.statusText}>জয়</Text>
                </View>
              </View>
              <View style={styles.divider} />

              {/* Deposit Transaction */}
              <View style={styles.transactionItem}>
                <View style={styles.transactionIcon}>
                  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <Path 
                      d="M7 17L17 7M17 7H8M17 7V16" 
                      stroke="#4CAF50" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionType}>জমা</Text>
                  <Text style={styles.transactionDate}>২৩ জুলাই, ২০২৪</Text>
                  <Text style={styles.transactionId}>আইডি: TXN001234567</Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text style={[styles.amountText, { color: '#4CAF50' }]}>+৳১,৫০০</Text>
                  <Text style={styles.statusText}>সফল</Text>
                </View>
              </View>
              <View style={styles.divider} />

              {/* Losing Trade */}
              <View style={styles.transactionItem}>
                <View style={[styles.transactionIcon, { backgroundColor: '#ffe8e8' }]}>
                  <View style={[styles.colorCircle, { backgroundColor: '#f44336' }]} />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionType}>ট্রেড হেরেছেন</Text>
                  <Text style={styles.transactionDate}>২২ জুলাই, ২০২৪</Text>
                  <Text style={styles.transactionId}>রং: লাল • বেট: ৩০০</Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text style={[styles.amountText, { color: '#f44336' }]}>-৳৩০০</Text>
                  <Text style={[styles.statusText, { color: '#f44336' }]}>হার</Text>
                </View>
              </View>
              <View style={styles.divider} />

              {/* Withdrawal Transaction */}
              <View style={styles.transactionItem}>
                <View style={styles.transactionIcon}>
                  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <Path 
                      d="M17 7L7 17M7 17H16M7 17V8" 
                      stroke="#f44336" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionType}>উত্তোলন</Text>
                  <Text style={styles.transactionDate}>২০ জুলাই, ২০২৪</Text>
                  <Text style={styles.transactionId}>আইডি: TXN001234566</Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text style={[styles.amountText, { color: '#f44336' }]}>-৳৮০০</Text>
                  <Text style={styles.statusText}>সফল</Text>
                </View>
              </View>
              <View style={styles.divider} />

              {/* Another Winning Trade */}
              <View style={styles.transactionItem}>
                <View style={[styles.transactionIcon, { backgroundColor: '#fff3e0' }]}>
                  <View style={[styles.colorCircle, { backgroundColor: '#FF9800' }]} />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionType}>ট্রেড জিতেছেন</Text>
                  <Text style={styles.transactionDate}>১৯ জুলাই, ২০২৪</Text>
                  <Text style={styles.transactionId}>রং: কমলা • বেট: ২০০</Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text style={[styles.amountText, { color: '#4CAF50' }]}>+৳৩৬০</Text>
                  <Text style={styles.statusText}>জয়</Text>
                </View>
              </View>
              <View style={styles.divider} />

              {/* Another Deposit */}
              <View style={styles.transactionItem}>
                <View style={styles.transactionIcon}>
                  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <Path 
                      d="M7 17L17 7M17 7H8M17 7V16" 
                      stroke="#4CAF50" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionType}>জমা</Text>
                  <Text style={styles.transactionDate}>১৮ জুলাই, ২০২৪</Text>
                  <Text style={styles.transactionId}>আইডি: TXN001234565</Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text style={[styles.amountText, { color: '#4CAF50' }]}>+৳২,০০০</Text>
                  <Text style={styles.statusText}>সফল</Text>
                </View>
              </View>
              <View style={styles.divider} />

              {/* Losing Trade with Purple */}
              <View style={styles.transactionItem}>
                <View style={[styles.transactionIcon, { backgroundColor: '#f3e5f5' }]}>
                  <View style={[styles.colorCircle, { backgroundColor: '#9C27B0' }]} />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionType}>ট্রেড হেরেছেন</Text>
                  <Text style={styles.transactionDate}>১৭ জুলাই, ২০২৪</Text>
                  <Text style={styles.transactionId}>রং: বেগুনি • বেট: ১৫০</Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text style={[styles.amountText, { color: '#f44336' }]}>-৳১৫০</Text>
                  <Text style={[styles.statusText, { color: '#f44336' }]}>হার</Text>
                </View>
              </View>
              <View style={styles.divider} />

              {/* Pending Withdrawal */}
              <View style={styles.transactionItem}>
                <View style={styles.transactionIcon}>
                  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <Path 
                      d="M17 7L7 17M7 17H16M7 17V8" 
                      stroke="#FF9800" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionType}>উত্তোলন</Text>
                  <Text style={styles.transactionDate}>১৫ জুলাই, ২০২৪</Text>
                  <Text style={styles.transactionId}>আইডি: TXN001234564</Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text style={[styles.amountText, { color: '#FF9800' }]}>-৳১,২০০</Text>
                  <Text style={[styles.statusText, { color: '#FF9800' }]}>অপেক্ষায়</Text>
                </View>
              </View>
            </ScrollView>

            {/* Ads Section */}
            <View style={styles.adsCard}>
              <Text style={styles.adsText}>ADS Here</Text>
            </View>

            {/* Footer with Victor Logo */}
            <View style={styles.transactionFooter}>
              <Image
                source={require("../../assets/images/victor-logo.png")}
                style={styles.victorLogoTransaction}
                resizeMode="contain"
              />
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
              <Text style={styles.profileEditTitle}>প্রোফাইল সম্পাদনা করুন</Text>
              <TouchableOpacity onPress={() => setProfileEditModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.profileEditForm} showsVerticalScrollIndicator={false}>
              {/* Profile Picture */}
              <View style={styles.profilePictureSection}>
                <View style={styles.profilePictureContainer}>
                  <View style={styles.profileAvatarLarge}>
                    <Svg width={48} height={48} viewBox="0 0 24 24" fill="none">
                      <Path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#333"/>
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
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" style={styles.dropdownIcon}>
                    <Path d="m6 9 6 6 6-6" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                <TouchableOpacity style={styles.cancelButton} onPress={() => setProfileEditModalVisible(false)}>
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
                    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#666" strokeWidth="2"/>
                    <Path d="m22 6-10 7L2 6" stroke="#666" strokeWidth="2"/>
                  </Svg>
                </View>
                <Text style={styles.contactLabel}>ইমেইল</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.contactOption}>
                <View style={[styles.contactIcon, { backgroundColor: '#0088cc' }]}>
                  <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
                    <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.13-.31-1.09-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" fill="#fff"/>
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
                'Colour Trade' হলো "Victor Earn Way"-এর ভার্চুয়াল একটি বিশেষিত ডিজিটাল প্ল্যাটফর্ম, যেখানে রঙ রাউন্ডের মাধ্যমে আপনি অংশ নিতে পারেন এক নতুন ধরনের ট্রেডিং অভিজ্ঞতায়।
              </Text>
              
              <Text style={styles.aboutText}>
                এই অ্যাপে প্রতি ৩০ মিনিট পর পর একটি ট্রেডিং রাউন্ড হয়। প্রতিটি রাউন্ডে নিলিয়ে ৩ টি রঙ ট্রেডার থাকে। আপনি সেখান থেকে একটি রঙ নিতে পারেন, তবে আপনি যে রঙে বেট করবে সেই রাউন্ডে বিজয়ী হয়ে। রাউন্ড শেষ দেশা যাবে কোন রঙ বিজয়ী হয়েছে। যদি আপনি সঠিক রঙ বেছে নিতে পারেন, তাহলে আপনি পাবেন সেই ট্রেড করা নির্ভানোগের দ্বিগুণ টা*কা (১০% টা*কা কেটে নেওয়া হবে), যা আপনার অ্যাপ ব্যালেন্স যোগ হবে।
              </Text>

              <Text style={styles.aboutText}>
                এই প্ল্যাটফর্মটি এমনভাবে ডিজাইনের করা হয়েছে যেন সরাই - নতুন ব্যবহারকারী থেকে শুরু করে অভিজ্ঞতাও - সহজে অংশ নিতে পারেন।
              </Text>

              <Text style={styles.aboutHeading}>• অংশগ্রহণ করতে পারেন ঘর করে অ্যাপয়েন্ট দিয়েই</Text>
              <Text style={styles.aboutHeading}>• প্রতি ৩০ মিনিটে একটি নতুন রাউন্ড</Text>
              <Text style={styles.aboutHeading}>• প্রতিটি রাউন্ডে নতুন সুযোগ</Text>
              <Text style={styles.aboutHeading}>• রিভর্ট যা সহজ এবং স্বয়ংক্রিয়ভাবে</Text>
              <Text style={styles.aboutHeading}>• ব্যালেন্স ব্যবহার করে বাড়তি টা*কা ইন*কাম সুবর</Text>

              <Text style={styles.aboutText}>
                আমাদের অ্যাপে কিছু স্পেশাল ফিচারও বিন্যান্ত ও এমনেট দেখানো হয়, যেগুলো আমাদের অ্যাপে এবং অন্যদের চোখাভ্রান্ত চেনালে সাহায্য করে যায়। ব্যবহারকারীদের আরেকটি ঘর সহজ ও মজা পবরে
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
          <View style={styles.simpleModalContent}>
            <View style={styles.simpleModalHeader}>
              <Text style={styles.simpleModalTitle}>বন্ধুদের রেফার করুন</Text>
              <TouchableOpacity onPress={() => setReferralModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.referralContent}>
              <View style={styles.referralField}>
                <Text style={styles.referralLabel}>রেফারেল কোড</Text>
                <View style={styles.referralInputContainer}>
                  <Text style={styles.referralCode}>5YRM1</Text>
                  <TouchableOpacity style={styles.copyButton}>
                    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                      <Path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="#666"/>
                    </Svg>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.referralField}>
                <Text style={styles.referralLabel}>রেফারেল লিংক</Text>
                <View style={styles.referralInputContainer}>
                  <Text style={styles.referralLink}>https://url................</Text>
                  <TouchableOpacity style={styles.copyButton}>
                    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                      <Path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="#666"/>
                    </Svg>
                  </TouchableOpacity>
                </View>
              </View>
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
                    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#666" strokeWidth="2"/>
                    <Path d="m22 6-10 7L2 6" stroke="#666" strokeWidth="2"/>
                  </Svg>
                </View>
                <Text style={styles.contactLabel}>ইমেইল</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.contactOption}>
                <View style={[styles.contactIcon, { backgroundColor: '#0088cc' }]}>
                  <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
                    <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.13-.31-1.09-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" fill="#fff"/>
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
                'Colour Trade' হলো "Victor Earn Way"-এর ভার্চুয়াল একটি বিশেষিত ডিজিটাল প্ল্যাটফর্ম, যেখানে রঙ রাউন্ডের মাধ্যমে আপনি অংশ নিতে পারেন এক নতুন ধরনের ট্রেডিং অভিজ্ঞতায়।
              </Text>
              
              <Text style={styles.aboutText}>
                এই অ্যাপে প্রতি ৩০ মিনিট পর পর একটি ট্রেডিং রাউন্ড হয়। প্রতিটি রাউন্ডে নিলিয়ে ৩ টি রঙ ট্রেডার থাকে। আপনি সেখান থেকে একটি রঙ নিতে পারেন, তবে আপনি যে রঙে বেট করবে সেই রাউন্ডে বিজয়ী হয়ে। রাউন্ড শেষ দেশা যাবে কোন রঙ বিজয়ী হয়েছে। যদি আপনি সঠিক রঙ বেছে নিতে পারেন, তাহলে আপনি পাবেন সেই ট্রেড করা নির্ভানোগের দ্বিগুণ টা*কা (১০% টা*কা কেটে নেওয়া হবে), যা আপনার অ্যাপ ব্যালেন্স যোগ হবে।
              </Text>

              <Text style={styles.aboutText}>
                এই প্ল্যাটফর্মটি এমনভাবে ডিজাইনের করা হয়েছে যেন সরাই - নতুন ব্যবহারকারী থেকে শুরু করে অভিজ্ঞতাও - সহজে অংশ নিতে পারেন।
              </Text>

              <Text style={styles.aboutHeading}>• অংশগ্রহণ করতে পারেন ঘর করে অ্যাপয়েন্ট দিয়েই</Text>
              <Text style={styles.aboutHeading}>• প্রতি ৩০ মিনিটে একটি নতুন রাউন্ড</Text>
              <Text style={styles.aboutHeading}>• প্রতিটি রাউন্ডে নতুন সুযোগ</Text>
              <Text style={styles.aboutHeading}>• রিভর্ট যা সহজ এবং স্বয়ংক্রিয়ভাবে</Text>
              <Text style={styles.aboutHeading}>• ব্যালেন্স ব্যবহার করে বাড়তি টা*কা ইন*কাম সুবর</Text>

              <Text style={styles.aboutText}>
                আমাদের অ্যাপে কিছু স্পেশাল ফিচারও বিন্যান্ত ও এমনেট দেখানো হয়, যেগুলো আমাদের অ্যাপে এবং অন্যদের চোখাভ্রান্ত চেনালে সাহায্য করে যায়। ব্যবহারকারীদের আরেকটি ঘর সহজ ও মজা পবরে
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
          <View style={styles.simpleModalContent}>
            <View style={styles.simpleModalHeader}>
              <Text style={styles.simpleModalTitle}>বন্ধুদের রেফার করুন</Text>
              <TouchableOpacity onPress={() => setReferralModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.referralContent}>
              <View style={styles.referralField}>
                <Text style={styles.referralLabel}>রেফারেল কোড</Text>
                <View style={styles.referralInputContainer}>
                  <Text style={styles.referralCode}>5YRM1</Text>
                  <TouchableOpacity style={styles.copyButton}>
                    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                      <Path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="#666"/>
                    </Svg>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.referralField}>
                <Text style={styles.referralLabel}>রেফারেল লিংক</Text>
                <View style={styles.referralInputContainer}>
                  <Text style={styles.referralLink}>https://url................</Text>
                  <TouchableOpacity style={styles.copyButton}>
                    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                      <Path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="#666"/>
                    </Svg>
                  </TouchableOpacity>
                </View>
              </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: '#ffffff',
    margin: 15,
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
    color: '#333',
  },
  profileLevel: {
    fontSize: 14,
    fontFamily: 'HindSiliguri-Regular',
    color: '#666',
  },
  balanceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  balanceLabel: {
    fontSize: 16,
    fontFamily: 'HindSiliguri-SemiBold',
    color: '#333',
    marginRight: 10,
  },
  balanceContainer: {
    backgroundColor: '#eb01f6',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  balanceAmount: {
    fontSize: 16,
    fontFamily: 'HindSiliguri-Bold',
    color: '#ffffff',
  },
  menuSection: {
    backgroundColor: '#ffffff',
    margin: 15,
    borderRadius: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: 'HindSiliguri-Bold',
    color: '#333',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },
  menuIconContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'HindSiliguri-Regular',
    color: '#333',
  },
  specialMenuItem: {
    alignItems: 'flex-start',
    paddingVertical: 20,
  },
  referralContent: {
    flex: 1,
  },
  referralSubtext: {
    fontSize: 12,
    fontFamily: 'HindSiliguri-Regular',
    color: '#666',
    marginTop: 5,
    lineHeight: 18,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 150,
    paddingVertical: 10,
  },
  victorLogo: {
    width: 120,
    height: 40,
  },
  // Transaction Modal Styles
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
    paddingBottom: 20,
    maxHeight: "85%",
    minHeight: "60%",
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
    padding: 15,
    marginBottom: 0,
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
    fontSize: 12,
    fontFamily: "HindSiliguri-Regular",
    color: "#4CAF50",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 15,
    marginBottom: 10,
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
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: "HindSiliguri-SemiBold",
    color: "#333",
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: "#f8f8f8",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
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
    borderRadius: 25,
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
    borderRadius: 25,
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
  taglineText: {
    fontSize: 10,
    color: "#999",
    fontFamily: "Outfit-Regular",
    letterSpacing: 1,
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

