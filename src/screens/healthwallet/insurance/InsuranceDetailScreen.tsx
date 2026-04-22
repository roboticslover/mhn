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
const FLAGS = [
  { title: 'Waiting Periods', desc: 'Specific illnesses wait 2-4 years' },
  { title: 'Standard Deductibles', desc: 'Flat rate applies per claim' },
  { title: 'Health Check-Up', desc: 'Available after 2 claim-free years' },
  { title: 'Pre-Existing Diseases', desc: '48 month initial exclusion' },
  { title: 'Renewal Grace', desc: '30 days from expiry date' },
];

const CONDITIONS = [
  'Inpatient Treatment',
  'Pre-Hospitalization',
  'Post-Hospitalization',
  'Day Care Procedures',
  'Domiciliary Treatment',
  'Organ Donor Expenses',
  'Emergency Ambulance',
  'Ayurvedic Treatment',
];

const CONDITION_ICONS: Record<string, string> = {
  'Inpatient Treatment': 'bed-outline',
  'Pre-Hospitalization': 'medkit-outline',
  'Post-Hospitalization': 'home-outline',
  'Day Care Procedures': 'sunny-outline',
  'Domiciliary Treatment': 'business-outline',
  'Organ Donor Expenses': 'heart-outline',
  'Emergency Ambulance': 'car-outline',
  'Ayurvedic Treatment': 'leaf-outline',
};

