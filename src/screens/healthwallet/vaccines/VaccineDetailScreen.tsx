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

export default function VaccineDetailScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [isPrivate, setIsPrivate] = useState(true);

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
          <Text style={[styles.headerTitle, { color: c.text }]}>Vaccine Name</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => navigation.navigate('VaccineEdit')}
              style={styles.headerIconBtn}
            >
              <Ionicons name="create-outline" size={21} color={c.textMuted} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('VaccineShare')}
              style={styles.headerIconBtn}
            >
              <Ionicons name="share-outline" size={21} color={c.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Report Header Section */}
        <View style={styles.reportHeader}>
          {/* Tags */}
          <View style={styles.tagsRow}>
            <View style={[styles.publicTag, { backgroundColor: c.successSoft }]}>
              <Text style={[styles.publicTagText, { color: c.primary }]}>PUBLIC</Text>
            </View>
            <View style={[styles.typeTag, { backgroundColor: c.cardElevated }]}>
              <Text style={[styles.typeTagText, { color: c.textSecondary }]}>VACCINES</Text>
            </View>
          </View>

          {/* Title row with meta on right */}
          <View style={styles.titleMetaRow}>
            <Text style={[styles.vaccineTitle, { color: c.text }]}>Vaccine Name</Text>
            <View style={styles.metaBlock}>
              <Text style={[styles.metaSmallLabel, { color: c.textSecondary }]}>REFERENCE ID</Text>
              <Text style={[styles.metaRefId, { color: c.text }]}>#AB-2024-99812</Text>
              <Text style={[styles.metaDateLabel, { color: c.primary }]}>DATE OF ANALYSIS</Text>
              <Text style={[styles.metaDateValue, { color: c.text }]}>OCT 14, 2024</Text>
            </View>
          </View>

          {/* Protected Till / Date of Vaccine */}
          <View style={styles.vaccineMetaRow}>
            <View style={styles.vaccineMetaItem}>
              <Text style={[styles.vaccineMetaLabel, { color: c.primary }]}>PROTECTED TILL</Text>
              <Text style={[styles.vaccineMetaValue, { color: c.text }]}>April 02, 2027</Text>
            </View>
            <View style={styles.vaccineMetaItem}>
              <Text style={[styles.vaccineMetaLabel, { color: c.primary }]}>DATE OF VACCINE</Text>
              <Text style={[styles.vaccineMetaValue, { color: c.text }]}>April 03, 2026</Text>
            </View>
          </View>
        </View>

        {/* Document Preview */}
        <View style={[styles.documentContainer, { backgroundColor: isDark ? '#1A1A1A' : '#F5F5F5' }]}>
          <View style={styles.documentContent}>
            <Ionicons name="document-text-outline" size={48} color={c.textMuted} />
            <Text style={[styles.documentTitle, { color: c.textSecondary }]}>Vaccine Certificate</Text>
            <Text style={[styles.documentSub, { color: c.textTertiary }]}>Tap to view full document</Text>
          </View>
          {/* Simulated document lines */}
          <View style={styles.docLines}>
            {['Date:', 'Patient Name:', 'Patient phone number:'].map((line, i) => (
              <View key={i} style={styles.docLineRow}>
                <Text style={[styles.docLineText, { color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }]}>{line}</Text>
                {i < 2 && (
                  <Text style={[styles.docLineText, { color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }]}>
                    {i === 0 ? 'Patient DOB:' : 'Patient Address:'}
                  </Text>
                )}
              </View>
            ))}
            <Text style={[styles.docMedText, { color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }]}>
              {'Medication: 2025-2026 COVID-19 vaccine\n(Pfizer COMIRNATY; Moderna SPIKEVAX;\nModerna MNEXSPIKE; or Novavax NUVAXOVID)'}
            </Text>
            <Text style={[styles.docMedText, { color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }]}>
              Quantity: one dose
            </Text>
          </View>
        </View>

        {/* Privacy Toggle */}
        <View style={[styles.privacyCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
          <View style={styles.privacyLeft}>
            <Ionicons name="git-network-outline" size={18} color={c.error} />
            <Text style={[styles.privacyText, { color: c.textSubheading }]}>keep this report private</Text>
          </View>
          <TouchableOpacity
            style={[styles.toggleTrack, { backgroundColor: isPrivate ? c.error : '#7b7f7c' }]}
            onPress={() => setIsPrivate(!isPrivate)}
            activeOpacity={0.8}
          >
            <View style={[styles.toggleThumb, isPrivate ? { right: 4 } : { left: 4 }]} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Download Button */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity
          style={[styles.downloadBtn, { backgroundColor: c.primary }]}
          activeOpacity={0.8}
        >
          <Text style={[styles.downloadBtnText, { color: c.textOnPrimary }]}>Download</Text>
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
  reportHeader: { paddingHorizontal: 31, marginBottom: 20 },
  tagsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  publicTag: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  publicTagText: { fontSize: 10, fontWeight: '800', fontFamily: 'Manrope', letterSpacing: 1, textTransform: 'uppercase' },
  typeTag: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  typeTagText: { fontSize: 10, fontWeight: '800', fontFamily: 'Manrope', letterSpacing: 1, textTransform: 'uppercase' },
  titleMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  vaccineTitle: { fontSize: 30, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -0.75, flex: 1 },
  metaBlock: { alignItems: 'flex-end', gap: 2, paddingTop: 4 },
  metaSmallLabel: { fontSize: 12, fontFamily: 'Inter', textAlign: 'right', textTransform: 'uppercase' },
  metaRefId: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter', textAlign: 'right', lineHeight: 28 },
  metaDateLabel: { fontSize: 12, fontFamily: 'Inter', textAlign: 'right', marginTop: 8, textTransform: 'uppercase' },
  metaDateValue: { fontSize: 16, fontWeight: '800', fontFamily: 'Manrope', textAlign: 'right', textTransform: 'uppercase' },
  vaccineMetaRow: { gap: 8 },
  vaccineMetaItem: { alignItems: 'flex-end' },
  vaccineMetaLabel: { fontSize: 10, fontWeight: '800', fontFamily: 'Manrope', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2, textAlign: 'right' },
  vaccineMetaValue: { fontSize: 20, fontWeight: '300', fontFamily: 'Manrope', textAlign: 'right', lineHeight: 28 },
  documentContainer: {
    marginHorizontal: 24,
    height: 286,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  documentContent: { alignItems: 'center', marginBottom: 16, display: 'none' },
  documentTitle: { fontSize: 14, fontFamily: 'Inter', fontWeight: '500' },
  documentSub: { fontSize: 12, fontFamily: 'Inter' },
  docLines: { gap: 10 },
  docLineRow: { flexDirection: 'row', justifyContent: 'space-between' },
  docLineText: { fontSize: 12, fontFamily: 'Inter' },
  docMedText: { fontSize: 12, fontFamily: 'Inter', lineHeight: 18, fontWeight: '600', marginTop: 8 },
  privacyCard: {
    marginHorizontal: 24,
    borderRadius: 33,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 33,
    paddingVertical: 18,
    marginBottom: 20,
  },
  privacyLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  privacyText: { fontSize: 12, fontWeight: '800', fontFamily: 'Manrope', letterSpacing: 1.6, textTransform: 'uppercase' },
  toggleTrack: { width: 48, height: 24, borderRadius: 12, justifyContent: 'center', position: 'relative' },
  toggleThumb: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#141414', position: 'absolute' },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 25,
  },
  downloadBtn: {
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
  downloadBtnText: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter', lineHeight: 28 },
});
