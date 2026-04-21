import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import SvgIcon from '../../components/SvgIcon';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CountryPickerModal from '../../components/CountryPickerModal';
import { COUNTRIES, Country } from '../../utils/countries';
import ThemeToggle from '../../components/ThemeToggle';
import { useTheme } from '../../theme/ThemeProvider';

interface Props { navigation: any; }

export default function EnterMobileNumberScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [showPicker, setShowPicker] = useState(false);

  const handleContinue = () => navigation.navigate('PhoneNumberKeyboard', { country, phone: '' });

  return (
    <View style={[s.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={c.background} />

      <View style={[s.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <SvgIcon name="arrow-left" size={28} color={c.text} />
        </TouchableOpacity>
        <ThemeToggle size={36} />
      </View>

      <View style={s.flex}>
        <View style={s.content}>
          <View style={[s.iconBubble, { backgroundColor: c.accentSoft }]}>
            <SvgIcon name="phone" size={22} color={c.primary} />
          </View>

          <Text style={[s.title, { color: c.text, fontFamily: 'Inter' }]}>Enter Mobile Number</Text>
          <Text style={[s.subtitle, { color: c.textSecondary, fontFamily: 'Inter' }]}>
            Your journey to vital clarity starts here.
          </Text>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleContinue}
            style={[s.inputRow, { backgroundColor: c.inputBackground, borderColor: c.inputBorder }]}
          >
            <TouchableOpacity style={s.countryBox} activeOpacity={0.7} onPress={() => setShowPicker(true)}>
              <Text style={s.flag}>{country.flag}</Text>
              <Text style={[s.dial, { color: c.text, fontFamily: 'Inter' }]}>{country.dial}</Text>
              <SvgIcon name="chevron-down" size={14} color={c.textSecondary} />
            </TouchableOpacity>
            <View style={[s.divider, { backgroundColor: c.divider }]} />
            <Text style={[s.inputPlaceholder, { color: c.inputPlaceholder, fontFamily: 'Inter' }]}>
              99XXXXXXXX
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleContinue}
            style={[s.ctaWrap, { shadowColor: c.primary }]}
          >
            <LinearGradient
              colors={isDark
                ? ['#7BFFA7', '#6FFB85', '#4CE28B'] as const
                : ['#5DC97A', '#39A657', '#2D8444'] as const}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={s.cta}
            >
              <Text style={[s.ctaText, { color: c.textOnPrimary, fontFamily: 'Inter' }]}>Get OTP</Text>
              <SvgIcon name="arrow-right" size={20} color={c.textOnPrimary} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={[s.footer, { paddingBottom: insets.bottom + 24 }]}>
          <View style={s.dots}>
            <View style={[s.dot, { backgroundColor: c.textMuted }]} />
            <View style={[s.dot, s.dotActive, { backgroundColor: c.text }]} />
            <View style={[s.dot, { backgroundColor: c.textMuted }]} />
            <View style={[s.dot, { backgroundColor: c.textMuted }]} />
          </View>
        </View>
      </View>

      <CountryPickerModal visible={showPicker} onClose={() => setShowPicker(false)} onSelect={setCountry} selected={country} />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 20 },
  content: { flex: 1, alignItems: 'center', paddingHorizontal: 24, paddingTop: 20 },
  iconBubble: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', marginBottom: 22 },
  title: { fontSize: 28, fontWeight: '600', textAlign: 'center', marginBottom: 10, lineHeight: 36 },
  subtitle: { fontSize: 16, fontWeight: '400', textAlign: 'center', lineHeight: 24, marginBottom: 30, maxWidth: 280 },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 33, width: '100%', height: 58, paddingHorizontal: 12, marginBottom: 22, borderWidth: 1 },
  countryBox: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6 },
  flag: { fontSize: 20, marginRight: 6 },
  dial: { fontSize: 16, fontWeight: '700', marginRight: 4 },
  divider: { width: 1, height: 22, marginHorizontal: 6 },
  inputPlaceholder: { flex: 1, fontSize: 16, fontWeight: '500', paddingHorizontal: 10, letterSpacing: 1 },
  ctaWrap: { width: '100%', shadowOpacity: 0.35, shadowRadius: 20, shadowOffset: { width: 0, height: 6 }, elevation: 8 },
  cta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 58, borderRadius: 33 },
  ctaText: { fontSize: 18, fontWeight: '700' },
  footer: { alignItems: 'center' },
  dots: { flexDirection: 'row', gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, marginHorizontal: 3 },
  dotActive: { width: 22 },
});
