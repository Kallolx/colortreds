import React from 'react';
import { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

interface NotificationProps {
  visible: boolean;
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onHide?: () => void;
}

export default function Notification({ visible, message, type = 'success', duration = 3000, onHide }: NotificationProps) {
  const [slideAnim] = useState(new Animated.Value(-100));

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 50,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (onHide) onHide();
      });
    }
  }, [visible]);

  if (!visible) return null;

  const getBackgroundColor = () => {
    switch (type) {
      case 'success': return '#4CAF50';
      case 'error': return '#F44336';
      case 'info': return '#2196F3';
      default: return '#4CAF50';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'info': return 'ℹ️';
      default: return '✅';
    }
  };

  return (
    <Animated.View 
      style={[
        styles.notification, 
        { backgroundColor: getBackgroundColor(), transform: [{ translateY: slideAnim }] }
      ]}
    >
      <Text style={styles.icon}>{getIcon()}</Text>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  notification: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  icon: {
    fontSize: 16,
    marginRight: 10,
  },
  message: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Outfit-Medium',
    color: '#fff',
  },
});
