import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
export default function InsuranceEmptyScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={20} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]}>Insurance</Text>
        <View style={{ width: 20 }} />
      </View>

      {/* Central glassmorphic card */}
      <View style={styles.cardWrapper}>
        <View style={[styles.glassCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
          {/* Shield icon box */}
          <View style={styles.iconWrap}>
            <View style={[styles.iconBox, { backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : c.cardElevated, borderColor: c.primary + '55' }]}>
              <Ionicons name="shield-checkmark-outline" size={34} color={c.primary} />
            </View>
          </View>

          {/* Title */}
          <Text style={[styles.mainTitle, { color: c.text }]}>{'Secure Your\nCoverage'}</Text>

          {/* Subtitle */}
          <Text style={[styles.subtitle, { color: c.textSecondary }]}>
            {'Initialize your digital\ninsurance vault for\nautomated claims and\nsynchronized biometric\nvalidation.'}
          </Text>

          {/* ADD NEW POLICY button */}
          <TouchableOpacity
            style={[styles.addBtn, { backgroundColor: c.primary }]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('InsuranceAdd')}
          >
            <Text style={[styles.addBtnText, { color: c.textOnPrimary }]}>ADD NEW POLICY</Text>
          </TouchableOpacity>

          {/* Import link */}
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={[styles.importLink, { color: c.textSecondary }]}>Import existing vault</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 29,
    paddingBottom: 12,
  },
  backBtn: { width: 20, alignItems: 'center' },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'Inter',
    lineHeight: 22,
  },
  cardWrapper: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    paddingBottom: 90,
  },
  glassCard: {
    borderRadius: 40,
    borderWidth: 1,
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 40,
    paddingHorizontal: 48,
    overflow: 'hidden',
  },
  iconWrap: {
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  iconBox: {
    width: 96,
    height: 96,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: '700',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 36,
    letterSpacing: -0.75,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 40,
  },
  addBtn: {
    borderRadius: 40,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    alignSelf: 'stretch',
    marginBottom: 24,
  },
  addBtnText: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Manrope',
    textTransform: 'uppercase',
    letterSpacing: 0,
  },
  importLink: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: 16,
  },
});