export default function InsuranceDetailScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const [conditionsExpanded, setConditionsExpanded] = useState(true);
  const [flagsExpanded, setFlagsExpanded] = useState(false);
  const [networkExpanded, setNetworkExpanded] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: '#050505' }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20, paddingBottom: 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Insurance</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => navigation.navigate('InsuranceShare')}>
              <Ionicons name="create-outline" size={21} color="rgba(255,255,255,0.74)" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('InsuranceShare')}>
              <Ionicons name="share-outline" size={21} color="#6FFB85" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Glassmorphic Insurance Card */}
        <View style={styles.insuranceCard}>
          {/* Active badge */}
          <View style={styles.activeBadge}>
            <Ionicons name="shield-checkmark" size={12} color="#6FFB85" />
            <Text style={styles.activeBadgeText}>ACTIVE</Text>
          </View>

          {/* Plan name */}
          <View style={styles.cardNameBlock}>
            <Text style={styles.cardPlanName}>
              <Text style={styles.cardPlanNameBold}>ASTRA </Text>
              <Text style={styles.cardPlanNameFade}>PRIME</Text>
            </Text>
            <Text style={styles.cardSubPlan}>NEXUS GLOBAL ACCESS</Text>
          </View>

          {/* Member ID / Group */}
          <View style={styles.cardMetaRow}>
            <View style={styles.cardMetaItem}>
              <Text style={styles.cardMetaLabel}>MEMBER ID</Text>
              <Text style={styles.cardMetaValue}>MHN-882-04-14</Text>
            </View>
            <View style={styles.cardMetaItem}>
              <Text style={styles.cardMetaLabel}>GROUP</Text>
              <Text style={styles.cardMetaValue}>ZENITH_9</Text>
            </View>
          </View>

          {/* Holder name */}
          <Text style={styles.cardHolder}>Alex Sterling</Text>
        </View>

        {/* Coverage Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionMicro}>DETAILS</Text>
          <View style={styles.coverageCard}>
            <View style={styles.coverageRow}>
              <View style={styles.coverageField}>
                <Text style={styles.fieldLabel}>START DATE</Text>
                <Text style={styles.fieldBigValue}>02/10/2026</Text>
              </View>
            </View>
            <View style={[styles.coverageDivider]} />
            <View style={styles.coverageRow}>
              <View style={styles.coverageField}>
                <Text style={styles.fieldLabel}>END DATE</Text>
                <Text style={styles.fieldBigValue}>02/10/2028</Text>
              </View>
            </View>
            <View style={[styles.coverageDivider]} />
            <View style={styles.coverageRow}>
              <View style={styles.coverageField}>
                <Text style={styles.fieldLabel}>CO-PAY</Text>
                <Text style={[styles.fieldBigValue, { color: '#DB5034' }]}>₹2500</Text>
              </View>
            </View>
          </View>
        </View>

        {/* HDFC Ergo / Plan name */}
        <View style={[styles.section, { paddingHorizontal: 26 }]}>
          <Text style={styles.providerBrand}>HDFC Ergo</Text>
          <Text style={styles.providerPlanName}>{'Health Suraksha Policy\nSilver Plan'}</Text>
          <View style={styles.expiredBadge}>
            <View style={styles.expiredDot} />
            <Text style={styles.expiredText}>Expired (Nov 4, 2024)</Text>
          </View>
        </View>

        {/* Document Archive */}
        <View style={styles.section}>
          <View style={styles.docArchiveCard}>
            <View style={styles.docArchiveHeader}>
              <Text style={styles.sectionMicro}>DOCUMENT ARCHIVE</Text>
              <TouchableOpacity onPress={() => navigation.navigate('InsuranceShare')}>
                <Ionicons name="share-outline" size={16} color="rgba(255,255,255,0.5)" />
              </TouchableOpacity>
            </View>
            {['Full Policy Disclosure (2024)', 'Summary of Benefits.pdf', 'Provider Directory v2.1'].map((doc, i) => (
              <View key={i} style={styles.docRow}>
                <Ionicons name="document-outline" size={16} color="rgba(255,255,255,0.5)" />
                <Text style={styles.docName}>{doc}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.downloadPdfsBtn}>
              <Text style={styles.downloadPdfsText}>DOWNLOAD PDFs</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Network Provider */}
        <TouchableOpacity
          style={styles.collapsibleCard}
          activeOpacity={0.8}
          onPress={() => setNetworkExpanded(!networkExpanded)}
        >
          <View style={styles.collapsibleRow}>
            <Ionicons name="location-outline" size={20} color="#6FFB85" />
            <Text style={styles.collapsibleTitle}>Network Provider</Text>
            <Ionicons
              name={networkExpanded ? 'chevron-up' : 'chevron-down'}
              size={16}
              color="rgba(255,255,255,0.4)"
              style={{ marginLeft: 'auto' }}
            />
          </View>
          {networkExpanded && (
            <View style={styles.collapsibleContent}>
              <Text style={styles.networkCashless}>Cashless</Text>
              <Text style={styles.networkSub}>HOSPITALIZATION ENABLED</Text>
              <Text style={styles.networkDesc}>Access 12,000+ medical facilities for seamless care.</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Key Flags & Exclusions */}
        <TouchableOpacity
          style={styles.collapsibleCard}
          activeOpacity={0.8}
          onPress={() => setFlagsExpanded(!flagsExpanded)}
        >
          <View style={styles.collapsibleRow}>
            <Ionicons name="warning-outline" size={20} color="#F5A623" />
            <Text style={styles.collapsibleTitle}>Key Flags & Exclusions</Text>
            <Ionicons
              name={flagsExpanded ? 'chevron-up' : 'chevron-down'}
              size={16}
              color="rgba(255,255,255,0.4)"
              style={{ marginLeft: 'auto' }}
            />
          </View>
          {flagsExpanded && (
            <View style={styles.flagsList}>
              {FLAGS.map((flag, i) => (
                <View key={i} style={styles.flagItem}>
                  <View style={styles.flagIconCircle}>
                    <Ionicons name="alert-circle-outline" size={13} color="#F5A623" />
                  </View>
                  <View>
                    <Text style={styles.flagTitle}>{flag.title}</Text>
                    <Text style={styles.flagDesc}>{flag.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </TouchableOpacity>

        {/* Covered Conditions */}
        <TouchableOpacity
          style={styles.coveredCard}
          activeOpacity={0.8}
          onPress={() => setConditionsExpanded(!conditionsExpanded)}
        >
          <View style={styles.coveredHeader}>
            <View>
              <Text style={styles.coveredTitle}>Covered Conditions</Text>
              <Text style={styles.coveredSubtitle}>Comprehensive medical protection breakdown</Text>
            </View>
            <Ionicons
              name={conditionsExpanded ? 'chevron-up' : 'chevron-down'}
              size={16}
              color="rgba(255,255,255,0.4)"
            />
          </View>
          <View style={styles.totalBenefitsBadge}>
            <Ionicons name="checkmark-circle" size={12} color="#6FFB85" />
            <Text style={styles.totalBenefitsText}>10 TOTAL BENEFITS</Text>
          </View>
          {conditionsExpanded && (
            <View style={styles.conditionGrid}>
              {CONDITIONS.map((cond, i) => (
                <View key={i} style={styles.conditionItem}>
                  <View style={styles.conditionIconBox}>
                    <Ionicons name={(CONDITION_ICONS[cond] as any) || 'checkmark-outline'} size={18} color="rgba(255,255,255,0.7)" />
                  </View>
                  <Text style={styles.conditionLabel}>{cond}</Text>
                </View>
              ))}
            </View>
          )}
        </TouchableOpacity>

        {/* Policy Renewal Required */}
        <View style={styles.renewalCard}>
          <View style={styles.renewalIconBox}>
            <Ionicons name="refresh-circle-outline" size={32} color="#6FFB85" />
          </View>
          <View style={styles.renewalText}>
            <Text style={styles.renewalTitle}>Policy Renewal Required</Text>
            <Text style={styles.renewalDesc}>Renew within the grace period to keep your cumulative benefits.</Text>
          </View>
          <TouchableOpacity style={styles.renewBtn}>
            <Text style={styles.renewBtnText}>Renew Policy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingHorizontal: 25,
    paddingBottom: 16,
  },
  backBtn: { width: 20, alignItems: 'center' },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#fff',
  },
  headerRight: { flexDirection: 'row', gap: 14, alignItems: 'center' },

  // Insurance Card
  insuranceCard: {
    marginHorizontal: 21,
    backgroundColor: 'rgba(23,23,23,0.4)',
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingTop: 33,
    paddingBottom: 29,
    paddingHorizontal: 33,
    marginBottom: 16,
    overflow: 'hidden',
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(52,199,89,0.09)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(52,199,89,0.19)',
    paddingHorizontal: 13,
    paddingVertical: 5,
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  activeBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#6FFB85',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  cardNameBlock: { marginBottom: 8 },
  cardPlanName: {
    fontSize: 24,
    fontFamily: 'Manrope',
    lineHeight: 32,
    letterSpacing: -1.2,
  },
  cardPlanNameBold: { fontWeight: '800', color: '#E2E2E2' },
  cardPlanNameFade: { fontWeight: '800', color: 'rgba(255,255,255,0.4)' },
  cardSubPlan: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  cardMetaRow: { flexDirection: 'row', gap: 32, marginBottom: 12 },
  cardMetaItem: { flex: 1 },
  cardMetaLabel: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  cardMetaValue: {
    fontSize: 16,
    fontWeight: '300',
    fontFamily: 'Manrope',
    color: '#E2E2E2',
    letterSpacing: 1.6,
  },
  cardHolder: {
    fontSize: 18,
    fontWeight: '300',
    fontFamily: 'Manrope',
    color: '#E2E2E2',
    lineHeight: 28,
  },

  // Sections
  section: { marginHorizontal: 25, marginBottom: 12 },
  sectionMicro: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  coverageCard: {
    backgroundColor: 'rgba(23,23,23,0.4)',
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 32,
    paddingVertical: 24,
  },
  coverageRow: { paddingVertical: 8 },
  coverageDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginVertical: 4 },
  coverageField: {},
  fieldLabel: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  fieldBigValue: {
    fontSize: 30,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#E2E2E2',
    lineHeight: 36,
    letterSpacing: -0.75,
  },

  // HDFC Ergo Section
  providerBrand: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#6FFB85',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  providerPlanName: {
    fontSize: 30,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#fff',
    lineHeight: 36,
    letterSpacing: -0.75,
    marginBottom: 12,
  },
  expiredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(219,80,52,0.15)',
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(219,80,52,0.3)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  expiredDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#DB5034' },
  expiredText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#DB5034',
    letterSpacing: 0.5,
  },

  // Document Archive
  docArchiveCard: {
    backgroundColor: 'rgba(23,23,23,0.4)',
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 28,
    paddingVertical: 24,
    gap: 12,
  },
  docArchiveHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  docName: {
    fontSize: 14,
    fontWeight: '300',
    fontFamily: 'Manrope',
    color: '#E2E2E2',
    letterSpacing: 0.35,
  },
  downloadPdfsBtn: {
    marginTop: 8,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 14,
    alignItems: 'center',
  },
  downloadPdfsText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#E2E2E2',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Collapsible cards
  collapsibleCard: {
    marginHorizontal: 25,
    backgroundColor: 'rgba(23,23,23,0.4)',
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 28,
    paddingVertical: 24,
    marginBottom: 12,
  },
  collapsibleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  collapsibleTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#E2E2E2',
    lineHeight: 28,
  },
  collapsibleContent: { marginTop: 16 },
  networkCashless: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#6FFB85',
    letterSpacing: -0.6,
    lineHeight: 32,
  },
  networkSub: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: '#AAAAAA',
    lineHeight: 24,
    textTransform: 'uppercase',
  },
  networkDesc: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: '#AAAAAA',
    lineHeight: 24,
    marginTop: 8,
  },
  flagsList: { marginTop: 16, gap: 16 },
  flagItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 16 },
  flagIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(245,166,35,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  flagTitle: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#E2E2E2',
    textTransform: 'capitalize',
    lineHeight: 20,
  },
  flagDesc: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: '#AAAAAA',
    lineHeight: 16,
  },

  // Covered Conditions
  coveredCard: {
    marginHorizontal: 25,
    backgroundColor: 'rgba(23,23,23,0.4)',
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 28,
    marginBottom: 12,
    overflow: 'hidden',
  },
  coveredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  coveredTitle: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#E2E2E2',
    letterSpacing: -0.6,
    lineHeight: 32,
  },
  coveredSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: '#AAAAAA',
    lineHeight: 24,
    marginBottom: 12,
  },
  totalBenefitsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(85,238,113,0.1)',
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'stretch',
    marginBottom: 16,
  },
  totalBenefitsText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#6FFB85',
    lineHeight: 20,
  },
  conditionGrid: { gap: 8 },
  conditionItem: {
    backgroundColor: 'rgba(23,23,23,0.4)',
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 25,
    paddingVertical: 16,
  },
  conditionIconBox: { width: 18, height: 18, alignItems: 'center', justifyContent: 'center' },
  conditionLabel: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#E2E2E2',
    textTransform: 'capitalize',
  },

  // Renewal
  renewalCard: {
    marginHorizontal: 25,
    backgroundColor: 'rgba(23,23,23,0.4)',
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 28,
    gap: 12,
    marginBottom: 20,
  },
  renewalIconBox: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(111,251,133,0.1)',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  renewalText: { alignItems: 'center', gap: 6 },
  renewalTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#E2E2E2',
    textAlign: 'center',
  },
  renewalDesc: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: '#AAAAAA',
    textAlign: 'center',
    lineHeight: 16,
  },
  renewBtn: {
    width: '100%',
    marginTop: 8,
    backgroundColor: '#6FFB85',
    borderRadius: 33,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  renewBtnText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#141414',
  },
});
