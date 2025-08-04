import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface ColorRace {
  color: string;
  name: string;
  backgroundColor: string;
  odds: string;
}

interface BetHistory {
  roundNumber: string;
  date: string;
  winningColor: string;
  mostWinningNumber: string;
  myBet?: string;
}

const screenHeight = Dimensions.get('window').height;

export default function HomePage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ColorRace | null>(null);
  const [betAmount, setBetAmount] = useState('');
  const [lastBetColor, setLastBetColor] = useState<string | null>(null);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [animationPhase, setAnimationPhase] = useState(0);

  const colorRaces: ColorRace[] = [
    { color: 'Yellow', name: 'Gold Rush', backgroundColor: '#FFD700', odds: '2.5x' },
    { color: 'Purple', name: 'Royal Reign', backgroundColor: '#8A2BE2', odds: '3.2x' },
    { color: 'Orange', name: 'Sunset Storm', backgroundColor: '#FF8C00', odds: '2.8x' }
  ];

  const betHistory: BetHistory[] = [
    { roundNumber: '#1547', date: '2025-08-03', winningColor: 'Yellow', mostWinningNumber: '18', myBet: 'Yellow' },
    { roundNumber: '#1546', date: '2025-08-03', winningColor: 'Purple', mostWinningNumber: '25', myBet: 'Orange' },
    { roundNumber: '#1545', date: '2025-08-02', winningColor: 'Orange', mostWinningNumber: '32', myBet: 'Orange' },
  ];

  // Animation for curved lines
  useEffect(() => {
    const startAnimation = () => {
      // Add listener to update animation phase
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

  // Generate curved path for SVG
  const generateCurvePath = (baseY: number, phase: number = 0) => {
    const width = 230; // increased width
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
      // TODO: Implement betting logic
      console.log(`Betting $${betAmount} on ${selectedColor.color}`);
      
      // Trigger the spike animation
      setLastBetColor(selectedColor.color);
      
      setModalVisible(false);
      setBetAmount('');
      setSelectedColor(null);
    }
  };

  const handleBetAnimationComplete = () => {
    // Reset the bet color after animation completes
    setTimeout(() => {
      setLastBetColor(null);
    }, 500);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setBetAmount('');
    setSelectedColor(null);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Live Color Trends with Curved Lines */}
      <View style={styles.graphCard}>
        <Text style={styles.graphTitle}>Live Color Trends</Text>
        <View style={styles.graphContainer}>
          {/* Grid lines */}
          <View style={styles.gridLines}>
            {[...Array(4)].map((_, index) => (
              <View
                key={index}
                style={[styles.gridLine, { top: 20 + index * 25 }]}
              />
            ))}
          </View>
          
          {/* SVG Curved Lines */}
          <Animated.View style={styles.svgContainer}>
            <Svg height="130" width="230" style={[styles.svg, { alignSelf: 'flex-end' }]}>  
              <Path
                d={generateCurvePath(35, animationPhase)}
                stroke="#FFD700"
                strokeWidth={lastBetColor === 'Yellow' ? "4" : "3"}
                fill="none"
                strokeLinecap="round"
                opacity={lastBetColor === 'Yellow' ? 1 : 0.8}
              />
              <Path
                d={generateCurvePath(65, animationPhase + 30)}
                stroke="#8A2BE2"
                strokeWidth={lastBetColor === 'Purple' ? "4" : "3"}
                fill="none"
                strokeLinecap="round"
                opacity={lastBetColor === 'Purple' ? 1 : 0.8}
              />
              <Path
                d={generateCurvePath(95, animationPhase + 60)}
                stroke="#FF8C00"
                strokeWidth={lastBetColor === 'Orange' ? "4" : "3"}
                fill="none"
                strokeLinecap="round"
                opacity={lastBetColor === 'Orange' ? 1 : 0.8}
              />
            </Svg>
          </Animated.View>
          
          {/* Color labels */}
          <View style={styles.colorLabels}>
            <Text style={[styles.colorLabelText, { top: 27, color: '#FFD700' }]}>Yellow</Text>
            <Text style={[styles.colorLabelText, { top: 57, color: '#8A2BE2' }]}>Purple</Text>
            <Text style={[styles.colorLabelText, { top: 87, color: '#FF8C00' }]}>Orange</Text>
          </View>
        </View>
      </View>

        {/* Color Selection */}
        <View style={styles.colorSelectionCard}>
          <Text style={styles.sectionTitle}>Choose Your Color</Text>
          <View style={styles.colorButtons}>
            {colorRaces.map((race, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.colorButton, { backgroundColor: race.backgroundColor }]}
                onPress={() => handleColorSelect(race)}
              >
                <Text style={styles.colorButtonText}>{race.color}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Bets */}
        <View style={styles.recentBetsCard}>
          <View style={styles.betsHeader}>
            <Text style={[styles.sectionTitle, { marginBottom: 0, textAlign: 'left' }]}>Recent Bets</Text>
            <TouchableOpacity>
              <Text style={styles.allBetsText}>All Bets</Text>
            </TouchableOpacity>
          </View>
          {betHistory.map((bet, index) => (
            <View key={index} style={styles.betHistoryItem}>
              <View style={styles.betInfo}>
                <Text style={styles.roundNumber}>{bet.roundNumber}</Text>
                <Text style={styles.betDate}>{bet.date}</Text>
              </View>
              <View style={styles.betDetails}>
                <Text style={styles.winningNumber}>#{bet.mostWinningNumber}</Text>
                <View style={[styles.winnerBadge, { 
                  backgroundColor: bet.winningColor === 'Yellow' ? '#FFD700' : 
                                  bet.winningColor === 'Purple' ? '#8A2BE2' : '#FF8C00' 
                }]}>
                  <Text style={styles.winnerText}>{bet.winningColor}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Betting Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCancel}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContentFixed}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Place Bet</Text>
                <Text style={styles.selectedColorText}>
                  Betting on {selectedColor?.color}
                </Text>
              </View>
              <ScrollView style={styles.modalBodyFixed} contentContainerStyle={{ flexGrow: 1 }}>
                <Text style={styles.inputLabel}>Bet Amount</Text>
                <TextInput
                  style={styles.betInput}
                  value={betAmount}
                  onChangeText={setBetAmount}
                  placeholder="Enter amount"
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />
                <View style={styles.modalButtons}>
                  <TouchableOpacity 
                    style={styles.cancelButton} 
                    onPress={handleCancel}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.confirmButton, { 
                      backgroundColor: selectedColor?.backgroundColor || '#007AFF' 
                    }]} 
                    onPress={handlePlaceBet}
                  >
                    <Text style={styles.confirmButtonText}>Confirm Bet</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  graphCard: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 200,
  },
  graphTitle: {
    fontSize: 18,
    fontFamily: 'Outfit-SemiBold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  graphContainer: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  gridLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  gridLine: {
    position: 'absolute',
    left: 15,
    right: 15,
    height: 1,
    backgroundColor: '#f5f5f5',
  },
  svgContainer: {
    position: 'absolute',
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
    position: 'absolute',
    left: 5,
    top: 0,
    bottom: 0,
    zIndex: 2,
  },
  colorLabelText: {
    position: 'absolute',
    fontSize: 10,
    fontFamily: 'Outfit-Medium',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  tempGraphCard: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tempGraphTitle: {
    fontSize: 18,
    fontFamily: 'Outfit-SemiBold',
    color: '#333',
    textAlign: 'center',
  },
  tempGraphSubtitle: {
    fontSize: 14,
    fontFamily: 'Outfit-Regular',
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  colorSelectionCard: {
    backgroundColor: '#fff',
    margin: 15,
    marginTop: 0,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Outfit-Bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  colorButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    paddingHorizontal: 5,
  },
  colorButton: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    maxWidth: 110,
  },
  colorButtonText: {
    fontSize: 14,
    fontFamily: 'Outfit-Bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  recentBetsCard: {
    backgroundColor: '#fff',
    margin: 15,
    marginTop: 0,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 100,
  },
  betsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  allBetsText: {
    fontSize: 14,
    fontFamily: 'Outfit-SemiBold',
    color: '#007AFF',
  },
  betHistoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  betInfo: {
    flex: 1,
  },
  roundNumber: {
    fontSize: 16,
    fontFamily: 'Outfit-SemiBold',
    color: '#333',
  },
  betDate: {
    fontSize: 12,
    fontFamily: 'Outfit-Regular',
    color: '#666',
    marginTop: 2,
  },
  betDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  winningNumber: {
    fontSize: 14,
    fontFamily: 'Outfit-Medium',
    color: '#666',
  },
  winnerBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  winnerText: {
    fontSize: 12,
    fontFamily: 'Outfit-SemiBold',
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContentFixed: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 18,
    paddingHorizontal: 18,
    paddingBottom: 18,
    minHeight: 250,
    maxHeight: screenHeight * 0.8,
    alignSelf: 'center',
    width: '100%',
    elevation: 10,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 35,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 28,
    fontFamily: 'Outfit-Bold',
    color: '#333',
  },
  selectedColorText: {
    fontSize: 18,
    fontFamily: 'Outfit-Medium',
    color: '#666',
  },
  modalBodyFixed: {
    flexGrow: 1,
  },
  inputLabel: {
    fontSize: 18,
    fontFamily: 'Outfit-SemiBold',
    color: '#333',
    marginBottom: 15,
  },
  betInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    paddingHorizontal: 25,
    paddingVertical: 20,
    fontSize: 20,
    fontFamily: 'Outfit-Medium',
    borderWidth: 2,
    borderColor: '#e9ecef',
    marginBottom: 40,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 20,
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
    fontSize: 18,
    fontFamily: 'Outfit-SemiBold',
    color: '#666',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  confirmButtonText: {
    fontSize: 18,
    fontFamily: 'Outfit-SemiBold',
    color: '#fff',
  },
});
