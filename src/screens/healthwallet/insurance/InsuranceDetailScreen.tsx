import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';

export default function InsuranceDetailScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = theme.colors;
  const [isPrivate, setIsPrivate] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16, paddingBottom: 120 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text, fontFamily: 'Inter' }]}>Insurance</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity><Ionicons name="create-outline" size={21} color={c.textSecondary} /></TouchableOpacity>
            <TouchableOpacity><Ionicons name="share-outline" size={21} color={c.primary} /></TouchableOpacity>
          </View>
        </View>
        <View style={styles.tagsRow}>
          <View style={[styles.activeTag, { backgroundColor: c.accentSoft }]}><Text style={[styles.tagText, { color: c.primary, fontFamily: 'Inter' }]}>ACTIVE</Text></View>
          <View style={[styles.typeTag, { backgroundColor: c.cardElevated }]}><Text style={[styles.typeTagText, { color: c.textSecondary, fontFamily: 'Inter' }]}>INSURANCE</Text></View>
        </View>
        <Text style={[styles.title, { color: c.text, fontFamily: 'Inter' }]}>Star Health Insurance</Text>
        <View style={[styles.detailsCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
          <View style={styles.detailRow}><Text style={[styles.detailLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>Policy Number</Text><Text style={[styles.detailValue, { color: c.text, fontFamily: 'Inter' }]}>SH-2024-9928</Text></View>
          <View style={[styles.divider, { backgroundColor: c.cardGlassBorder }]} />
          <View style={styles.detailRow}><Text style={[styles.detailLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>Type</Text><Text style={[styles.detailValue, { color: c.text, fontFamily: 'Inter' }]}>Individual</Text></View>
          <View style={[styles.divider, { backgroundColor: c.cardGlassBorder }]} />
          <View style={styles.detailRow}><Text style={[styles.detailLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>Sum Insured</Text><Text style={[styles.detailValue, { color: c.text, fontFamily: 'Inter' }]}>₹5,00,000</Text></View>
          <View style={[styles.divider, { backgroundColor: c.cardGlassBorder }]} />
          <View style={styles.detailRow}><Text style={[styles.detailLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>Premium</Text><Text style={[styles.detailValue, { color: c.text, fontFamily: 'Inter' }]}>₹12,000/year</Text></View>
          <View style={[styles.divider, { backgroundColor: c.cardGlassBorder }]} />
          <View style={styles.detailRow}><Text style={[styles.detailLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>Valid From</Text><Text style={[styles.detailValue, { color: c.text, fontFamily: 'Inter' }]}>Jan 01, 2024</Text></View>
          <View style={[styles.divider, { backgroundColor: c.cardGlassBorder }]} />
          <View style={styles.detailRow}><Text style={[styles.detailLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>Valid Until</Text><Text style={[styles.detailValue, { color: c.text, fontFamily: 'Inter' }]}>Dec 31, 2024</Text></View>
        </View>
        <View style={[styles.privacyCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
          <View style={styles.privacyLeft}>
            <Ionicons name="settings-outline" size={18} color={c.textSecondary} />
            <Text style={[styles.privacyText, { color: c.text, fontFamily: 'Inter' }]}>keep this private</Text>
          </View>
          <TouchableOpacity style={[styles.toggleTrack, { backgroundColor: isPrivate ? c.error : c.primary }]} onPress={() => setIsPrivate(!isPrivate)}>
            <View style={[styles.toggleThumb, isPrivate ? { left: 4 } : { right: 4 }]} />
          </TouchableOpacity>
        </View>
        <View style={styles.documentsSection}>
          <Text style={[styles.docTitle, { color: c.text, fontFamily: 'Inter' }]}>Documents</Text>
          <View style={[styles.fileRow, { backgroundColor: c.cardElevated, borderColor: c.cardGlassBorder }]}>
            <View style={styles.fileLeft}>
              <Ionicons name="document-outline" size={18} color={c.textSecondary} />
              <Text style={[styles.fileName, { color: c.text, fontFamily: 'Inter' }]}>StarHealth_Policy.pdf</Text>
            </View>
            <Ionicons name="download-outline" size={16} color={c.textMuted} />
          </View>
        </View>
      </ScrollView>
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity style={[styles.downloadButton, { backgroundColor: c.primary }]}>
          <Text style={[styles.downloadButtonText, { color: c.textOnPrimary, fontFamily: 'Inter' }]}>Download Policy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 0 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 16 },
  backBtn: { width: 24, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '600' },
  headerRight: { flexDirection: 'row', gap: 12 },
  tagsRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 31, marginBottom: 16 },
  activeTag: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  tagText: { fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  typeTag: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  typeTagText: { fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  title: { fontSize: 34, fontWeight: '700', letterSpacing: -0.68, paddingHorizontal: 31, marginBottom: 24 },
  detailsCard: { marginHorizontal: 20, borderRadius: 33, borderWidth: 1, padding: 28, marginBottom: 16 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  detailLabel: { fontSize: 14 },
  detailValue: { fontSize: 14, fontWeight: '600' },
  divider: { height: 1 },
  privacyCard: { marginHorizontal: 20, height: 58, borderRadius: 33, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 33, marginBottom: 16 },
  privacyLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  privacyText: { fontSize: 16, fontWeight: '500' },
  toggleTrack: { width: 48, height: 24, borderRadius: 12, justifyContent: 'center', position: 'relative' },
  toggleThumb: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#000', position: 'absolute' },
  documentsSection: { marginHorizontal: 20, gap: 12, marginBottom: 20 },
  docTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  fileRow: { borderRadius: 33, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 21, paddingVertical: 17 },
  fileLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  fileName: { fontSize: 14, fontWeight: '200', letterSpacing: 0.35 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 25 },
  downloadButton: { height: 58, borderRadius: 33, alignItems: 'center', justifyContent: 'center', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 1, shadowRadius: 50, elevation: 10 },
  downloadButtonText: { fontSize: 18, fontWeight: '700' },
});
