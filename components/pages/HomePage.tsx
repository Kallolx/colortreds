import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
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
  odds: string;
}

interface BetHistory {
  roundNumber: string;
  date: string;
  time: string;
  winningColor: string;
  winnersCount: string;
  myBet?: string;
  gameResult: string;
}

const screenHeight = Dimensions.get("window").height;

export default function HomePage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ColorRace | null>(null);
  const [betAmount, setBetAmount] = useState("");
  const [lastBetColor, setLastBetColor] = useState<string | null>(null);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [animationPhase, setAnimationPhase] = useState(0);
  // Consent modal state
  const [showConsentModal, setShowConsentModal] = useState(false);
  // Show consent modal only once
  useEffect(() => {
    (async () => {
      const consent = await AsyncStorage.getItem("userConsentGiven");
      if (!consent) {
        setShowConsentModal(true);
      }
    })();
  }, []);

  const handleConsent = async (accepted: boolean) => {
    if (accepted) {
      await AsyncStorage.setItem("userConsentGiven", "true");
    }
    setShowConsentModal(false);
  };

  // Round and Timer states
  const [currentRound, setCurrentRound] = useState("#1548");
  const [timeRemaining, setTimeRemaining] = useState(29 * 60 + 59); // 29:59 in seconds
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const colorRaces: ColorRace[] = [
    {
      color: "Yellow",
      name: "Gold Rush",
      backgroundColor: "#FFD700",
      odds: "2.5x",
    },
    {
      color: "Purple",
      name: "Royal Reign",
      backgroundColor: "#8A2BE2",
      odds: "3.2x",
    },
    {
      color: "Orange",
      name: "Sunset Storm",
      backgroundColor: "#FF8C00",
      odds: "2.8x",
    },
  ];

  const betHistory: BetHistory[] = [
    {
      roundNumber: "#1547",
      date: "Mon Sep 16, 03:00",
      time: "03:00",
      winningColor: "Yellow",
      winnersCount: "১৮",
      myBet: "Yellow",
      gameResult: "জিতেছেন ✓",
    },
    {
      roundNumber: "#1546",
      date: "Mon Sep 16, 03:00",
      time: "03:00",
      winningColor: "Purple",
      winnersCount: "২৫",
      myBet: "Orange",
      gameResult: "হেরেছেন ✗",
    },
    {
      roundNumber: "#1545",
      date: "Mon Sep 16, 02:00",
      time: "02:00",
      winningColor: "Orange",
      winnersCount: "৩২",
      myBet: "Orange",
      gameResult: "জিতেছেন ✓",
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

  // Pulse animation for live indicator
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Animation for curved lines
  useEffect(() => {
    const startAnimation = () => {
      const listener = animatedValue.addListener(({ value }) => {
        setAnimationPhase(value);
      });

      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 100,
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: false,
        })
      ).start();

      return () => {
        animatedValue.removeListener(listener);
      };
    };

    const cleanup = startAnimation();
    return cleanup;
  }, []);

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

  // Generate curved path for SVG
  const generateCurvePath = (baseY: number, phase: number = 0) => {
    const width = 230;
    const points = [];

    for (let x = 0; x <= width; x += 8) {
      const wave1 = Math.sin((x + phase) / 25) * 6;
      const wave2 = Math.sin((x + phase) / 45) * 10;
      const wave3 = Math.sin((x + phase) / 70) * 4;
      const y = baseY + wave1 + wave2 + wave3;
      points.push({ x, y });
    }

    let path = `M 0 ${points[0].y}`;
    for (let i = 1; i < points.length - 1; i++) {
      const currentPoint = points[i];
      const nextPoint = points[i + 1];
      const controlX = (currentPoint.x + nextPoint.x) / 2;
      const controlY = (currentPoint.y + nextPoint.y) / 2;
      path += ` Q ${currentPoint.x} ${currentPoint.y} ${controlX} ${controlY}`;
    }

    if (points.length > 1) {
      const lastPoint = points[points.length - 1];
      path += ` T ${lastPoint.x} ${lastPoint.y}`;
    }

    return path;
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
              <Text style={{ color: "#a600a6", fontWeight: "bold" }}>
                শর্তাবলী
              </Text>
              ,{" "}
              <Text style={{ color: "#d1006b", fontWeight: "bold" }}>
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
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Ads Section */}
        <View style={styles.adsCard}>
          <Text style={styles.adsText}>ADS Here</Text>
        </View>

        {/* Live Color Trends with Round Info */}
        <View style={styles.graphCard}>
          {/* Round Info Header */}
          <View style={styles.roundInfoContainer}>
            <View style={styles.roundSection}>
              <Text style={styles.roundNumber}>
                {toBengaliNumber(currentRound)}
              </Text>
              <Text style={styles.roundLabel}>বর্তমান রাউন্ড</Text>
            </View>
            {/* Vertical Divider */}
            <View style={styles.roundInfoDivider} />
            <View style={styles.timerSectionRow}>
              <Text style={styles.timerLabel}>অবশিষ্ট সময়</Text>
              <View style={styles.timerContainerInline}>
                <Text style={styles.timerClockIcon}>🕒</Text>
                <Text style={styles.timerText}>
                  {formatTime(timeRemaining)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.graphContainer}>
            {/* Grid lines */}
            <View style={styles.gridLines}>
              {[...Array(4)].map((_, index) => (
                <View
                  key={index}
                  style={[styles.gridLine, { top: 20 + index * 20 }]}
                />
              ))}
            </View>

            {/* SVG Curved Lines */}
            <Animated.View style={styles.svgContainer}>
              <Svg
                height="110"
                width="230"
                style={[styles.svg, { alignSelf: "flex-end" }]}
              >
                <Path
                  d={generateCurvePath(25, animationPhase)}
                  stroke="#FFD700"
                  strokeWidth={lastBetColor === "Yellow" ? "4" : "3"}
                  fill="none"
                  strokeLinecap="round"
                  opacity={lastBetColor === "Yellow" ? 1 : 0.8}
                />
                <Path
                  d={generateCurvePath(50, animationPhase + 30)}
                  stroke="#8A2BE2"
                  strokeWidth={lastBetColor === "Purple" ? "4" : "3"}
                  fill="none"
                  strokeLinecap="round"
                  opacity={lastBetColor === "Purple" ? 1 : 0.8}
                />
                <Path
                  d={generateCurvePath(75, animationPhase + 60)}
                  stroke="#FF8C00"
                  strokeWidth={lastBetColor === "Orange" ? "4" : "3"}
                  fill="none"
                  strokeLinecap="round"
                  opacity={lastBetColor === "Orange" ? 1 : 0.8}
                />
              </Svg>
            </Animated.View>

            {/* Color labels */}
            <View style={styles.colorLabels}>
              <Text style={[styles.colorLabelText, { top: 17, color: "#000" }]}>
                হলুদ
              </Text>
              <Text
                style={[styles.colorLabelText, { top: 42, color: "#8A2BE2" }]}
              >
                বেগুনি
              </Text>
              <Text
                style={[styles.colorLabelText, { top: 67, color: "#FF8C00" }]}
              >
                কমলা
              </Text>
            </View>
          </View>
        </View>

        {/* Color Selection */}
        <View style={styles.colorSelectionCard}>
          <Text style={styles.sectionTitle}>আপনার রঙ নির্বাচন করুন</Text>
          <View style={styles.colorButtons}>
            {colorRaces.map((race, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.colorButton,
                  { backgroundColor: race.backgroundColor },
                ]}
                onPress={() => handleColorSelect(race)}
              >
                <Text
                  style={[
                    styles.colorButtonText,
                    race.color === "Yellow" && { color: "#000" },
                  ]}
                >
                  {race.color === "Yellow"
                    ? "হলুদ"
                    : race.color === "Purple"
                    ? "বেগুনি"
                    : "কমলা"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Ads Section (before Recent Bets) */}
        <View style={styles.adsCard}>
          <Text style={styles.adsText}>ADS Here</Text>
        </View>

        {/* Recent Bets */}
        <View style={styles.recentBetsCard}>
          <View style={styles.betsHeader}>
            <Text
              style={[
                styles.sectionTitle,
                { marginBottom: 0, textAlign: "left" },
              ]}
            >
              সর্বশেষ বেট এর তালিকা
            </Text>
            <TouchableOpacity>
              <Text style={styles.allBetsText}>সকল বেট</Text>
            </TouchableOpacity>
          </View>
          {betHistory.map((bet, index) => (
            <View key={index} style={styles.betHistoryItem}>
              {/* Profile Icon */}
              <View style={styles.profileIconContainer}>
                <View
                  style={[
                    styles.profileIcon,
                    {
                      borderColor: bet.gameResult.includes("জিতেছেন")
                        ? "#28a745"
                        : "#dc3545",
                    },
                  ]}
                >
                  <Image
                    source={require("../../assets/images/logo.png")}
                    style={{ width: 30, height: 30, borderRadius: 12 }}
                  />
                </View>
              </View>

              {/* Bet Details */}
              <View style={styles.betDetailsContainer}>
                {/* Round Number */}
                <View style={styles.betDetailRow}>
                  <Text style={styles.betLabel}>রাউন্ড নং:</Text>
                  <Text style={styles.roundNumberValue}>
                    {toBengaliNumber(bet.roundNumber)}
                  </Text>
                </View>

                {/* Game End Time */}
                <View style={styles.betDetailRow}>
                  <Text style={styles.betLabel}>গেম শেষের সময়:</Text>
                  <Text style={styles.betValue}>{bet.date}</Text>
                </View>

                {/* Game Result */}
                <View style={styles.betDetailRow}>
                  <Text style={styles.betLabel}>গেম ফলাফল:</Text>
                  <Text
                    style={[
                      styles.betValue,
                      {
                        color: bet.gameResult.includes("জিতেছেন")
                          ? "#28a745"
                          : "#dc3545",
                      },
                    ]}
                  >
                    {bet.gameResult}
                  </Text>
                </View>

                {/* Winning Color */}
                <View style={styles.betDetailRow}>
                  <Text style={styles.betLabel}>বিজয়ী রং:</Text>
                  <View style={styles.winningNumberContainer}>
                    <Text style={styles.winningNumberText}>
                      {bet.winnersCount} জন জিতেছে
                    </Text>
                    <View
                      style={[
                        styles.colorIndicator,
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
              {/* Color Icon at top */}
              <View style={styles.colorRow}>
                <View
                  style={[
                    styles.colorIcon,
                    {
                      backgroundColor:
                        selectedColor?.backgroundColor || "#ff8c00",
                    },
                  ]}
                >
                  <Svg width={30} height={30} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M12 2L15 8.5L22 9.3L17 14.1L18.2 21L12 17.8L5.8 21L7 14.1L2 9.3L9 8.5L12 2Z"
                      fill="#ffffff"
                    />
                  </Svg>
                </View>
                <Text style={styles.selectedColorNameBig}>
                  {selectedColor?.color === "Yellow"
                    ? "হলুদ"
                    : selectedColor?.color === "Purple"
                    ? "বেগুনি"
                    : "কমলা"}
                </Text>
              </View>

              {/* Bet Amount Text */}
              <View style={styles.betAmountLabelRow}>
                <Text style={styles.betAmountLabelLeft}>আমি বেট করতে চাই</Text>
              </View>

              {/* Amount Input */}
              <TextInput
                style={styles.amountInput}
                value={betAmount}
                onChangeText={setBetAmount}
                placeholder="সর্বনিম্ন ৫০ টেকে সর্বোচ্চ ৫,০০০"
                keyboardType="numeric"
                placeholderTextColor="#999"
              />

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
    backgroundColor: "#fff",
    margin: 15,
    marginBottom: 0,
    padding: 0,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  colorRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  selectedColorNameBig: {
    fontSize: 32,
    fontFamily: "HindSiliguri-Bold",
    color: "#ff8c00",
    marginLeft: 12,
  },
  adsText: {
    fontSize: 18,
    fontFamily: "Outfit-Bold",
    color: "#888",
    letterSpacing: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  graphCard: {
    backgroundColor: "#fff",
    margin: 15,
    marginBottom: 8,
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 240,
  },
  roundInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  roundSection: {
    alignItems: "flex-start",
  },
  roundNumber: {
    fontSize: 24,
    fontFamily: "HindSiliguri-Bold",
    color: "#333",
  },
  roundLabel: {
    fontSize: 14,
    fontFamily: "HindSiliguri-Medium",
    color: "#666",
  },
  timerSectionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  timerContainerInline: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#007AFF",
    marginLeft: 6,
    minWidth: 110,
    justifyContent: "center",
  },
  timerClockIcon: {
    fontSize: 18,
    marginRight: 4,
    color: "#007AFF",
  },
  timerText: {
    fontSize: 20,
    fontFamily: "HindSiliguri-Bold",
    color: "#007AFF",
    letterSpacing: 1,
  },
  timerLabel: {
    fontSize: 12,
    fontFamily: "HindSiliguri-Medium",
    color: "#666",
  },
  roundInfoDivider: {
    width: 1,
    height: 38,
    backgroundColor: "#6c6a6aff",
    marginHorizontal: 16,
    alignSelf: "center",
  },
  graphContainer: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
  },
  gridLines: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  gridLine: {
    position: "absolute",
    left: 15,
    right: 15,
    height: 1,
    backgroundColor: "#f5f5f5",
  },
  svgContainer: {
    position: "absolute",
    top: 0,
    left: 15,
    right: 15,
    bottom: 0,
    zIndex: 1,
  },
  svg: {
    flex: 1,
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
    backgroundColor: "#fff",
    margin: 15,
    marginTop: 10,
    marginBottom: 0,
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "HindSiliguri-Bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  colorButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    paddingHorizontal: 5,
  },
  colorButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: "center",
    maxWidth: 110,
  },
  colorButtonText: {
    fontSize: 18,
    fontFamily: "HindSiliguri-Bold",
    color: "#fff",
    textAlign: "center",
  },

  recentBetsCard: {
    backgroundColor: "#fff",
    margin: 15,
    marginTop: 15,
    padding: 20,
    borderRadius: 15,
    marginBottom: 100,
  },
  betsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  allBetsText: {
    fontSize: 14,
    fontFamily: "HindSiliguri-SemiBold",
    color: "#007AFF",
  },
  betHistoryItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fafafa",
    marginBottom: 8,
    borderRadius: 10,
  },
  profileIconContainer: {
    marginRight: 12,
    alignItems: "center",
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileIconText: {
    fontSize: 18,
  },
  betDetailsContainer: {
    flex: 1,
  },
  betDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  betLabel: {
    fontSize: 12,
    fontFamily: "HindSiliguri-Medium",
    color: "#666",
    flex: 1,
  },
  betValue: {
    fontSize: 12,
    fontFamily: "HindSiliguri-Regular",
    color: "#333",
    flex: 1,
    textAlign: "right",
  },
  winningNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 6,
  },
  winningNumberText: {
    fontSize: 12,
    fontFamily: "HindSiliguri-Bold",
    color: "#333",
  },
  colorIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fff",
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
    fontSize: 16,
    fontFamily: "HindSiliguri-Medium",
    color: "#333",
    textAlign: "left",
  },
  amountInput: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 14,
    fontFamily: "HindSiliguri-Regular",
    borderWidth: 1,
    borderColor: "#e9ecef",
    marginBottom: 24,
    textAlign: "center",
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
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e9ecef",
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
    borderRadius: 12,
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
  fromText: {
    fontSize: 10,
    color: "#999",
    fontFamily: "HindSiliguri-Regular",
    marginBottom: 4,
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
    padding: 24,
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
    marginBottom: 24,
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
    alignItems: 'center',
    marginTop: 15,
    paddingBottom: 10,
  },
  bottomLogo: {
    width: 120,
    height: 35,
  },
  victorLogo: {
    width: 100,
    height: 30,
    marginTop: 10,
  },
});
