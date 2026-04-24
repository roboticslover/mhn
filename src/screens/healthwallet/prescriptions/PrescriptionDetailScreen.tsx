import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';

export default function PrescriptionDetailScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [isPrivate, setIsPrivate] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 28, paddingBottom: 130 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text }]}>Prescription</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => navigation.navigate('PrescriptionEdit')} style={styles.headerIconBtn}>
              <Ionicons name="create-outline" size={21} color={c.textMuted} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PrescriptionShare')} style={styles.headerIconBtn}>
              <Ionicons name="share-outline" size={21} color={c.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Report header */}
        <View style={styles.reportHeader}>
          {/* Tags */}
          <View style={styles.tagsRow}>
            <View style={[styles.publicTag, { backgroundColor: c.successSoft }]}>
              <Text style={[styles.publicTagText, { color: c.primary }]}>PUBLIC</Text>
            </View>
            <View style={[styles.typeTag, { backgroundColor: c.card }]}>
              <Text style={[styles.typeTagText, { color: c.textSecondary }]}>PRESCRIPTION</Text>
            </View>
          </View>

          {/* Title */}
          <Text style={[styles.prescriptionTitle, { color: c.text }]}>Prescription Name</Text>

          {/* Meta - right aligned */}
          <View style={styles.metaBlock}>
            <Text style={[styles.metaSmallLabel, { color: c.textSecondary }]}>Time Line</Text>
            <Text style={[styles.metaValue, { color: c.text }]}>3 Months</Text>
            <Text style={[styles.dateOfAnalysisLabel, { color: c.primary }]}>DATE OF ANALYSIS</Text>
            <Text style={[styles.metaValue, { color: c.text }]}>April 02, 2026</Text>
          </View>
        </View>

        {/* Prescription image placeholder */}
        <View style={styles.reportImageContainer}>
          <View style={[styles.reportImagePlaceholder, { backgroundColor: isDark ? '#1A1A1A' : '#F0F0F0' }]}>
            <Ionicons name="document-text-outline" size={60} color={c.textMuted} />
            <Text style={[styles.reportImageText, { color: c.textSecondary }]}>Prescription Document</Text>
            <Text style={[styles.reportImageSub, { color: c.textTertiary }]}>Tap to view full document</Text>
          </View>
        </View>

        {/* Privacy toggle */}
        <View style={[styles.privacyCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
          <View style={styles.privacyLeft}>
            <Ionicons name="git-network-outline" size={18} color={c.textSecondary} />
            <Text style={[styles.privacyText, { color: c.text }]}>keep this report private</Text>
          </View>
          <TouchableOpacity
            style={[styles.toggleTrack, { backgroundColor: c.error }]}
            onPress={() => setIsPrivate(!isPrivate)}
            activeOpacity={0.8}
          >
            <View style={[styles.toggleThumb, isPrivate ? { left: 4 } : { right: 4 }]} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Download Button */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity style={[styles.downloadButton, { backgroundColor: c.primary }]} activeOpacity={0.8}>
          <Text style={[styles.downloadButtonText, { color: c.textOnPrimary }]}>Download</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 0 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 29,
    paddingBottom: 16,
  },
  backBtn: { width: 22, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '600', fontFamily: 'Inter' },
  headerRight: { flexDirection: 'row', gap: 16 },
  headerIconBtn: { padding: 2 },
  reportHeader: { paddingHorizontal: 31, marginBottom: 16 },
  tagsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  publicTag: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  publicTagText: { fontSize: 10, fontWeight: '800', fontFamily: 'Manrope', letterSpacing: 1, textTransform: 'uppercase' },
  typeTag: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  typeTagText: { fontSize: 10, fontWeight: '800', fontFamily: 'Manrope', letterSpacing: 1, textTransform: 'uppercase' },
  prescriptionTitle: { fontSize: 34, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -0.68, marginBottom: 12 },
  metaBlock: { alignItems: 'flex-end', gap: 2 },
  metaSmallLabel: { fontSize: 12, fontFamily: 'Inter', textAlign: 'right' },
  metaValue: { fontSize: 18, fontFamily: 'Inter', fontWeight: '400', textAlign: 'right', lineHeight: 28 },
  dateOfAnalysisLabel: { fontSize: 12, fontFamily: 'Inter', textAlign: 'right', marginTop: 8, textTransform: 'uppercase' },
  reportImageContainer: { marginHorizontal: 36, height: 286, borderRadius: 24, overflow: 'hidden', marginBottom: 20 },
  reportImagePlaceholder: { flex: 1, borderRadius: 24, alignItems: 'center', justifyContent: 'center', gap: 8 },
  reportImageText: { fontSize: 14, fontFamily: 'Inter', fontWeight: '500' },
  reportImageSub: { fontSize: 12, fontFamily: 'Inter' },
  privacyCard: {
    marginHorizontal: 24,
    borderRadius: 33,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 33,
    paddingVertical: 18,
  },
  privacyLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  privacyText: { fontSize: 16, fontWeight: '500', fontFamily: 'Inter' },
  toggleTrack: { width: 48, height: 24, borderRadius: 12, justifyContent: 'center', position: 'relative' },
  toggleThumb: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#FFFFFF', position: 'absolute' },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 25 },
  downloadButton: {
    height: 58,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,110,40,0.3)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 10,
  },
  downloadButtonText: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter' },
});
