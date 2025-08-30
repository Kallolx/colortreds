import { Image } from "expo-image";
import React from "react";
import { useState } from "react";
import {
  Alert,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { height: screenHeight } = Dimensions.get("window");

interface PaymentMethod {
  id: string;
  name: string;
  type: "mobile" | "card";
  icon: string;
}

const methodImages: Record<string, any> = {
  bkash: require("../../assets/images/bkash.png"),
  nagad: require("../../assets/images/nagad.png"),
  rocket: require("../../assets/images/rocket.png"),
  upay: require("../../assets/images/upay.png"),
};

const paymentMethods: PaymentMethod[] = [
  { id: "bkash", name: "bKash", type: "mobile", icon: "" },
  { id: "nagad", name: "Nagad", type: "mobile", icon: "" },
  { id: "rocket", name: "Rocket", type: "mobile", icon: "" },
  { id: "upay", name: "Upay", type: "mobile", icon: "" },
];

interface WithdrawData {
  amount: string;
  userNumber: string;
}

interface WithdrawModalProps {
  visible: boolean;
  paymentMethod: PaymentMethod | null;
  onClose: () => void;
  onSubmit: (data: WithdrawData) => void;
}

export default function WithdrawModal({
  visible,
  paymentMethod,
  onClose,
  onSubmit,
}: WithdrawModalProps) {
  const [amount, setAmount] = useState("");
  const [userNumber, setUserNumber] = useState("");

  const handleSubmit = () => {
    if (!amount || !userNumber) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }
    onSubmit({ amount, userNumber });
    setAmount("");
    setUserNumber("");
  };

  const handleClose = () => {
    setAmount("");
    setUserNumber("");
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header with close button and title */}
          <View style={styles.headerSection}>
            <View style={styles.headerBar} />
            <View style={styles.headerRow}>
              <Text style={styles.headerTitle}>উত্তোলন</Text>
              <Text style={styles.accountInfo}>
                <Text style={styles.accountLabel}>অ্যাকাউন্ট: </Text>
                <Text style={styles.accountName}>{paymentMethod?.name}</Text>
              </Text>
            </View>
          </View>

          <View style={styles.modalBody}>
            {paymentMethod && (
              <>
                <TextInput
                  style={styles.input}
                  value={userNumber}
                  onChangeText={setUserNumber}
                  placeholder={`আপনার ${paymentMethod.name} নম্বর লিখুন`}
                  keyboardType="phone-pad"
                  placeholderTextColor="#999"
                />
                <View style={{ position: 'relative', justifyContent: 'center' }}>
                  <TextInput
                    style={[styles.input, { paddingRight: 60 }]}
                    value={amount}
                    onChangeText={setAmount}
                    placeholder="সর্বনিম্ন 100 থেকে সর্বোচ্চ 10,000"
                    keyboardType="numeric"
                    placeholderTextColor="#999"
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      right: 25,
                      top: '39%',
                      transform: [{ translateY: -12 }],
                      color: '#000',
                      fontFamily: 'NotoSerifBengali-Medium',
                      fontSize: 18,
                      zIndex: 2,
                    }}
                  >
                    টাকা
                  </Text>
                </View>

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={handleClose}
                  >
                    <Text style={styles.cancelButtonText}>বাতিল</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.confirmButtonText}>নিশ্চিত</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
          <View style={styles.headerSection}>
            <Image
              source={require("../../assets/images/victor-logo.png")}
              style={styles.victorLogo}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  victorLogo: {
    width: 140,
    height: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  modalHeader: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: "Outfit-Bold",
    color: "#333",
    marginBottom: 15,
  },
  modalBody: {
    paddingBottom: 20,
    paddingTop: 10,
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
  accountInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  accountLabel: {
    fontSize: 20,
    fontFamily: "NotoSerifBengali-Regular",
    color: "#666666",
  },
  accountName: {
    fontSize: 20,
    fontFamily: "NotoSerifBengali-SemiBold",
    color: "#000",
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: "Outfit-SemiBold",
    color: "#333",
    marginBottom: 10,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 50,
    paddingHorizontal: 24,
    paddingVertical: 16,
    fontSize: 18,
    backgroundColor: "#ededed",
    fontFamily: "NotoSerifBengali-Medium",
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    marginTop: 10,
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
  confirmButton: {
    flex: 1,
    backgroundColor: "#eb01f6",
    paddingVertical: 12,
    borderRadius: 50,
    marginLeft: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 18,
    fontFamily: "NotoSerifBengali-Bold",
    color: "white",
  },
  selectedMethodContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
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
    color: "#333",
    fontFamily: "Outfit-SemiBold",
    marginBottom: 4,
  },
  changeMethodText: {
    color: "#007AFF",
    fontSize: 13,
    fontFamily: "Outfit-Medium",
  },
});
