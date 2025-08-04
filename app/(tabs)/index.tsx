import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import BottomNavigation from '../../components/BottomNavigation';
import Notification from '../../components/Notification';
import HomePage from '../../components/pages/HomePage';
import ProfilePage from '../../components/pages/ProfilePage';
import WalletPage from '../../components/pages/WalletPage';

type ActiveTab = 'trade' | 'wallet' | 'profile';

export default function MainApp() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('trade');
  const [userBalance] = useState(1250.50);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const showNotification = (message: string) => {
    setNotificationMessage(message);
    setNotificationVisible(true);
  };

  const handleTabPress = (tab: ActiveTab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'trade':
        return <HomePage />;
      case 'wallet':
        return <WalletPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Fixed App Header */}
      <AppHeader userBalance={userBalance} />
      
      {/* Dynamic Content Area */}
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
      
      {/* Fixed Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabPress={handleTabPress}
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
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flex: 1,
  },
});
