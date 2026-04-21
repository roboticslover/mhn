import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
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

export default function CheckInboxScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const colors = theme.colors;
  const email: string = route?.params?.email ?? 'info@myhealthnotion.ai';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <SvgIcon name="arrow-left" size={28} color={colors.text} />
        </TouchableOpacity>
        <ThemeToggle size={36} />
      </View>

      <View style={styles.content}>
        {/* Glowing email badge */}
        <View style={styles.badgeWrapper}>
          <View style={[styles.ringOuter, { borderColor: colors.primary + '55', shadowColor: colors.primary }]}>
            <View style={[styles.ringInner, { borderColor: colors.primary + '88', backgroundColor: colors.accentSoft }]}>
              <SvgIcon name="mail" size={34} color={colors.primary} />
            </View>
          </View>
          <View style={[styles.checkBadge, { backgroundColor: colors.primary, borderColor: colors.background }]}>
            <SvgIcon name="checkmark" size={14} color={colors.textOnPrimary} />
          </View>
        </View>

        <Text style={[styles.title, { color: colors.text, fontFamily: 'Inter' }]}>Check your inbox</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary, fontFamily: 'Inter' }]}>
          We've sent a verification link to{'\n'}
          <Text style={[styles.emailText, { color: colors.primary }]}>{email}</Text>
        </Text>

        <View style={[styles.infoBox, { backgroundColor: colors.inputBackground, borderWidth: 1, borderColor: colors.inputBorder }]}>
          <Text style={[styles.infoText, { color: colors.text, fontFamily: 'Inter' }]}>
            Please open the email and click{'\n'}the Verify button to continue.
          </Text>
        </View>

        <Text style={[styles.spamNote, { color: colors.textMuted, fontFamily: 'Inter' }]}>
          If you have not received this email, kindly{'\n'}check your spam folder.
        </Text>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.ctaWrap}
          onPress={() => {
            // Simulate resend
          }}
        >
          <LinearGradient
            colors={isDark
              ? ['#7BFFA7', '#6FFB85', '#4CE28B'] as const
              : ['#5DC97A', '#39A657', '#2D8444'] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cta}
          >
            <Text style={[styles.ctaText, { color: colors.textOnPrimary, fontFamily: 'Inter' }]}>Resend Email</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.secondaryBtn}
          onPress={() => navigation.navigate('Register', route?.params ?? {})}
        >
          <Text style={[styles.secondaryText, { color: colors.textSecondary }]}>Back to Sign In</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
        <View style={styles.dots}>
          <View style={[styles.dot, { backgroundColor: colors.textMuted }]} />
          <View style={[styles.dot, { backgroundColor: colors.textMuted }]} />
          <View style={[styles.dot, { backgroundColor: colors.textMuted }]} />
          <View style={[styles.dot, styles.dotActive, { backgroundColor: colors.text }]} />
        </View>
      </View>
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
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  badgeWrapper: {
    width: 130,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 26,
  },
  ringOuter: { width: 120, height: 120, borderRadius: 60, borderWidth: 2, alignItems: 'center', justifyContent: 'center', shadowOpacity: 0.45, shadowRadius: 24, shadowOffset: { width: 0, height: 0 }, elevation: 10 },
  ringInner: { width: 86, height: 86, borderRadius: 43, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  checkBadge: { position: 'absolute', right: 8, bottom: 8, width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', borderWidth: 2 },
  title: { fontSize: 28, fontWeight: '600', textAlign: 'center', marginBottom: 12 },
  subtitle: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 22 },
  emailText: { fontWeight: '600' },
  infoBox: { borderRadius: 20, paddingVertical: 14, paddingHorizontal: 24, marginBottom: 18 },
  infoText: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  spamNote: { fontSize: 12, textAlign: 'center', lineHeight: 18, marginBottom: 24 },
  ctaWrap: { width: '100%', shadowOpacity: 0.35, shadowRadius: 18, shadowOffset: { width: 0, height: 6 }, elevation: 8, marginBottom: 14 },
  cta: { height: 58, borderRadius: 33, alignItems: 'center', justifyContent: 'center' },
  ctaText: { fontSize: 18, fontWeight: '700' },
  secondaryBtn: { paddingVertical: 10 },
  secondaryText: { fontSize: 14, fontWeight: '500' },
  footer: {
    alignItems: 'center',
  },
  dots: { flexDirection: 'row' },
  dot: { width: 6, height: 6, borderRadius: 3, marginHorizontal: 3 },
  dotActive: { width: 22 },
});
