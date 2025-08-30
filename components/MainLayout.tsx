import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppHeader from './AppHeader';
import Notification from './Notification';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import WalletPage from './pages/WalletPage';
import SimpleBottomNav from './SimpleBottomNav';

type ActiveTab = 'home' | 'wallet' | 'profile';

export default function MainLayout() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [userBalance] = useState(10000);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const [transactionsModalVisible, setTransactionsModalVisible] = useState(false);

  const showNotification = (message: string) => {
    setNotificationMessage(message);
    setNotificationVisible(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'wallet':
        return <WalletPage 
          historyModalVisible={historyModalVisible}
          setHistoryModalVisible={setHistoryModalVisible}
        />;
      case 'profile':
        return <ProfilePage 
          transactionsModalVisible={transactionsModalVisible}
          setTransactionsModalVisible={setTransactionsModalVisible}
        />;
      default:
        return <HomePage />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Header - positioned at the back */}
      <View style={styles.headerBackground}>
        <AppHeader 
          userBalance={userBalance} 
          activeTab={activeTab === 'home' ? 'trade' : activeTab}
          onRequestsPress={() => setHistoryModalVisible(true)}
          onCalculatorPress={() => setTransactionsModalVisible(true)}
        />
      </View>
      
      {/* Floating Content Area with rounded top corners */}
      <View style={styles.contentContainer}>
        <View style={styles.contentWrapper}>
          {renderContent()}
        </View>
      </View>

      {/* Simple Bottom Navigation */}
      <SimpleBottomNav 
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />

      {/* Global Notification System */}
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
    backgroundColor: '#FFFF00', // Match header background to create seamless effect
  },
  headerBackground: {
    position: 'absolute',
    top: -5,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    marginTop: 100,
    zIndex: 2,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 0, // Remove top padding to make content truly edge-to-edge
    paddingHorizontal: 0,
    marginHorizontal: 0, // Remove horizontal margins to prevent yellow background showing through
    paddingBottom: 120, // Add bottom padding to avoid content being hidden behind bottom navigation
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
});
