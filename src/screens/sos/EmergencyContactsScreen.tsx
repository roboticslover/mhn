import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import Svg, { Path, Circle } from 'react-native-svg';
import BottomNavBar from '../../components/BottomNavBar';
import ScreenHeader from '../../components/ScreenHeader';

/* ─── Icons ─────────────────────────────────────────────── */
function LocationPinIcon({ color = '#FFF' }: { color?: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 13.43C13.7231 13.43 15.12 12.0331 15.12 10.31C15.12 8.58687 13.7231 7.19 12 7.19C10.2769 7.19 8.88 8.58687 8.88 10.31C8.88 12.0331 10.2769 13.43 12 13.43Z"
        stroke={color} strokeWidth={1.5}
      />
      <Path
        d="M3.62 8.49C5.59 -0.17 18.42 -0.16 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.39 20.54C5.63 17.88 2.47 13.57 3.62 8.49Z"
        stroke={color} strokeWidth={1.5}
      />
    </Svg>
  );
}

function TrashIcon({ color = '#DB5034' }: { color?: string }) {
  return (
    <Svg width={18} height={20} viewBox="0 0 16 18" fill="none">
      <Path d="M1 4H15" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M3 4V14C3 15.6569 4.34315 17 6 17H10C11.6569 17 13 15.6569 13 14V4" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M5 1H11" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M6.5 8V13" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M9.5 8V13" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function AddPersonIcon({ color = '#FFF' }: { color?: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M18 9V12M18 12V15M18 12H21M18 12H15" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M3 19C3 16.2386 5.23858 14 8 14H12C14.7614 14 17 16.2386 17 19" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Circle cx={10} cy={8} r={3.5} stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}

/* ─── Types ──────────────────────────────────────────────── */
interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  initial: string;
}

const INITIAL_CONTACTS: EmergencyContact[] = [
  { id: '1', name: 'Ravi',  relation: 'Friend', phone: '+91 000 000 0000', initial: 'R' },
  { id: '2', name: 'Rishi', relation: 'Sister', phone: '+91 000 000 0000', initial: 'R' },
];

/* ─── Component ──────────────────────────────────────────── */
export default function EmergencyContactsScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [contacts, setContacts] = useState<EmergencyContact[]>(INITIAL_CONTACTS);
  const [locationEnabled, setLocationEnabled] = useState(false);

  const handleDelete = useCallback((id: string) => {
    Alert.alert(
      'Remove Contact',
      'Are you sure you want to remove this emergency contact?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setContacts(prev => prev.filter(c => c.id !== id)),
        },
      ]
    );
  }, []);

  const handleLocationToggle = useCallback(() => {
    if (!locationEnabled) {
      navigation.navigate('EnableLocation');
    }
    setLocationEnabled(prev => !prev);
  }, [locationEnabled, navigation]);

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 4, paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader title="Emergency Contacts" onBack={() => navigation.goBack()} />

        {/* ── How to activate card ── */}
        <View style={[styles.activateCard, {
          backgroundColor: 'rgba(255,77,77,0.16)',
          borderColor: 'rgba(255,77,77,0.44)',
        }]}>
          <Text style={[styles.activateTitle, { color: isDark ? '#E2E2E2' : c.text }]}>
            How to activate
          </Text>
          <Text style={[styles.activateDesc, { color: isDark ? '#FFF' : c.textSecondary }]}>
            Press and Hold the SOS Icon in the navbar for 3 seconds to activate emergency SOS
          </Text>
        </View>

        {/* ── Description ── */}
        <Text style={[styles.description, { color: c.textSecondary }]}>
          In case of an emergency, these contacts will be notified.
        </Text>

        {/* ── Contact Cards ── */}
        <View style={styles.contactsList}>
          {contacts.map(contact => (
            <View
              key={contact.id}
              style={[styles.contactCard, {
                backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.card,
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder,
              }]}
            >
              <View style={styles.contactLeft}>
                <View style={[styles.avatar, {
                  backgroundColor: 'rgba(48,209,88,0.2)',
                  borderColor: 'rgba(85,238,113,0.1)',
                }]}>
                  <Text style={[styles.avatarLetter, { color: c.primary }]}>{contact.initial}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.nameRow}>
                    <Text style={[styles.contactName, { color: isDark ? '#E2E2E2' : c.text }]}>
                      {contact.name}
                    </Text>
                    <View style={[styles.badge, { backgroundColor: isDark ? '#353535' : c.chipBackground }]}>
                      <Text style={[styles.badgeText, { color: isDark ? '#BCCBB7' : c.textSecondary }]}>
                        {contact.relation.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.phone, { color: isDark ? '#BCCBB7' : c.textSecondary }]}>
                    {contact.phone}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.trashBtn} onPress={() => handleDelete(contact.id)}>
                <TrashIcon color="#DB5034" />
              </TouchableOpacity>
            </View>
          ))}

          {/* ── Add Emergency Contact row ── */}
          <TouchableOpacity
            style={[styles.addRow, {
              backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.card,
              borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder,
            }]}
            onPress={() => navigation.navigate('AddContactFromFamily')}
            activeOpacity={0.7}
          >
            <AddPersonIcon color={isDark ? '#AAAAAA' : c.textSecondary} />
            <Text style={[styles.addLabel, { color: isDark ? '#FFF' : c.text }]}>
              Add Emergency Contact
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Location ── */}
        <TouchableOpacity
          style={[styles.locationRow, {
            backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.card,
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder,
          }]}
          onPress={handleLocationToggle}
          activeOpacity={0.7}
        >
          <View style={styles.locationLeft}>
            <LocationPinIcon color={isDark ? '#AAAAAA' : c.textSecondary} />
            <Text style={[styles.locationLabel, { color: isDark ? '#E5E5E5' : c.text }]}>
              Location
            </Text>
          </View>
          <View style={[styles.enablePill, { backgroundColor: c.primary }]}>
            <Text style={styles.enablePillText}>
              {locationEnabled ? 'Enabled' : 'Enable'}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <BottomNavBar activeTab="sos" navigation={navigation} />
    </View>
  );
}

