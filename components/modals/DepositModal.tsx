import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { Image } from "expo-image";
import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
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

export default function DepositModal({
  visible,
  paymentMethod,
  onClose,
  onSubmit,
}: DepositModalProps) {
  const [amount, setAmount] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState("");

  // Example numbers for each method
  let merchantNumber = "";
  switch (paymentMethod?.id) {
    case "bkash":
      merchantNumber = "01711223344";
      break;
    case "nagad":
      merchantNumber = "01755667788";
      break;
    case "rocket":
      merchantNumber = "01799887766";
      break;
    case "upay":
      merchantNumber = "01888997766";
      break;
    default:
      merchantNumber = "";
  }

  const handleSubmit = () => {
    if (!amount || !userNumber || !transactionId) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }
    onSubmit({ amount, userNumber, transactionId, screenshot });
    setAmount("");
    setUserNumber("");
    setTransactionId("");
    setScreenshot("");
  };

  const copyNumber = () => {
    Clipboard.setStringAsync(merchantNumber);
    Alert.alert("Copied", `${merchantNumber} copied to clipboard`);
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
              <Text style={styles.headerTitle}>ডিপোজিট</Text>
              <Text style={styles.accountInfo}>
                <Text style={styles.accountLabel}>অ্যাকাউন্ট: </Text>
                <Text style={styles.accountName}>{paymentMethod?.name}</Text>
              </Text>
            </View>
          </View>

          {/* Merchant number section */}
          {merchantNumber ? (
            <View style={styles.merchantSection}>
              <Text style={styles.sendToLabel}>
                নিচে দেওয়া নাম্বারে টাকা পাঠান
              </Text>
              <View style={styles.merchantNumberContainer}>
                <Text style={styles.merchantNumber}>{merchantNumber}</Text>
                <TouchableOpacity
                  onPress={copyNumber}
                  style={styles.copyButton}
                >
                  <Ionicons name="copy-outline" size={24} color="#000000ff" />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {/* Form section */}
          <ScrollView
            style={styles.formSection}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.inputGroup}>
              <TextInput
                style={styles.textInput}
                value={amount}
                onChangeText={setAmount}
                placeholder="সর্বনিম্ন ৫০ থেকে সর্বোচ্চ ৫,০০০ টাকা"
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <TextInput
                style={styles.textInput}
                value={userNumber}
                onChangeText={setUserNumber}
                placeholder={`আপনার ${paymentMethod?.name} নাম্বার লিখুন`}
                keyboardType="phone-pad"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <TextInput
                style={styles.textInput}
                value={transactionId}
                onChangeText={setTransactionId}
                placeholder="পেমেন্টের ট্রানজেকশন পোস্ট করুন"
                placeholderTextColor="#999"
              />
            </View>

            <View style={[styles.inputGroup, {marginBottom: 0}]}>
              <TextInput
                style={styles.textInput}
                value={transactionId}
                onChangeText={setTransactionId}
                placeholder="পেমেন্টের স্ক্রিনশট আপলোড করুন"
                placeholderTextColor="#999"
              />
            </View>
          </ScrollView>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>বাতিল</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleSubmit}
            >
              <Text style={styles.confirmButtonText}>নিশ্চিত</Text>
            </TouchableOpacity>
          </View>

          {/* Victor Logo */}
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
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "90%",
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 20,
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
  accountInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  accountLabel: {
    fontSize: 20,
    fontFamily: "HindSiliguri-Regular",
    color: "#666666",
  },
  accountName: {
    fontSize: 20,
    fontFamily: "HindSiliguri-SemiBold",
    color: "#007AFF",
  },
  merchantSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  sendToLabel: {
    fontSize: 18,
    fontFamily: "HindSiliguri-Medium",
    color: "#666666",

    textAlign: "center",
  },
  merchantNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  merchantNumber: {
    fontSize: 28,
    fontFamily: "Outfit-Bold",
    color: "#FF00FF",
    marginRight: 4, // add a little space before the icon
  },
  copyButton: {
    padding: 4,
  },
  formSection: {
    marginBottom: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 50,
    paddingHorizontal: 24,
    paddingVertical: 16,
    fontSize: 18,
    backgroundColor: "#ededed",
    fontFamily: "HindSiliguri-Medium",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 0,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingVertical: 12,
    borderRadius: 24,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 18,
    fontFamily: "HindSiliguri-Bold",
    color: "#666666",
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#eb01f6",
    paddingVertical: 12,
    borderRadius: 24,
    marginLeft: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 18,
    fontFamily: "HindSiliguri-Bold",
    color: "white",
  },
});
