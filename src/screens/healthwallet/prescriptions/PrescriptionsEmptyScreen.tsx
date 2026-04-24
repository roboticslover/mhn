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

export default function PrescriptionsEmptyScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 28 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]}>Prescription</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Main glass card */}
      <View style={[styles.glassCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
        {/* Upload illustration */}
        <View style={styles.illustrationWrap}>
          <View style={[styles.illustrationGlow, { backgroundColor: c.accentSoft }]} />
          <View style={[styles.uploadIconCircle, { backgroundColor: c.accentSoft, borderColor: c.primary + '33' }]}>
            <Ionicons name="folder-open-outline" size={38} color={c.primary} />
          </View>
        </View>

        {/* Text */}
        <Text style={[styles.tagline, { color: c.primary }]}>SYSTEM PROTOCOL</Text>
        <Text style={[styles.emptyTitle, { color: c.text }]}>No{'\n'}Prescriptions{'\n'}Found</Text>
        <Text style={[styles.emptySubtitle, { color: c.textSecondary }]}>
          Your digital archive is ready. Add{'\n'}your first prescription to start tracking
        </Text>

        {/* Add button */}
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: c.primary }]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('PrescriptionUpload')}
        >
          <Text style={[styles.addButtonText, { color: c.textOnPrimary }]}>+ ADD TO HEALTH REPORTS</Text>
        </TouchableOpacity>
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
    paddingBottom: 16,
  },
  backBtn: { width: 22, alignItems: 'center' },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'Inter',
    letterSpacing: 0,
  },
  glassCard: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 33,
    borderWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 33,
    paddingTop: 50,
    paddingBottom: 49,
    overflow: 'hidden',
  },
  illustrationWrap: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  illustrationGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  uploadIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  tagline: {
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '400',
    letterSpacing: 0,
    marginBottom: 18,
  },
  emptyTitle: {
    fontSize: 34,
    fontWeight: '700',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 40,
    letterSpacing: -0.68,
    marginBottom: 16,
  },
  emptySubtitle: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  addButton: {
    width: '100%',
    height: 58,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,110,40,0.3)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 8,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    textAlign: 'center',
  },
});
