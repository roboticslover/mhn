import React from 'react';
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
import BottomNavBar from '../../components/BottomNavBar';

const { width: SCREEN_W } = Dimensions.get('window');
const CARD_H_PAD = 20;

function CategoryCard({ icon, label, count, onPress, colors }: { icon: string; label: string; count: string; onPress?: () => void; colors: any; }) {
  return (
    <TouchableOpacity style={[styles.categoryCard, { backgroundColor: colors.card, borderColor: colors.cardGlassBorder }]} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.categoryIconRow}>
        <View style={[styles.categoryIconWrap, { backgroundColor: colors.accentSoft }]}>
          <Ionicons name={icon as any} size={20} color={colors.primary} />
        </View>
        <Ionicons name="open-outline" size={14} color={colors.textMuted} />
      </View>
      <Text style={[styles.categoryLabel, { color: colors.text, fontFamily: 'Inter' }]}>{label}</Text>
      <Text style={[styles.categoryCount, { color: colors.textSecondary, fontFamily: 'Inter' }]}>{count}</Text>
    </TouchableOpacity>
  );
}

function WideRow({ icon, label, subtitle, rightContent, onPress, colors }: { icon: string; label: string; subtitle?: string; rightContent?: React.ReactNode; onPress?: () => void; colors: any; }) {
  return (
    <TouchableOpacity style={[styles.wideRow, { backgroundColor: colors.card, borderColor: colors.cardGlassBorder }]} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.wideRowLeft}>
        <View style={[styles.wideRowIcon, { backgroundColor: colors.accentSoft }]}>
          <Ionicons name={icon as any} size={20} color={colors.primary} />
        </View>
        <View>
          <Text style={[styles.wideRowLabel, { color: colors.text, fontFamily: 'Inter' }]}>{label}</Text>
          {subtitle ? <Text style={[styles.wideRowSub, { color: colors.textSecondary, fontFamily: 'Inter' }]}>{subtitle}</Text> : null}
        </View>
      </View>
      {rightContent || <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />}
    </TouchableOpacity>
  );
}

function RecentUploadItem({ date, title, isNew, isSynced, colors }: { date: string; title: string; isNew?: boolean; isSynced?: boolean; colors: any; }) {
  return (
    <View style={[styles.recentItem, { backgroundColor: colors.card, borderColor: colors.cardGlassBorder }]}>
      <View style={styles.recentDateWrap}>
        <Text style={[styles.recentDate, { color: colors.textMuted, fontFamily: 'Inter' }]}>{date}</Text>
      </View>
      <View style={styles.recentIconWrap}>
        <Ionicons name="document-text-outline" size={16} color={colors.textSecondary} />
      </View>
      <View style={styles.recentTextWrap}>
        <Text style={[styles.recentTitle, { color: colors.text, fontFamily: 'Inter' }]}>{title}</Text>
      </View>
      {isNew && (
        <View style={[styles.newBadge, { backgroundColor: colors.accentSoft, borderColor: colors.primary + '3A' }]}>
          <Text style={[styles.newBadgeText, { color: colors.primary, fontFamily: 'Inter' }]}>New</Text>
        </View>
      )}
      {isSynced && (
        <View style={styles.syncedBadge}>
          <View style={[styles.syncDot, { backgroundColor: colors.primary }]} />
          <Text style={[styles.syncedText, { color: colors.textSecondary, fontFamily: 'Inter' }]}>SYNCED</Text>
        </View>
      )}
      <Ionicons name="download-outline" size={16} color={colors.textMuted} />
    </View>
  );
}

