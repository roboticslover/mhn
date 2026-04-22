import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, StatusBar,
  TouchableOpacity, Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';

interface CorrelationCard {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  title: string;
  body: string;
  status: string;
  statusColor: string;
}

const CORRELATION_CARDS: CorrelationCard[] = [
  {
    icon: 'heart-outline',
    label: 'CARDIAC ECHO',
    title: 'Left Ventricle',
    body: 'Normal wall thickness. Flow velocity consistent with optimal scan.',
    status: 'STABLE',
    statusColor: '#6FFB85',
  },
  {
    icon: 'pulse-outline',
    label: 'NEURAL LOAD',
    title: 'Synaptic Density',
    body: 'Elevated activity in prefrontal cortex during capture window.',
    status: 'PEAK',
    statusColor: '#6FFB85',
  },
  {
    icon: 'body-outline',
    label: 'BONE DENSITY',
    title: 'T-Score: +1.2',
    body: 'Density metrics indicate peak athletic performance levels.',
    status: 'HIGH',
    statusColor: '#6FFB85',
  },
  {
    icon: 'water-outline',
    label: 'HYDRATION',
    title: 'Cellular Fluid',
    body: 'Osmotic balance within nominal range for scan fidelity.',
    status: 'NORMAL',
    statusColor: 'rgba(255,255,255,0.2)',
  },
];

