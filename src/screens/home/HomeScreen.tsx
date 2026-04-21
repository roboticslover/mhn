import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import Svg, { Circle, Path } from 'react-native-svg';
import BottomNavBar from '../../components/BottomNavBar';
import SectionHeader from '../../components/SectionHeader';

const { width: SCREEN_W } = Dimensions.get('window');
const H_PAD = 24;

// ─── Circular Progress Ring ───────────────────────────────────────────────────
function ProgressRing({
  size,
  strokeWidth,
  progress,
  color,
  trackColor,
}: {
  size: number;
  strokeWidth: number;
  progress: number;
  color: string;
  trackColor: string;
}) {
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - Math.min(1, Math.max(0, progress)));
  return (
    <Svg width={size} height={size}>
      <Circle cx={size / 2} cy={size / 2} r={r} stroke={trackColor} strokeWidth={strokeWidth} fill="none" />
      <Circle
        cx={size / 2} cy={size / 2} r={r}
        stroke={color} strokeWidth={strokeWidth} fill="none"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        rotation="-90"
        origin={`${size / 2}, ${size / 2}`}
      />
    </Svg>
  );
}

// ─── Checklist Item ───────────────────────────────────────────────────────────
function ChecklistItem({ label, done, primaryColor, textColor, mutedColor }: { label: string; done: boolean; primaryColor: string; textColor: string; mutedColor: string }) {
  return (
    <View style={styles.checkRow}>
      <View style={[
        styles.checkCircle,
        done ? { backgroundColor: primaryColor, borderColor: primaryColor } : { borderColor: mutedColor },
      ]}>
        {done && <Ionicons name="checkmark" size={11} color="#000" />}
      </View>
      <Text style={[styles.checkLabel, { color: textColor, fontFamily: 'Inter' }, done && { color: mutedColor, textDecorationLine: 'line-through' }]}>{label}</Text>
    </View>
  );
}

