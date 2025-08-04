import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { Alert, Dimensions, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

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

interface DepositModalProps {
  visible: boolean;
  paymentMethod: PaymentMethod | null;
  onClose: () => void;
  onSubmit: (data: DepositData) => void;
}

export default function DepositModal({ visible, paymentMethod, onClose, onSubmit }: DepositModalProps) {
  const [amount, setAmount] = useState('');
  const [userNumber, setUserNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [screenshot, setScreenshot] = useState('');

  // Example numbers for each method
  let merchantNumber = '';
  switch (paymentMethod?.id) {
    case 'bkash':
      merchantNumber = '01711223344';
      break;
    case 'nagad':
      merchantNumber = '01755667788';
      break;
    case 'rocket':
      merchantNumber = '01799887766';
      break;
    case 'upay':
      merchantNumber = '01888997766';
      break;
    default:
      merchantNumber = '';
  }

  const handleSubmit = () => {
    if (!amount || !userNumber || !transactionId) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    onSubmit({ amount, userNumber, transactionId, screenshot });
    setAmount('');
    setUserNumber('');
    setTransactionId('');
    setScreenshot('');
  };

  const copyNumber = () => {
    Clipboard.setStringAsync(merchantNumber);
    Alert.alert('Copied', `${merchantNumber} copied to clipboard`);
  };

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Modal title and top number section for all methods */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Deposit to {paymentMethod?.name}</Text>
          </View>
          {merchantNumber ? (
            <View style={styles.topNumberSection}>
              <Text style={styles.sendMoneyLabel}>Send money to</Text>
              <View style={styles.numberRow}>
                <Text style={styles.merchantNumber}>{merchantNumber}</Text>
                <TouchableOpacity onPress={copyNumber} style={styles.copyIconBtn}>
                  <Ionicons name="copy-outline" size={22} color="#007AFF" />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            <Text style={styles.inputLabel}>Amount (৳5 - ৳5000)</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              placeholder="Enter amount"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />

            <Text style={styles.inputLabel}>Your {paymentMethod?.name} Number</Text>
            <TextInput
              style={styles.input}
              value={userNumber}
              onChangeText={setUserNumber}
              placeholder="01XXXXXXXXX"
              keyboardType="phone-pad"
              placeholderTextColor="#999"
            />

            <Text style={styles.inputLabel}>Transaction ID</Text>
            <TextInput
              style={styles.input}
              value={transactionId}
              onChangeText={setTransactionId}
              placeholder="Enter transaction ID"
              placeholderTextColor="#999"
            />

            <Text style={styles.inputLabel}>Payment Screenshot (Optional)</Text>
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>📷 Upload Screenshot</Text>
            </TouchableOpacity>
          </ScrollView>
          <View style={styles.modalButtonsFixed}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
              <Text style={styles.confirmButtonText}>Submit Request</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: screenHeight * 0.8,
    paddingTop: 18,
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
  topNumberSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 4,
    marginBottom: 18,
    alignItems: 'center',
  },
  sendMoneyLabel: {
    fontSize: 13,
    color: '#666',
    fontFamily: 'Outfit-Regular',
    marginBottom: 4,
  },
  numberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  // removed duplicate merchantNumber style
  copyIconBtn: {
    padding: 4,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: 'Outfit-Bold',
    color: '#333',
    letterSpacing: 0.5,
  },
  merchantNumberContainer: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderStyle: 'dashed',
  },
  merchantNumberLabel: {
    fontSize: 12,
    fontFamily: 'Outfit-Regular',
    color: '#666',
    marginBottom: 4,
  },
  merchantNumber: {
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  copyText: {
    fontSize: 11,
    fontFamily: 'Outfit-Medium',
    color: '#007AFF',
  },
  modalBody: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 15,
    fontFamily: 'Outfit-SemiBold',
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: 'Outfit-Medium',
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginBottom: 8,
  },
  uploadButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  uploadButtonText: {
    fontSize: 14,
    fontFamily: 'Outfit-Medium',
    color: '#666',
  },
  modalButtons: {
    display: 'none',
  },
  modalButtonsFixed: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 18,
    zIndex: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  cancelButtonText: {
    fontSize: 15,
    fontFamily: 'Outfit-SemiBold',
    color: '#666',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 15,
    fontFamily: 'Outfit-SemiBold',
    color: '#fff',
  },
});
