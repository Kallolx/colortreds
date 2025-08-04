import { useState } from 'react';
import { Alert, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface PaymentMethod {
  id: string;
  name: string;
  type: 'mobile' | 'card';
  icon: string;
}

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

interface WithdrawData {
  amount: string;
  userNumber: string;
}

interface WithdrawModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: WithdrawData) => void;
}

export default function WithdrawModal({ visible, onClose, onSubmit }: WithdrawModalProps) {
  const [amount, setAmount] = useState('');
  const [userNumber, setUserNumber] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

  const handleSubmit = () => {
    if (!amount || !userNumber) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    onSubmit({ amount, userNumber });
    setAmount('');
    setUserNumber('');
    setSelectedMethod(null);
  };

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Withdraw Funds</Text>
          </View>

          <View style={styles.modalBody}>
            {!selectedMethod ? (
              <>
                <Text style={styles.inputLabel}>Select Payment Method</Text>
                <View style={styles.methodGrid}>
                  {paymentMethods.map((method) => (
                    <TouchableOpacity
                      key={method.id}
                      style={styles.methodCard}
                      onPress={() => setSelectedMethod(method)}
                    >
                      <Image source={methodImages[method.id]} style={styles.methodCardImage} resizeMode="contain" />
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            ) : (
              <>
                <View style={styles.selectedMethodContainer}>
                  <Image source={methodImages[selectedMethod.id]} style={styles.selectedMethodImage} resizeMode="contain" />
                  <View style={styles.selectedMethodInfo}>
                    <Text style={styles.selectedMethodName}>{selectedMethod.name}</Text>
                    <TouchableOpacity onPress={() => setSelectedMethod(null)}>
                      <Text style={styles.changeMethodText}>Change Method</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.inputLabel}>Withdraw Amount</Text>
                <TextInput
                  style={styles.input}
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="Enter amount"
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />

                <Text style={styles.inputLabel}>Your {selectedMethod.name} Number</Text>
                <TextInput
                  style={styles.input}
                  value={userNumber}
                  onChangeText={setUserNumber}
                  placeholder="01XXXXXXXXX"
                  keyboardType="phone-pad"
                  placeholderTextColor="#999"
                />

                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
                    <Text style={styles.confirmButtonText}>Withdraw</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
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
    paddingTop: 25,
    paddingHorizontal: 25,
    paddingBottom: 45,
    minHeight: 400,
  },
  modalHeader: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Outfit-Bold',
    color: '#333',
    marginBottom: 15,
  },
  modalBody: {
    paddingBottom: 20,
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
  methodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  methodCard: {
    width: '47%',
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e9ecef',
    marginBottom: 15,
  },
  methodCardImage: {
    width: 128,
    height: 56,
  },
  selectedMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  selectedMethodImage: {
    width: 128,
    height: 40,
    marginRight: 12,
  },
  selectedMethodInfo: {
    flex: 1,
  },
  selectedMethodName: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Outfit-SemiBold',
    marginBottom: 4,
  },
  changeMethodText: {
    color: '#007AFF',
    fontSize: 13,
    fontFamily: 'Outfit-Medium',
  },
});
