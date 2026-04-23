import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import Svg, { Path, Circle } from 'react-native-svg';
import ScreenHeader from '../../components/ScreenHeader';

/* ─── Icons ─────────────────────────────────────────────── */
function CloseIcon({ color = '#FFF' }: { color?: string }) {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <Path d="M1 1L11 11M11 1L1 11" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function PersonIcon({ color = '#6FFB85' }: { color?: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 20 20" fill="none">
      <Circle cx={10} cy={7} r={4} stroke={color} strokeWidth={1.5} />
      <Path d="M2 18C2 14.686 5.134 12 10 12C14.866 12 18 14.686 18 18" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function PlusBadgeIcon({ color = '#141414' }: { color?: string }) {
  return (
    <Svg width={10} height={10} viewBox="0 0 10 10" fill="none">
      <Path d="M5 1V9M1 5H9" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

/* ─── Data ───────────────────────────────────────────────── */
interface FamilyContact {
  id: string;
  name: string;
  relation: string;
}
const FAMILY_CONTACTS: FamilyContact[] = [
  { id: '1', name: 'Jaswanth', relation: 'Friend' },
  { id: '2', name: 'Praneeth', relation: 'Friend' },
  { id: '3', name: 'Abhi',     relation: 'Friend' },
  { id: '4', name: 'Venkat',   relation: 'Friend' },
];

/* ─── Component ──────────────────────────────────────────── */
export default function AddContactFromFamilyScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [selected, setSelected] = useState<string>('1');

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <ScrollView 
        contentContainerStyle={{ paddingBottom: 120 }} 
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingTop: insets.top + 4 }}>
          <ScreenHeader title="Emergency Contacts" onBack={() => navigation.goBack()} />
        </View>

      {/* ── Glass card ── */}
      <View style={[styles.modal, {
        backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.card,
        borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder,
      }]}>
        {/* Close */}
        <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
          <CloseIcon color="#FFF" />
        </TouchableOpacity>

        {/* Avatar */}
        <View style={styles.avatarArea}>
          <View style={[styles.avatarCircle, { borderColor: 'rgba(85,248,115,0.2)' }]}>
            <View style={[styles.avatarInner, { backgroundColor: isDark ? '#2A2A2A' : '#E8F5E9' }]}>
              <Text style={{ fontSize: 40 }}>👨‍👩‍👦</Text>
            </View>
          </View>
          <View style={[styles.plusBadge, { backgroundColor: c.primary }]}>
            <PlusBadgeIcon color="#141414" />
          </View>
        </View>

        <Text style={[styles.title, { color: isDark ? '#FFF' : c.text }]}>
          {'Add a Contact For\nEmergency'}
        </Text>

        {/* Selection list */}
        <View style={[styles.listBox, {
          backgroundColor: isDark ? 'rgba(85,248,115,0.05)' : 'rgba(111,251,133,0.05)',
          borderColor: isDark ? 'rgba(111,251,133,0.4)' : c.primary,
        }]}>
          {FAMILY_CONTACTS.map((contact, idx) => {
            const isSelected = contact.id === selected;
            return (
              <TouchableOpacity
                key={contact.id}
                style={[
                  styles.contactRow,
                  idx < FAMILY_CONTACTS.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: isDark ? 'rgba(255,255,255,0.06)' : c.divider,
                  },
                ]}
                onPress={() => setSelected(contact.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.contactAvatar, { backgroundColor: isDark ? '#262626' : '#E0E0E0' }]}>
                  <PersonIcon color={c.primary} />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={[styles.contactName, { color: isDark ? '#FFF' : c.text }]}>{contact.name}</Text>
                  <Text style={[styles.contactRelation, { color: '#ABABAB' }]}>{contact.relation.toUpperCase()}</Text>
                </View>
                <View style={[styles.radio, isSelected ? { borderColor: c.primary, borderWidth: 2 } : { borderColor: '#676767', borderWidth: 2 }]}>
                  {isSelected && <View style={[styles.radioFill, { backgroundColor: c.primary }]} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={[styles.disclaimer, { color: c.textSecondary }]}>
          {'This is not a replacement to\ncalling 108, but an easy way to\nalert your family.'}
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: c.primary }]}
          onPress={() => navigation.navigate('EmergencyContacts')}
          activeOpacity={0.8}
        >
          <Text style={styles.addBtnText}>Add Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddNewContact')}>
          <Text style={[styles.notFamilyText, { color: isDark ? '#ABABAB' : c.textSecondary }]}>
            Not in family?{' '}
            <Text style={{ color: c.primary, fontWeight: '600' }}>Add their number</Text>
          </Text>
        </TouchableOpacity>
      </View>

      </ScrollView>
    </View>
  );
}

/* ─── Styles ─────────────────────────────────────────────── */
const styles = StyleSheet.create({
  container: { flex: 1 },

  modal: {
    marginHorizontal: 16, marginTop: 8, borderRadius: 33, borderWidth: 1,
    paddingBottom: 24, position: 'relative',
  },

  closeBtn: {
    position: 'absolute', top: 16, right: 16, width: 40, height: 40,
    borderRadius: 20, alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(31,31,31,0.4)', zIndex: 10,
  },

  avatarArea: { alignItems: 'center', marginTop: 32, alignSelf: 'center', position: 'relative' },
  avatarCircle: {
    width: 112, height: 112, borderRadius: 56, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center', padding: 6, overflow: 'hidden',
  },
  avatarInner: { flex: 1, width: '100%', borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  plusBadge: {
    position: 'absolute', bottom: -4, right: -4, width: 32, height: 32, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },

  title: {
    fontSize: 24, fontWeight: '700', textAlign: 'center', lineHeight: 32,
    letterSpacing: -0.6, fontFamily: 'Inter-Bold', marginTop: 16, marginBottom: 16, paddingHorizontal: 40,
  },

  listBox: {
    marginHorizontal: 16, borderRadius: 32, borderWidth: 1, overflow: 'hidden',
    paddingVertical: 8, paddingHorizontal: 16,
  },
  contactRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, gap: 16 },
  contactAvatar: {
    width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center',
  },
  contactInfo: { flex: 1 },
  contactName: { fontSize: 18, fontWeight: '600', lineHeight: 28, fontFamily: 'Inter-SemiBold' },
  contactRelation: { fontSize: 14, fontWeight: '500', letterSpacing: 1.4, textTransform: 'uppercase', fontFamily: 'Inter-Medium' },
  radio: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  radioFill: { width: 12, height: 12, borderRadius: 6 },

  disclaimer: {
    fontSize: 12, fontWeight: '400', textAlign: 'center', lineHeight: 16,
    fontFamily: 'Inter', marginTop: 20, paddingHorizontal: 40,
  },

  actions: { paddingHorizontal: 49, paddingTop: 24, gap: 16, alignItems: 'center' },
  addBtn: {
    width: '100%', height: 58, borderRadius: 999, alignItems: 'center', justifyContent: 'center',
  },
  addBtnText: { fontSize: 18, fontWeight: '700', lineHeight: 28, color: '#141414', fontFamily: 'Inter-Bold' },
  notFamilyText: { fontSize: 16, fontWeight: '500', fontFamily: 'Inter-Medium' },
});
