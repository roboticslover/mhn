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
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <View style={[styles.container, { backgroundColor: '#050505' }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Insurance</Text>
        <View style={{ width: 20 }} />
      </View>

      {/* Central glassmorphic card */}
      <View style={styles.cardWrapper}>
        <View style={styles.glassCard}>
          {/* Shield icon box */}
          <View style={styles.iconWrap}>
            <View style={styles.iconBox}>
              <Ionicons name="shield-checkmark-outline" size={34} color="#34C759" />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.mainTitle}>{'Secure Your\nCoverage'}</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            {'Initialize your digital\ninsurance vault for\nautomated claims and\nsynchronized biometric\nvalidation.'}
          </Text>

          {/* ADD NEW POLICY button */}
          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('InsuranceAdd')}
          >
            <Text style={styles.addBtnText}>ADD NEW POLICY</Text>
          </TouchableOpacity>

          {/* Import link */}
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.importLink}>Import existing vault</Text>
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
    color: '#fff',
    lineHeight: 22,
  },
  cardWrapper: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    paddingBottom: 90,
  },
  glassCard: {
    backgroundColor: 'rgba(23,23,23,0.4)',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
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
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderWidth: 1,
    borderColor: 'rgba(52,199,89,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 36,
    letterSpacing: -0.75,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: '#C5C9AC',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 40,
  },
  addBtn: {
    backgroundColor: '#6FFB85',
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
    color: '#141414',
    textTransform: 'uppercase',
    letterSpacing: 0,
  },
  importLink: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: '#E5E5E5',
    lineHeight: 16,
  },
});
