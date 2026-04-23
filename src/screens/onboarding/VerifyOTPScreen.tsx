import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import SvgIcon from '../../components/SvgIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Country, COUNTRIES } from '../../utils/countries';
import ThemeToggle from '../../components/ThemeToggle';
import { useTheme } from '../../theme/ThemeProvider';

interface Props {
  navigation: any;
  route: any;
}

const OTP_LENGTH = 4;

export default function VerifyOTPScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const colors = theme.colors;
  const country: Country = route?.params?.country ?? COUNTRIES[0];
  const phone: string = route?.params?.phone ?? '000 000 0000';

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const t = setTimeout(() => inputs.current[0]?.focus(), 200);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (val: string, idx: number) => {
    const clean = val.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[idx] = clean;
    setOtp(next);
    if (clean && idx < OTP_LENGTH - 1) inputs.current[idx + 1]?.focus();
  };

  const handleKey = (e: any, idx: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
      const next = [...otp];
      next[idx - 1] = '';
      setOtp(next);
    }
  };

  const filled = otp.every((v) => v !== '');

  const handleContinue = () => {
    if (!filled) return;
    navigation.navigate('EmailVerification', { country, phone });
  };

  const displayPhone = `${country.dial} ${phone.replace(/(\d{3})(\d{3})(\d+)/, '$1 $2 $3')}`;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <SvgIcon name="arrow-left" size={28} color={colors.text} />
        </TouchableOpacity>
        <ThemeToggle size={36} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>Verify your{'\n'}Phone number</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Enter the {OTP_LENGTH}-digit OTP sent to{'\n'}
            <Text style={[styles.phoneHighlight, { color: colors.text }]}>{displayPhone}</Text>
          </Text>

          <View style={styles.otpRow}>
            {otp.map((d, i) => {
              const active = d !== '';
              return (
                <View key={i} style={[styles.otpCircle, { backgroundColor: colors.inputBackground, borderColor: active ? colors.primary : colors.inputBorder }, active && styles.otpCircleActive]}>
                  <TextInput
                    ref={(r) => {
                      inputs.current[i] = r;
                    }}
                    value={d}
                    onChangeText={(v) => handleChange(v, i)}
                    onKeyPress={(e) => handleKey(e, i)}
                    keyboardType="numeric"
                    maxLength={1}
                    style={[styles.otpInput, { color: colors.primary, fontFamily: 'Inter' }]}
                    selectionColor={colors.primary}
                  />
                </View>
              );
            })}
          </View>

          <View style={styles.resendRow}>
            <Text style={[styles.resendText, { color: colors.textSecondary, fontFamily: 'Inter' }]}>Didn't receive a OTP? </Text>
            <TouchableOpacity>
              <Text style={[styles.resendLink, { color: colors.primary, fontFamily: 'Inter' }]}>Re-send</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
          <View style={styles.dots}>
            <View style={[styles.dot, { backgroundColor: colors.textMuted }]} />
            <View style={[styles.dot, { backgroundColor: colors.textMuted }]} />
            <View style={[styles.dot, styles.dotActive, { backgroundColor: colors.text }]} />
            <View style={[styles.dot, { backgroundColor: colors.textMuted }]} />
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleContinue}
            style={[styles.cta, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder }, !filled && { opacity: 0.4 }]}
            disabled={!filled}
          >
            <Text style={[styles.ctaText, { color: colors.text, fontFamily: 'Inter' }]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: { fontSize: 30, fontWeight: '700', textAlign: 'center', lineHeight: 38, marginBottom: 20 },
  subtitle: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 44 },
  phoneHighlight: { fontWeight: '600' },
  otpRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 30,
  },
  otpCircle: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', marginHorizontal: 4, borderWidth: 1.5 },
  otpCircleActive: {},
  otpInput: { width: '100%', height: '100%', textAlign: 'center', fontSize: 26, fontWeight: '700' },
  resendRow: { flexDirection: 'row', alignItems: 'center' },
  resendText: { fontSize: 14 },
  resendLink: { fontSize: 14, fontWeight: '700' },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 16,
  },
  dot: { width: 6, height: 6, borderRadius: 3, marginHorizontal: 3 },
  dotActive: { width: 22 },
  cta: { width: '100%', height: 58, borderRadius: 33, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  ctaText: { fontSize: 18, fontWeight: '700' },
});