export default function HealthWalletScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top, paddingBottom: 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ═══ HEADER ═══ */}
        <View style={styles.header}>
          <Text style={[styles.pageTitle, { color: c.text, fontFamily: 'Inter' }]}>Health Wallet</Text>
          <TouchableOpacity style={[styles.avatarBtn, { backgroundColor: c.cardElevated }]}>
            <Ionicons name="person" size={18} color={c.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* ═══ SEARCH BAR ═══ */}
        <TouchableOpacity style={[styles.searchBar, { backgroundColor: c.inputBackground, borderColor: c.inputBorder }]} activeOpacity={0.7}>
          <Ionicons name="search" size={16} color={c.textSecondary} />
          <Text style={[styles.searchPlaceholder, { color: c.inputPlaceholder, fontFamily: 'Inter' }]}>Search for Documents</Text>
        </TouchableOpacity>

        {/* ═══ INSIGHTS BANNER ═══ */}
        <TouchableOpacity
          style={[styles.insightsBanner, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('AnalyticsEmpty')}
        >
          <Text style={[styles.insightsBannerText, { color: c.text, fontFamily: 'Inter' }]}>Check Insights and Analytics</Text>
          <Ionicons name="chevron-forward" size={16} color={c.textSecondary} />
        </TouchableOpacity>

        {/* ═══ HEALTH CARD ═══ */}
        <View style={[styles.healthCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
          <Text style={[styles.healthCardLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>MY HEALTH NOTION</Text>
          <View style={styles.healthCardRow}>
            <View>
              <Text style={[styles.healthCardSmall, { color: c.textSecondary, fontFamily: 'Inter' }]}>MEMBER ID</Text>
              <Text style={[styles.healthCardId, { color: c.text, fontFamily: 'Inter' }]}>4829  1042  9928</Text>
            </View>
            <View style={[styles.healthCardLogoWrap, { backgroundColor: c.accentSoft }]}>
              <Ionicons name="shield-checkmark" size={28} color={c.primary} />
            </View>
          </View>
          <View style={styles.healthCardBottom}>
            <View>
              <Text style={[styles.healthCardSmall, { color: c.textSecondary, fontFamily: 'Inter' }]}>CARD HOLDER</Text>
              <Text style={[styles.healthCardName, { color: c.text, fontFamily: 'Inter' }]}>Kajal</Text>
            </View>
            <View style={[styles.healthCardBadge, { backgroundColor: c.cardGlassBorder }]}>
              <Text style={[styles.healthCardBadgeText, { color: c.text, fontFamily: 'Inter' }]}>HEALTH CARD</Text>
            </View>
          </View>
        </View>

        {/* ═══ CATEGORIES GRID ═══ */}
        <View style={styles.categoriesGrid}>
          <CategoryCard icon="document-text-outline" label="Lab Reports" count="12 Files Found" onPress={() => navigation.navigate('HealthReportsEmpty')} colors={c} />
          <CategoryCard icon="receipt-outline" label="Prescriptions" count="12 Files Found" onPress={() => navigation.navigate('PrescriptionsEmpty')} colors={c} />
          <CategoryCard icon="scan-outline" label="Scans" count="12 Files Found" onPress={() => navigation.navigate('ScansEmpty')} colors={c} />
          <CategoryCard icon="medkit-outline" label="Vaccinations" count="12 Files Found" onPress={() => navigation.navigate('VaccinesEmpty')} colors={c} />
        </View>

        {/* ═══ WIDE ROWS ═══ */}
        <WideRow icon="shield-outline" label="Health Insurance" subtitle="4 Active" onPress={() => navigation.navigate('InsuranceEmpty')} colors={c} />
        <WideRow icon="medkit-outline" label="Medical Information" onPress={() => {}} colors={c} />

        {/* ═══ BLOOD GROUP ═══ */}
        <View style={styles.bloodGroupRow}>
          <View style={[styles.bloodGroupLeft, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
            <Text style={[styles.bloodGroupLabel, { color: c.text, fontFamily: 'Inter' }]}>Blood Group</Text>
          </View>
          <View style={[styles.bloodGroupBadge, { backgroundColor: c.accentSoft, borderColor: c.cardGlassBorder }]}>
            <Text style={[styles.bloodGroupValue, { color: c.primary, fontFamily: 'Inter' }]}>O+</Text>
          </View>
        </View>

        {/* ═══ RECENTLY UPLOADED ═══ */}
        <View style={styles.recentSection}>
          <View style={styles.recentHeader}>
            <Text style={[styles.recentSectionTitle, { color: c.text, fontFamily: 'Inter' }]}>Recently Uploaded</Text>
            <TouchableOpacity>
              <Text style={[styles.viewMoreText, { color: c.primary, fontFamily: 'Inter' }]}>View More ›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.recentList}>
            <RecentUploadItem date="24 OCT" title={'Blood\nPanel\n(Metabolic)'} isNew={true} colors={c} />
            <RecentUploadItem date="21 OCT" title="ECG Summary" isSynced={true} colors={c} />
            <RecentUploadItem date="15 OCT" title="Annual Immuniz..." isSynced={true} colors={c} />
          </View>
        </View>

        {/* ═══ VAULT CAPACITY ═══ */}
        <View style={[styles.vaultCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
          <View style={styles.vaultRow}>
            <Text style={[styles.vaultLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>VAULT CAPACITY</Text>
            <Text style={[styles.vaultPercent, { color: c.primary, fontFamily: 'Inter' }]}>64%</Text>
          </View>
          <View style={[styles.vaultBarTrack, { backgroundColor: c.cardGlassBorder }]}>
            <View style={[styles.vaultBarFill, { backgroundColor: c.primary }]} />
          </View>
          <Text style={[styles.vaultSub, { color: c.textSecondary, fontFamily: 'Inter' }]}>1.2 GB of 2.0 GB used</Text>
        </View>
      </ScrollView>

      <BottomNavBar activeTab="card" navigation={navigation} />
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
    paddingHorizontal: CARD_H_PAD,
    paddingVertical: 16,
  },
  pageTitle: { fontSize: 28, fontWeight: '600', lineHeight: 34 },
  avatarBtn: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  searchBar: { marginHorizontal: CARD_H_PAD, height: 58, borderRadius: 40, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, gap: 12, marginBottom: 12 },
  searchPlaceholder: { fontSize: 16, fontWeight: '500', opacity: 0.5 },
  insightsBanner: { marginHorizontal: CARD_H_PAD, height: 58, borderRadius: 40, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20 },
  insightsBannerText: { fontSize: 18, fontWeight: '400' },
  healthCard: { marginHorizontal: CARD_H_PAD, borderRadius: 33, borderWidth: 1, padding: 28, marginBottom: 20 },
  healthCardLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 },
  healthCardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  healthCardSmall: { fontSize: 10, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
  healthCardId: { fontSize: 18, fontWeight: '600' },
  healthCardLogoWrap: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  healthCardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  healthCardName: { fontSize: 18, fontWeight: '600' },
  healthCardBadge: { borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  healthCardBadgeText: { fontSize: 10, fontWeight: '700' },
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: CARD_H_PAD, gap: 12, marginBottom: 12 },
  categoryCard: { width: (SCREEN_W - CARD_H_PAD * 2 - 12) / 2, borderRadius: 33, borderWidth: 1, padding: 20, height: 130, justifyContent: 'space-between' },
  categoryIconRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  categoryIconWrap: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  categoryLabel: { fontSize: 14, fontWeight: '600' },
  categoryCount: { fontSize: 10, fontWeight: '400' },
  wideRow: { marginHorizontal: CARD_H_PAD, height: 73, borderRadius: 33, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 12 },
  wideRowLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  wideRowIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  wideRowLabel: { fontSize: 18, fontWeight: '700' },
  wideRowSub: { fontSize: 12, marginTop: 2 },
  bloodGroupRow: { marginHorizontal: CARD_H_PAD, flexDirection: 'row', gap: 12, marginBottom: 20 },
  bloodGroupLeft: { flex: 1, height: 73, borderRadius: 33, borderWidth: 1, justifyContent: 'center', paddingHorizontal: 23 },
  bloodGroupLabel: { fontSize: 18, fontWeight: '700' },
  bloodGroupBadge: { width: 99, height: 73, borderRadius: 40, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  bloodGroupValue: { fontSize: 32, fontWeight: '500' },
  recentSection: { paddingHorizontal: CARD_H_PAD, marginBottom: 20 },
  recentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  recentSectionTitle: { fontSize: 20, fontWeight: '800' },
  viewMoreText: { fontSize: 14, fontWeight: '500' },
  recentList: { gap: 12 },
  recentItem: { borderRadius: 33, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 18, gap: 12 },
  recentDateWrap: { width: 40 },
  recentDate: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  recentIconWrap: { width: 30, height: 30, alignItems: 'center', justifyContent: 'center' },
  recentTextWrap: { flex: 1 },
  recentTitle: { fontSize: 16, fontWeight: '600' },
  newBadge: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 4 },
  newBadgeText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  syncedBadge: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  syncDot: { width: 6, height: 6, borderRadius: 3 },
  syncedText: { fontSize: 10, fontWeight: '600', letterSpacing: 0.5 },
  vaultCard: { marginHorizontal: CARD_H_PAD, borderRadius: 33, borderWidth: 1, padding: 24 },
  vaultRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  vaultLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  vaultPercent: { fontSize: 24, fontWeight: '700' },
  vaultBarTrack: { height: 6, borderRadius: 3, overflow: 'hidden', marginBottom: 8 },
  vaultBarFill: { width: '64%', height: '100%', borderRadius: 3 },
  vaultSub: { fontSize: 12 },
});
