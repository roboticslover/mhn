import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import Svg, { Path } from 'react-native-svg';
import ScreenHeader from '../../components/ScreenHeader';

/* ─── Icons ─────────────────────────────────────────────── */
function CloseIcon({ color = '#FFF' }: { color?: string }) {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <Path d="M1 1L11 11M11 1L1 11" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
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

function ChevronDown({ color = '#FFF' }: { color?: string }) {
  return (
    <Svg width={8} height={5} viewBox="0 0 8 5" fill="none">
      <Path d="M1 1L4 4L7 1" stroke={color} strokeWidth={1} strokeLinecap="round" />
    </Svg>
  );
}

/* ─── Component ──────────────────────────────────────────── */
export default function AddNewContactScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleAdd = () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Missing Info', 'Please enter both name and phone number.');
      return;
    }
    // In a real app, save the contact
    navigation.navigate('EmergencyContacts');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: c.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 4, paddingBottom: 110 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader title="Emergency Contacts" onBack={() => navigation.goBack()} />

        {/* ── Glass modal ── */}
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
            {'Add New  Contact For\nEmergency'}
          </Text>

          {/* ── Form ── */}
          <View style={styles.form}>
            {/* Full Name */}
            <View style={styles.field}>
              <Text style={[styles.label, { color: c.primary }]}>FULL NAME</Text>
              <View style={[styles.inputBox, {
                backgroundColor: isDark ? 'rgba(19,19,19,0.6)' : c.inputBackground,
                borderColor: isDark ? 'rgba(255,255,255,0.15)' : c.inputBorder,
              }]}>
                <TextInput
                  style={[styles.input, { color: isDark ? '#FFF' : c.text }]}
                  placeholder="Enter Name"
                  placeholderTextColor={isDark ? 'rgba(170,170,170,0.5)' : c.inputPlaceholder}
                  value={name}
                  onChangeText={setName}
                  returnKeyType="next"
                />
              </View>
            </View>

            {/* Mobile Number */}
            <View style={styles.field}>
              <Text style={[styles.label, { color: c.primary }]}>MOBILE NUMBER</Text>
              <View style={styles.phoneRow}>
                <TouchableOpacity style={[styles.countryPicker, {
                  backgroundColor: isDark ? 'rgba(19,19,19,0.6)' : c.inputBackground,
                  borderColor: isDark ? 'rgba(255,255,255,0.15)' : c.inputBorder,
                }]}>
                  <Text style={styles.flag}>🇮🇳</Text>
                  <Text style={[styles.dialCode, { color: isDark ? '#FFF' : c.text }]}>+91</Text>
                  <ChevronDown color={isDark ? '#FFF' : c.text} />
                </TouchableOpacity>
                <View style={[styles.phoneInput, {
                  backgroundColor: isDark ? 'rgba(19,19,19,0.6)' : c.inputBackground,
                  borderColor: isDark ? 'rgba(255,255,255,0.15)' : c.inputBorder,
                  flex: 1,
                }]}>
                  <TextInput
                    style={[styles.input, { color: isDark ? '#FFF' : c.text }]}
                    placeholder="Enter Phone Number"
                    placeholderTextColor={isDark ? 'rgba(170,170,170,0.5)' : c.inputPlaceholder}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    returnKeyType="done"
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Disclaimer */}
          <Text style={[styles.disclaimer, { color: c.textSecondary }]}>
            {'This is not a replacement to\ncalling 108, but an easy way to\nalert your family.'}
          </Text>
        </View>

        {/* ── Add Contact Button ── */}
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: c.primary }]}
          onPress={handleAdd}
          activeOpacity={0.8}
        >
          <Text style={styles.addBtnText}>Add Contact</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
    letterSpacing: -0.6, fontFamily: 'Inter-Bold', marginTop: 16, marginBottom: 24, paddingHorizontal: 32,
  },

  form: { paddingHorizontal: 16, gap: 0 },
  field: { marginBottom: 16 },
  label: {
    fontSize: 10, fontWeight: '500', letterSpacing: 1, textTransform: 'uppercase',
    marginBottom: 8, fontFamily: 'Inter-Medium',
  },
  inputBox: {
    height: 48, borderRadius: 33, borderWidth: 1, paddingHorizontal: 16, justifyContent: 'center',
  },
  input: { fontSize: 16, fontWeight: '400', fontFamily: 'Inter', flex: 1 },

  phoneRow: { flexDirection: 'row', gap: 8, height: 50 },
  countryPicker: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    height: 48, borderRadius: 32, borderWidth: 1, paddingHorizontal: 10, width: 87,
  },
  flag: { fontSize: 16 },
  dialCode: { fontSize: 14, fontWeight: '500', fontFamily: 'Inter-Medium' },
  phoneInput: {
    height: 48, borderRadius: 32, borderWidth: 1, paddingHorizontal: 16, justifyContent: 'center',
  },

  disclaimer: {
    fontSize: 12, fontWeight: '400', textAlign: 'center', lineHeight: 16,
    fontFamily: 'Inter', marginTop: 16, paddingHorizontal: 40,
  },

  addBtn: {
    marginHorizontal: 49, marginTop: 24, height: 58, borderRadius: 999,
    alignItems: 'center', justifyContent: 'center',
  },
  addBtnText: {
    fontSize: 18, fontWeight: '700', lineHeight: 28, color: '#141414', fontFamily: 'Inter-Bold',
  },
});
