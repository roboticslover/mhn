import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';

export default function ScanDetailScreen({ navigation }: { navigation: any }) {
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
          <Text style={[styles.headerTitle, { color: c.text, fontFamily: 'Inter' }]}>Scan</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity><Ionicons name="create-outline" size={21} color={c.textSecondary} /></TouchableOpacity>
            <TouchableOpacity><Ionicons name="share-outline" size={21} color={c.primary} /></TouchableOpacity>
          </View>
        </View>
        <View style={styles.tagsRow}>
          <View style={[styles.publicTag, { backgroundColor: c.accentSoft }]}><Text style={[styles.tagText, { color: c.primary, fontFamily: 'Inter' }]}>PUBLIC</Text></View>
          <View style={[styles.typeTag, { backgroundColor: c.cardElevated }]}><Text style={[styles.typeTagText, { color: c.textSecondary, fontFamily: 'Inter' }]}>SCAN</Text></View>
        </View>
        <Text style={[styles.scanTitle, { color: c.text, fontFamily: 'Inter' }]}>MRI Brain Scan</Text>
        <View style={styles.metaSection}>
          <View style={styles.metaRow}>
            <Text style={[styles.metaLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>Type</Text>
            <Text style={[styles.metaValue, { color: c.text, fontFamily: 'Inter' }]}>MRI</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={[styles.dateLabel, { color: c.primary, fontFamily: 'Inter' }]}>DATE OF SCAN</Text>
            <Text style={[styles.metaValue, { color: c.text, fontFamily: 'Inter' }]}>March 23, 2026</Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <View style={[styles.imagePlaceholder, { backgroundColor: c.cardElevated }]}>
            <Ionicons name="scan-outline" size={48} color={c.textMuted} />
            <Text style={[styles.imageText, { color: c.textMuted, fontFamily: 'Inter' }]}>Scan Document</Text>
          </View>
        </View>
        <View style={[styles.privacyCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
          <View style={styles.privacyLeft}>
            <Ionicons name="settings-outline" size={18} color={c.textSecondary} />
            <Text style={[styles.privacyText, { color: c.text, fontFamily: 'Inter' }]}>keep this scan private</Text>
          </View>
          <TouchableOpacity
            style={[styles.toggleTrack, { backgroundColor: isPrivate ? c.error : c.primary }]}
            onPress={() => setIsPrivate(!isPrivate)}
          >
            <View style={[styles.toggleThumb, isPrivate ? { left: 4 } : { right: 4 }]} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity style={[styles.downloadButton, { backgroundColor: c.primary }]}>
          <Text style={[styles.downloadButtonText, { color: c.textOnPrimary, fontFamily: 'Inter' }]}>Download</Text>
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
  publicTag: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  tagText: { fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  typeTag: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  typeTagText: { fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  scanTitle: { fontSize: 34, fontWeight: '700', letterSpacing: -0.68, paddingHorizontal: 31, marginBottom: 16 },
  metaSection: { paddingHorizontal: 31, marginBottom: 24 },
  metaRow: { alignItems: 'flex-end', marginBottom: 4 },
  metaLabel: { fontSize: 12, textAlign: 'right' },
  metaValue: { fontSize: 18, textAlign: 'right' },
  dateLabel: { fontSize: 12, textAlign: 'right', marginTop: 8 },
  imageContainer: { marginHorizontal: 36, height: 304, borderRadius: 24, overflow: 'hidden', marginBottom: 20 },
  imagePlaceholder: { flex: 1, borderRadius: 24, alignItems: 'center', justifyContent: 'center', gap: 12 },
  imageText: { fontSize: 14 },
  privacyCard: { marginHorizontal: 24, height: 58, borderRadius: 33, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 33 },
  privacyLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  privacyText: { fontSize: 16, fontWeight: '500' },
  toggleTrack: { width: 48, height: 24, borderRadius: 12, justifyContent: 'center', position: 'relative' },
  toggleThumb: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#000', position: 'absolute' },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 25 },
  downloadButton: { height: 58, borderRadius: 33, alignItems: 'center', justifyContent: 'center', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 1, shadowRadius: 50, elevation: 10 },
  downloadButtonText: { fontSize: 18, fontWeight: '700' },
});
