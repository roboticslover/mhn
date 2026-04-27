import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Switch,
  Modal,
  Share,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';

const REPORT_IMAGE = 'https://www.figma.com/api/mcp/asset/5756f8fe-8f54-4fc8-93a2-40df97c6e6b1';

type ViewMode = 'loading' | 'loaded';
type SectionKey = 'biomarkers' | 'riskPatterns' | 'suggestions';

/* ─── BiomarkerRow ─── */
function BiomarkerRow({ label, value, unit, status, c }: {
  label: string; value: string; unit: string;
  status: 'normal' | 'warning' | 'critical'; c: any;
}) {
  const col = status === 'normal' ? c.primary : status === 'warning' ? c.warning : c.error;
  return (
    <View style={styles.bioRow}>
      <View style={[styles.bioDot, { backgroundColor: col }]} />
      <Text style={[styles.bioLbl, { color: c.textSecondary }]}>{label}</Text>
      <View style={styles.bioRight}>
        <Text style={[styles.bioVal, { color: c.text }]}>{value}</Text>
        {unit ? <Text style={[styles.bioUnit, { color: c.textSecondary }]}>{unit}</Text> : null}
        <View style={[styles.bioBadge, { backgroundColor: col + '28' }]}>
          <Text style={[styles.bioBadgeTxt, { color: col }]}>
            {status === 'normal' ? 'Normal' : status === 'warning' ? 'High' : 'Critical'}
          </Text>
        </View>
      </View>
    </View>
  );
}

