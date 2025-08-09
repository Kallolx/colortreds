import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

interface BottomNavigationProps {
  activeTab?: "wallet" | "trade" | "profile";
  onTabPress?: (tab: "wallet" | "trade" | "profile") => void;
}

// SVG Icon Components
const WalletIcon = ({
  color = "#666",
  size = 24,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 8.5V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V15.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 8.5H18C16.8954 8.5 16 9.39543 16 10.5V13.5C16 14.6046 16.8954 15.5 18 15.5H21"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18 12H18.01"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const TradeIcon = ({ size = 18 }: { size?: number }) => (
  <Image
    source={require("../assets/images/trade.png")}
    style={{
      width: size,
      height: size,
      resizeMode: "contain",
    }}
  />
);

const ProfileIcon = ({
  color = "#666",
  size = 24,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default function BottomNavigation({
  activeTab = "trade",
  onTabPress,
}: BottomNavigationProps) {
  const handleTabPress = (tab: "wallet" | "trade" | "profile") => {
    if (onTabPress) {
      onTabPress(tab);
    }
  };

  const getIconColor = (tab: string) => {
    if (tab === "trade") return undefined; // Trade icon is image, not SVG
    return activeTab === tab ? "#ffffff" : "#000000";
  };

  const renderNavItem = (
    tab: "wallet" | "trade" | "profile",
    Icon: any,
    label: string
  ) => {
    const isActive = activeTab === tab;
    const isMiddle = tab === "trade";

    return (
      <TouchableOpacity
        key={tab}
        style={[
          styles.navItem,
          isMiddle && styles.middleNavItem,
          isActive && isMiddle && styles.activeMiddleNavItem,
        ]}
        onPress={() => handleTabPress(tab)}
        activeOpacity={0.7}
      >
        <View
          style={[
            isMiddle && styles.circularIconContainer,
            isActive && isMiddle && styles.activeCircularIconContainer,
          ]}
        >
          {isMiddle ? (
            <TradeIcon size={40} />
          ) : (
            <Icon color={getIconColor(tab)} size={24} />
          )}
        </View>
        <Text
          style={[
            styles.navLabel,
            isActive && styles.activeNavLabel,
            isMiddle && styles.middleNavLabel,
            !isActive && !isMiddle && styles.inactiveNavLabel,
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomNav}>
        {renderNavItem("wallet", WalletIcon, "ওয়ালেট")}
        {renderNavItem("trade", TradeIcon, "ট্রেড")}
        {renderNavItem("profile", ProfileIcon, "প্রোফাইল")}

        {/* Curved notch for middle button */}
        <Svg
          style={styles.curveContainer}
          width="120"
          height="35"
          viewBox="0 0 120 35"
          preserveAspectRatio="none"
        >
          <Path
            d="M 0,35 Q 20,0 60,0 Q 100,0 120,35 L 120,35 L 0,35 Z"
            fill="#ff8c00"
          />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomNav: {
    backgroundColor: "#ff8c00", // Orange background
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 20,
    paddingBottom: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    position: "relative",
  },
  curveContainer: {
    position: "absolute",
    top: -35,
    left: "50%",
    marginLeft: -40, // Adjusted to shift right (was -50)
    zIndex: 0,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4, // Reduced from 8
  },
  middleNavItem: {
    marginTop: -30, // Increased for better positioning
    zIndex: 10,
  },
  activeNavItem: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  activeMiddleNavItem: {
  },
  circularIconContainer: {
    width: 64, 
    height: 64, 
    borderRadius: 32, 
    backgroundColor: "#ff8c00", 
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  activeCircularIconContainer: {
    backgroundColor: "#ff8c00", 
    transform: [{ scale: 1.15 }],
    borderColor: "#ffffff",
  },
  navLabel: {
    fontSize: 14,
    fontFamily: 'HindSiliguri-Bold',
    color: "#000000",
    marginTop: 6,
    textAlign: "center",
  },
  activeNavLabel: {
    color: "#ffffff",
    fontFamily: "HindSiliguri-Bold",
  },
  inactiveNavLabel: {
    color: "#000000",
    fontFamily: "HindSiliguri-Bold",
  },
  middleNavLabel: {
    marginTop: 10, 
  },
});