// ─── Health Score Card ────────────────────────────────────────────────────────
function HealthScoreCard({ label, status, value, color, cardBg, cardBorder, textColor, mutedColor }: {
  label: string; status: string; value: number; color: string;
  cardBg: string; cardBorder: string; textColor: string; mutedColor: string;
}) {
  return (
    <View style={[styles.scoreCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
      <View style={styles.scoreContent}>
        <View style={styles.scoreLeft}>
          <Text style={[styles.scoreLabel, { color: mutedColor, fontFamily: 'Inter' }]}>{label}</Text>
          <Text style={[styles.scoreStatus, { color, fontFamily: 'Inter' }]}>{status}</Text>
        </View>
        <Text style={[styles.scoreValue, { color: textColor, fontFamily: 'Inter' }]}>{value}%</Text>
      </View>
      <View style={[styles.scoreBarTrack, { backgroundColor: cardBorder }]}>
        <View style={[styles.scoreBarFill, { width: `${value}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

// ─── Pinned Vital Card ────────────────────────────────────────────────────────
function PinnedVitalCard({ label, value, icon, iconColor, cardBg, cardBorder, textColor, mutedColor }: {
  label: string; value: string; icon?: string; iconColor?: string;
  cardBg: string; cardBorder: string; textColor: string; mutedColor: string;
}) {
  return (
    <View style={[styles.pinnedCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
      <View style={styles.pinnedCardLabel}>
        {icon && <Ionicons name={icon as any} size={13} color={iconColor ?? mutedColor} style={{ marginRight: 4 }} />}
        <Text style={[styles.pinnedLabel, { color: mutedColor, fontFamily: 'Inter' }]}>{label}</Text>
      </View>
      <Text style={[styles.pinnedValue, { color: textColor, fontFamily: 'Inter' }]}>{value}</Text>
    </View>
  );
}

// ─── Biomarker Card ───────────────────────────────────────────────────────────
function BiomarkerCard({ label, value, unit, status, statusColor, cardBg, cardBorder, textColor }: {
  label: string; value: string; unit: string; status: string; statusColor: string;
  cardBg: string; cardBorder: string; textColor: string;
}) {
  const badgeBg = statusColor + '33';
  return (
    <View style={[styles.bioCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
      <View style={styles.bioTop}>
        <Text style={[styles.bioLabel, { color: textColor, fontFamily: 'Inter' }]}>{label}</Text>
        <View style={[styles.bioBadge, { backgroundColor: badgeBg }]}>
          <Text style={[styles.bioBadgeText, { color: statusColor, fontFamily: 'Inter' }]}>{status}</Text>
        </View>
      </View>
      <View style={styles.bioBottom}>
        <Text style={[styles.bioValue, { color: statusColor, fontFamily: 'Inter' }]}>{value}</Text>
        <Text style={[styles.bioUnit, { color: statusColor, fontFamily: 'Inter' }]}>{unit}</Text>
      </View>
    </View>
  );
}

// ─── Recent Upload Row ────────────────────────────────────────────────────────
function RecentRow({ icon, title, subtitle, primaryColor, textColor, mutedColor, iconBg, rowBorder }: { icon: string; title: string; subtitle?: string; primaryColor: string; textColor: string; mutedColor: string; iconBg: string; rowBorder: string }) {
  return (
    <TouchableOpacity style={[styles.recentRow, { borderBottomColor: rowBorder }]} activeOpacity={0.7}>
      <View style={[styles.recentIcon, { backgroundColor: iconBg }]}>
        <Ionicons name={icon as any} size={20} color={primaryColor} />
      </View>
      <Text style={[styles.recentTitle, { color: textColor, fontFamily: 'Inter' }]} numberOfLines={1}>
        {title}{subtitle ? <Text style={[styles.recentSub, { color: mutedColor }]}> {subtitle}</Text> : null}
      </Text>
      <Ionicons name="chevron-forward" size={16} color={mutedColor} />
    </TouchableOpacity>
  );
}

// ─── Connect Row ──────────────────────────────────────────────────────────────
function ConnectRow({ icon, label, subtitle, badge, primaryColor, textColor, mutedColor, iconBg, badgeBg }: {
  icon: string; label: string; subtitle: string; badge?: string;
  primaryColor: string; textColor: string; mutedColor: string; iconBg: string; badgeBg: string;
}) {
  return (
    <TouchableOpacity style={styles.connectRow} activeOpacity={0.7}>
      <View style={[styles.connectIcon, { backgroundColor: iconBg }]}>
        <Ionicons name={icon as any} size={20} color={primaryColor} />
      </View>
      <View style={styles.connectText}>
        <Text style={[styles.connectLabel, { color: textColor, fontFamily: 'Inter' }]}>{label}</Text>
        <Text style={[styles.connectSub, { color: mutedColor, fontFamily: 'Inter' }]}>{subtitle}</Text>
      </View>
      {badge && (
        <View style={[styles.connectBadge, { backgroundColor: badgeBg }]}>
          <Text style={[styles.connectBadgeText, { color: primaryColor, fontFamily: 'Inter' }]}>{badge}</Text>
        </View>
      )}
      <Ionicons name="chevron-forward" size={16} color={mutedColor} />
    </TouchableOpacity>
  );
}

// ─── Health Info Row ──────────────────────────────────────────────────────────
function HealthInfoRow({ icon, label, primaryColor, textColor, mutedColor, iconBg, rowBorder }: { icon: string; label: string; primaryColor: string; textColor: string; mutedColor: string; iconBg: string; rowBorder: string }) {
  return (
    <TouchableOpacity style={[styles.infoRow, { borderBottomColor: rowBorder }]} activeOpacity={0.7}>
      <View style={styles.infoRowLeft}>
        <View style={[styles.infoIcon, { backgroundColor: iconBg }]}>
          <Ionicons name={icon as any} size={18} color={primaryColor} />
        </View>
        <Text style={[styles.infoLabel, { color: textColor, fontFamily: 'Inter' }]}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={mutedColor} />
    </TouchableOpacity>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function HomeScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = theme.colors;
  const scrollRef = useRef<ScrollView>(null);
  const cardBg = c.card;
  const cardBorder = c.cardGlassBorder;
  const iconBg = c.accentSoft;
  const rowBorder = c.divider ?? c.cardGlassBorder;
  const badgeBg = c.accentSoft;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingTop: insets.top + 4, paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ══ HEADER ══════════════════════════════════════════════════════════ */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={[styles.avatarBorder, { borderColor: c.cardGlassBorder }]}>
              <View style={[styles.avatar, { backgroundColor: c.cardElevated }]}>
                <Ionicons name="person" size={18} color={c.textSecondary} />
              </View>
            </View>
            <View>
              <Text style={[styles.greeting, { color: c.textSecondary, fontFamily: 'Inter' }]}>Good morning,</Text>
              <Text style={[styles.userName, { color: c.text, fontFamily: 'Inter' }]}>Deepika!</Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.notifBtn, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <Ionicons name="notifications-outline" size={20} color={c.text} />
          </TouchableOpacity>
        </View>

        {/* ══ SETUP HEALTH PROFILE ════════════════════════════════════════════ */}
        <View style={[styles.setupCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <View style={styles.setupTop}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.setupTitle, { color: c.text, fontFamily: 'Inter' }]}>Set up your health profile</Text>
              <Text style={[styles.setupSub, { color: c.textSecondary, fontFamily: 'Inter' }]}>1 of 4 done</Text>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: '25%', backgroundColor: c.primary }]} />
              </View>
            </View>
            <View style={styles.ringWrap}>
              <ProgressRing size={52} strokeWidth={4} progress={0.25} color={c.primary} trackColor="rgba(255,255,255,0.1)" />
              <Text style={[styles.ringPct, { color: c.text, fontFamily: 'Inter' }]}>25%</Text>
            </View>
          </View>
          <View style={styles.checklist}>
            <ChecklistItem label="Create profile" done primaryColor={c.primary} textColor={c.text} mutedColor={c.textSecondary} />
            <ChecklistItem label="Connect wearable" done={false} primaryColor={c.primary} textColor={c.text} mutedColor={c.textSecondary} />
            <ChecklistItem label="Upload record" done={false} primaryColor={c.primary} textColor={c.text} mutedColor={c.textSecondary} />
            <ChecklistItem label="Add family member" done={false} primaryColor={c.primary} textColor={c.text} mutedColor={c.textSecondary} />
          </View>
          <TouchableOpacity style={styles.skipBtn}>
            <Text style={[styles.skipText, { color: c.textSecondary, fontFamily: 'Inter' }]}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* ══ TODAY'S LOGS ════════════════════════════════════════════════════ */}
        <SectionHeader title="Today's Logs" rightText="Edit" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.logsScroll}>
          {/* Coffee */}
          <View style={[styles.logCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <View style={styles.logCardTop}>
              <View style={[styles.logIconWrap, { backgroundColor: 'rgba(245,158,11,0.12)' }]}>
                <Ionicons name="cafe" size={20} color="#F59E0B" />
              </View>
              <TouchableOpacity style={[styles.logAddBtn, { backgroundColor: c.cardGlassBorder }]}>
                <Ionicons name="add" size={16} color={c.text} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.logCardLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>Coffee</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <Text style={[styles.logCardValue, { color: c.text, fontFamily: 'Inter' }]}>0</Text>
              <Text style={[styles.logCardUnit, { color: c.textSecondary, fontFamily: 'Inter' }]}> cups</Text>
            </View>
          </View>

          {/* Ring card */}
          <View style={[styles.logCard, { backgroundColor: cardBg, borderColor: cardBorder, alignItems: 'center', justifyContent: 'center' }]}>
            <ProgressRing size={80} strokeWidth={6} progress={0} color={c.primary} trackColor={c.cardGlassBorder} />
            <Text style={[styles.ringCardPct, { color: c.text, fontFamily: 'Inter' }]}>0%</Text>
          </View>

          {/* Add new */}
          <TouchableOpacity style={[styles.logCard, { backgroundColor: cardBg, borderColor: cardBorder, alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed' }]}>
            <View style={[styles.addLogCircle, { backgroundColor: c.cardGlassBorder }]}>
              <Ionicons name="add" size={22} color={c.text} />
            </View>
          </TouchableOpacity>
        </ScrollView>

        {/* ══ HEALTH SCORES ═══════════════════════════════════════════════════ */}
        <SectionHeader title="Health Scores" />
        <View style={styles.scoresList}>
          <HealthScoreCard label="ACTIVITY SCORE" status="Optimal" value={82} color={c.success} cardBg={cardBg} cardBorder={cardBorder} textColor={c.text} mutedColor={c.textSecondary} />
          <HealthScoreCard label="MENTAL WELLBEING" status="Needs Attention" value={50} color={c.warning} cardBg={cardBg} cardBorder={cardBorder} textColor={c.text} mutedColor={c.textSecondary} />
          <HealthScoreCard label="SLEEP SCORE" status="Critical" value={30} color={c.error} cardBg={cardBg} cardBorder={cardBorder} textColor={c.text} mutedColor={c.textSecondary} />
          <HealthScoreCard label="READINESS SCORE" status="Optimal" value={82} color={c.success} cardBg={cardBg} cardBorder={cardBorder} textColor={c.text} mutedColor={c.textSecondary} />
          <HealthScoreCard label="WELLBEING SCORE" status="Optimal" value={82} color={c.success} cardBg={cardBg} cardBorder={cardBorder} textColor={c.text} mutedColor={c.textSecondary} />
        </View>

        {/* ══ PINNED (VITALS) ══════════════════════════════════════════════════ */}
        <SectionHeader title="Pinned" rightText="Edit" onRightPress={() => navigation.navigate('EditPinnedVitals')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pinnedScroll}>
          <PinnedVitalCard label="Sleep" value="7h 42m" cardBg={cardBg} cardBorder={cardBorder} textColor={c.text} mutedColor={c.textSecondary} />
          <PinnedVitalCard label="Steps" value="5625" cardBg={cardBg} cardBorder={cardBorder} textColor={c.text} mutedColor={c.textSecondary} />
          <PinnedVitalCard label="SpO2" value="104" cardBg={cardBg} cardBorder={cardBorder} textColor={c.text} mutedColor={c.textSecondary} />
          <PinnedVitalCard label="HR" value="98" icon="heart" iconColor={c.error} cardBg={cardBg} cardBorder={cardBorder} textColor={c.text} mutedColor={c.textSecondary} />
        </ScrollView>

        {/* ══ PINNED BIOMARKERS ═══════════════════════════════════════════════ */}
        <SectionHeader title="Pinned Biomarkers" rightText="Edit" onRightPress={() => navigation.navigate('EditPinnedBiomarkers')} />
        <View style={styles.bioList}>
          <BiomarkerCard label="BLOOD GLUCOSE" value="88" unit="mg/dL" status="STABLE" statusColor={c.success} cardBg={cardBg} cardBorder={cardBorder} textColor={c.text} />
          <BiomarkerCard label="CHOLESTROL" value="100" unit="mg/dL" status="RISK" statusColor={c.error} cardBg={cardBg} cardBorder={cardBorder} textColor={c.text} />
        </View>

        {/* ══ RECENTLY UPLOADED ═══════════════════════════════════════════════ */}
        <SectionHeader title="Recently Uploaded" rightText="View More ›" />
        <View style={[styles.recentList, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <RecentRow icon="document-text-outline" title="Blood Panel" subtitle="(Metabolic)" primaryColor={c.primary} textColor={c.text} mutedColor={c.textSecondary} iconBg={iconBg} rowBorder={rowBorder} />
          <RecentRow icon="heart-circle-outline" title="ECG Summary" primaryColor={c.primary} textColor={c.text} mutedColor={c.textSecondary} iconBg={iconBg} rowBorder={rowBorder} />
          <RecentRow icon="calendar-outline" title="Annual Immunization" primaryColor={c.primary} textColor={c.text} mutedColor={c.textSecondary} iconBg={iconBg} rowBorder={rowBorder} />
        </View>

        {/* ══ CONNECT ══════════════════════════════════════════════════════════ */}
        <SectionHeader title="Connect" />
        <View style={[styles.connectCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <ConnectRow icon="people-outline" label="Family Connect" subtitle="Share health updates" primaryColor={c.primary} textColor={c.text} mutedColor={c.textSecondary} iconBg={iconBg} badgeBg={badgeBg} />
          <View style={[styles.divider, { backgroundColor: c.cardGlassBorder }]} />
          <ConnectRow icon="medkit-outline" label="Doctor Connect" subtitle="Green medical care" badge="Bot" primaryColor={c.primary} textColor={c.text} mutedColor={c.textSecondary} iconBg={iconBg} badgeBg={badgeBg} />
        </View>

        {/* ══ HEALTH INFORMATION ══════════════════════════════════════════════ */}
        <SectionHeader title="Health information" rightText="›" />
        <View style={[styles.infoCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <HealthInfoRow icon="cut-outline" label="Surgical History" primaryColor={c.primary} textColor={c.text} mutedColor={c.textSecondary} iconBg={iconBg} rowBorder={rowBorder} />
          <HealthInfoRow icon="heart-outline" label="Medical Conditions" primaryColor={c.primary} textColor={c.text} mutedColor={c.textSecondary} iconBg={iconBg} rowBorder={rowBorder} />
          <HealthInfoRow icon="alert-circle-outline" label="Allergies" primaryColor={c.primary} textColor={c.text} mutedColor={c.textSecondary} iconBg={iconBg} rowBorder={rowBorder} />
          <HealthInfoRow icon="medkit-outline" label="Medications" primaryColor={c.primary} textColor={c.text} mutedColor={c.textSecondary} iconBg={iconBg} rowBorder={rowBorder} />
        </View>

        {/* ══ PINNED VITALS EMPTY STATE ════════════════════════════════════════ */}
        <SectionHeader title="Pinned Vitals" rightText="Do it later" />
        <View style={[styles.emptyDashed, { borderColor: c.cardGlassBorder, backgroundColor: c.cardElevated }]}>
          <Text style={[styles.emptyTitle, { color: c.text, fontFamily: 'Inter' }]}>No pinned data</Text>
          <Text style={[styles.emptySub, { color: c.textSecondary, fontFamily: 'Inter' }]}>Pin upto 6 vitals to view data</Text>
        </View>

        {/* ══ WEARABLE CONNECT ════════════════════════════════════════════════ */}
        <View style={[styles.wearableCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <View style={styles.wearableLeft}>
            <View style={[styles.wearableIconWrap, { backgroundColor: iconBg }]}>
              <Ionicons name="watch-outline" size={26} color={c.primary} />
            </View>
            <Text style={[styles.wearableText, { color: c.text, fontFamily: 'Inter' }]}>Connect a wearable{'\n'}to see insights</Text>
          </View>
          <TouchableOpacity style={[styles.wearableBtn, { backgroundColor: c.primary }]}>
            <Text style={[styles.wearableBtnText, { color: c.textOnPrimary, fontFamily: 'Inter' }]}>Connect</Text>
          </TouchableOpacity>
        </View>

        {/* ══ HEALTH ARTICLES ═════════════════════════════════════════════════ */}
        <SectionHeader title="Health Articles" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.articlesScroll}>
          <View style={[styles.articleCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <View style={[styles.articleImg, { backgroundColor: 'rgba(127,175,255,0.1)' }]}>
              <Ionicons name="people" size={40} color="#7fafff" />
            </View>
            <View style={styles.articleBody}>
              <Text style={[styles.articleCat, { color: '#7fafff', fontFamily: 'Inter' }]}>FAMILY HEALTH</Text>
              <Text style={[styles.articleTitle, { color: c.text, fontFamily: 'Inter' }]}>The Family Health Sharing{'\n'}Problem Decoded</Text>
            </View>
          </View>
          <View style={[styles.articleCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <View style={[styles.articleImg, { backgroundColor: c.accentSoft }]}>
              <Ionicons name="fitness" size={40} color={c.primary} />
            </View>
            <View style={styles.articleBody}>
              <Text style={[styles.articleCat, { color: c.primary, fontFamily: 'Inter' }]}>WELLNESS</Text>
              <Text style={[styles.articleTitle, { color: c.text, fontFamily: 'Inter' }]}>Mindfulness and{'\n'}Changing Habits</Text>
            </View>
          </View>
        </ScrollView>
      </ScrollView>

      <BottomNavBar activeTab="home" navigation={navigation} />
    </View>
  );
}

const CARD_STYLE = {
  borderRadius: 20 as number,
  borderWidth: 1,
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  // ── Header ──────────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: H_PAD,
    paddingVertical: 16,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatarBorder: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, overflow: 'hidden' },
  avatar: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  greeting: { fontSize: 12, fontWeight: '500', lineHeight: 16 },
  userName: { fontSize: 18, fontWeight: '700', lineHeight: 28 },
  notifBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },

  // ── Setup Card ───────────────────────────────────────────────────────────────
  setupCard: {
    marginHorizontal: H_PAD,
    ...CARD_STYLE,
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
  },
  setupTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 16 },
  setupTitle: { fontSize: 16, fontWeight: '700', lineHeight: 24 },
  setupSub: { fontSize: 12, fontWeight: '400', marginTop: 4, lineHeight: 16 },
  progressTrack: { height: 4, borderRadius: 2, marginTop: 10, overflow: 'hidden', backgroundColor: 'rgba(128,128,128,0.2)' },
  progressFill: { height: '100%', borderRadius: 2 },
  ringWrap: { alignItems: 'center', justifyContent: 'center' },
  ringPct: { position: 'absolute', fontSize: 12, fontWeight: '700' },
  checklist: { marginTop: 18, gap: 14 },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  checkCircle: { width: 22, height: 22, borderRadius: 11, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  checkLabel: { fontSize: 14, fontWeight: '500' },
  skipBtn: { alignSelf: 'center', marginTop: 16 },
  skipText: { fontSize: 14, fontWeight: '500' },

  // ── Logs ─────────────────────────────────────────────────────────────────────
  logsScroll: { paddingHorizontal: H_PAD, gap: 12, paddingBottom: 4, marginBottom: 28 },
  logCard: {
    width: 140, height: 150,
    ...CARD_STYLE,
    padding: 16,
    justifyContent: 'space-between',
  },
  logCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logIconWrap: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  logAddBtn: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  logCardLabel: { fontSize: 12, fontWeight: '500' },
  logCardValue: { fontSize: 22, fontWeight: '700' },
  logCardUnit: { fontSize: 12 },
  ringCardPct: { position: 'absolute', fontSize: 14, fontWeight: '700' },
  addLogCircle: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },

  // ── Health Scores ─────────────────────────────────────────────────────────────
  scoresList: { marginHorizontal: H_PAD, gap: 12, marginBottom: 28 },
  scoreCard: {
    ...CARD_STYLE,
    borderRadius: 33,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 44,
  },
  scoreContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  scoreLeft: { flex: 1 },
  scoreLabel: { fontSize: 11, fontWeight: '600', letterSpacing: 1.2, textTransform: 'uppercase' },
  scoreStatus: { fontSize: 20, fontWeight: '700', marginTop: 2 },
  scoreValue: { fontSize: 32, fontWeight: '700' },
  scoreBarTrack: { position: 'absolute', bottom: 18, left: 25, right: 25, height: 6, borderRadius: 3, overflow: 'hidden', borderWidth: 0 },
  scoreBarFill: { height: '100%', borderRadius: 3 },

  // ── Pinned Vitals ─────────────────────────────────────────────────────────────
  pinnedScroll: { paddingHorizontal: H_PAD, gap: 12, paddingBottom: 4, marginBottom: 28 },
  pinnedCard: {
    width: 140, height: 96,
    ...CARD_STYLE,
    borderRadius: 20,
    padding: 16,
    justifyContent: 'space-between',
  },
  pinnedCardLabel: { flexDirection: 'row', alignItems: 'center' },
  pinnedLabel: { fontSize: 12, fontWeight: '500' },
  pinnedValue: { fontSize: 24, fontWeight: '700' },

  // ── Biomarkers ────────────────────────────────────────────────────────────────
  bioList: { marginHorizontal: H_PAD, gap: 12, marginBottom: 28 },
  bioCard: { ...CARD_STYLE, borderRadius: 33, padding: 25 },
  bioTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  bioLabel: { fontSize: 16, fontWeight: '500' },
  bioBadge: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  bioBadgeText: { fontSize: 10, fontWeight: '800', letterSpacing: -0.5 },
  bioBottom: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginTop: 4 },
  bioValue: { fontSize: 34, fontWeight: '300', letterSpacing: -0.68 },
  bioUnit: { fontSize: 14, fontWeight: '400' },

  // ── Recent Uploads ────────────────────────────────────────────────────────────
  recentList: { ...CARD_STYLE, borderRadius: 20, marginHorizontal: H_PAD, overflow: 'hidden', marginBottom: 28 },
  recentRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1 },
  recentIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  recentTitle: { flex: 1, fontSize: 14, fontWeight: '500' },
  recentSub: { fontWeight: '400' },

  // ── Connect ───────────────────────────────────────────────────────────────────
  connectCard: { ...CARD_STYLE, borderRadius: 20, marginHorizontal: H_PAD, overflow: 'hidden', marginBottom: 28 },
  connectRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16 },
  connectIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  connectText: { flex: 1 },
  connectLabel: { fontSize: 14, fontWeight: '600' },
  connectSub: { fontSize: 12, fontWeight: '400', marginTop: 2 },
  connectBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, marginRight: 8 },
  connectBadgeText: { fontSize: 11, fontWeight: '600' },
  divider: { height: 1, marginHorizontal: 16 },

  // ── Health Info ───────────────────────────────────────────────────────────────
  infoCard: { ...CARD_STYLE, borderRadius: 20, marginHorizontal: H_PAD, overflow: 'hidden', marginBottom: 28 },
  infoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1 },
  infoRowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  infoIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  infoLabel: { fontSize: 14, fontWeight: '500' },

  // ── Pinned Empty ──────────────────────────────────────────────────────────────
  emptyDashed: { marginHorizontal: H_PAD, borderRadius: 16, borderWidth: 2, borderStyle: 'dashed', paddingVertical: 34, alignItems: 'center', marginBottom: 28 },
  emptyTitle: { fontSize: 14, fontWeight: '600' },
  emptySub: { fontSize: 12, fontWeight: '400', marginTop: 4 },

  // ── Wearable Connect Card ─────────────────────────────────────────────────────
  wearableCard: {
    marginHorizontal: H_PAD, ...CARD_STYLE, borderRadius: 33,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 19, paddingVertical: 20, marginBottom: 28,
  },
  wearableLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 11 },
  wearableIconWrap: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  wearableText: { fontSize: 14, fontWeight: '600', flex: 1, lineHeight: 20, letterSpacing: -0.5 },
  wearableBtn: { borderRadius: 999, paddingHorizontal: 24, paddingVertical: 10 },
  wearableBtnText: { fontSize: 14, fontWeight: '600' },

  // ── Articles ──────────────────────────────────────────────────────────────────
  articlesScroll: { paddingHorizontal: H_PAD, gap: 16, paddingBottom: 8, marginBottom: 16 },
  articleCard: {
    width: 280, ...CARD_STYLE, borderRadius: 24, overflow: 'hidden',
  },
  articleImg: { height: 160, alignItems: 'center', justifyContent: 'center' },
  articleBody: { padding: 20, gap: 8 },
  articleCat: { fontSize: 10, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase' },
  articleTitle: { fontSize: 16, fontWeight: '700', lineHeight: 20 },
});
