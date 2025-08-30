import React, { useState } from "react";
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
  { id: "bkash", name: "বিকাশ", type: "mobile", icon: "" },
  { id: "nagad", name: "নগদ", type: "mobile", icon: "" },
  { id: "rocket", name: "রকেট", type: "mobile", icon: "" },
  { id: "upay", name: "উপায়", type: "mobile", icon: "" },
];

interface WalletPageProps {
  historyModalVisible: boolean;
  setHistoryModalVisible: (visible: boolean) => void;
}

export default function WalletPage({
  historyModalVisible,
  setHistoryModalVisible,
}: WalletPageProps) {
  const [userBalance] = useState(10000);
  const [depositModalVisible, setDepositModalVisible] = useState(false);
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
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

  // Helper to convert English digits to Bengali
  const toBengaliNumber = (str: string) =>
    str.replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[parseInt(d)]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ATM Card */}
        <View style={styles.cardContainer}>
          <View style={styles.atmCard}>
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <Image
                source={require("../../assets/images/app-logo.png")}
                style={{ width: 200, height: 40, resizeMode: "contain" }}
              />
            </View>
            <View style={styles.chip} />

            {/* Balance with label above */}
            <View
              style={[
                styles.balanceContainer,
                { width: "90%", height: "auto" },
              ]}
            >
              <Text
                style={[
                  styles.cardValue,
                  { color: "#000", marginBottom: 0, paddingBottom: 0 },
                ]}
              >
                অ্যাকাউন্ট ব্যালেন্স (টাকা)
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  marginBottom: 0,
                  paddingBottom: 0,
                }}
              >
                <Text style={[styles.balanceAmount, { lineHeight: 32 }]}>
                  ৳{toBengaliNumber(userBalance.toLocaleString("en-US"))}
                </Text>
                <Text style={[styles.vewText, { lineHeight: 18 }]}>V.E.W</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Deposit Section */}
        <View style={styles.depositSection}>
          <Text style={styles.depositTitle}>ডিপোজিট করুন</Text>
          <View style={styles.paymentBox}>
            {paymentMethods.map((method, idx) => (
              <React.Fragment key={method.id}>
                <TouchableOpacity
                  style={styles.paymentMethodBox}
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
                {idx < paymentMethods.length - 1 && (
                  <View style={styles.verticalDivider} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Withdraw Section */}
        <View style={styles.withdrawSection}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text style={styles.withdrawTitle}>উইথড্র করুন</Text>
          </View>
          <View style={styles.withdrawPaymentBox}>
            {paymentMethods.map((method, idx) => (
              <React.Fragment key={method.id}>
                <TouchableOpacity
                  style={styles.withdrawMethodBox}
                  onPress={() => {
                    setSelectedPaymentMethod(method);
                    setWithdrawModalVisible(true);
                  }}
                >
                  {methodImages[method.id] && (
                    <Image
                      source={methodImages[method.id]}
                      style={styles.paymentImage}
                      resizeMode="contain"
                    />
                  )}
                </TouchableOpacity>
                {idx < paymentMethods.length - 1 && (
                  <View style={styles.verticalDivider} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Ads Section */}
        <View style={styles.adsCard}>
          <Text style={styles.adsText}>Native Ads</Text>
        </View>

        {/* Victor Logo */}
        <View style={styles.modalFooter}>
          <Image
            source={require("../../assets/images/victor-logo.png")}
            style={styles.victorLogo}
          />
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
        paymentMethod={selectedPaymentMethod}
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
                style={styles.victorLogo}
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
    // Background color removed since it's now handled by the floating wrapper
  },

  vewText: {
    color: "#000",
    fontFamily: "Outfit-Bold",
    fontSize: 18,
    marginBottom: 0,
    paddingBottom: 0,
  },
  cardContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 8,
    marginBottom: 0,
  },
  atmCard: {
    height: 220,
    borderRadius: 20,
    padding: 15,
    backgroundColor: "#FF00FF",
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
  },

  chip: {
    width: 65,
    height: 45,
    backgroundColor: "#f88713",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: 20,
    marginRight: 20,
    borderWidth: 1,
    borderColor: "#000",
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardValue: {
    fontSize: 14,
    fontFamily: "NotoSerifBengali-Bold",
    color: "#000",
  },
  balanceContainer: {
    position: "absolute",
    bottom: 25,
    left: 25,
    paddingBottom: 0,
    marginBottom: 0,
  },
  balanceLabel: {
    fontSize: 12,
    fontFamily: "Outfit-Regular",
    color: "#ddd",
    marginBottom: 0,
  },
  balanceAmount: {
    fontSize: 32,
    fontFamily: "NotoSerifBengali-Bold",
    color: "#000",
    marginBottom: 0,
    paddingBottom: 0,
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

  //Deposit Section Styles

  depositSection: {
    margin: 0,
    marginTop: 0,
    padding: 10,
  },
  depositTitle: {
    fontSize: 20,
    fontFamily: "NotoSerifBengali-Bold",
    color: "#333",
    marginLeft: 10,
    marginTop: 10,
  },
  paymentBox: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 6,
    backgroundColor: "#fff",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 0,
  },
  paymentMethodBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 0,
    backgroundColor: "transparent",
  },

  // Withdraw Section Styles
  withdrawSection: {
    padding: 10,
  },
  withdrawTitle: {
    fontSize: 20,
    fontFamily: "NotoSerifBengali-Bold",
    color: "#333",
    marginLeft: 10,
    marginBottom: 0,
  },

  withdrawPaymentBox: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 6,
    backgroundColor: "#fff",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 0,
  },
  historyButton: {
    color: "#007AFF",
    fontFamily: "NotoSerifBengali-Bold",
    fontSize: 16,
    marginRight: 20,
  },
  withdrawMethodBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "transparent",
  },
  verticalDivider: {
    width: 1,
    height: 75,
    backgroundColor: "#000",
  },
  paymentIcon: {
    fontSize: 32,
  },
  paymentImage: {
    width: 70,
    height: 55,
  },
  paymentName: {
    fontSize: 16,
    fontFamily: "NotoSerifBengali-Bold",
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
    backgroundColor: "#afacac",
    margin: 15,
    marginBottom: 20,
    marginTop: 0,
    padding: 0,
    borderRadius: 12,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  adsText: {
    fontSize: 28,
    fontFamily: "Outfit-Bold",
    color: "#fff",
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
    fontFamily: "NotoSerifBengali-Bold",
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
    fontFamily: "NotoSerifBengali-SemiBold",
    color: "#333",
    marginBottom: 2,
  },
  requestType: {
    fontSize: 12,
    fontFamily: "NotoSerifBengali-Regular",
    color: "#666",
  },
  requestAmount: {
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: 14,
    fontFamily: "NotoSerifBengali-SemiBold",
    color: "#333",
    marginBottom: 2,
  },
  statusText: {
    fontSize: 12,
    fontFamily: "NotoSerifBengali-Regular",
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
  victorLogo: {
    width: 120,
    height: 36,
  },
  modalFooter: {
    alignItems: "center",
    borderTopColor: "#f0f0f0",
    paddingTop: 8,
    width: "100%",
    paddingBottom: 40,
  },
});
