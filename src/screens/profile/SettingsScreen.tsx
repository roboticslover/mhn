import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';

interface SettingRow {
  icon: string;
  label: string;
  subtitle: string;
  type: 'toggle' | 'navigate' | 'danger';
  toggleKey?: string;
  iconBg?: string;
}

const APP_PREFS: SettingRow[] = [
  { icon: 'notifications-outline', label: 'Notifications', subtitle: 'Alerts and announcements', type: 'toggle', toggleKey: 'notifications' },
  { icon: 'location-outline', label: 'Location', subtitle: 'Used for regional features', type: 'toggle', toggleKey: 'location' },
  { icon: 'contrast-outline', label: 'Mode', subtitle: 'Switch b/w light and dark themes.', type: 'toggle', toggleKey: 'mode' },
];

const ACCOUNT_ITEMS: SettingRow[] = [
  { icon: 'log-out-outline', label: 'Logout', subtitle: '', type: 'navigate' },
  { icon: 'trash-outline', label: 'Delete Account', subtitle: '', type: 'danger', iconBg: 'rgba(239,68,68,0.1)' },
];

export default function SettingsScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark, toggleTheme } = useTheme();
  const c = theme.colors;

  const [toggles, setToggles] = useState({
    notifications: true,
    location: false,
    mode: isDark,
  });

  const handleToggle = (key: string) => {
    if (key === 'mode') {
      toggleTheme();
    }
    setToggles(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const cardBg = isDark ? 'rgba(23,23,23,0.4)' : c.card;
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 4, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Settings" onBack={() => navigation.goBack()} />

        {/* App Preferences */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#E5E5E5' : c.text, fontFamily: 'Manrope-ExtraBold' }]}>
            App Preferences
          </Text>
          <View style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            {APP_PREFS.map((item, idx) => (
              <View key={idx} style={[styles.row, idx < APP_PREFS.length - 1 && { borderBottomWidth: 1, borderBottomColor: isDark ? 'rgba(255,255,255,0.05)' : c.divider }]}>
                <View style={styles.rowLeft}>
                  <View style={[styles.iconCircle, { backgroundColor: isDark ? 'rgba(34,197,94,0.1)' : 'rgba(57,166,87,0.1)' }]}>
                    <Ionicons name={item.icon as any} size={18} color={c.primary} />
                  </View>
                  <View>
                    <Text style={[styles.rowLabel, { color: c.text, fontFamily: 'Inter-Medium' }]}>{item.label}</Text>
                    <Text style={[styles.rowSub, { color: c.textSecondary, fontFamily: 'Inter' }]}>{item.subtitle}</Text>
                  </View>
                </View>
                <Switch
                  value={toggles[item.toggleKey as keyof typeof toggles]}
                  onValueChange={() => handleToggle(item.toggleKey!)}
                  trackColor={{ false: isDark ? '#3F3F46' : '#D1D5DB', true: c.primary }}
                  thumbColor={toggles[item.toggleKey as keyof typeof toggles] ? c.textOnPrimary : '#FFF'}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Account & Security */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#E5E5E5' : c.text, fontFamily: 'Manrope-ExtraBold' }]}>
            Account & Security
          </Text>
          <View style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            {ACCOUNT_ITEMS.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={[styles.row, idx < ACCOUNT_ITEMS.length - 1 && { borderBottomWidth: 1, borderBottomColor: isDark ? 'rgba(255,255,255,0.05)' : c.divider }]}
                activeOpacity={0.7}
                onPress={() => {
                  if (item.label === 'Logout') navigation.navigate('Login');
                }}
              >
                <View style={styles.rowLeft}>
                  <View style={[styles.iconCircle, { backgroundColor: item.iconBg || (isDark ? 'rgba(34,197,94,0.1)' : 'rgba(57,166,87,0.1)') }]}>
                    <Ionicons name={item.icon as any} size={18} color={item.type === 'danger' ? c.error : c.primary} />
                  </View>
                  <Text style={[styles.rowLabel, { color: item.type === 'danger' ? c.error : c.text, fontFamily: 'Inter-Medium' }]}>{item.label}</Text>
                </View>
                <Ionicons name="chevron-forward" size={14} color={item.type === 'danger' ? c.error : c.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  sectionContainer: { marginHorizontal: 21, marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '800', lineHeight: 24, marginBottom: 16, textTransform: 'capitalize' },
  card: { borderRadius: 33, borderWidth: 1, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 16, flex: 1 },
  iconCircle: { width: 40, height: 40, borderRadius: 33, alignItems: 'center', justifyContent: 'center' },
  rowLabel: { fontSize: 16, fontWeight: '500', lineHeight: 24 },
  rowSub: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
});
