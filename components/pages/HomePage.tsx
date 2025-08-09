import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";

interface ColorRace {
  color: string;
  name: string;
  backgroundColor: string;
}

interface BetHistory {
  roundNumber: string;
  date: string;
  time: string;
  winningColor: string;
  winnersCount: string;
}

const screenHeight = Dimensions.get("window").height;

export default function HomePage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ColorRace | null>(null);
  const [betAmount, setBetAmount] = useState("");
  const [lastBetColor, setLastBetColor] = useState<string | null>(null);
  // Consent modal state
  const [showConsentModal, setShowConsentModal] = useState(true);
  const [showTradeEndModal, setShowTradeEndModal] = useState(false);

  const handleConsent = async (accepted: boolean) => {
    if (accepted) {
      await AsyncStorage.setItem("userConsentGiven", "true");
    }
    setShowConsentModal(false);
    setTimeout(() => setShowTradeEndModal(true), 300); // Show second modal after a short delay
  };

  // Round and Timer states
  const [currentRound, setCurrentRound] = useState("#15448");
  const [timeRemaining, setTimeRemaining] = useState(29 * 60 + 59); // 29:59 in seconds

  const colorRaces: ColorRace[] = [
    {
      color: "Yellow",
      name: "Gold Rush",
      backgroundColor: "#FFD700",
    },
    {
      color: "Purple",
      name: "Royal Reign",
      backgroundColor: "#8A2BE2",
    },
    {
      color: "Orange",
      name: "Sunset Storm",
      backgroundColor: "#FF8C00",
    },
  ];

  const betHistory: BetHistory[] = [
    {
      roundNumber: "#1999",
      date: "Mon Sep 16, 03:30",
      time: "03:30",
      winningColor: "Yellow",
      winnersCount: "২৪৫০০",
    },
    {
      roundNumber: "#1998",
      date: "Mon Sep 16, 03:00",
      time: "03:00",
      winningColor: "Purple",
      winnersCount: "৪৩০০",
    },
    {
      roundNumber: "#1997",
      date: "Mon Sep 16, 02:30",
      time: "02:30",
      winningColor: "Orange",
      winnersCount: "৯৯৪৪",
    },
    {
      roundNumber: "#1996",
      date: "Mon Sep 16, 02:00",
      time: "02:00",
      winningColor: "Yellow",
      winnersCount: "২০৪৪৮",
    },
    {
      roundNumber: "#1995",
      date: "Mon Sep 16, 01:30",
      time: "01:30",
      winningColor: "Purple",
      winnersCount: "২৪৯০",
    },
  ];

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          // Reset to 30 minutes and increment round
          const roundNum = parseInt(currentRound.replace("#", "")) + 1;
          setCurrentRound(`#${roundNum}`);
          return 30 * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentRound]);

  // Helper to convert English digits to Bengali
  const toBengaliNumber = (str: string) =>
    str.replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[parseInt(d)]);

  // Format time remaining in Bengali
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const timeStr = `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
    return toBengaliNumber(timeStr);
  };

  const handleColorSelect = (color: ColorRace) => {
    setSelectedColor(color);
    setModalVisible(true);
  };

  const handlePlaceBet = () => {
    if (betAmount && selectedColor) {
      console.log(`Betting $${betAmount} on ${selectedColor.color}`);
      setLastBetColor(selectedColor.color);
      setModalVisible(false);
      setBetAmount("");
      setSelectedColor(null);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setBetAmount("");
    setSelectedColor(null);
  };

  useEffect(() => {
    if (showTradeEndModal) {
      const timer = setTimeout(() => setShowTradeEndModal(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showTradeEndModal]);

  return (
    <>
      {/* Consent Modal */}
      <Modal
        visible={showConsentModal}
        transparent
        animationType="fade"
        onRequestClose={() => handleConsent(false)}
      >
        <View style={styles.consentModalOverlay}>
          <View style={styles.consentModalContent}>
            <Text style={styles.consentModalText}>
              আপনি এই অ্যাপ ব্যবহারের{" "}
              <Text
                style={{ color: "#FF00FF", fontFamily: "HindSiliguri-Bold" }}
              >
                শর্তাবলী
              </Text>
              ,{" "}
              <Text
                style={{ color: "#FF00FF", fontFamily: "HindSiliguri-Bold" }}
              >
                গোপনীয়তা নীতি
              </Text>{" "}
              এবং অ্যাড দেখানোর নিয়মকে মেনে নিয়ে অ্যাপটিতে প্রবেশ করছেন?
            </Text>
            <View style={styles.consentModalButtons}>
              <TouchableOpacity
                style={styles.consentButtonNo}
                onPress={() => handleConsent(false)}
              >
                <Text style={styles.consentButtonTextNo}>না</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.consentButtonYes}
                onPress={() => handleConsent(true)}
              >
                <Text style={styles.consentButtonTextYes}>হ্যাঁ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Trade End Modal */}
      <Modal
        visible={showTradeEndModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTradeEndModal(false)}
      >
        <View style={styles.consentModalOverlay}>
          <View style={styles.consentModalContent}>
            <Text style={styles.consentModalText}>
              আজকের ট্রেড সমাপ্ত হয়েছে। কালকে সকাল ৯টা থেকে আবার শুরু করুন।
              {"\n"}
              <Text
                style={{ color: "#FF00FF", fontFamily: "HindSiliguri-Bold" }}
              >
                শর্তাবলী
              </Text>
            </Text>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Ads Section */}
        <View style={styles.adsCard}>
          <Text style={styles.adsText}>ADS</Text>
        </View>

        {/* Trades with Round Info */}
        <View style={styles.graphCard}>
          <LinearGradient
            colors={["#131212", "#dfdbdb"]}
            style={styles.gradientBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            {/* Floating Round Info Header */}
            <View style={styles.floatingRoundInfo}>
              <View style={styles.roundInfoContainer}>
                {/* Left Black Circle */}
                <View style={styles.sideCircle}>
                  <Image
                    source={require("../../assets/images/icons/chart.png")}
                    style={styles.circleIcon}
                  />
                </View>
                <View style={styles.contentSection}>
                  <View style={styles.roundSection}>
                    <Text style={styles.roundLabel}>রাউন্ড নং</Text>
                    <Text style={styles.roundNumber}>
                      {toBengaliNumber(currentRound)}
                    </Text>
                  </View>
                  {/* Vertical Divider */}
                  <View style={styles.roundInfoDivider} />
                  <View style={styles.timerSection}>
                    <Text style={styles.timerLabel}>ট্রেড স্থায়ী মিনিট</Text>
                    <View style={styles.timerDigitsContainer}>
                      {formatTime(timeRemaining)
                        .split("")
                        .map((digit, index) => (
                          <View
                            key={index}
                            style={
                              digit === ":"
                                ? styles.colonContainer
                                : styles.digitContainer
                            }
                          >
                            <Text
                              style={
                                digit === ":"
                                  ? styles.colonText
                                  : styles.digitText
                              }
                            >
                              {digit}
                            </Text>
                          </View>
                        ))}
                    </View>
                  </View>
                </View>
                {/* Right Black Circle */}
                <View style={styles.sideCircle}>
                  <Image
                    source={require("../../assets/images/icons/clock.png")}
                    style={styles.circleIcon}
                  />
                </View>
              </View>
            </View>

            {/* Trading Chart Lines */}
            <View style={styles.horizontalLinesContainer}>
              <Svg
                width="100%"
                height="180"
                viewBox="0 0 350 180"
                style={{ position: "absolute", top: 0, left: 0, right: 0 }}
              >
                {/* Yellow racer */}
                <Path
                  d="M0,40 L20,40 L40,20 L60,60 L80,35 L100,50 L120,30 L140,60 L160,45 L180,70 L200,30 L220,60 L240,40 L260,50 L280,30 L300,60 L320,40 L340,50"
                  stroke="#FFD700"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />

                {/* Purple racer - intersects and dips differently */}
                <Path
                  d="M0,80 L20,80 L40,100 L60,50 L80,75 L100,65 L120,90 L140,55 L160,85 L180,60 L200,95 L220,70 L240,90 L260,60 L280,85 L300,65 L320,75 L340,70"
                  stroke="#8A2BE2"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />

                {/* Orange racer - jumps the highest and lowest */}
                <Path
                  d="M0,130 L20,130 L40,110 L60,160 L80,120 L100,140 L120,100 L140,150 L160,125 L180,145 L200,115 L220,155 L240,130 L260,140 L280,110 L300,150 L320,130 L340,135"
                  stroke="#FF8C00"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </Svg>
            </View>
          </LinearGradient>
        </View>

        {/* Color Selection */}
        <View style={styles.colorSelectionCard}>
          <Text style={styles.sectionTitle2}>
            অনুগ্রহ করে ট্রেডের সম্ভাব্য রঙ নির্বাচন করুন।
          </Text>
          <View style={styles.colorButtons}>
            {colorRaces.map((race, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.colorButton, { backgroundColor: "#000" }]}
                onPress={() => handleColorSelect(race)}
              >
                <Text style={[styles.colorButtonText]}>
                  {race.color === "Yellow"
                    ? "হলুদ"
                    : race.color === "Purple"
                    ? "গোলাপি"
                    : "কমলা"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Ads Section (before Recent Bets) */}
        <View style={styles.adsCard2}>
          <Text style={styles.adsText}>
            our company (Victor Earn Way) promotional ADS
          </Text>
        </View>

        {/* Recent Bets */}
        <View style={styles.recentBetsCard}>
          <View style={styles.betsHeader}>
            <Text style={[styles.sectionTitle]}>
              সর্বশেষ ৫টি ট্রেড এর তালিকা সমূহ
            </Text>
          </View>
          {betHistory.map((bet, index) => (
            <View key={index} style={styles.betHistoryItem}>
              {/* Logo without background/border */}
              <Image
                source={require("../../assets/images/logo.png")}
                style={styles.betLogo}
              />

              {/* Round and Date Section */}
              <View style={styles.roundDateSection}>
                <Text style={styles.roundText}>
                  রাউন্ড{" "}
                  <Text style={{ fontFamily: "HindSiliguri-Bold" }}>
                    {toBengaliNumber(bet.roundNumber)}
                  </Text>
                </Text>
                <Text style={styles.dateTimeText}>{bet.date}</Text>
              </View>

              {/* Winners and Color Section */}
              <View style={styles.winnersSection}>
                <Text style={styles.winnersText}>
                  বিজয়ী সংখ্যা:{" "}
                  <Text
                    style={{ fontFamily: "HindSiliguri-Bold", fontSize: 16 }}
                  >
                    {bet.winnersCount}
                  </Text>
                </Text>
                <View style={styles.winnerColorRow}>
                  <Text style={styles.winnerLabel}>বিজয়ী ট্রেড রং</Text>
                  <View
                    style={[
                      styles.winnerColorBox,
                      {
                        backgroundColor:
                          bet.winningColor === "Yellow"
                            ? "#FFD700"
                            : bet.winningColor === "Purple"
                            ? "#8A2BE2"
                            : "#FF8C00",
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          ))}

          {/* Bottom Logo */}
          <View style={styles.bottomLogoContainer}>
            <Image
              source={require("../../assets/images/victor-logo.png")}
              style={styles.bottomLogo}
            />
          </View>
        </View>

        {/* Betting Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCancel}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Color Icon at top, stacked column, black circle, big colored star, colored name tag */}
              <View
                style={[
                  styles.colorRow,
                  { flexDirection: "column", alignItems: "center" },
                ]}
              >
                <View style={[styles.colorIcon, { backgroundColor: "#000" }]}>
                  <Svg width={54} height={54} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M12 2L15 8.5L22 9.3L17 14.1L18.2 21L12 17.8L5.8 21L7 14.1L2 9.3L9 8.5L12 2Z"
                      fill={selectedColor?.backgroundColor || "#ff8c00"}
                    />
                  </Svg>
                </View>
                <Text style={styles.selectedColorNameBig}>
                  {selectedColor?.color === "Yellow"
                    ? "হলুদ"
                    : selectedColor?.color === "Purple"
                    ? "গোলাপি"
                    : "কমলা"}
                </Text>
              </View>

              {/* Bet Amount Text */}
              <View style={styles.betAmountLabelRow}>
                <Text style={styles.betAmountLabelLeft}>
                  আমি ট্রেড করতে চাই
                </Text>
              </View>

              {/* Amount Input */}
              <View style={{ position: 'relative', width: '100%', justifyContent: 'center' }}>
                <TextInput
                  style={[styles.amountInput, { paddingRight: 60 }]}
                  value={betAmount}
                  onChangeText={setBetAmount}
                  placeholder="সর্বনিম্ন ৫০ টেকে সর্বোচ্চ ৫,০০০"
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />
                <Text
                  style={{
                    position: 'absolute',
                    right: 25,
                    top: 15,
                    color: '#000',
                    fontFamily: 'HindSiliguri-Medium',
                    fontSize: 18,
                    zIndex: 2,
                  }}
                >
                  টাকা
                </Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={handleCancel}
                >
                  <Text style={styles.cancelBtnText}>বাতিল</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmBtn}
                  onPress={handlePlaceBet}
                >
                  <Text style={styles.confirmBtnText}>নিশ্চিত</Text>
                </TouchableOpacity>
              </View>

              {/* Victor Logo */}
              <View style={styles.modalFooter}>
                <Image
                  source={require("../../assets/images/victor-logo.png")}
                  style={styles.victorLogo}
                />
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  roundNumberValue: {
    fontSize: 20,
    fontFamily: "HindSiliguri-Bold",
    color: "#222",
    textAlign: "right",
    flex: 1,
  },
  adsCard: {
    backgroundColor: "#dcd9d8ff",
    margin: 15,
    marginBottom: 0,
    marginTop: 5,
    padding: 0,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  adsCard2: {
    backgroundColor: "#dcd9d8ff",
    margin: 15,
    marginBottom: 0,
    marginTop: 10,
    padding: 0,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  colorRow: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedColorNameBig: {
    fontSize: 32,
    fontFamily: "HindSiliguri-Bold",
    color: "#ff8c00",
  },
  adsText: {
    fontSize: 18,
    fontFamily: "Outfit-Medium",
    color: "#888",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  graphCard: {
    backgroundColor: "#fff",
    margin: 15,
    marginBottom: 8,
    marginTop: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 240,
    overflow: "hidden",
  },
  gradientBackground: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 20,
    position: "relative",
  },
  floatingRoundInfo: {
    backgroundColor: "#fff",
    marginHorizontal: 8,
    marginTop: 5,
    marginBottom: 0,
    borderRadius: 50,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  roundInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 0,
    gap: 6,
  },
  contentSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 0,
  },
  sideCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  circleIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  roundSection: {
    alignItems: "flex-start",
    marginLeft: 0,
  },
  roundNumber: {
    fontSize: 18,
    fontFamily: "HindSiliguri-Bold",
    color: "#333",
  },
  roundLabel: {
    fontSize: 14,
    fontFamily: "HindSiliguri-Medium",
    color: "#666",
  },
  timerSection: {
    alignItems: "center",
  },
  timerLabel: {
    fontSize: 10,
    fontFamily: "HindSiliguri-Medium",
    color: "#666",
    marginBottom: 6,
  },
  timerDigitsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  digitContainer: {
    backgroundColor: "#000",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 4,
    alignItems: "center",
  },
  digitText: {
    fontSize: 16,
    fontFamily: "HindSiliguri-Bold",
    color: "#fff",
  },
  colonContainer: {
    paddingHorizontal: 4,
  },
  colonText: {
    fontSize: 16,
    fontFamily: "HindSiliguri-Bold",
    color: "#000",
  },
  roundInfoDivider: {
    width: 1,
    height: 60,
    backgroundColor: "#6c6a6aff",
    marginHorizontal: 4,
    alignSelf: "center",
  },
  horizontalLinesContainer: {
    justifyContent: "space-evenly",
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  horizontalLine: {
    height: 3,
    width: "100%",
    marginVertical: 8,
  },

  colorLabels: {
    position: "absolute",
    left: 5,
    top: 0,
    bottom: 0,
    zIndex: 2,
  },
  colorLabelText: {
    position: "absolute",
    fontSize: 10,
    fontFamily: "HindSiliguri-Medium",
    textShadowColor: "rgba(255, 255, 255, 0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  colorSelectionCard: {
    margin: 0,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
  },
  colorButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    paddingHorizontal: 15,
    paddingVertical: 0,
  },
  colorButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 25,
    alignItems: "center",
    maxWidth: 110,
  },
  colorButtonText: {
    fontSize: 16,
    fontFamily: "HindSiliguri-Bold",
    color: "#fff",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "HindSiliguri-Bold",
    color: "#000",
    marginBottom: 0,
    textAlign: "center",
  },

  sectionTitle2: {
    fontSize: 12,
    fontFamily: "HindSiliguri-Medium",
    color: "#333",
    marginBottom: 4,
    textAlign: "center",
  },

  recentBetsCard: {
    margin: 10,
    marginTop: 10,
    padding: 10,
    borderRadius: 15,
    marginBottom: 100,
  },
  betsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
    fontFamily: "HindSiliguri-Bold",
  },
  betHistoryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#e3e0e0",
    marginBottom: 6,
  },
  betLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  roundDateSection: {
    flex: 1,
    marginRight: 8,
  },
  roundText: {
    fontSize: 16,
    fontFamily: "HindSiliguri-Medium",
    color: "#222",
    marginBottom: 2,
  },
  dateTimeText: {
    fontSize: 14,
    fontFamily: "HindSiliguri-Regular",
    color: "#666",
  },
  winnersSection: {
    alignItems: "flex-end",
  },
  winnersText: {
    fontSize: 14,
    fontFamily: "HindSiliguri-Medium",
    color: "#333",
    marginBottom: 4,
  },
  winnerColorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  winnerLabel: {
    fontSize: 12,
    fontFamily: "HindSiliguri-Regular",
    color: "#666",
  },
  winnerColorBox: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 24,
    alignItems: "center",
    width: "100%",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  colorIconContainer: {
    marginBottom: 16,
  },
  colorIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    margin: 0,
    padding: 0,
  },
  selectedColorName: {
    fontSize: 24,
    fontFamily: "HindSiliguri-Bold",
    color: "#ff8c00",
    marginBottom: 20,
  },
  betAmountLabel: {
    fontSize: 16,
    fontFamily: "HindSiliguri-Medium",
    color: "#333",
    marginBottom: 16,
    textAlign: "left",
  },
  betAmountLabelRow: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  betAmountLabelLeft: {
    fontSize: 18,
    fontFamily: "HindSiliguri-Bold",
    color: "#333",
    textAlign: "left",
  },
  amountInput: {
    backgroundColor: "#ededed",
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: "HindSiliguri-Regular",
    borderWidth: 1,
    borderColor: "#000000",
    marginBottom: 24,
    textAlign: "left",
    width: "100%",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    marginBottom: 24,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000000",
  },
  cancelBtnText: {
    fontSize: 16,
    fontFamily: "HindSiliguri-Bold",
    color: "#666",
  },
  confirmBtn: {
    flex: 1,
    backgroundColor: "#eb01f6",
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: "center",
  },
  confirmBtnText: {
    fontSize: 16,
    fontFamily: "HindSiliguri-Bold",
    color: "#fff",
  },
  modalFooter: {
    alignItems: "center",
    borderTopColor: "#f0f0f0",
    paddingTop: 8,
    width: "100%",
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  logoText: {
    fontSize: 12,
    color: "#333",
    fontFamily: "HindSiliguri-Bold",
    marginLeft: 4,
  },
  taglineText: {
    fontSize: 8,
    color: "#666",
    fontFamily: "HindSiliguri-Regular",
    textAlign: "center",
  },
  consentModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  consentModalContent: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    maxWidth: 340,
    width: "100%",
    elevation: 10,
  },

  consentModalText: {
    fontSize: 16,
    fontFamily: "HindSiliguri-Bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 0,
    lineHeight: 26,
  },
  consentModalButtons: {
    flexDirection: "row",
    gap: 60,
    justifyContent: "center",
  },
  consentButtonYes: {
    backgroundColor: "#eb01f6",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 28,
    marginHorizontal: 4,
  },
  consentButtonNo: {
    backgroundColor: "#d1006b",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 28,
    marginHorizontal: 4,
  },
  consentButtonTextYes: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "HindSiliguri-Bold",
  },
  consentButtonTextNo: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "HindSiliguri-Bold",
  },
  bottomLogoContainer: {
    alignItems: "center",
    marginTop: 15,
    paddingBottom: 10,
  },
  bottomLogo: {
    width: 120,
    height: 35,
  },
  victorLogo: {
    width: 140,
    height: 40,
    marginTop: 10,
  },
});
