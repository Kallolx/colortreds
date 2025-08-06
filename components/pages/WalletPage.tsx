import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Notification from "../Notification";
import DepositModal from "../modals/DepositModal";
import WithdrawModal from "../modals/WithdrawModal";

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

interface WithdrawData {
  amount: string;
  userNumber: string;
}

// Static mapping for payment method images
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

export default function WalletPage() {
  const [userBalance] = useState(1250.5);
  const [depositModalVisible, setDepositModalVisible] = useState(false);
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

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
    showNotification(
      "Deposit request submitted successfully! It will be reviewed within 24 hours."
    );
  };

  const handleWithdrawSubmit = (data: WithdrawData) => {
    setWithdrawModalVisible(false);
    showNotification(
      "Withdrawal request submitted! Processing will take 24-48 hours."
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
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
              <Text style={styles.balanceAmount}>
                ৳{userBalance.toFixed(2)}
              </Text>
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
                  <Image
                    source={methodImages[method.id]}
                    style={styles.paymentImage}
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>


        {/* Withdraw Section */}
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 0 }}>
            <Text style={styles.sectionTitle}>Withdraw Money</Text>
            <TouchableOpacity onPress={() => setHistoryModalVisible(true)}>
              <Text style={{ color: '#007AFF', fontFamily: 'Outfit-Bold', fontSize: 16 }}>History</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.withdrawButton}
            onPress={() => setWithdrawModalVisible(true)}
          >
            <Text style={styles.withdrawIcon}>💸</Text>
            <Text style={styles.withdrawText}>Withdraw Funds</Text>
            <Text style={styles.withdrawArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Ads Section */}
        <View style={styles.adsCard}>
          <Text style={styles.adsText}>ADS Here</Text>
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

      {/* History Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={historyModalVisible}
        onRequestClose={() => setHistoryModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.historyModalContent}>
            {/* Header */}
            <View style={styles.historyHeader}>
              <Text style={styles.historyTitle}>অনুরোধসমূহ</Text>
              <TouchableOpacity onPress={() => setHistoryModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Request Items */}
            <ScrollView style={styles.requestsList}>
              <View style={styles.requestItem}>
                <Image
                  source={require("../../assets/images/bkash.png")}
                  style={styles.requestIcon}
                  resizeMode="contain"
                />
                <View style={styles.requestDetails}>
                  <Text style={styles.requestNumber}>নাম্বার: 01751518021</Text>
                  <Text style={styles.requestType}>আকাউন্ট: বিকাশ</Text>
                </View>
                <View style={styles.requestAmount}>
                  <Text style={styles.amountText}>পরিমাণ: ৮৫০০</Text>
                  <Text style={styles.statusText}>অনুরোধ: উত্তোলন</Text>
                </View>
              </View>
              <View style={styles.divider} />

              <View style={styles.requestItem}>
                <Image
                  source={require("../../assets/images/upay.png")}
                  style={styles.requestIcon}
                  resizeMode="contain"
                />
                <View style={styles.requestDetails}>
                  <Text style={styles.requestNumber}>নাম্বার: 01751518021</Text>
                  <Text style={styles.requestType}>আকাউন্ট: উপায়</Text>
                </View>
                <View style={styles.requestAmount}>
                  <Text style={styles.amountText}>পরিমাণ: ৮৩০০</Text>
                  <Text style={styles.statusText}>অনুরোধ: উত্তোলন</Text>
                </View>
              </View>
            </ScrollView>

            {/* Footer with Victor Logo */}
            <View style={styles.historyFooter}>
              <Image
                source={require("../../assets/images/victor-logo.png")}
                style={styles.victorLogoHistory}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </Modal>

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
    backgroundColor: "#f5f5f5",
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
    backgroundColor: "#667eea",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  cardBrand: {
    fontSize: 20,
    fontFamily: "Outfit-Bold",
    color: "#fff",
  },
  chip: {
    width: 45,
    height: 35,
    backgroundColor: "#FFD700",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  chipInner: {
    width: 35,
    height: 25,
    backgroundColor: "#FFA500",
    borderRadius: 4,
  },
  cardNumber: {
    marginBottom: 25,
  },
  cardNumberText: {
    fontSize: 22,
    fontFamily: "Outfit-SemiBold",
    color: "#fff",
    letterSpacing: 2,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  cardLabel: {
    fontSize: 10,
    fontFamily: "Outfit-Regular",
    color: "#ddd",
    marginBottom: 2,
  },
  cardValue: {
    fontSize: 14,
    fontFamily: "Outfit-SemiBold",
    color: "#fff",
  },
  balanceContainer: {
    position: "absolute",
    bottom: 25,
    left: 25,
  },
  balanceLabel: {
    fontSize: 12,
    fontFamily: "Outfit-Regular",
    color: "#ddd",
    marginBottom: 0,
  },
  balanceAmount: {
    fontSize: 24,
    fontFamily: "Outfit-Bold",
    color: "#fff",
  },
  section: {
    backgroundColor: "#fff",
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: "Outfit-Bold",
    color: "#333",
    marginBottom: 10,
  },
  paymentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  paymentMethod: {
    width: "47%",
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e9ecef",
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
    fontFamily: "Outfit-SemiBold",
    color: "#333",
  },
  withdrawButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 20,
    borderRadius: 15,
    justifyContent: "space-between",
  },
  withdrawIcon: {
    fontSize: 24,
  },
  withdrawText: {
    fontSize: 18,
    fontFamily: "Outfit-SemiBold",
    color: "#fff",
    flex: 1,
    marginLeft: 15,
  },
  withdrawArrow: {
    fontSize: 20,
    color: "#fff",
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
    paddingTop: 25,
    paddingHorizontal: 25,
    paddingBottom: 45,
    maxHeight: "85%",
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: "Outfit-Bold",
    color: "#333",
    marginBottom: 15,
  },
  merchantNumberContainer: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e9ecef",
    borderStyle: "dashed",
  },
  merchantNumberLabel: {
    fontSize: 14,
    fontFamily: "Outfit-Regular",
    color: "#666",
    marginBottom: 5,
  },
  merchantNumber: {
    fontSize: 20,
    fontFamily: "Outfit-Bold",
    color: "#007AFF",
    marginBottom: 5,
  },
  copyText: {
    fontSize: 12,
    fontFamily: "Outfit-Medium",
    color: "#007AFF",
  },
  modalBody: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: "Outfit-SemiBold",
    color: "#333",
    marginBottom: 10,
    marginTop: 15,
  },
  input: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    fontFamily: "Outfit-Medium",
    borderWidth: 2,
    borderColor: "#e9ecef",
    marginBottom: 5,
  },
  uploadButton: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e9ecef",
    borderStyle: "dashed",
    marginBottom: 30,
  },
  uploadButtonText: {
    fontSize: 16,
    fontFamily: "Outfit-Medium",
    color: "#666",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 15,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e9ecef",
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: "Outfit-SemiBold",
    color: "#666",
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    fontFamily: "Outfit-SemiBold",
    color: "#fff",
  },
  adsCard: {
    backgroundColor: "#fff",
    margin: 15,
    marginBottom: 20,
    marginTop: 0,
    padding: 0,
    borderRadius: 12,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  adsText: {
    fontSize: 18,
    fontFamily: "Outfit-Bold",
    color: "#888",
    letterSpacing: 1,
  },
  // History Modal Styles
  historyModalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 20,
    maxHeight: "80%",
    minHeight: "50%",
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  historyTitle: {
    fontSize: 20,
    fontFamily: "HindSiliguri-Bold",
    color: "#333",
  },
  closeButton: {
    fontSize: 24,
    color: "#666",
    fontWeight: "bold",
  },
  requestsList: {
    flex: 1,
  },
  requestItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 0,
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 15,
    marginBottom: 10,
  },
  requestIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  requestDetails: {
    flex: 1,
  },
  requestNumber: {
    fontSize: 14,
    fontFamily: "HindSiliguri-SemiBold",
    color: "#333",
    marginBottom: 2,
  },
  requestType: {
    fontSize: 12,
    fontFamily: "HindSiliguri-Regular",
    color: "#666",
  },
  requestAmount: {
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: 14,
    fontFamily: "HindSiliguri-SemiBold",
    color: "#333",
    marginBottom: 2,
  },
  statusText: {
    fontSize: 12,
    fontFamily: "HindSiliguri-Regular",
    color: "#007AFF",
  },
  historyFooter: {
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    marginTop: 5,
  },
  fromText: {
    fontSize: 10,
    color: "#999",
    fontFamily: "Outfit-Regular",
    marginBottom: 5,
  },
  victorLogoHistory: {
    width: 120,
    height: 36,
  },
});
