import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Modal,
  Alert,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';

interface ShareFile {
  id: string;
  name: string;
  selected: boolean;
}

const INITIAL_SHARE_FILES: ShareFile[] = [
  { id: '1', name: '818786755-CBC-REPORT.PDF', selected: false },
  { id: '2', name: 'Summary of Benefits.pdf', selected: false },
  { id: '3', name: 'Provider Directory v2.1.pdf', selected: false },
];
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
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const [conditionsExpanded, setConditionsExpanded] = useState(false);
  const [flagsExpanded, setFlagsExpanded] = useState(false);
  const [networkExpanded, setNetworkExpanded] = useState(false);
  
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareFiles, setShareFiles] = useState<ShareFile[]>(INITIAL_SHARE_FILES);

  const selectedCount = shareFiles.filter(f => f.selected).length;
  const allSelected = shareFiles.every(f => f.selected);

  const toggleFile = (id: string) => {
    setShareFiles(shareFiles.map(f => f.id === id ? { ...f, selected: !f.selected } : f));
  };

  const toggleAll = () => {
    const newState = !allSelected;
    setShareFiles(shareFiles.map(f => ({ ...f, selected: newState })));
  };

  const handleShare = async () => {
    const selectedNames = shareFiles.filter(f => f.selected).map(f => f.name);
    if (selectedNames.length === 0) return;
    try {
      await Share.share({ message: `Sharing insurance files:\n${selectedNames.join('\n')}` });
      setShowShareModal(false);
    } catch {}
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#050505' : '#F8F9FA' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20, paddingBottom: 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text }]}>Insurance</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => navigation.navigate('InsuranceEdit')}>
              <Ionicons name="create-outline" size={22} color={isDark ? 'rgba(255,255,255,0.74)' : 'rgba(0,0,0,0.6)'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowShareModal(true)}>
              <Ionicons name="share-outline" size={22} color="#6FFB85" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Glassmorphic Insurance Card */}
        <View style={[styles.insuranceCard, { backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : 'rgba(255,255,255,0.8)', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }]}>
          <View style={styles.cardHeaderRow}>
            {/* Active badge */}
            <View style={styles.activeBadge}>
              <Ionicons name="shield-checkmark" size={12} color="#6FFB85" />
              <Text style={styles.activeBadgeText}>ACTIVE</Text>
            </View>
            <Ionicons name="heart-circle-outline" size={32} color="#6FFB85" style={{ opacity: 0.8 }} />
          </View>

          {/* Plan name */}
          <View style={styles.cardNameBlock}>
            <Text style={[styles.cardPlanName, { color: c.text }]}>ASTRA PRIME</Text>
            <Text style={styles.cardSubPlan}>NEXUS GLOBAL ACCESS</Text>
          </View>

          {/* Member ID / Group */}
          <View style={styles.cardMetaRow}>
            <View style={styles.cardMetaItem}>
              <Text style={styles.cardMetaLabel}>MEMBER ID</Text>
              <Text style={[styles.cardMetaValue, { color: c.text }]}>MHN-882-04-14</Text>
            </View>
            <View style={styles.cardMetaItem}>
              <Text style={styles.cardMetaLabel}>GROUP</Text>
              <Text style={[styles.cardMetaValue, { color: c.text }]}>ZENITH_9</Text>
            </View>
          </View>

          {/* Holder name */}
          <Text style={[styles.cardHolder, { color: c.text }]}>Alex Sterling</Text>
        </View>

        {/* Coverage Breakdown */}
        <View style={styles.section}>
          <View style={[styles.detailsSectionHeader, { marginBottom: 12 }]}>
            <Text style={styles.sectionMicro}>DETAILS</Text>
            <Ionicons name="analytics-outline" size={18} color={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'} />
          </View>
          <View style={[styles.coverageCard, { backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : 'rgba(255,255,255,0.8)', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }]}>
            <View style={styles.coverageField}>
              <Text style={styles.fieldLabel}>START DATE</Text>
              <Text style={[styles.fieldBigValue, { color: c.text }]}>02/10/2026</Text>
            </View>
            <View style={styles.coverageField}>
              <Text style={styles.fieldLabel}>END DATE</Text>
              <Text style={[styles.fieldBigValue, { color: c.text }]}>02/10/2028</Text>
            </View>
            <View style={styles.coverageField}>
              <Text style={[styles.fieldLabel, { color: '#DB5034' }]}>CO-PAY</Text>
              <Text style={[styles.fieldBigValue, { color: c.text }]}>₹2500</Text>
            </View>
          </View>
        </View>

        {/* Document Archive */}
        <View style={styles.section}>
          <View style={[styles.docArchiveCard, { backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : 'rgba(255,255,255,0.8)', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }]}>
            <View style={styles.docArchiveHeader}>
              <Text style={styles.sectionMicro}>DOCUMENT ARCHIVE</Text>
            </View>
            {['Full Policy Disclosure (2024)', 'Summary of Benefits.pdf', 'Provider Directory v2.1'].map((doc, i) => (
              <View key={i} style={styles.docRow}>
                <Ionicons name="document-text-outline" size={18} color="rgba(255,255,255,0.4)" />
                <Text style={[styles.docName, { color: c.text }]}>{doc}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.downloadPdfsBtn}>
              <Text style={[styles.downloadPdfsText, { color: c.text }]}>DOWNLOAD PDFs</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* HDFC Ergo / Plan name */}
        <View style={[styles.section, { marginTop: 24 }]}>
          <Text style={styles.providerBrand}>HDFC Ergo</Text>
          <Text style={[styles.providerPlanName, { color: c.text }]}>{'Health Suraksha Policy\nSilver Plan'}</Text>
          <View style={styles.expiredBadge}>
            <View style={styles.expiredDot} />
            <Text style={styles.expiredText}>Expired (Nov 4, 2024)</Text>
          </View>
        </View>

        {/* Network Provider */}
        <TouchableOpacity
          style={[styles.collapsibleCard, { backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : 'rgba(255,255,255,0.8)', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }]}
          activeOpacity={0.8}
          onPress={() => setNetworkExpanded(!networkExpanded)}
        >
          <View style={{ gap: 8 }}>
            <View style={styles.collapsibleRow}>
              <Ionicons name="location" size={24} color="#6FFB85" />
              <Text style={[styles.collapsibleTitle, { color: c.text }]}>Network Provider</Text>
              <Ionicons
                name={networkExpanded ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={c.textSecondary}
                style={{ marginLeft: 'auto' }}
              />
            </View>
            <Text style={[styles.networkDesc, { color: '#AAAAAA' }]}>Access 12,000+ medical facilities for seamless care.</Text>
          </View>
          {networkExpanded && (
            <View style={styles.collapsibleContent}>
              <Text style={styles.networkCashless}>Cashless</Text>
              <Text style={[styles.networkSub, { color: '#AAAAAA' }]}>HOSPITALIZATION ENABLED</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Key Flags & Exclusions */}
        <TouchableOpacity
          style={[styles.collapsibleCard, { backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : 'rgba(255,255,255,0.8)', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }]}
          activeOpacity={0.8}
          onPress={() => setFlagsExpanded(!flagsExpanded)}
        >
          <View style={styles.collapsibleRow}>
            <Ionicons name="warning" size={20} color="#e2e2e2" />
            <Text style={[styles.flagsTitle, { color: c.text }]}>{`Key Flags & Exclusions`}</Text>
            <Ionicons
              name={flagsExpanded ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={c.textSecondary}
              style={{ marginLeft: 'auto' }}
            />
          </View>
          {flagsExpanded && (
            <View style={styles.flagsList}>
              {FLAGS.map((flag, i) => (
                <View key={i} style={styles.flagItem}>
                  <View style={styles.flagIconCircle}>
                    <Ionicons name="alert-circle-outline" size={16} color="#e2e2e2" />
                  </View>
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text style={[styles.flagTitle, { color: c.text }]}>{flag.title}</Text>
                    <Text style={[styles.flagDesc, { color: '#AAAAAA' }]}>{flag.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </TouchableOpacity>

        {/* Covered Conditions */}
        <TouchableOpacity
          style={[styles.coveredCard, { backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : 'rgba(255,255,255,0.8)', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }]}
          activeOpacity={0.8}
          onPress={() => setConditionsExpanded(!conditionsExpanded)}
        >
          <View style={styles.coveredHeader}>
            <View>
              <Text style={[styles.coveredTitle, { color: c.text }]}>Covered Conditions</Text>
              <Text style={[styles.coveredSubtitle, { color: c.textSecondary }]}>Comprehensive medical protection breakdown</Text>
            </View>
            <Ionicons
              name={conditionsExpanded ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={c.textSecondary}
            />
          </View>
          <View style={styles.totalBenefitsBadge}>
            <Ionicons name="checkmark-circle" size={14} color="#6FFB85" />
            <Text style={styles.totalBenefitsText}>10 TOTAL BENEFITS</Text>
          </View>
          {conditionsExpanded && (
            <View style={styles.conditionGrid}>
              {CONDITIONS.map((cond, i) => (
                <View key={i} style={[styles.conditionItem, { backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : 'rgba(0,0,0,0.03)', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }]}>
                  <View style={styles.conditionIconBox}>
                    <Ionicons name={(CONDITION_ICONS[cond] as any) || 'checkmark'} size={20} color={c.text} />
                  </View>
                  <Text style={[styles.conditionLabel, { color: c.text }]}>{cond}</Text>
                </View>
              ))}
            </View>
          )}
        </TouchableOpacity>

        {/* Policy Renewal Required */}
        <View style={[styles.renewalCard, { backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : 'rgba(255,255,255,0.8)', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }]}>
          <View style={styles.renewalContentRow}>
            <View style={styles.renewalIconBox}>
              <Ionicons name="refresh" size={24} color="#6FFB85" />
            </View>
            <View style={styles.renewalText}>
              <Text style={[styles.renewalTitle, { color: c.text }]}>Policy Renewal Required</Text>
              <Text style={[styles.renewalDesc, { color: c.textSecondary }]}>Renew within the grace period to keep your cumulative benefits.</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.renewBtn}>
            <Text style={styles.renewBtnText}>Renew Policy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Share Modal */}
      <Modal
        visible={showShareModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowShareModal(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setShowShareModal(false)}
          />
          <View style={[styles.shareSheet, { backgroundColor: isDark ? '#121212' : '#FFFFFF' }]}>
            <View style={styles.sheetHeader}>
              <Ionicons name="share-outline" size={22} color="#6FFB85" />
              <Text style={[styles.sheetTitle, { color: c.text }]}>Select files to share</Text>
            </View>

            <View style={styles.selectAllRow}>
              <TouchableOpacity style={styles.checkboxRow} onPress={toggleAll} activeOpacity={0.7}>
                <View style={[styles.checkbox, allSelected && styles.checkboxSelected]}>
                  {allSelected && <Ionicons name="checkmark" size={12} color="#141414" />}
                </View>
                <Text style={[styles.selectAllText, { color: c.text }]}>Select all</Text>
              </TouchableOpacity>
              <Text style={[styles.selectedCount, { color: c.text }]}>{selectedCount} files selected</Text>
            </View>

            <View style={[styles.rowDivider, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }]} />

            {shareFiles.map(file => (
              <TouchableOpacity
                key={file.id}
                style={styles.fileRow}
                onPress={() => toggleFile(file.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, file.selected && styles.checkboxSelected]}>
                  {file.selected && <Ionicons name="checkmark" size={12} color="#141414" />}
                </View>
                <View style={styles.fileIconWrap}>
                  <Ionicons name="document-text-outline" size={20} color="rgba(255,255,255,0.6)" />
                </View>
                <Text style={[styles.fileName, { color: c.text }]}>{file.name.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={[styles.shareBtnModal, selectedCount === 0 && styles.shareBtnDisabled]}
              activeOpacity={0.85}
              onPress={handleShare}
              disabled={selectedCount === 0}
            >
              <Text style={styles.shareBtnText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },
  headerRight: { flexDirection: 'row', gap: 16, alignItems: 'center' },

  // Insurance Card
  insuranceCard: {
    marginHorizontal: 21,
    borderRadius: 33,
    borderWidth: 1,
    paddingTop: 33,
    paddingBottom: 29,
    paddingHorizontal: 33,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
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
  },
  activeBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#6FFB85',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  cardNameBlock: { marginBottom: 24 },
  cardPlanName: {
    fontSize: 24,
    fontFamily: 'Inter',
    fontWeight: '700',
    lineHeight: 32,
    letterSpacing: -0.6,
  },
  cardSubPlan: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: 'rgba(255,255,255,0.3)',
    marginTop: 4,
  },
  cardMetaRow: { flexDirection: 'row', gap: 32, marginBottom: 16 },
  cardMetaItem: { flex: 1 },
  cardMetaLabel: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  cardMetaValue: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  cardHolder: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: 28,
  },

  // Sections
  section: { marginHorizontal: 25, marginBottom: 24 },
  detailsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionMicro: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#AAAAAA',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  coverageCard: {
    borderRadius: 33,
    borderWidth: 1,
    paddingHorizontal: 33,
    paddingVertical: 33,
    gap: 24,
  },
  coverageField: {
    gap: 4,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: '#AAAAAA',
  },
  fieldBigValue: {
    fontSize: 30,
    fontWeight: '700',
    fontFamily: 'Inter',
    letterSpacing: -0.75,
  },

  // HDFC Ergo Section
  providerBrand: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#6FFB85',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  providerPlanName: {
    fontSize: 30,
    fontWeight: '700',
    fontFamily: 'Inter',
    letterSpacing: -0.75,
    marginBottom: 16,
  },
  expiredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(219,80,52,0.2)',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(255,180,171,0.2)',
    paddingHorizontal: 21,
    paddingVertical: 11,
    alignSelf: 'stretch',
  },
  expiredDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#DB5034' },
  expiredText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#DB5034',
    letterSpacing: 0.35,
  },

  // Document Archive
  docArchiveCard: {
    borderRadius: 40,
    borderWidth: 1,
    paddingHorizontal: 33,
    paddingVertical: 33,
    gap: 24,
  },
  docArchiveHeader: { marginBottom: 4 },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 4,
  },
  docName: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  downloadPdfsBtn: {
    marginTop: 8,
    borderRadius: 153,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(23,23,23,0.4)',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadPdfsText: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Manrope',
    textTransform: 'uppercase',
  },

  // Collapsible cards
  collapsibleCard: {
    marginHorizontal: 25,
    borderRadius: 33,
    borderWidth: 1,
    paddingHorizontal: 32,
    paddingVertical: 32,
    marginBottom: 12,
  },
  collapsibleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  collapsibleTitle: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
    letterSpacing: -0.6,
  },
  flagsTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    letterSpacing: 0,
  },
  collapsibleContent: { marginTop: 24, gap: 4 },
  networkCashless: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#6FFB85',
    letterSpacing: -0.6,
  },
  networkSub: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  networkDesc: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Inter',
  },
  flagsList: { marginTop: 24, gap: 24 },
  flagItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 16 },
  flagIconCircle: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  flagTitle: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Manrope',
    textTransform: 'capitalize',
  },
  flagDesc: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
  },

  // Covered Conditions
  coveredCard: {
    marginHorizontal: 25,
    borderRadius: 33,
    borderWidth: 1,
    paddingHorizontal: 32,
    paddingVertical: 32,
    marginBottom: 12,
    overflow: 'hidden',
  },
  coveredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  coveredTitle: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
    letterSpacing: -0.6,
  },
  coveredSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
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
    marginBottom: 24,
  },
  totalBenefitsText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#6FFB85',
  },
  conditionGrid: { gap: 10 },
  conditionItem: {
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 25,
    paddingVertical: 16,
  },
  conditionIconBox: { width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  conditionLabel: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Manrope',
  },

  // Renewal
  renewalCard: {
    marginHorizontal: 25,
    borderRadius: 33,
    borderWidth: 1,
    paddingHorizontal: 33,
    paddingTop: 41,
    paddingBottom: 33,
    gap: 24,
    marginBottom: 40,
  },
  renewalContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  renewalIconBox: {
    width: 52,
    height: 52,
    backgroundColor: 'rgba(111,251,133,0.1)',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  renewalText: { flex: 1, gap: 4 },
  renewalTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  renewalDesc: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: 16,
  },
  renewBtn: {
    width: '100%',
    backgroundColor: '#6FFB85',
    borderRadius: 9999,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  renewBtnText: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#141414',
  },

  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 0,
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  shareSheet: {
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(23,23,23,0.4)',
    paddingHorizontal: 33,
    paddingTop: 40,
    paddingBottom: 40,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  selectAllRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#6FFB85',
    borderColor: '#6FFB85',
  },
  selectAllText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Manrope',
  },
  selectedCount: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Manrope',
  },
  rowDivider: {
    height: 1,
    marginBottom: 16,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  fileIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileName: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Manrope',
    flex: 1,
  },
  shareBtnModal: {
    marginTop: 24,
    backgroundColor: '#6FFB85',
    borderRadius: 33,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareBtnDisabled: {
    opacity: 0.4,
  },
  shareBtnText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#141414',
  },
});
;