export default function ScanDetailScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = theme.colors;
  const [visibleToFamily, setVisibleToFamily] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16, paddingBottom: 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text }]}>Scans</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => navigation.navigate('ScanEdit')}>
              <Ionicons name="create-outline" size={21} color="rgba(255,255,255,0.74)" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ScanShare')}>
              <Ionicons name="share-outline" size={21} color={c.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tags */}
        <View style={styles.tagsRow}>
          <View style={styles.publicTag}>
            <Text style={styles.publicTagText}>PUBLIC</Text>
          </View>
          <View style={styles.scanTag}>
            <Text style={styles.scanTagText}>SCAN</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.scanTitle}>Medplus CT Scan</Text>

        {/* Meta — right aligned */}
        <View style={styles.metaSection}>
          <Text style={styles.metaRefLabel}>REFERENCE ID</Text>
          <Text style={styles.metaRefValue}>#AB-2024-99812</Text>
          <Text style={styles.metaDateLabel}>DATE OF ANALYSIS</Text>
          <Text style={styles.metaDateValue}>OCT 14, 2024</Text>
        </View>

        {/* Scan image area */}
        <View style={styles.scanImageContainer}>
          <View style={styles.scanImagePlaceholder}>
            <Ionicons name="scan-outline" size={56} color="rgba(255,255,255,0.12)" />
          </View>
        </View>

        {/* Visibility toggle card */}
        <View style={[styles.visibilityCard, { borderColor: 'rgba(255,255,255,0.08)' }]}>
          <View style={styles.visibilityLeft}>
            <Ionicons name="eye-outline" size={18} color="rgba(255,255,255,0.5)" />
            <View>
              <Text style={styles.visibilityTitle}>Visibility</Text>
              <Text style={styles.visibilitySub}>Visible to your family</Text>
            </View>
          </View>
          <Switch
            value={visibleToFamily}
            onValueChange={setVisibleToFamily}
            trackColor={{ false: 'rgba(255,255,255,0.15)', true: '#34C759' }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="rgba(255,255,255,0.15)"
          />
        </View>

        {/* Clinical Synthetics section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionCategoryTitle}>Clinical Synthetics</Text>

          {/* Main metric card */}
          <View style={[styles.mainMetricCard, { borderColor: 'rgba(255,255,255,0.08)' }]}>
            <Text style={styles.mainMetricCategory}>Structural Analysis</Text>
            <Text style={styles.mainMetricTitle}>
              {'Structural\nAlignment:\n'}<Text style={{ color: '#FFFFFF' }}>Optimal</Text>
            </Text>
            <Text style={styles.mainMetricBody}>
              AI-driven pattern matching confirms vertebral alignment within 0.2mm of baseline. No significant degradative markers identified in the cervical or lumbar regions.
            </Text>
          </View>
        </View>

        {/* Systemic Impact section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.impactTitle}>Systemic Impact</Text>
          <Text style={styles.impactSubtitle}>
            Cross-referencing Scans data with real-time biometric correlations.
          </Text>

          <View style={styles.correlationGrid}>
            {CORRELATION_CARDS.map((card, i) => (
              <View
                key={i}
                style={[styles.correlationCard, { borderColor: 'rgba(255,255,255,0.08)' }]}
              >
                <View style={styles.corrCardHeader}>
                  <Ionicons name={card.icon} size={18} color="rgba(255,255,255,0.5)" />
                  <Text style={[styles.corrStatusText, { color: card.statusColor }]}>
                    {card.status}
                  </Text>
                </View>
                <Text style={styles.corrLabel}>{card.label}</Text>
                <Text style={styles.corrTitle}>{card.title}</Text>
                <Text style={styles.corrBody}>{card.body}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' },
  scrollContent: { paddingHorizontal: 0 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backBtn: { width: 24, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '600', fontFamily: 'Inter', lineHeight: 22 },
  headerRight: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  tagsRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 24, marginBottom: 12 },
  publicTag: {
    backgroundColor: 'rgba(111,251,133,0.15)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  publicTagText: {
    fontSize: 9,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#6FFB85',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },
  scanTag: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  scanTagText: {
    fontSize: 9,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },
  scanTitle: {
    fontSize: 34,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#FFFFFF',
    letterSpacing: -0.68,
    paddingHorizontal: 24,
    marginBottom: 16,
    lineHeight: 40,
  },
  metaSection: { paddingHorizontal: 24, alignItems: 'flex-end', marginBottom: 20 },
  metaRefLabel: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#6FFB85',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  metaRefValue: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: '#FFFFFF',
    lineHeight: 28,
    marginBottom: 12,
  },
  metaDateLabel: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#6FFB85',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  metaDateValue: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: '#FFFFFF',
    lineHeight: 28,
  },
  scanImageContainer: {
    marginHorizontal: 24,
    height: 222,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.6)',
    marginBottom: 20,
    opacity: 0.6,
  },
  scanImagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visibilityCard: {
    marginHorizontal: 24,
    borderRadius: 33,
    borderWidth: 1,
    backgroundColor: 'rgba(23,23,23,0.4)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 33,
    paddingVertical: 16,
    marginBottom: 24,
  },
  visibilityLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  visibilityTitle: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: '#FFFFFF',
    lineHeight: 24,
  },
  visibilitySub: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: 'rgba(255,255,255,0.4)',
    lineHeight: 16,
  },
  sectionContainer: { paddingHorizontal: 24, marginBottom: 24 },
  sectionCategoryTitle: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#AAAAAA',
    lineHeight: 24,
    marginBottom: 16,
  },
  mainMetricCard: {
    borderRadius: 33,
    borderWidth: 1,
    backgroundColor: 'rgba(23,23,23,0.4)',
    padding: 41,
    gap: 8,
  },
  mainMetricCategory: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: '#6FFB85',
    lineHeight: 16,
    marginBottom: 4,
  },
  mainMetricTitle: {
    fontSize: 30,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#E2E2E2',
    letterSpacing: -0.75,
    lineHeight: 36,
    marginBottom: 4,
  },
  mainMetricBody: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Manrope',
    color: '#AAAAAA',
    lineHeight: 24,
    paddingTop: 24,
  },
  impactTitle: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#FFFFFF',
    letterSpacing: -0.6,
    lineHeight: 32,
    marginBottom: 8,
  },
  impactSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: '#AAAAAA',
    lineHeight: 24,
    marginBottom: 16,
  },
  correlationGrid: { gap: 14 },
  correlationCard: {
    borderRadius: 33,
    borderWidth: 1,
    backgroundColor: 'rgba(23,23,23,0.4)',
    padding: 24,
    minHeight: 193,
  },
  corrCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  corrStatusText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  corrLabel: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: 'rgba(255,255,255,0.4)',
    lineHeight: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  corrTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#E2E2E2',
    lineHeight: 28,
    marginBottom: 8,
  },
  corrBody: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: '#AAAAAA',
    lineHeight: 16,
  },
});
