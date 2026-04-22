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

export default function PrescriptionDetailScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const [isPrivate, setIsPrivate] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: '#050505' }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 28, paddingBottom: 130 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Prescription</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => navigation.navigate('PrescriptionEdit')} style={styles.headerIconBtn}>
              <Ionicons name="create-outline" size={21} color="rgba(255,255,255,0.74)" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PrescriptionShare')} style={styles.headerIconBtn}>
              <Ionicons name="share-outline" size={21} color="#6FFB85" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Report header */}
        <View style={styles.reportHeader}>
          {/* Tags */}
          <View style={styles.tagsRow}>
            <View style={styles.publicTag}>
              <Text style={styles.publicTagText}>PUBLIC</Text>
            </View>
            <View style={styles.typeTag}>
              <Text style={styles.typeTagText}>PRESCRIPTION</Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.prescriptionTitle}>Prescription Name</Text>

          {/* Meta - right aligned */}
          <View style={styles.metaBlock}>
            <Text style={styles.metaSmallLabel}>Time Line</Text>
            <Text style={styles.metaValue}>3 Months</Text>
            <Text style={styles.dateOfAnalysisLabel}>DATE OF ANALYSIS</Text>
            <Text style={styles.metaValue}>April 02, 2026</Text>
          </View>
        </View>

        {/* Prescription image placeholder */}
        <View style={styles.reportImageContainer}>
          <View style={styles.reportImagePlaceholder}>
            <Ionicons name="document-text-outline" size={60} color="rgba(255,255,255,0.3)" />
            <Text style={styles.reportImageText}>Prescription Document</Text>
            <Text style={styles.reportImageSub}>Tap to view full document</Text>
          </View>
        </View>

        {/* Privacy toggle */}
        <View style={styles.privacyCard}>
          <View style={styles.privacyLeft}>
            <Ionicons name="git-network-outline" size={18} color="#AAAAAA" />
            <Text style={styles.privacyText}>keep this report private</Text>
          </View>
          <TouchableOpacity
            style={[styles.toggleTrack, { backgroundColor: isPrivate ? '#DB5034' : '#DB5034' }]}
            onPress={() => setIsPrivate(!isPrivate)}
            activeOpacity={0.8}
          >
            <View style={[styles.toggleThumb, isPrivate ? { left: 4 } : { right: 4 }]} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Download Button */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity style={styles.downloadButton} activeOpacity={0.8}>
          <Text style={styles.downloadButtonText}>Download</Text>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#FFFFFF',
  },
  headerRight: { flexDirection: 'row', gap: 16 },
  headerIconBtn: { padding: 2 },
  reportHeader: {
    paddingHorizontal: 31,
    marginBottom: 16,
  },
  tagsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  publicTag: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(52,199,89,0.16)',
  },
  publicTagText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#6FFB85',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  typeTag: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#1F1F1F',
  },
  typeTagText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#C5C9AC',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  prescriptionTitle: {
    fontSize: 34,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#FFFFFF',
    letterSpacing: -0.68,
    marginBottom: 12,
  },
  metaBlock: {
    alignItems: 'flex-end',
    gap: 2,
  },
  metaSmallLabel: {
    fontSize: 12,
    fontFamily: 'Inter',
    color: '#AAAAAA',
    textAlign: 'right',
  },
  metaValue: {
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: '400',
    color: '#FFFFFF',
    textAlign: 'right',
    lineHeight: 28,
  },
  dateOfAnalysisLabel: {
    fontSize: 12,
    fontFamily: 'Inter',
    color: '#6FFB85',
    textAlign: 'right',
    marginTop: 8,
    textTransform: 'uppercase',
  },
  reportImageContainer: {
    marginHorizontal: 36,
    height: 286,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
  },
  reportImagePlaceholder: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  reportImageText: {
    fontSize: 14,
    fontFamily: 'Inter',
    color: '#555',
    fontWeight: '500',
  },
  reportImageSub: {
    fontSize: 12,
    fontFamily: 'Inter',
    color: '#888',
  },
  privacyCard: {
    marginHorizontal: 24,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(23,23,23,0.4)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 33,
    paddingVertical: 18,
  },
  privacyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  privacyText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: '#E2E2E2',
  },
  toggleTrack: {
    width: 48,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    position: 'relative',
  },
  toggleThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#000000',
    position: 'absolute',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 25,
  },
  downloadButton: {
    height: 58,
    borderRadius: 33,
    backgroundColor: '#6FFB85',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,110,40,0.3)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 10,
  },
  downloadButtonText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#141414',
  },
});
