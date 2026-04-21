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
} from 'react-native';
import SvgIcon from '../../components/SvgIcon';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ThemeToggle from '../../components/ThemeToggle';
import { useTheme } from '../../theme/ThemeProvider';

interface Props {
  navigation: any;
  route: any;
}

export default function EmailVerificationScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const colors = theme.colors;
  const [email, setEmail] = useState('');

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleVerify = () => {
    if (!isValid) return;
    navigation.navigate('CheckInbox', { ...(route?.params ?? {}), email: email.trim() });
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

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <View style={styles.content}>
          <View style={[styles.card, { backgroundColor: colors.cardElevated, borderColor: colors.cardBorder }]}>
            <View style={[styles.iconBubble, { backgroundColor: colors.accentSoft, borderColor: colors.primary + '44' }]}>
              <SvgIcon name="mail" size={28} color={colors.primary} />
            </View>

            <Text style={[styles.title, { color: colors.text, fontFamily: 'Inter' }]}>Lets verify{'\n'}your email</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary, fontFamily: 'Inter' }]}>We are verifying your email to complete your registration.</Text>

            <View style={[styles.inputBox, { backgroundColor: colors.inputBackground, borderWidth: 1, borderColor: colors.inputBorder }]}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
                placeholderTextColor={colors.inputPlaceholder}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={[styles.input, { color: colors.text, fontFamily: 'Inter' }]}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleVerify}
              style={[styles.ctaWrap, !isValid && { opacity: 0.6 }]}
              disabled={!isValid}
            >
              <LinearGradient
                colors={isDark
                  ? ['#7BFFA7', '#6FFB85', '#4CE28B'] as const
                  : ['#5DC97A', '#39A657', '#2D8444'] as const}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cta}
              >
                <Text style={[styles.ctaText, { color: colors.textOnPrimary, fontFamily: 'Inter' }]}>Verify Email</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
          <View style={styles.dots}>
            <View style={[styles.dot, { backgroundColor: colors.textMuted }]} />
            <View style={[styles.dot, { backgroundColor: colors.textMuted }]} />
            <View style={[styles.dot, styles.dotActive, { backgroundColor: colors.text }]} />
            <View style={[styles.dot, { backgroundColor: colors.textMuted }]} />
          </View>
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
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: { borderRadius: 28, borderWidth: 1, padding: 28, alignItems: 'center' },
  iconBubble: { width: 58, height: 58, borderRadius: 29, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '600', textAlign: 'center', lineHeight: 36, marginBottom: 10 },
  subtitle: { fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 24, maxWidth: 260 },
  inputBox: { borderRadius: 33, height: 58, width: '100%', justifyContent: 'center', paddingHorizontal: 22, marginBottom: 16 },
  input: { fontSize: 16, fontWeight: '500' },
  ctaWrap: { width: '100%', shadowOpacity: 0.35, shadowRadius: 18, shadowOffset: { width: 0, height: 6 }, elevation: 8 },
  cta: { height: 58, borderRadius: 33, alignItems: 'center', justifyContent: 'center' },
  ctaText: { fontSize: 18, fontWeight: '700' },
  footer: {
    alignItems: 'center',
  },
  dots: { flexDirection: 'row' },
  dot: { width: 6, height: 6, borderRadius: 3, marginHorizontal: 3 },
  dotActive: { width: 22 },
});
