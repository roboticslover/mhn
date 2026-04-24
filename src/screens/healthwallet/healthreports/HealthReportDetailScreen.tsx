import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';

const REPORT_IMAGE = 'https://www.figma.com/api/mcp/asset/7dd346e3-354c-44de-a2e4-076a7211d943';

type SectionKey = 'biomarkers' | 'riskPatterns' | 'suggestions';

interface BiomarkerRowProps {
  label: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  c: any;
}

function BiomarkerRow({ label, value, unit, status, c }: BiomarkerRowProps) {
  const dotColor = status === 'normal' ? c.primary : status === 'warning' ? c.warning : c.error;
  return (
    <View style={styles.biomarkerRow}>
      <View style={[styles.biomarkerDot, { backgroundColor: dotColor }]} />
      <Text style={[styles.biomarkerLabel, { color: c.textSecondary }]}>{label}</Text>
      <View style={styles.biomarkerRight}>
        <Text style={[styles.biomarkerValue, { color: c.text }]}>{value}</Text>
        <Text style={[styles.biomarkerUnit, { color: c.textSecondary }]}>{unit}</Text>
      </View>
    </View>
  );
}

interface RecommendationCardProps {
  icon: string;
  iconBg: string;
  title: string;
  description: string;
  c: any;
}

function RecommendationCard({ icon, iconBg, title, description, c }: RecommendationCardProps) {
  return (
    <View style={[styles.recCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
      <View style={[styles.recIconWrap, { backgroundColor: iconBg }]}>
        <Ionicons name={icon as any} size={20} color={c.primary} />
      </View>
      <Text style={[styles.recTitle, { color: c.textSubheading }]}>{title}</Text>
      <Text style={[styles.recDesc, { color: c.textSecondary }]}>{description}</Text>
    </View>
  );
}

export default function HealthReportDetailScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [isPrivate, setIsPrivate] = useState(false);
  const [expandedSection, setExpandedSection] = useState<SectionKey | null>('biomarkers');

  const toggleSection = (key: SectionKey) =>
    setExpandedSection(prev => (prev === key ? null : key));

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 28, paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text }]}>Report Analytics</Text>
          <TouchableOpacity onPress={() => navigation.navigate('HealthReportEdit')} style={styles.editBtn}>
            <Ionicons name="create-outline" size={20} color={c.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Report header section */}
        <View style={styles.reportHeaderSection}>
          <View style={styles.reportHeaderLeft}>
            {/* Tags */}
            <View style={styles.tagsRow}>
              <View style={[styles.tag, { backgroundColor: isDark ? 'rgba(52,199,89,0.16)' : c.successSoft }]}>
                <Text style={[styles.tagText, { color: c.primary }]}>PUBLIC</Text>
              </View>
              <View style={[styles.tag, { backgroundColor: isDark ? '#1F1F1F' : c.divider }]}>
                <Text style={[styles.tagText, { color: c.textSecondary }]}>BLOOD REPORT</Text>
              </View>
            </View>
            {/* Title */}
            <Text style={[styles.reportTitle, { color: c.text }]}>Apollo Blood Test</Text>
          </View>

          {/* Right meta */}
          <View style={styles.reportHeaderRight}>
            <Text style={[styles.metaLabel, { color: c.textSecondary }]}>REFERENCE ID</Text>
            <Text style={[styles.metaValue, { color: c.text }]}>#AB-2024-99812</Text>
            <Text style={[styles.metaLabel, { color: c.primary, marginTop: 12 }]}>DATE OF ANALYSIS</Text>
            <Text style={[styles.metaDate, { color: c.text }]}>OCT 14, 2024</Text>
          </View>
        </View>

        {/* Report Document Image */}
        <View style={[styles.reportDocWrap, { borderColor: c.cardGlassBorder }]}>
          <Image
            source={{ uri: REPORT_IMAGE }}
            style={styles.reportDocImage}
            resizeMode="cover"
          />
        </View>

        {/* Privacy Toggle */}
        <View style={[styles.privacyCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
          <View style={styles.privacyLeft}>
            <Ionicons name="share-social-outline" size={20} color={c.textSecondary} />
            <Text style={[styles.privacyLabel, { color: isDark ? '#E5E5E5' : c.text }]}>
              keep this report private
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.switchTrack,
              { backgroundColor: isPrivate ? c.error : (isDark ? '#333' : c.divider) },
            ]}
            onPress={() => setIsPrivate(!isPrivate)}
            activeOpacity={0.8}
          >
            <View style={[styles.switchThumb, isPrivate ? { right: 4 } : { left: 4 }]} />
          </TouchableOpacity>
        </View>

        {/* AI Score */}
        <View style={styles.scoreSection}>
          <Text style={[styles.scoreSectionLabel, { color: c.textSecondary }]}>Score</Text>
          <View style={styles.scoreRow}>
            {/* Circular score indicator */}
            <View style={styles.scoreCircleWrap}>
              <View style={[styles.scoreCircleOuter, { borderColor: c.error + '60' }]}>
                <View style={[styles.scoreCircleInner, { borderColor: c.error }]}>
                  <Text style={[styles.scoreNumber, { color: c.text }]}>45</Text>
                  <Text style={[styles.scoreTotal, { color: c.textSecondary }]}>/100</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Insight Label */}
        <View style={styles.insightLabelWrap}>
          <Text style={[styles.insightLabel, { color: c.textSecondary }]}>Impact Synopsis</Text>
        </View>

        {/* Critical Alert */}
        <View style={[styles.criticalAlert, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
          <Text style={[styles.criticalTitle, { color: c.error }]}>
            Critical Synaptic{'\n'}Decline Detected.
          </Text>
          <Text style={[styles.criticalDesc, { color: c.textSecondary }]}>
            This 35-year-old male shows a concerning metabolic profile with multi-directional abnormalities and elevated triglycerides. High obesity risk suggests this individual has an elevated need for intervention to prevent systemic cascades.
          </Text>
          <TouchableOpacity>
            <Text style={[styles.readMoreLink, { color: c.primary }]}>Read more</Text>
          </TouchableOpacity>
        </View>

        {/* Biomarkers Breakdown */}
        <View style={styles.sectionWrap}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('biomarkers')}
            activeOpacity={0.7}
          >
            <Text style={[styles.sectionTitle, { color: c.text }]}>Biomarkers{'\n'}Breakdown</Text>
            <Ionicons
              name={expandedSection === 'biomarkers' ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={c.textSecondary}
            />
          </TouchableOpacity>

          {expandedSection === 'biomarkers' && (
            <View>
              {/* Blood Glucose sub-card */}
              <View style={[styles.bioSubCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
                <View style={styles.bioSubHeader}>
                  <Text style={[styles.bioSubTitle, { color: c.text }]}>Blood Glucose</Text>
                  <Ionicons name="chevron-forward" size={16} color={c.textSecondary} />
                </View>
                <BiomarkerRow label="Fasting Glucose" value="126" unit="mg/dL" status="critical" c={c} />
                <BiomarkerRow label="HbA1c" value="7.2" unit="%" status="warning" c={c} />
              </View>

              {/* Lipid Profile sub-card */}
              <View style={[styles.bioSubCard, { backgroundColor: c.card, borderColor: c.primary + '40' }]}>
                <View style={styles.bioSubHeader}>
                  <Text style={[styles.bioSubTitle, { color: c.text }]}>Lipid Profile</Text>
                  <Ionicons name="chevron-forward" size={16} color={c.textSecondary} />
                </View>
                <BiomarkerRow label="Total Cholesterol" value="210" unit="mg/dL" status="warning" c={c} />
                <BiomarkerRow label="LDL" value="140" unit="mg/dL" status="critical" c={c} />
                <BiomarkerRow label="HDL" value="45" unit="mg/dL" status="normal" c={c} />
              </View>

              {/* Vitamins & Minerals */}
              <View style={[styles.bioSubCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
                <View style={styles.bioSubHeader}>
                  <Text style={[styles.bioSubTitle, { color: c.text }]}>Vitamins & Minerals</Text>
                  <Ionicons name="chevron-forward" size={16} color={c.textSecondary} />
                </View>
                <BiomarkerRow label="Vitamin D" value="18" unit="ng/mL" status="warning" c={c} />
                <BiomarkerRow label="Iron" value="Normal" unit="" status="normal" c={c} />
              </View>
            </View>
          )}
        </View>

        {/* Risk Patterns */}
        <View style={styles.sectionWrap}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('riskPatterns')}
            activeOpacity={0.7}
          >
            <Text style={[styles.sectionTitle, { color: c.text }]}>Risk Patterns</Text>
            <Ionicons
              name={expandedSection === 'riskPatterns' ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={c.textSecondary}
            />
          </TouchableOpacity>

          {expandedSection === 'riskPatterns' && (
            <View style={styles.riskPatternsGrid}>
              <View style={[styles.riskCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
                <Text style={[styles.riskCardTitle, { color: c.error }]}>Metabolic Dysbiosis Posture</Text>
                <Text style={[styles.riskCardDesc, { color: c.textSecondary }]}>
                  Data aligns with fasting patterns consistent with metabolic syndrome trajectories.
                </Text>
              </View>
              <View style={[styles.riskCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
                <Text style={[styles.riskCardTitle, { color: c.warning }]}>Lipid Oxidation Cluster</Text>
                <Text style={[styles.riskCardDesc, { color: c.textSecondary }]}>
                  Triglyceride-to-HDL ratio suggests elevated cardiovascular risk profile.
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Suggestions */}
        <View style={styles.sectionWrap}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('suggestions')}
            activeOpacity={0.7}
          >
            <Text style={[styles.sectionTitle, { color: c.text }]}>Suggestions</Text>
            <View style={[styles.suggCountBadge, { backgroundColor: c.accentSoft }]}>
              <Text style={[styles.suggCountText, { color: c.primary }]}>3</Text>
            </View>
            <Ionicons
              name={expandedSection === 'suggestions' ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={c.textSecondary}
            />
          </TouchableOpacity>

          {expandedSection === 'suggestions' && (
            <View style={styles.recGrid}>
              <RecommendationCard
                icon="person-outline"
                iconBg={c.accentSoft}
                title="Consult Endocrinologist"
                description="Review hormonal drivers of the observed insulin resistance."
                c={c}
              />
              <RecommendationCard
                icon="medical-outline"
                iconBg={isDark ? 'rgba(255,149,0,0.1)' : 'rgba(255,146,0,0.1)'}
                title="Medication Review"
                description="Review current medications with provider."
                c={c}
              />
              <RecommendationCard
                icon="leaf-outline"
                iconBg={isDark ? 'rgba(209,252,0,0.1)' : 'rgba(57,166,87,0.1)'}
                title="Dietary Adjustment"
                description="Transition to high-fiber, low-glycemic index protocol."
                c={c}
              />
            </View>
          )}
        </View>

        {/* Share Button */}
        <TouchableOpacity
          style={[styles.shareBtn, { backgroundColor: c.primary }]}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('HealthReportShare')}
        >
          <Ionicons name="share-outline" size={20} color={c.textOnPrimary} />
          <Text style={[styles.shareBtnText, { color: c.textOnPrimary }]}>Share</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 29,
    paddingBottom: 16,
  },
  backBtn: { width: 22, alignItems: 'center' },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  editBtn: { width: 22, alignItems: 'center' },
  reportHeaderSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 31,
    marginBottom: 20,
  },
  reportHeaderLeft: {
    flex: 1,
    gap: 16,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  reportTitle: {
    fontSize: 30,
    fontWeight: '700',
    fontFamily: 'Inter',
    letterSpacing: -0.75,
    lineHeight: 36,
  },
  reportHeaderRight: {
    alignItems: 'flex-end',
    paddingTop: 4,
  },
  metaLabel: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    letterSpacing: 0,
    lineHeight: 16,
  },
  metaValue: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    lineHeight: 28,
  },
  metaDate: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Manrope',
    lineHeight: 24,
    textTransform: 'uppercase',
  },
  reportDocWrap: {
    marginHorizontal: 24,
    borderRadius: 24,
    borderWidth: 1,
    height: 200,
    overflow: 'hidden',
    marginBottom: 16,
  },
  reportDocImage: {
    width: '100%',
    height: '100%',
  },
  privacyCard: {
    marginHorizontal: 24,
    borderRadius: 33,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 33,
    paddingVertical: 18,
    marginBottom: 24,
  },
  privacyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  privacyLabel: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: 16,
  },
  switchTrack: {
    width: 48,
    height: 24,
    borderRadius: 12,
    position: 'relative',
    justifyContent: 'center',
  },
  switchThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#141414',
    position: 'absolute',
  },
  scoreSection: {
    paddingHorizontal: 31,
    marginBottom: 8,
  },
  scoreSectionLabel: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
    letterSpacing: -0.6,
    marginBottom: 16,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreCircleWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreCircleOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreCircleInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNumber: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'Inter',
    lineHeight: 34,
  },
  scoreTotal: {
    fontSize: 10,
    fontFamily: 'Inter',
  },
  insightLabelWrap: {
    paddingHorizontal: 31,
    marginBottom: 12,
    marginTop: 8,
  },
  insightLabel: {
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Inter',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  criticalAlert: {
    marginHorizontal: 24,
    borderRadius: 33,
    borderWidth: 1,
    padding: 24,
    marginBottom: 20,
    gap: 12,
  },
  criticalTitle: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
    letterSpacing: -0.6,
    lineHeight: 32,
  },
  criticalDesc: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    lineHeight: 24,
  },
  readMoreLink: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  sectionWrap: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
    letterSpacing: -0.6,
    lineHeight: 32,
    flex: 1,
  },
  bioSubCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    marginBottom: 10,
  },
  bioSubHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  bioSubTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  biomarkerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 10,
  },
  biomarkerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  biomarkerLabel: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter',
  },
  biomarkerRight: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  biomarkerValue: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  biomarkerUnit: {
    fontSize: 10,
    fontFamily: 'Inter',
  },
  riskPatternsGrid: {
    gap: 10,
  },
  riskCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    gap: 8,
  },
  riskCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter',
    lineHeight: 24,
  },
  riskCardDesc: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: 20,
  },
  suggCountBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggCountText: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  recGrid: {
    gap: 10,
  },
  recCard: {
    borderRadius: 33,
    borderWidth: 1,
    padding: 24,
    gap: 8,
  },
  recIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  recTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    lineHeight: 28,
  },
  recDesc: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    lineHeight: 24,
  },
  shareBtn: {
    marginHorizontal: 24,
    marginTop: 8,
    height: 58,
    borderRadius: 33,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: 'rgba(0,110,40,0.3)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 6,
  },
  shareBtnText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
});