/* ─── RecommendationCard ─── */
function RecommendationCard({ icon, iconBg, iconColor, title, desc, c }: {
  icon: string; iconBg: string; iconColor: string;
  title: string; desc: string; c: any;
}) {
  return (
    <View style={[styles.recCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
      <View style={[styles.recIconWrap, { backgroundColor: iconBg }]}>
        <Ionicons name={icon as any} size={20} color={iconColor} />
      </View>
      <Text style={[styles.recTitle, { color: c.background === '#000000' ? '#E2E2E2' : c.textSubheading }]}>{title}</Text>
      <Text style={[styles.recDesc, { color: c.textSecondary }]}>{desc}</Text>
    </View>
  );
}

export default function HealthReportDetailScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [isPrivate, setIsPrivate] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('loading');
  const [expandedSection, setExpandedSection] = useState<SectionKey | null>('biomarkers');
  const [showShare, setShowShare] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const files = [
    { id: '1', name: '818786755-CBC-REPORT.PDF' },
  ];

  const toggleFile = (id: string) => {
    setSelectedFiles(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedFiles([]);
      setSelectAll(false);
    } else {
      setSelectedFiles(files.map(f => f.id));
      setSelectAll(true);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        title: 'Apollo Blood Test — Report Analytics',
        message: 'Apollo Blood Test (#AB-2024-99812) — Date of Analysis: Oct 14, 2024',
      });
    } catch (_) {}
  };

  const toggleSection = (key: SectionKey) =>
    setExpandedSection(prev => (prev === key ? null : key));

  const cardBg = isDark ? 'rgba(23,23,23,0.4)' : c.card;
  const border = c.cardGlassBorder;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16, paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={24} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text }]} numberOfLines={1}>Report Analytics</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={[styles.headerIconBtn, { borderColor: isDark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.15)' }]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('HealthReportEdit')}
            >
              <Ionicons name="create-outline" size={18} color={isDark ? 'rgba(255,255,255,0.55)' : c.textMuted} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.headerIconBtn, { borderColor: isDark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.15)' }]}
              activeOpacity={0.7}
              onPress={() => setShowShare(true)}
            >
              <Ionicons name="share-outline" size={18} color={isDark ? 'rgba(255,255,255,0.55)' : c.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Tags + Title + Meta ── */}
        <View style={[styles.metaBlock, { paddingHorizontal: 24 }]}>
          {/* Tags row */}
          <View style={styles.tagsRow}>
            <View style={[styles.tag, { backgroundColor: isDark ? 'rgba(52,199,89,0.18)' : 'rgba(57,166,87,0.14)' }]}>
              <Text style={[styles.tagText, { color: c.primary }]}>PUBLIC</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: isDark ? '#1F1F1F' : '#E8E8E8' }]}>
              <Text style={[styles.tagText, { color: isDark ? '#AAAAAA' : '#666666' }]}>BLOOD REPORT</Text>
            </View>
          </View>

          {/* Big title */}
          <Text style={[styles.reportTitle, { color: c.text }]}>Apollo Blood Test</Text>

          {/* Reference + Date — right-aligned */}
          <View style={styles.metaRight}>
            <Text style={[styles.metaLabel, { color: isDark ? '#AAAAAA' : '#888888' }]}>REFERENCE ID</Text>
            <Text style={[styles.metaId, { color: c.text }]}>#AB-2024-99812</Text>
            <Text style={[styles.metaLabel, { color: c.primary, marginTop: 10 }]}>DATE OF ANALYSIS</Text>
            <Text style={[styles.metaDate, { color: c.text }]}>OCT 14, 2024</Text>
          </View>
        </View>

        {/* ── Report Image ── */}
        <View style={[styles.imgWrap, {
          shadowColor: isDark ? '#000' : '#AABBCC',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: isDark ? 0.5 : 0.2,
          shadowRadius: 10,
          elevation: 6,
        }]}>
          <Image source={{ uri: REPORT_IMAGE }} style={styles.reportImg} resizeMode="cover" />
        </View>

        {/* ── Mode Toggle (Loading / Loaded) ── */}
        <View style={styles.modeSwitchRow}>
          <TouchableOpacity
            style={[styles.modeBtn, { backgroundColor: viewMode === 'loading' ? c.primary : cardBg, borderColor: border }]}
            onPress={() => setViewMode('loading')}
            activeOpacity={0.8}
          >
            <Text style={[styles.modeBtnTxt, { color: viewMode === 'loading' ? (isDark ? '#141414' : '#fff') : c.textSecondary }]}>Loading State</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeBtn, { backgroundColor: viewMode === 'loaded' ? c.primary : cardBg, borderColor: border }]}
            onPress={() => setViewMode('loaded')}
            activeOpacity={0.8}
          >
            <Text style={[styles.modeBtnTxt, { color: viewMode === 'loaded' ? (isDark ? '#141414' : '#fff') : c.textSecondary }]}>Insights Loaded</Text>
          </TouchableOpacity>
        </View>

        {/* ── Privacy Toggle ── */}
        <View style={[styles.privacyCard, { backgroundColor: cardBg, borderColor: border }]}>
          <View style={styles.privacyLeft}>
            <Ionicons name="share-social-outline" size={18} color={c.textSecondary} />
            <Text style={[styles.privacyLabel, { color: isDark ? '#E5E5E5' : c.text }]}>
              keep this report private
            </Text>
          </View>
          <Switch
            value={isPrivate}
            onValueChange={setIsPrivate}
            trackColor={{ false: isDark ? '#333' : '#D1D5DB', true: c.error }}
            thumbColor={isDark ? '#141414' : '#FFFFFF'}
            ios_backgroundColor={isDark ? '#333' : '#D1D5DB'}
          />
        </View>

        {viewMode === 'loading' ? (
          <>
            {/* Thinking Card */}
            <View style={[styles.thinkingCard, { backgroundColor: cardBg, borderColor: border }]}>
              <View style={[styles.thinkingIconWrap, { backgroundColor: isDark ? 'rgba(111,251,133,0.12)' : c.accentSoft }]}>
                <Ionicons name="refresh-outline" size={30} color={c.primary} />
              </View>
              <Text style={[styles.thinkingTitle, { color: c.text }]}>Thinking</Text>
              <Text style={[styles.thinkingDesc, { color: c.textSecondary }]}>
                This process may take a few moments,{'\n'}feel free to come back later!
              </Text>
            </View>

            {/* Name Mismatch (dashed red border) */}
            <View style={[styles.dashedCard, { borderColor: c.error }]}>
              <View style={styles.mismatchTop}>
                <Ionicons name="warning-outline" size={22} color={c.error} />
                <Text style={[styles.mismatchTitle, { color: c.error }]}>Name Mismatch</Text>
              </View>
              <Text style={[styles.mismatchDesc, { color: c.textSecondary }]}>
                Are you sure this is your record?
              </Text>
              <View style={styles.mismatchBtns}>
                <TouchableOpacity style={[styles.yesBtn, { backgroundColor: c.primary }]} activeOpacity={0.85}>
                  <Text style={[styles.yesBtnTxt, { color: isDark ? '#141414' : '#fff' }]}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.noBtn, { backgroundColor: cardBg, borderColor: border }]} activeOpacity={0.85}>
                  <Text style={[styles.noBtnTxt, { color: c.error }]}>No</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Failed to Generate Insights (dashed red border) */}
            <View style={[styles.dashedCard, styles.failedCard, { borderColor: c.error }]}>
              <Ionicons name="warning-outline" size={22} color={c.error} />
              <Text style={[styles.failedTxt, { color: c.error }]}>Failed to Generate Insights</Text>
            </View>
          </>
        ) : (
          <>
            {/* ══════════════════════════════════════
                CRITICAL SYNAPTIC DECLINE SECTION
            ═══════════════════════════════════════ */}
            <View style={styles.insightBlock}>
              {/* "report insights" small label */}
              <Text style={[styles.insightSmallLbl, { color: c.textSecondary }]}>report insights</Text>

              {/* Big title */}
              <Text style={[styles.insightBigTitle, { color: c.text }]}>
                Critical Synaptic{'\n'}Decline Detected.
              </Text>

              {/* Body */}
              <Text style={[styles.insightBodyTxt, { color: c.textSecondary }]}>
                This 35-year-old male shows a concerning metabolic profile with multiple interlinked abnormalities including hyperinsulinemia and elevated triglycerides. High-velocity biomarkers suggest an immediate need for intervention to prevent systemic cascades.
              </Text>

              {/* HIGH RISK badge */}
              <View style={[styles.highRiskBadge, { backgroundColor: c.error + '22', borderColor: c.error + '55', borderWidth: 1 }]}>
                <Text style={[styles.highRiskTxt, { color: c.error }]}>HIGH RISK</Text>
              </View>
            </View>

            {/* ═══════════════════════════════════════
                REPORT INSIGHTS — CATEGORY CARDS
            ═══════════════════════════════════════ */}
            <View style={styles.insightBlock}>
              <Text style={[styles.insightSectionHdr, { color: c.text }]}>Report Insights</Text>

              {/* Blood Glucose — 3 FLAGGED → */}
              <TouchableOpacity
                style={[styles.catCard, { backgroundColor: isDark ? '#111' : c.card, borderColor: border }]}
                activeOpacity={0.8}
              >
                <View style={[styles.catIconWrap, { backgroundColor: isDark ? '#1A1A1A' : c.divider }]}>
                  <Ionicons name="water-outline" size={22} color={c.textSecondary} />
                </View>
                <View style={styles.catInfo}>
                  <Text style={[styles.catLabel, { color: c.textSecondary }]}>CATEGORY</Text>
                  <Text style={[styles.catTitle, { color: c.text }]}>Blood Glucose</Text>
                </View>
                <View style={[styles.flaggedPill, { backgroundColor: c.error }]}>
                  <Text style={styles.flaggedTxt}>3 FLAGGED</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={c.textSecondary} style={{ marginLeft: 4 }} />
              </TouchableOpacity>

              {/* Lipid Profile — 3 FLAGGED → */}
              <TouchableOpacity
                style={[styles.catCard, { backgroundColor: isDark ? '#111' : c.card, borderColor: border }]}
                activeOpacity={0.8}
              >
                <View style={[styles.catIconWrap, { backgroundColor: isDark ? '#1A1A1A' : c.divider }]}>
                  <Ionicons name="git-branch-outline" size={22} color={c.textSecondary} />
                </View>
                <View style={styles.catInfo}>
                  <Text style={[styles.catLabel, { color: c.textSecondary }]}>CATEGORY</Text>
                  <Text style={[styles.catTitle, { color: c.text }]}>Lipid Profile</Text>
                </View>
                <View style={[styles.flaggedPill, { backgroundColor: c.error }]}>
                  <Text style={styles.flaggedTxt}>3 FLAGGED</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={c.textSecondary} style={{ marginLeft: 4 }} />
              </TouchableOpacity>

              {/* Vitamins & Minerals — IDEAL, expandable */}
              <View style={[styles.catCard, styles.catCardExpanded, { backgroundColor: isDark ? '#111' : c.card, borderColor: border }]}>
                <View style={styles.catCardTop}>
                  <View style={[styles.catIconWrap, { backgroundColor: isDark ? '#1A1A1A' : c.divider }]}>
                    <Ionicons name="flask-outline" size={22} color={c.textSecondary} />
                  </View>
                  <View style={styles.catInfo}>
                    <Text style={[styles.catLabel, { color: c.textSecondary }]}>CATEGORY</Text>
                    <Text style={[styles.catTitle, { color: c.text }]}>Vitamins &{'\n'}Minerals</Text>
                  </View>
                  <View style={[styles.idealPill, { backgroundColor: isDark ? '#2A2A2A' : c.divider, borderColor: border, borderWidth: 1 }]}>
                    <Text style={[styles.idealTxt, { color: c.textSecondary }]}>IDEAL</Text>
                  </View>
                  <Ionicons name="chevron-down" size={18} color={c.textSecondary} style={{ marginLeft: 4 }} />
                </View>

                {/* Expanded biomarker rows */}
                <View style={styles.catRows}>
                  <BiomarkerRow label="Vitamin D (25-OH)" value="28.5" unit="NG/ML" status="warning" c={c} />
                  <BiomarkerRow label="Vitamin B12" value="840" unit="PG/ML" status="normal" c={c} />
                  <BiomarkerRow label="Magnesium (RBC)" value="6.2" unit="MG/DL" status="normal" c={c} />
                  <BiomarkerRow label="Zinc" value="74" unit="MCG/DL" status="warning" c={c} />
                </View>

                <TouchableOpacity style={styles.seeAllRow} activeOpacity={0.7}>
                  <Text style={[styles.seeAllTxt, { color: c.text }]}>See all</Text>
                  <Ionicons name="chevron-down" size={14} color={c.text} />
                </TouchableOpacity>
              </View>
            </View>

            {/* ═══════════════════════════════════════
                RISK PATTERNS
            ═══════════════════════════════════════ */}
            <View style={styles.insightBlock}>
              {/* "Neural Insight" orange small label */}
              <Text style={[styles.neuralLbl, { color: c.warning }]}>Neural Insight</Text>

              <Text style={[styles.insightBigTitle, { color: c.text }]}>Risk Patterns</Text>

              <Text style={[styles.insightBodyTxt, { color: c.textSecondary }]}>
                System-wide analysis suggests significant correlation with metabolic syndrome trajectories.
              </Text>

              {/* Risk pattern cards with orange left border bar */}
              <View style={styles.riskCardsWrap}>
                <View style={[styles.riskAccentCard, { backgroundColor: isDark ? '#0E0E0E' : c.card, borderColor: border }]}>
                  <View style={[styles.riskAccentBar, { backgroundColor: c.error }]} />
                  <View style={styles.riskAccentContent}>
                    <Text style={[styles.riskAccentTitle, { color: c.text }]}>
                      Pre-Diabetic Syndrome{'\n'}Pattern
                    </Text>
                    <Text style={[styles.riskAccentDesc, { color: c.textSecondary }]}>
                      Detected via fasting glucose (115 mg/dL) and HbA1c (6.2%) drift. Immediate glycemic management required.
                    </Text>
                  </View>
                </View>

                <View style={[styles.riskAccentCard, { backgroundColor: isDark ? '#0E0E0E' : c.card, borderColor: border }]}>
                  <View style={[styles.riskAccentBar, { backgroundColor: c.error }]} />
                  <View style={styles.riskAccentContent}>
                    <Text style={[styles.riskAccentTitle, { color: c.text }]}>Lipid Oxidation Cluster</Text>
                    <Text style={[styles.riskAccentDesc, { color: c.textSecondary }]}>
                      Elevated small-dense LDL particles coupled with low HDL suggests inflammatory vascular pressure.
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* ═══════════════════════════════════════
                SUGGESTIONS
            ═══════════════════════════════════════ */}
            <View style={styles.insightBlock}>
              <View style={styles.suggHdrRow}>
                <Text style={[styles.insightBigTitle, { color: c.text }]}>Suggestions</Text>
                <Text style={[styles.clinicalRoadmapLbl, { color: c.textSecondary }]}>Clinical Roadmap</Text>
              </View>

              {/* Suggestion cards — tall, icon top-left */}
              <View style={styles.suggGrid}>
                <View style={[styles.suggCard, { backgroundColor: isDark ? '#0E0E0E' : c.card, borderColor: border }]}>
                  <View style={[styles.suggIconWrap, { backgroundColor: isDark ? 'rgba(111,251,133,0.12)' : c.accentSoft }]}>
                    <Ionicons name="medkit-outline" size={22} color={c.primary} />
                  </View>
                  <Text style={[styles.suggTitle, { color: c.text }]}>Consult Endocrinologist</Text>
                  <Text style={[styles.suggDesc, { color: c.textSecondary }]}>
                    Review hormonal drivers of the observed insulin resistance.
                  </Text>
                </View>

                <View style={[styles.suggCard, { backgroundColor: isDark ? '#0E0E0E' : c.card, borderColor: border }]}>
                  <View style={[styles.suggIconWrap, { backgroundColor: isDark ? 'rgba(111,251,133,0.12)' : c.accentSoft }]}>
                    <Ionicons name="clipboard-outline" size={22} color={c.primary} />
                  </View>
                  <Text style={[styles.suggTitle, { color: c.text }]}>Medication Review</Text>
                  <Text style={[styles.suggDesc, { color: c.textSecondary }]}>
                    Re-evaluate current lipid-lowering protocols with provider.
                  </Text>
                </View>

                <View style={[styles.suggCard, { backgroundColor: isDark ? '#0E0E0E' : c.card, borderColor: border }]}>
                  <View style={[styles.suggIconWrap, { backgroundColor: isDark ? 'rgba(111,251,133,0.12)' : c.accentSoft }]}>
                    <Ionicons name="restaurant-outline" size={22} color={c.primary} />
                  </View>
                  <Text style={[styles.suggTitle, { color: c.text }]}>Dietary Adjustment</Text>
                  <Text style={[styles.suggDesc, { color: c.textSecondary }]}>
                    Transition to high-fiber, low-glycemic index protocol.
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}

      </ScrollView>

      {/* ════════════════════════════════════
          FILE SELECTOR SHARE BOTTOM SHEET
      ════════════════════════════════════ */}
      <Modal
        visible={showShare}
        transparent
        animationType="slide"
        onRequestClose={() => setShowShare(false)}
      >
        <TouchableOpacity style={styles.shareOverlay} activeOpacity={1} onPress={() => setShowShare(false)}>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.shareSheet, {
              backgroundColor: isDark ? 'rgba(23,23,23,0.96)' : 'rgba(255,255,255,0.97)',
              borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
            }]}
          >
            {/* Title row with icon */}
            <View style={styles.sheetTitleRow}>
              <View style={[styles.sheetTitleIcon, { backgroundColor: isDark ? 'rgba(111,251,133,0.12)' : c.accentSoft }]}>
                <Ionicons name="share-outline" size={18} color={c.primary} />
              </View>
              <Text style={[styles.sheetTitle, { color: c.text }]}>Select files to share</Text>
            </View>

            {/* Select All row */}
            <View style={styles.sheetSelectAllRow}>
              <TouchableOpacity
                style={[styles.sheetCheckbox, {
                  borderColor: isDark ? '#DFDFDF' : '#AAAAAA',
                  backgroundColor: selectAll ? c.primary : 'transparent',
                }]}
                onPress={handleSelectAll}
                activeOpacity={0.8}
              >
                {selectAll && <Ionicons name="checkmark" size={12} color={isDark ? '#141414' : '#fff'} />}
              </TouchableOpacity>
              <Text style={[styles.sheetSelectAllTxt, { color: c.text }]}>Select  All</Text>
              <Text style={[styles.sheetFileCountTxt, { color: c.text }]}>
                {selectedFiles.length} {selectedFiles.length === 1 ? 'File' : 'Files'} Selected
              </Text>
            </View>

            {/* Divider */}
            <View style={[styles.sheetDivider, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }]} />

            {/* File rows */}
            {files.map(file => (
              <TouchableOpacity
                key={file.id}
                style={styles.sheetFileRow}
                onPress={() => toggleFile(file.id)}
                activeOpacity={0.8}
              >
                <TouchableOpacity
                  style={[styles.sheetCheckbox, {
                    borderColor: isDark ? '#DFDFDF' : '#AAAAAA',
                    backgroundColor: selectedFiles.includes(file.id) ? c.primary : 'transparent',
                  }]}
                  onPress={() => toggleFile(file.id)}
                  activeOpacity={0.8}
                >
                  {selectedFiles.includes(file.id) && (
                    <Ionicons name="checkmark" size={12} color={isDark ? '#141414' : '#fff'} />
                  )}
                </TouchableOpacity>
                <View style={[styles.sheetPdfIcon, { backgroundColor: '#DB4437' }]}>
                  <Text style={styles.sheetPdfTxt}>PDF</Text>
                </View>
                <Text style={[styles.sheetFileName, { color: c.text }]} numberOfLines={1}>
                  {file.name}
                </Text>
              </TouchableOpacity>
            ))}

            {/* Share button */}
            <TouchableOpacity
              style={[styles.sheetShareBtn, { backgroundColor: c.primary }]}
              activeOpacity={0.88}
              onPress={handleShare}
            >
              <Text style={[styles.sheetShareBtnTxt, { color: isDark ? '#141414' : '#fff' }]}>Share</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 0 },

  /* Header */
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingBottom: 14, gap: 8 },
  headerBtn: { width: 28, alignItems: 'center', flexShrink: 0 },
  headerTitle: { flex: 1, fontSize: 22, fontWeight: '600', fontFamily: 'Inter', lineHeight: 28 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 8, flexShrink: 0 },
  headerIconBtn: {
    width: 34,
    height: 34,
    borderRadius: 9,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Meta block (tags + title + ref/date) */
  metaBlock: { gap: 12, marginBottom: 20 },
  metaRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingHorizontal: 24, marginBottom: 18, gap: 8 },
  metaLeft: { flex: 1, gap: 14 },
  tagsRow: { flexDirection: 'row', gap: 8 },
  tag: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  tagText: { fontSize: 10, fontWeight: '800', fontFamily: 'Manrope', letterSpacing: 1, textTransform: 'uppercase' },
  reportTitle: { fontSize: 30, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -0.75, lineHeight: 36 },
  metaRight: { alignItems: 'flex-end' },
  metaLabel: { fontSize: 11, fontWeight: '400', fontFamily: 'Inter', lineHeight: 15, letterSpacing: 0.5, textTransform: 'uppercase' },
  metaId: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter', lineHeight: 28 },
  metaDate: { fontSize: 15, fontWeight: '800', fontFamily: 'Manrope', lineHeight: 22, textTransform: 'uppercase' },

  /* Report image */
  imgWrap: { marginHorizontal: 24, borderRadius: 20, height: 220, overflow: 'hidden', marginBottom: 14 },
  reportImg: { width: '100%', height: '100%' },

  /* Privacy card */
  privacyCard: { marginHorizontal: 24, borderRadius: 28, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 22, paddingVertical: 14, marginBottom: 16 },
  privacyLeft: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  privacyLabel: { fontSize: 12, fontWeight: '400', fontFamily: 'Inter', lineHeight: 16 },

  /* Mode toggle */
  modeSwitchRow: { flexDirection: 'row', gap: 8, marginHorizontal: 24, marginBottom: 16 },
  modeBtn: { flex: 1, borderRadius: 20, borderWidth: 1, paddingVertical: 8, alignItems: 'center' },
  modeBtnTxt: { fontSize: 12, fontWeight: '600', fontFamily: 'Inter' },

  /* Share bottom sheet */
  shareOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  shareSheet: {
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 44,
    gap: 0,
  },
  sheetTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 24 },
  sheetTitleIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  sheetTitle: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -0.3 },
  sheetSelectAllRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 12 },
  sheetCheckbox: { width: 18, height: 18, borderRadius: 4, borderWidth: 0.7, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  sheetSelectAllTxt: { fontSize: 14, fontWeight: '700', fontFamily: 'Manrope', flex: 1, textTransform: 'capitalize' },
  sheetFileCountTxt: { fontSize: 14, fontWeight: '700', fontFamily: 'Manrope' },
  sheetDivider: { height: 0.7, marginVertical: 2 },
  sheetFileRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14 },
  sheetPdfIcon: { width: 28, height: 28, borderRadius: 6, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  sheetPdfTxt: { fontSize: 8, fontWeight: '800', fontFamily: 'Manrope', color: '#fff', letterSpacing: 0.5 },
  sheetFileName: { fontSize: 14, fontWeight: '400', fontFamily: 'Manrope', flex: 1, textTransform: 'uppercase' },
  sheetShareBtn: { borderRadius: 33, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', marginTop: 28 },
  sheetShareBtnTxt: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -0.2 },
  /* keep old keys referenced nowhere — safe to keep for no-crash */
  sheetHandle: { width: 40, height: 4, borderRadius: 2, alignSelf: 'center' },
  sheetSub: { fontSize: 13, fontWeight: '400', fontFamily: 'Inter' },
  shareOptionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  shareOption: { width: '47%', borderRadius: 20, borderWidth: 1, padding: 18, alignItems: 'flex-start', gap: 10 },
  shareOptionIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  shareOptionLbl: { fontSize: 15, fontWeight: '600', fontFamily: 'Inter' },
  sheetCancelBtn: { borderRadius: 999, borderWidth: 1, paddingVertical: 14, alignItems: 'center', marginTop: 4 },
  sheetCancelTxt: { fontSize: 16, fontWeight: '600', fontFamily: 'Inter' },

  /* Thinking card */
  thinkingCard: { marginHorizontal: 24, borderRadius: 28, borderWidth: 1, alignItems: 'center', paddingVertical: 36, paddingHorizontal: 24, gap: 14, marginBottom: 14 },
  thinkingIconWrap: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  thinkingTitle: { fontSize: 22, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -0.4 },
  thinkingDesc: { fontSize: 14, fontWeight: '400', fontFamily: 'Inter', lineHeight: 20, textAlign: 'center' },

  /* Dashed cards */
  dashedCard: { marginHorizontal: 24, borderRadius: 28, borderWidth: 2, borderStyle: 'dashed', marginBottom: 14, alignItems: 'center', paddingVertical: 28, paddingHorizontal: 24, gap: 10 },
  failedCard: { flexDirection: 'row', paddingVertical: 22, gap: 12 },
  mismatchTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  mismatchTitle: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter', lineHeight: 26 },
  mismatchDesc: { fontSize: 12, fontWeight: '400', fontFamily: 'Inter', lineHeight: 18, textAlign: 'center' },
  mismatchBtns: { flexDirection: 'row', gap: 12, marginTop: 6 },
  yesBtn: { width: 130, height: 38, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  yesBtnTxt: { fontSize: 16, fontWeight: '700', fontFamily: 'Inter' },
  noBtn: { width: 130, height: 38, borderRadius: 999, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  noBtnTxt: { fontSize: 16, fontWeight: '700', fontFamily: 'Inter' },
  failedTxt: { fontSize: 17, fontWeight: '600', fontFamily: 'Inter', lineHeight: 24 },

  /* Action buttons */
  actionRow: { flexDirection: 'row', gap: 12, marginHorizontal: 24, marginBottom: 24 },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 999 },
  actionBtnGlass: { borderWidth: 1 },
  actionBtnTxt: { fontSize: 16, fontWeight: '700', fontFamily: 'Inter' },

  /* Score */
  scoreSection: { paddingHorizontal: 24, marginBottom: 8 },
  scoreLbl: { fontSize: 24, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -0.5, marginBottom: 16 },
  scoreRow: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  scoreOuter: { width: 96, height: 96, borderRadius: 48, borderWidth: 6, alignItems: 'center', justifyContent: 'center' },
  scoreInner: { width: 76, height: 76, borderRadius: 38, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  scoreNum: { fontSize: 26, fontWeight: '700', fontFamily: 'Inter', lineHeight: 32 },
  scoreOf: { fontSize: 10, fontFamily: 'Inter', lineHeight: 14 },
  scoreInfo: { flex: 1, gap: 6 },
  scoreStatus: { fontSize: 22, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -0.4 },
  scoreStatusDesc: { fontSize: 14, fontWeight: '400', fontFamily: 'Inter', lineHeight: 20 },

  /* Synopsis */
  synopsisWrap: { paddingHorizontal: 24, marginBottom: 10, marginTop: 20 },
  synopsisLbl: { fontSize: 10, fontWeight: '400', fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: 1.2 },

  /* Critical card */
  criticalCard: { marginHorizontal: 24, borderRadius: 28, borderWidth: 1, padding: 26, marginBottom: 20, gap: 12 },
  criticalTitle: { fontSize: 24, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -0.5, lineHeight: 32 },
  criticalDesc: { fontSize: 16, fontWeight: '500', fontFamily: 'Inter', lineHeight: 24 },
  readMore: { fontSize: 14, fontWeight: '600', fontFamily: 'Inter' },

  /* Sections */
  section: { marginHorizontal: 24, marginBottom: 6 },
  sectionHdr: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, gap: 8 },
  sectionTitleCol: { flex: 1, gap: 3 },
  sectionTitle: { fontSize: 24, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -0.5, lineHeight: 30 },
  sectionSubtitle: { fontSize: 12, fontWeight: '400', fontFamily: 'Inter', lineHeight: 18 },
  sectionHdrRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  suggBadge: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  suggBadgeTxt: { fontSize: 10, fontWeight: '700', fontFamily: 'Inter' },

  /* Biomarker cards */
  bioCards: { gap: 10, marginBottom: 8 },
  bioCard: { borderRadius: 22, borderWidth: 1, padding: 18 },
  bioCardHdr: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 },
  bioCardTitle: { fontSize: 17, fontWeight: '700', fontFamily: 'Inter', flex: 1 },
  bioStatusPill: { paddingHorizontal: 9, paddingVertical: 3, borderRadius: 20 },
  bioStatusPillTxt: { fontSize: 10, fontWeight: '700', fontFamily: 'Inter', letterSpacing: 0.2 },
  bioRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, gap: 10 },
  bioDot: { width: 7, height: 7, borderRadius: 4, flexShrink: 0 },
  bioLbl: { flex: 1, fontSize: 13, fontFamily: 'Inter', fontWeight: '400', lineHeight: 18 },
  bioRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  bioVal: { fontSize: 13, fontWeight: '600', fontFamily: 'Inter' },
  bioUnit: { fontSize: 10, fontFamily: 'Inter', fontWeight: '400' },
  bioBadge: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 10, marginLeft: 2 },
  bioBadgeTxt: { fontSize: 10, fontWeight: '700', fontFamily: 'Inter' },

  /* Risk cards */
  riskGrid: { gap: 10, marginBottom: 8 },
  riskCard: { borderRadius: 22, borderWidth: 1, padding: 20, gap: 10 },
  riskIcon: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  riskTitle: { fontSize: 17, fontWeight: '700', fontFamily: 'Inter', lineHeight: 24 },
  riskDesc: { fontSize: 13, fontWeight: '400', fontFamily: 'Inter', lineHeight: 19 },

  /* Rec cards */
  recGrid: { gap: 10, marginBottom: 8 },
  recCard: { borderRadius: 28, borderWidth: 1, padding: 26, gap: 10 },
  recIconWrap: { width: 40, height: 40, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  recTitle: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter', lineHeight: 26 },
  recDesc: { fontSize: 16, fontWeight: '500', fontFamily: 'Inter', lineHeight: 24 },

  /* ── Insight block wrapper (shared padding for all insight sections) ── */
  insightBlock: { paddingHorizontal: 24, marginBottom: 28 },

  /* Critical Synaptic section */
  insightSmallLbl: { fontSize: 12, fontWeight: '400', fontFamily: 'Inter', letterSpacing: 0.3, marginBottom: 10 },
  insightBigTitle: { fontSize: 32, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -0.8, lineHeight: 40, marginBottom: 14 },
  insightBodyTxt: { fontSize: 15, fontWeight: '400', fontFamily: 'Inter', lineHeight: 23, marginBottom: 18 },
  highRiskBadge: { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 14, paddingVertical: 6 },
  highRiskTxt: { fontSize: 11, fontWeight: '800', fontFamily: 'Manrope', letterSpacing: 1.2, textTransform: 'uppercase' },

  /* Report Insights section header */
  insightSectionHdr: { fontSize: 20, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -0.4, marginBottom: 14 },

  /* Category cards (Blood Glucose, Lipid Profile, Vitamins) */
  catCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 18,
    marginBottom: 10,
    gap: 12,
  },
  catCardExpanded: { flexDirection: 'column', alignItems: 'stretch' },
  catCardTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  catIconWrap: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  catInfo: { flex: 1 },
  catLabel: { fontSize: 10, fontWeight: '600', fontFamily: 'Manrope', letterSpacing: 1.1, textTransform: 'uppercase', marginBottom: 2 },
  catTitle: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter', lineHeight: 24 },
  flaggedPill: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  flaggedTxt: { fontSize: 11, fontWeight: '800', fontFamily: 'Manrope', color: '#fff', letterSpacing: 0.5 },
  idealPill: { borderRadius: 999, paddingHorizontal: 12, paddingVertical: 5 },
  idealTxt: { fontSize: 11, fontWeight: '700', fontFamily: 'Manrope', letterSpacing: 0.5 },
  catRows: { marginTop: 14, gap: 2 },
  seeAllRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 14, paddingVertical: 4 },
  seeAllTxt: { fontSize: 13, fontWeight: '600', fontFamily: 'Inter' },

  /* Risk Patterns */
  neuralLbl: { fontSize: 13, fontWeight: '600', fontFamily: 'Inter', letterSpacing: 0.2, marginBottom: 8 },
  riskCardsWrap: { gap: 14, marginTop: 6 },
  riskAccentCard: {
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    minHeight: 120,
  },
  riskAccentBar: { width: 5, borderRadius: 4, marginRight: 0, flexShrink: 0 },
  riskAccentContent: { flex: 1, padding: 20, gap: 10 },
  riskAccentTitle: { fontSize: 20, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -0.4, lineHeight: 28 },
  riskAccentDesc: { fontSize: 14, fontWeight: '400', fontFamily: 'Inter', lineHeight: 21 },

  /* Suggestions */
  suggHdrRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 },
  clinicalRoadmapLbl: { fontSize: 12, fontWeight: '400', fontFamily: 'Inter' },
  suggGrid: { gap: 12 },
  suggCard: { borderRadius: 20, borderWidth: 1, padding: 24, gap: 12 },
  suggIconWrap: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  suggTitle: { fontSize: 20, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -0.3, lineHeight: 27 },
  suggDesc: { fontSize: 14, fontWeight: '400', fontFamily: 'Inter', lineHeight: 21 },
});
