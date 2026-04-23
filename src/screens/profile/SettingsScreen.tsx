import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Switch,
  Modal,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import ThemeToggle from '../../components/ThemeToggle';

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

  const [logoutVisible, setLogoutVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const handleToggle = (key: string) => {
    if (key === 'mode') {
      toggleTheme();
    }
    setToggles(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const cardBg = isDark ? 'rgba(23,23,23,0.4)' : c.card;
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder;

  return (
    <View style={[styles.container, { backgroundColor: c.background, paddingTop: insets.top }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <ScreenHeader title="Settings" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>

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
                {item.toggleKey === 'mode' ? (
                  <ThemeToggle size={34} />
                ) : (
                  <Switch
                    value={toggles[item.toggleKey as keyof typeof toggles]}
                    onValueChange={() => handleToggle(item.toggleKey!)}
                    trackColor={{ false: isDark ? '#3F3F46' : '#D1D5DB', true: c.primary }}
                    thumbColor={toggles[item.toggleKey as keyof typeof toggles] ? c.textOnPrimary : '#FFF'}
                  />
                )}
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
                  if (item.label === 'Logout') setLogoutVisible(true);
                  if (item.label === 'Delete Account') setDeleteVisible(true);
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

      {/* Logout Modal */}
      <Modal visible={logoutVisible} transparent animationType="fade" onRequestClose={() => setLogoutVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: isDark ? 'rgba(23,23,23,0.8)' : 'rgba(255,255,255,0.9)' }]}>
            <View style={styles.logoutIconWrapper}>
              <Ionicons name="log-out-outline" size={48} color={c.primary} />
            </View>
            <Text style={[styles.modalTitle, { color: c.text }]}>Are you sure you want to log out?</Text>
            <Text style={[styles.modalSubtitle, { color: c.textSecondary }]}>You can sign in anytime.</Text>
            
            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.modalBtnPrimary, { backgroundColor: c.primary }]} onPress={() => {
                setLogoutVisible(false);
                navigation.navigate('Login');
              }}>
                <Text style={[styles.modalBtnPrimaryText, { color: c.textOnPrimary }]}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtnSecondary} onPress={() => setLogoutVisible(false)}>
                <Text style={[styles.modalBtnSecondaryText, { color: c.text }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Account Modal */}
      <Modal visible={deleteVisible} transparent animationType="fade" onRequestClose={() => setDeleteVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: isDark ? 'rgba(23,23,23,0.8)' : 'rgba(255,255,255,0.9)' }]}>
            <View style={[styles.deleteIconWrapper, { backgroundColor: 'rgba(239,68,68,0.1)' }]}>
              <Ionicons name="trash-outline" size={48} color={c.error} />
            </View>
            <Text style={[styles.modalTitle, { color: c.text }]}>Delete Your Account?</Text>
            <Text style={[styles.modalSubtitle, { color: c.textSecondary }]}>
              Deleting your account will permanently remove your data and can't be undone. Are you sure you want to continue?
            </Text>
            
            <View style={[styles.warningBox, { backgroundColor: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.2)' }]}>
              <Ionicons name="warning-outline" size={24} color={c.error} />
              <Text style={[styles.warningText, { color: c.error }]}>
                All your records, analytics, and progress will be erased from our servers immediately.
              </Text>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.modalBtnPrimary, { backgroundColor: c.error }]} onPress={() => {
                setDeleteVisible(false);
                navigation.navigate('Login');
              }}>
                <Text style={[styles.modalBtnPrimaryText, { color: '#FFF' }]}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtnSecondary} onPress={() => setDeleteVisible(false)}>
                <Text style={[styles.modalBtnSecondaryText, { color: c.text }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.secureNote, { color: c.textSecondary }]}>SECURE DELETION PROTOCOL ACTIVE</Text>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    borderRadius: 33,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
  },
  logoutIconWrapper: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'rgba(238,246,233,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  deleteIconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    marginBottom: 24,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
    marginBottom: 24,
  },
  warningText: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  modalActions: {
    width: '100%',
    gap: 12,
  },
  modalBtnPrimary: {
    height: 56,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBtnPrimaryText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  modalBtnSecondary: {
    height: 56,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(23,23,23,0.4)',
  },
  modalBtnSecondaryText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  secureNote: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    marginTop: 24,
    letterSpacing: 1,
  },
});
