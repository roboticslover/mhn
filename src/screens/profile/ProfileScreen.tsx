import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle } from 'react-native-svg';
import ScreenHeader from '../../components/ScreenHeader';

const { width: SCREEN_W } = Dimensions.get('window');

// Heart rate icon
function HeartIcon({ color = '#6FFB85', size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size * 1.1} viewBox="0 0 20 22" fill="none">
      <Path
        d="M10 19C10 19 1 13 1 7C1 3.68629 3.68629 1 7 1C8.82624 1 10.4296 1.89393 11.4622 3.27032C11.7806 3.07587 12 2.81441 12 2.5C12.5 2 13.5 1 15 1C17.7614 1 20 3.23858 20 6C20 12 10 19 10 19Z"
        fill={color}
      />
    </Svg>
  );
}

// Steps icon
function StepsIcon({ color = '#6FFB85', size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size * 1.4} viewBox="0 0 20 28" fill="none">
      <Path d="M6 1L10 10L4 18" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M14 10L10 18L16 27" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// Chevron right
function ChevronRight({ color = '#666', size = 7 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size * 1.7} viewBox="0 0 7 12" fill="none">
      <Path d="M1 1L6 6L1 11" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

interface SettingsLink {
  icon: string;
  label: string;
  route?: string;
}

const GROUP1: SettingsLink[] = [
  { icon: 'watch-outline', label: 'Wearables', route: 'Wearables' },
];

const GROUP2: SettingsLink[] = [
  { icon: 'person-circle-outline', label: 'Profile', route: 'ProfileDetail' },
  { icon: 'person-outline', label: 'About You', route: 'AboutYou' },
];

const GROUP3: SettingsLink[] = [
  { icon: 'document-text-outline', label: 'Terms and Conditions', route: 'TermsAndConditions' },
  { icon: 'shield-checkmark-outline', label: 'Privacy and Policy', route: 'PrivacyPolicy' },
  { icon: 'settings-outline', label: 'Settings', route: 'SettingsScreen' },
];

function SettingsGroup({
  items,
  isDark,
  c,
  navigation,
}: {
  items: SettingsLink[];
  isDark: boolean;
  c: any;
  navigation: any;
}) {
  return (
    <View
      style={[
        styles.group,
        {
          backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.card,
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder,
        },
      ]}
    >
      {items.map((item, idx) => (
        <TouchableOpacity
          key={idx}
          style={styles.linkRow}
          activeOpacity={0.7}
          onPress={() => item.route && navigation.navigate(item.route)}
        >
          <View style={styles.linkLeft}>
            <View
              style={[
                styles.linkIcon,
                {
                  backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.inputBackground,
                  borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder,
                },
              ]}
            >
              <Ionicons name={item.icon as any} size={20} color={c.primary} />
            </View>
            <Text style={[styles.linkLabel, { color: c.text, fontFamily: 'Inter-Bold' }]}>
              {item.label}
            </Text>
          </View>
          <ChevronRight color={c.textSecondary} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function ProfileScreen({ navigation }: { navigation: any }) {
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

      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 4, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Profile"
          onBack={() => navigation.goBack()}
        />

        {/* Profile Hero */}
        <View style={styles.heroSection}>
          {/* Avatar */}
          <View style={[styles.avatarOuter, { borderColor: isDark ? 'rgba(52,199,89,0.25)' : 'rgba(57,166,87,0.25)' }]}>
            <View style={[styles.avatarInner, { backgroundColor: isDark ? '#2A2A2A' : '#E0E0E0', borderColor: c.background }]}>
              <Ionicons name="person" size={48} color={c.textSecondary} />
            </View>
            <View style={[styles.verifiedBadge, { backgroundColor: c.primary }]}>
              <Ionicons name="checkmark" size={14} color={c.textOnPrimary} />
            </View>
          </View>

          {/* Name */}
          <Text style={[styles.profileName, { color: c.text, fontFamily: 'Inter-Bold' }]}>
            Praneeth Velpuri
          </Text>
          <Text style={[styles.profileMeta, { color: c.textSecondary, fontFamily: 'Inter-Medium' }]}>
            Male, 18 yr  •  164cm
          </Text>
        </View>

        {/* Quick Stats Bento */}
        <View style={styles.statsGrid}>
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.card,
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder,
              },
            ]}
          >
            <HeartIcon color={c.primary} />
            <Text style={[styles.statValue, { color: c.text, fontFamily: 'Inter-Bold' }]}>72</Text>
            <Text style={[styles.statLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>BPM</Text>
          </View>
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.card,
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder,
              },
            ]}
          >
            <StepsIcon color={c.primary} />
            <Text style={[styles.statValue, { color: c.text, fontFamily: 'Inter-Bold' }]}>8.4k</Text>
            <Text style={[styles.statLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>Steps Today</Text>
          </View>
        </View>

        {/* Settings Groups */}
        <View style={styles.groupsContainer}>
          <SettingsGroup items={GROUP1} isDark={isDark} c={c} navigation={navigation} />
          <SettingsGroup items={GROUP2} isDark={isDark} c={c} navigation={navigation} />
          <SettingsGroup items={GROUP3} isDark={isDark} c={c} navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarOuter: {
    width: 136,
    height: 136,
    borderRadius: 68,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  avatarInner: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -0.75,
    lineHeight: 36,
    textAlign: 'center',
    marginBottom: 4,
  },
  profileMeta: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    marginHorizontal: 24,
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    borderRadius: 33,
    borderWidth: 1,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.6,
    lineHeight: 32,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  groupsContainer: {
    marginHorizontal: 24,
    gap: 16,
  },
  group: {
    borderRadius: 33,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 9,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
  },
  linkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  linkIcon: {
    width: 48,
    height: 48,
    borderRadius: 33,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkLabel: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
  },
});
