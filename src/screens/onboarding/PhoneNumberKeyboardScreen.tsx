import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SvgIcon from '../../components/SvgIcon';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CountryPickerModal from '../../components/CountryPickerModal';
import { COUNTRIES, Country } from '../../utils/countries';
import ThemeToggle from '../../components/ThemeToggle';
import { useTheme } from '../../theme/ThemeProvider';

interface Props {
  navigation: any;
  route: any;
}

const KEYS: Array<{ num: string; sub?: string }> = [
  { num: '1' },
  { num: '2', sub: 'ABC' },
  { num: '3', sub: 'DEF' },
  { num: '4', sub: 'GHI' },
  { num: '5', sub: 'JKL' },
  { num: '6', sub: 'MNO' },
  { num: '7', sub: 'PQRS' },
  { num: '8', sub: 'TUV' },
  { num: '9', sub: 'WXYZ' },
];

function formatPhone(digits: string) {
  // Format as "XXX XXX XXXX"
  const a = digits.slice(0, 3);
  const b = digits.slice(3, 6);
  const c = digits.slice(6, 10);
  return [a, b, c].filter(Boolean).join(' ');
}

export default function PhoneNumberKeyboardScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const colors = theme.colors;
  const initialCountry: Country = route?.params?.country ?? COUNTRIES[0];
  const initialPhone: string = (route?.params?.phone ?? '').replace(/\D/g, '');

  const [country, setCountry] = useState<Country>(initialCountry);
  const [digits, setDigits] = useState<string>(initialPhone);
  const [showPicker, setShowPicker] = useState(false);

  const pressKey = (k: string) => {
    if (digits.length >= 10) return;
    setDigits((d) => d + k);
  };
  const backspace = () => setDigits((d) => d.slice(0, -1));

  const canContinue = digits.length >= 8;

  const handleGetOtp = () => {
    if (!canContinue) return;
    navigation.navigate('VerifyOTP', { country, phone: digits });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <SvgIcon name="arrow-left" size={28} color={colors.text} />
        </TouchableOpacity>
        <ThemeToggle size={36} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.iconBubble, { backgroundColor: colors.accentSoft }]}>
          <SvgIcon name="phone" size={22} color={colors.primary} />
        </View>

        <Text style={[styles.title, { color: colors.text, fontFamily: 'Inter' }]}>Enter Phone Number</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary, fontFamily: 'Inter' }]}>Your journey to vital clarity starts here.</Text>

        <View style={[styles.inputRow, { backgroundColor: colors.inputBackground }]}>
          <TouchableOpacity
            style={styles.countryBox}
            activeOpacity={0.7}
            onPress={() => setShowPicker(true)}
          >
            <Text style={styles.flag}>{country.flag}</Text>
            <Text style={[styles.dial, { color: colors.text }]}>{country.dial}</Text>
            <SvgIcon name="chevron-down" size={14} color={colors.textSecondary} />
          </TouchableOpacity>
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          <Text style={[styles.phoneText, { color: colors.text }, !digits && { color: colors.inputPlaceholder }]}>
            {digits ? formatPhone(digits) : '99XXXXXXXX'}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleGetOtp}
          style={[styles.ctaWrap, !canContinue && { opacity: 0.6 }]}
          disabled={!canContinue}
        >
          <LinearGradient
            colors={isDark
              ? ['#7BFFA7', '#6FFB85', '#4CE28B'] as const
              : ['#5DC97A', '#39A657', '#2D8444'] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cta}
          >
            <Text style={[styles.ctaText, { color: colors.textOnPrimary, fontFamily: 'Inter' }]}>Get OTP</Text>
            <SvgIcon name="arrow-right" size={20} color={colors.textOnPrimary} />
          </LinearGradient>
        </TouchableOpacity>

        {/* Custom Numeric Keypad */}
        <View style={styles.keypad}>
          {KEYS.map((k) => (
            <TouchableOpacity
              key={k.num}
              activeOpacity={0.6}
              style={[styles.key, { backgroundColor: colors.inputBackground }]}
              onPress={() => pressKey(k.num)}
            >
              <Text style={[styles.keyNum, { color: colors.text, fontFamily: 'Inter' }]}>{k.num}</Text>
              {k.sub ? <Text style={[styles.keySub, { color: colors.textSecondary, fontFamily: 'Inter' }]}>{k.sub}</Text> : null}
            </TouchableOpacity>
          ))}
          <View style={[styles.key, styles.keyEmpty]} />
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.key, { backgroundColor: colors.inputBackground }]}
            onPress={() => pressKey('0')}
          >
            <Text style={[styles.keyNum, { color: colors.text }]}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.key, { backgroundColor: colors.inputBackground }]}
            onPress={backspace}
          >
            <SvgIcon name="arrow-left" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={{ height: insets.bottom + 10 }} />
      </ScrollView>

      <CountryPickerModal
        visible={showPicker}
        onClose={() => setShowPicker(false)}
        onSelect={setCountry}
        selected={country}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  scroll: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  iconBubble: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: '600' as const,
    textAlign: 'center' as const,
    marginBottom: 10,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400' as const,
    textAlign: 'center' as const,
    lineHeight: 24,
    marginBottom: 24,
    maxWidth: 280,
  },
  inputRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    borderRadius: 33,
    width: '100%' as const,
    height: 58,
    paddingHorizontal: 12,
    marginBottom: 18,
    borderWidth: 1,
  },
  countryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  flag: { fontSize: 20, marginRight: 6 },
  dial: { fontSize: 16, fontWeight: '700' as const, marginRight: 4 },
  divider: { width: 1, height: 22, marginHorizontal: 6 },
  phoneText: { flex: 1, fontSize: 16, fontWeight: '500' as const, paddingHorizontal: 10, letterSpacing: 1 },
  phonePlaceholder: {},
  ctaWrap: { width: '100%' as const, marginBottom: 24, shadowOpacity: 0.35, shadowRadius: 20, shadowOffset: { width: 0, height: 6 }, elevation: 8 },
  cta: { flexDirection: 'row' as const, alignItems: 'center' as const, justifyContent: 'center' as const, height: 58, borderRadius: 33 },
  ctaText: { fontSize: 18, fontWeight: '700' as const },
  keypad: { width: '100%' as const, flexDirection: 'row' as const, flexWrap: 'wrap' as const, justifyContent: 'space-between' as const, rowGap: 10 },
  key: { width: '31.5%' as const, height: 58, borderRadius: 14, alignItems: 'center' as const, justifyContent: 'center' as const },
  keyEmpty: { backgroundColor: 'transparent' },
  keyNum: { fontSize: 22, fontWeight: '600' as const },
  keySub: { fontSize: 10, fontWeight: '600' as const, letterSpacing: 1, marginTop: 1 },
});
