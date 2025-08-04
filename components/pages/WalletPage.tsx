import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Notification from '../Notification';
import DepositModal from '../modals/DepositModal';
import WithdrawModal from '../modals/WithdrawModal';

interface PaymentMethod {
  id: string;
  name: string;
  type: 'mobile' | 'card';
  icon: string;
}

interface DepositData {
  amount: string;
  userNumber: string;
  transactionId: string;
  screenshot: string;
}

interface WithdrawData {
  amount: string;
  userNumber: string;
}

// Static mapping for payment method images
const methodImages: Record<string, any> = {
  bkash: require('../../assets/images/bkash.png'),
  nagad: require('../../assets/images/nagad.png'),
  rocket: require('../../assets/images/rocket.png'),
  upay: require('../../assets/images/upay.png'),
};

const paymentMethods: PaymentMethod[] = [
  { id: 'bkash', name: 'bKash', type: 'mobile', icon: '' },
  { id: 'nagad', name: 'Nagad', type: 'mobile', icon: '' },
  { id: 'rocket', name: 'Rocket', type: 'mobile', icon: '' },
  { id: 'upay', name: 'Upay', type: 'mobile', icon: '' },
];

export default function WalletPage() {
  const [userBalance] = useState(1250.50);
  const [depositModalVisible, setDepositModalVisible] = useState(false);
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const showNotification = (message: string) => {
    setNotificationMessage(message);
    setNotificationVisible(true);
  };

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
    setDepositModalVisible(true);
  };

  const handleDepositSubmit = (data: DepositData) => {
    setDepositModalVisible(false);
    showNotification('Deposit request submitted successfully! It will be reviewed within 24 hours.');
  };

  const handleWithdrawSubmit = (data: WithdrawData) => {
    setWithdrawModalVisible(false);
    showNotification('Withdrawal request submitted! Processing will take 24-48 hours.');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* ATM Card */}
        <View style={styles.cardContainer}>
          <View style={styles.atmCard}>
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <Text style={styles.cardBrand}>ColorTrade</Text>
              <View style={styles.chip}>
                <View style={styles.chipInner} />
              </View>
            </View>

            {/* Card Number */}
            <View style={styles.cardNumber}>
              <Text style={styles.cardNumberText}>**** **** **** 1234</Text>
            </View>

            {/* Card Footer */}
            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.cardValue}>JOHN DOE</Text>
              </View>
              <View>
                <Text style={styles.cardLabel}>VALID THRU</Text>
                <Text style={styles.cardValue}>12/28</Text>
              </View>
            </View>

            {/* Balance */}
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceAmount}>৳{userBalance.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Deposit Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Deposit Money</Text>
          <View style={styles.paymentGrid}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={styles.paymentMethod}
                onPress={() => handlePaymentMethodSelect(method)}
              >
                {methodImages[method.id] && (
                  <Image source={methodImages[method.id]} style={styles.paymentImage} resizeMode="contain" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Withdraw Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Withdraw Money</Text>
          <TouchableOpacity
            style={styles.withdrawButton}
            onPress={() => setWithdrawModalVisible(true)}
          >
            <Text style={styles.withdrawIcon}>💸</Text>
            <Text style={styles.withdrawText}>Withdraw Funds</Text>
            <Text style={styles.withdrawArrow}>→</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <DepositModal
        visible={depositModalVisible}
        paymentMethod={selectedPaymentMethod}
        onClose={() => setDepositModalVisible(false)}
        onSubmit={handleDepositSubmit}
      />

      <WithdrawModal
        visible={withdrawModalVisible}
        onClose={() => setWithdrawModalVisible(false)}
        onSubmit={handleWithdrawSubmit}
      />

      <Notification
        visible={notificationVisible}
        message={notificationMessage}
        type="success"
        onHide={() => setNotificationVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cardContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 8,
    marginBottom: 20,
  },
  atmCard: {
    height: 220,
    borderRadius: 20,
    padding: 25,
    backgroundColor: '#667eea',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardBrand: {
    fontSize: 20,
    fontFamily: 'Outfit-Bold',
    color: '#fff',
  },
  chip: {
    width: 45,
    height: 35,
    backgroundColor: '#FFD700',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipInner: {
    width: 35,
    height: 25,
    backgroundColor: '#FFA500',
    borderRadius: 4,
  },
  cardNumber: {
    marginBottom: 25,
  },
  cardNumberText: {
    fontSize: 22,
    fontFamily: 'Outfit-SemiBold',
    color: '#fff',
    letterSpacing: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  cardLabel: {
    fontSize: 10,
    fontFamily: 'Outfit-Regular',
    color: '#ddd',
    marginBottom: 2,
  },
  cardValue: {
    fontSize: 14,
    fontFamily: 'Outfit-SemiBold',
    color: '#fff',
  },
  balanceContainer: {
    position: 'absolute',
    bottom: 25,
    left: 25,
  },
  balanceLabel: {
    fontSize: 12,
    fontFamily: 'Outfit-Regular',
    color: '#ddd',
    marginBottom: 2,
  },
  balanceAmount: {
    fontSize: 24,
    fontFamily: 'Outfit-Bold',
    color: '#fff',
  },
  section: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 0,
    padding: 25,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Outfit-Bold',
    color: '#333',
    marginBottom: 20,
  },
  paymentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  paymentMethod: {
    width: '47%',
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  paymentIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  paymentImage: {
    width: 128,
    height: 64,
    marginBottom: 10,
  },
  paymentName: {
    fontSize: 16,
    fontFamily: 'Outfit-SemiBold',
    color: '#333',
  },
  withdrawButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 15,
    justifyContent: 'space-between',
  },
  withdrawIcon: {
    fontSize: 24,
  },
  withdrawText: {
    fontSize: 18,
    fontFamily: 'Outfit-SemiBold',
    color: '#fff',
    flex: 1,
    marginLeft: 15,
  },
  withdrawArrow: {
    fontSize: 20,
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 25,
    paddingHorizontal: 25,
    paddingBottom: 45,
    maxHeight: '85%',
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Outfit-Bold',
    color: '#333',
    marginBottom: 15,
  },
  merchantNumberContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderStyle: 'dashed',
  },
  merchantNumberLabel: {
    fontSize: 14,
    fontFamily: 'Outfit-Regular',
    color: '#666',
    marginBottom: 5,
  },
  merchantNumber: {
    fontSize: 20,
    fontFamily: 'Outfit-Bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  copyText: {
    fontSize: 12,
    fontFamily: 'Outfit-Medium',
    color: '#007AFF',
  },
  modalBody: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Outfit-SemiBold',
    color: '#333',
    marginBottom: 10,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    fontFamily: 'Outfit-Medium',
    borderWidth: 2,
    borderColor: '#e9ecef',
    marginBottom: 5,
  },
  uploadButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderStyle: 'dashed',
    marginBottom: 30,
  },
  uploadButtonText: {
    fontSize: 16,
    fontFamily: 'Outfit-Medium',
    color: '#666',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Outfit-SemiBold',
    color: '#666',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontFamily: 'Outfit-SemiBold',
    color: '#fff',
  },
});