/* ─── Styles ─────────────────────────────────────────────── */
const styles = StyleSheet.create({
  container: { flex: 1 },

  /* Activate card */
  activateCard: {
    marginHorizontal: 24, borderRadius: 16, borderWidth: 1, padding: 25, marginBottom: 16,
  },
  activateTitle: {
    fontSize: 18, fontWeight: '700', lineHeight: 28, marginBottom: 4, fontFamily: 'Inter-Bold',
  },
  activateDesc: {
    fontSize: 12, fontWeight: '400', lineHeight: 16, fontFamily: 'Inter',
  },

  /* Description */
  description: {
    fontSize: 18, textAlign: 'center', marginHorizontal: 28, marginBottom: 24, lineHeight: 28, fontFamily: 'Inter',
  },

  /* Contacts list */
  contactsList: { marginHorizontal: 24, gap: 16, marginBottom: 24 },
  contactCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 20, borderRadius: 33, borderWidth: 1,
  },
  contactLeft: { flexDirection: 'row', alignItems: 'center', gap: 16, flex: 1 },
  avatar: {
    width: 56, height: 56, borderRadius: 28, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarLetter: { fontSize: 20, fontWeight: '400', fontFamily: 'Inter' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  contactName: { fontSize: 18, fontWeight: '400', lineHeight: 28, fontFamily: 'Inter' },
  badge: { borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2 },
  badgeText: { fontSize: 10, fontWeight: '400', letterSpacing: 0.25, textTransform: 'uppercase', fontFamily: 'Inter' },
  phone: { fontSize: 14, fontWeight: '400', lineHeight: 20, fontFamily: 'Manrope' },
  trashBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },

  /* Add row */
  addRow: {
    flexDirection: 'row', alignItems: 'center', gap: 30,
    padding: 20, borderRadius: 33, borderWidth: 1,
  },
  addLabel: {
    fontSize: 14, fontWeight: '800', lineHeight: 20, fontFamily: 'Manrope-ExtraBold', textTransform: 'capitalize',
  },

  /* Location */
  locationRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginHorizontal: 24, height: 58, borderRadius: 33, borderWidth: 1,
    paddingLeft: 17, paddingRight: 10,
  },
  locationLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  locationLabel: {
    fontSize: 14, fontWeight: '800', lineHeight: 20, textTransform: 'capitalize', fontFamily: 'Manrope-ExtraBold',
  },
  enablePill: {
    height: 30, borderRadius: 15, paddingHorizontal: 16,
    alignItems: 'center', justifyContent: 'center', minWidth: 80,
  },
  enablePillText: {
    fontSize: 14, fontWeight: '800', color: '#141414', fontFamily: 'Manrope-ExtraBold', textTransform: 'capitalize',
  },
});
