import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import BottomNavBar from '../../../components/BottomNavBar';

export default function ScansEmptyScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]}>Scans</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.centerWrapper}>
        <View style={[styles.glassCard, { backgroundColor: 'rgba(23,23,23,0.4)', borderColor: 'rgba(255,255,255,0.08)' }]}>
          {/* Decorative corner top-left */}
          <View style={[styles.cornerTL, { borderColor: '#6FFB85' }]} />
          {/* Decorative corner bottom-right */}
          <View style={[styles.cornerBR, { borderColor: '#6FFB85' }]} />

          {/* Icon section */}
          <View style={styles.iconSection}>
            <View style={[styles.iconBloom, { backgroundColor: 'rgba(52,199,89,0.19)' }]} />
            <View style={[styles.iconBox, { backgroundColor: 'rgba(0,0,0,0.4)', borderColor: 'rgba(52,199,89,0.33)' }]}>
              <Ionicons name="scan-outline" size={56} color="#6FFB85" />
            </View>
          </View>

          {/* Text */}
          <View style={styles.textSection}>
            <Text style={styles.emptyTitle}>No Scans{'\n'}<Text style={{ color: '#34C759' }}>Detected</Text></Text>
            <Text style={styles.emptySubtitle}>
              Initialize your digital Scans{'\n'}library by uploading your first{'\n'}MRI, CT, or X-ray record.
            </Text>
          </View>

          {/* Button */}
          <View style={styles.actionsSection}>
            <TouchableOpacity
              style={styles.uploadButton}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('ScanUpload')}
            >
              <Text style={styles.uploadButtonText}>UPLOAD NEW SCAN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <BottomNavBar activeTab="card" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  backBtn: { width: 24, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '600', fontFamily: 'Inter', lineHeight: 22 },
  centerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingBottom: 90,
  },
  glassCard: {
    width: '100%',
    borderRadius: 33,
    borderWidth: 1,
    padding: 49,
    alignItems: 'center',
    overflow: 'hidden',
  },
  cornerTL: {
    position: 'absolute',
    top: -8,
    left: -8,
    width: 16,
    height: 16,
    borderLeftWidth: 2,
    borderTopWidth: 2,
  },
  cornerBR: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    width: 16,
    height: 16,
    borderRightWidth: 2,
    borderBottomWidth: 2,
  },
  iconSection: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 29,
  },
  iconBloom: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  iconBox: {
    width: 128,
    height: 128,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSection: {
    alignItems: 'center',
    marginBottom: 29,
    gap: 23,
  },
  emptyTitle: {
    fontSize: 30,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 36,
    letterSpacing: -0.75,
  },
  emptySubtitle: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: '#AAAAAA',
    textAlign: 'center',
    lineHeight: 24,
  },
  actionsSection: {
    width: '100%',
    paddingTop: 16,
  },
  uploadButton: {
    backgroundColor: '#6FFB85',
    borderRadius: 40,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#141414',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
