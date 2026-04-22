import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import Svg, { Path, Circle } from 'react-native-svg';
import ScreenHeader from '../../components/ScreenHeader';

// Bell icon
function BellIcon({ color = '#FFF', size = 35 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size * 1.31} viewBox="0 0 35 46" fill="none">
      <Path
        d="M17.5 3C11.1487 3 6 8.14873 6 14.5V24L3 30H32L29 24V14.5C29 8.14873 23.8513 3 17.5 3Z"
        stroke={color}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <Path d="M13 36C13 38.7614 15.0147 41 17.5 41C19.9853 41 22 38.7614 22 36" stroke={color} strokeWidth={2.5} />
    </Svg>
  );
}

// Settings gear icon
function SettingsIcon({ color = '#003910', size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
        stroke={color}
        strokeWidth={1.5}
      />
      <Path
        d="M16.167 10C16.167 9.558 16.125 9.125 16.058 8.7L18.058 7.2L16.558 4.6L14.258 5.417C13.642 4.9 12.942 4.492 12.175 4.217L11.725 1.667H8.725L8.275 4.217C7.508 4.492 6.808 4.9 6.192 5.417L3.892 4.6L2.392 7.2L4.392 8.7C4.325 9.125 4.283 9.558 4.283 10C4.283 10.442 4.325 10.875 4.392 11.3L2.392 12.8L3.892 15.4L6.192 14.583C6.808 15.1 7.508 15.508 8.275 15.783L8.725 18.333H11.725L12.175 15.783C12.942 15.508 13.642 15.1 14.258 14.583L16.558 15.4L18.058 12.8L16.058 11.3C16.125 10.875 16.167 10.442 16.167 10Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function NotificationsEmptyScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <View style={{ paddingTop: insets.top + 4 }}>
        <ScreenHeader
          title="Notifications"
          onBack={() => navigation.goBack()}
        />
      </View>

      <View style={styles.content}>
        {/* Bell icon circle */}
        <View style={[styles.iconCircle, { backgroundColor: isDark ? '#353535' : '#E0E0E0' }]}>
          <BellIcon color={isDark ? '#FFF' : '#333'} />
          <View style={[styles.greenDot, { backgroundColor: '#55EE71', borderColor: isDark ? '#131313' : '#FFF' }]} />
        </View>

        {/* Text */}
        <Text style={[styles.title, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-Bold' }]}>
          All caught up
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
          When you receive alerts about your health and medical records, they'll appear here.
        </Text>

        {/* Notification Settings button */}
        <TouchableOpacity
          style={styles.settingsBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('NotificationsList')}
        >
          <SettingsIcon />
          <Text style={[styles.settingsBtnText, { fontFamily: 'Inter-Bold' }]}>
            Notification Settings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconCircle: {
    width: 128,
    height: 128,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  greenDot: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 33,
    height: 33,
    borderRadius: 17,
    borderWidth: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.75,
    lineHeight: 36,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 32,
  },
  settingsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 999,
    backgroundColor: '#55EE71',
  },
  settingsBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#003910',
    lineHeight: 24,
  },
});
