import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import BottomNavBar from '../../components/BottomNavBar';

const { width: SCREEN_W } = Dimensions.get('window');
const CARD_H_PAD = 20;

function CategoryCard({ iconType, iconName, label, count, onPress }: { iconType: any; iconName: string; label: string; count: string; onPress?: () => void; }) {
  const IconComponent = iconType;
  return (
    <TouchableOpacity style={styles.categoryCard} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.categoryIconRow}>
        <View style={styles.categoryIconWrap}>
          <IconComponent name={iconName} size={22} color="#6FFB85" />
        </View>
        <Feather name="arrow-up-right" size={20} color="#555" />
      </View>
      <View>
        <Text style={styles.categoryLabel}>{label}</Text>
        <Text style={styles.categoryCount}>{count}</Text>
      </View>
    </TouchableOpacity>
  );
}

function WideRow({ iconName, label, subtitle, onPress }: { iconName: string; label: string; subtitle?: string; onPress?: () => void; }) {
  return (
    <TouchableOpacity style={styles.wideRow} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.wideRowLeft}>
        <View style={styles.wideRowIcon}>
          <Ionicons name={iconName as any} size={22} color="#6FFB85" />
        </View>
        <View>
          <Text style={styles.wideRowLabel}>{label}</Text>
          {subtitle ? <Text style={styles.wideRowSub}>{subtitle}</Text> : null}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#555" />
    </TouchableOpacity>
  );
}

function RecentUploadItem({ date, titleLines, isNew, isSynced, iconType, iconName }: { date: string; titleLines: string[]; isNew?: boolean; isSynced?: boolean; iconType: any; iconName: string }) {
  const IconComponent = iconType;
  return (
    <View style={styles.recentItem}>
      <View style={styles.recentDateWrap}>
        <Text style={styles.recentDate}>{date}</Text>
      </View>
      <View style={styles.recentIconWrap}>
        <IconComponent name={iconName} size={22} color="#FDFDF6" />
      </View>
      <View style={styles.recentTextWrap}>
        {titleLines.map((line, idx) => (
          <Text key={idx} style={styles.recentTitle}>{line}</Text>
        ))}
      </View>
      <View style={styles.recentRight}>
        {isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NEW</Text>
          </View>
        )}
        {isSynced && (
          <View style={styles.syncedBadge}>
            <View style={styles.syncDot} />
            <Text style={styles.syncedText}>SYNCED</Text>
          </View>
        )}
        <Feather name="download" size={18} color="#AAA" style={{ marginLeft: 16 }} />
      </View>
    </View>
  );
}

export default function HealthWalletScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: '#000' }]}>
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
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={26} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.pageTitle}>Health Wallet</Text>
          </View>
          <TouchableOpacity style={styles.avatarBtn}>
            <Image source={{ uri: 'https://i.pravatar.cc/150?img=47' }} style={styles.avatarImage} />
          </TouchableOpacity>
        </View>

        {/* ═══ SEARCH BAR ═══ */}
        <TouchableOpacity style={styles.searchBar} activeOpacity={0.7}>
          <Ionicons name="search" size={20} color="#6FFB85" />
          <Text style={styles.searchPlaceholder}>Search for Documents</Text>
        </TouchableOpacity>

        {/* ═══ INSIGHTS BANNER ═══ */}
        <TouchableOpacity
          style={styles.insightsBanner}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('AnalyticsEmpty')}
        >
          <Text style={styles.insightsBannerText}>Check Insights and Analytics</Text>
          <Ionicons name="chevron-forward" size={18} color="#FFF" />
        </TouchableOpacity>

        {/* ═══ HEALTH CARD ═══ */}
        <View style={styles.healthCard}>
          <View style={styles.healthCardBlob} />
          <View style={styles.healthCardHeader}>
            <Text style={styles.healthCardLabel}>MY HEALTH NOTION</Text>
            <Ionicons name="shield-checkmark" size={24} color="#FFF" style={{ opacity: 0.7 }} />
          </View>
          
          <View style={styles.healthCardMiddle}>
            <Text style={styles.healthCardSmall}>MEMBER ID</Text>
            <Text style={styles.healthCardId}>4829  1042  9928</Text>
          </View>

          <View style={styles.healthCardBottom}>
            <View>
              <Text style={styles.healthCardSmall}>CARD HOLDER</Text>
              <Text style={styles.healthCardName}>Kajal</Text>
            </View>
            <View style={styles.healthCardBadge}>
              <Text style={styles.healthCardBadgeText}>HEALTH CARD</Text>
            </View>
          </View>
        </View>

        {/* ═══ CATEGORIES GRID ═══ */}
        <View style={styles.categoriesGrid}>
          <CategoryCard iconType={MaterialCommunityIcons} iconName="flask-outline" label="Lab Reports" count="12 Files Found" onPress={() => navigation.navigate('HealthReportsEmpty')} />
          <CategoryCard iconType={Ionicons} iconName="receipt-outline" label="Prescriptions" count="12 Files Found" onPress={() => navigation.navigate('PrescriptionsEmpty')} />
          <CategoryCard iconType={Ionicons} iconName="calendar-outline" label="Scans" count="12 Files Found" onPress={() => navigation.navigate('ScansList')} />
          <CategoryCard iconType={MaterialCommunityIcons} iconName="needle" label="Vaccinations" count="12 Files Found" onPress={() => navigation.navigate('VaccinesEmpty')} />
        </View>

        {/* ═══ WIDE ROWS ═══ */}
        <WideRow iconName="document-text-outline" label="Health Insurance" subtitle="4 Active" onPress={() => navigation.navigate('InsuranceEmpty')} />
        <WideRow iconName="document-text-outline" label="Medical Information" onPress={() => {}} />

        {/* ═══ BLOOD GROUP ═══ */}
        <View style={styles.bloodGroupWrapper}>
          <View style={styles.bloodGroupRow}>
            <View style={styles.bloodGroupLeft}>
              <Text style={styles.bloodGroupLabel}>Blood Group</Text>
            </View>
            <View style={styles.bloodGroupBadge}>
              <Text style={styles.bloodGroupValue}>O+</Text>
            </View>
          </View>
        </View>

        {/* ═══ RECENTLY UPLOADED ═══ */}
        <View style={styles.recentSection}>
          <View style={styles.recentHeader}>
            <Text style={styles.recentSectionTitle}>Recently Uploaded</Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.viewMoreText}>View More </Text>
              <Feather name="arrow-right" size={16} color="#6FFB85" />
            </TouchableOpacity>
          </View>

          <View style={styles.recentList}>
            <RecentUploadItem date="24 OCT" titleLines={['Blood', 'Panel', '(Metabolic)']} isNew={true} iconType={Ionicons} iconName="document-text-outline" />
            <RecentUploadItem date="21 OCT" titleLines={['ECG', 'Summary']} isSynced={true} iconType={MaterialCommunityIcons} iconName="heart-pulse" />
            <RecentUploadItem date="15 OCT" titleLines={['Annual', 'Immuniz...']} isSynced={true} iconType={MaterialCommunityIcons} iconName="needle" />
          </View>
        </View>

        {/* ═══ VAULT CAPACITY ═══ */}
        <View style={styles.vaultCard}>
          <View style={styles.vaultRow}>
            <Text style={styles.vaultLabel}>VAULT CAPACITY</Text>
            <Text style={styles.vaultPercent}>64%</Text>
          </View>
          <View style={styles.vaultBarTrack}>
            <View style={styles.vaultBarFill} />
          </View>
          <Text style={styles.vaultSub}>1.2 GB of 2.0 GB used</Text>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pageTitle: { fontSize: 28, fontWeight: '600', color: '#FFF', fontFamily: 'Inter' },
  avatarBtn: { width: 48, height: 48, borderRadius: 24, overflow: 'hidden' },
  avatarImage: { width: '100%', height: '100%' },

  searchBar: { marginHorizontal: CARD_H_PAD, height: 58, borderRadius: 40, backgroundColor: 'rgba(23,23,23,0.4)', borderColor: 'rgba(23,23,23,0.4)', borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, gap: 12, marginBottom: 12, shadowColor: '#4B3425', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 16 },
  searchPlaceholder: { fontSize: 16, fontWeight: '500', color: '#AAA', opacity: 0.5, fontFamily: 'Inter' },

  insightsBanner: { marginHorizontal: CARD_H_PAD, height: 58, borderRadius: 40, backgroundColor: 'rgba(23,23,23,0.4)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20, shadowColor: '#4B3425', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 16 },
  insightsBannerText: { fontSize: 18, fontWeight: '400', color: '#FFF', fontFamily: 'Inter' },

  healthCard: { marginHorizontal: CARD_H_PAD, borderRadius: 25, backgroundColor: '#0A0A0A', paddingHorizontal: 32, paddingTop: 32, paddingBottom: 18, marginBottom: 24, overflow: 'hidden' },
  healthCardBlob: { position: 'absolute', width: 256, height: 256, borderRadius: 128, backgroundColor: 'rgba(255,255,255,0.1)', top: -80, right: -80, opacity: 0.8 },
  healthCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  healthCardLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter' },
  healthCardMiddle: { marginBottom: 24 },
  healthCardSmall: { fontSize: 10, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter', marginBottom: 4 },
  healthCardId: { fontSize: 20, fontWeight: '400', color: '#FFF', fontFamily: 'monospace', letterSpacing: 2 },
  healthCardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  healthCardName: { fontSize: 18, fontWeight: '600', color: '#FFF', fontFamily: 'Inter' },
  healthCardBadge: { borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: 'rgba(255,255,255,0.1)' },
  healthCardBadgeText: { fontSize: 10, fontWeight: '700', color: '#FFF', fontFamily: 'Inter' },

  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: CARD_H_PAD, gap: 18, marginBottom: 24, justifyContent: 'space-between' },
  categoryCard: { width: (SCREEN_W - CARD_H_PAD * 2 - 18) / 2, borderRadius: 33, backgroundColor: 'rgba(23,23,23,0.4)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1, padding: 25, height: 161, justifyContent: 'space-between' },
  categoryIconRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  categoryIconWrap: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#393B39', alignItems: 'center', justifyContent: 'center' },
  categoryLabel: { fontSize: 16, fontWeight: '500', color: '#FDFDF6', marginBottom: 4, fontFamily: 'Inter' },
  categoryCount: { fontSize: 10, color: '#AAA', fontFamily: 'Inter' },

  wideRow: { marginHorizontal: CARD_H_PAD, height: 70, borderRadius: 33, backgroundColor: 'rgba(23,23,23,0.4)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 11, paddingRight: 25, marginBottom: 12 },
  wideRowLeft: { flexDirection: 'row', alignItems: 'center', gap: 24 },
  wideRowIcon: { width: 49.5, height: 49.5, borderRadius: 25, backgroundColor: '#393B39', alignItems: 'center', justifyContent: 'center' },
  wideRowLabel: { fontSize: 18, fontWeight: '700', color: '#FFF', fontFamily: 'Inter' },
  wideRowSub: { fontSize: 12, marginTop: 2, color: '#AAA', fontFamily: 'Inter' },

  bloodGroupWrapper: { marginHorizontal: CARD_H_PAD, height: 73, marginBottom: 24, marginTop: 12 },
  bloodGroupRow: { flexDirection: 'row', flex: 1, position: 'relative' },
  bloodGroupLeft: { flex: 1, height: 73, borderRadius: 33, backgroundColor: 'rgba(23,23,23,0.4)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1, justifyContent: 'center', paddingHorizontal: 23, marginRight: 70 },
  bloodGroupBadge: { position: 'absolute', right: 0, width: 99, height: 73, borderRadius: 40, backgroundColor: 'rgba(52,199,89,0.32)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  bloodGroupLabel: { fontSize: 18, fontWeight: '700', color: '#FFF', fontFamily: 'Inter' },
  bloodGroupValue: { fontSize: 32, fontWeight: '500', color: '#FFF', fontFamily: 'Inter' },

  recentSection: { marginBottom: 24 },
  recentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16, paddingHorizontal: CARD_H_PAD },
  recentSectionTitle: { fontSize: 24, fontWeight: '700', color: '#FFF', letterSpacing: -0.6, fontFamily: 'Inter' },
  viewMoreText: { fontSize: 16, fontWeight: '600', color: '#6FFB85', fontFamily: 'Inter' },
  recentList: { paddingHorizontal: CARD_H_PAD },
  recentItem: { backgroundColor: 'rgba(23,23,23,0.4)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderRadius: 33, flexDirection: 'row', alignItems: 'center', paddingLeft: 32, paddingRight: 20, height: 117, marginBottom: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 4 },
  recentDateWrap: { width: 40, marginRight: 24 },
  recentDate: { fontSize: 10.5, fontWeight: '700', color: '#474944', textTransform: 'uppercase', fontFamily: 'Inter' },
  recentIconWrap: { width: 24, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  recentTextWrap: { flex: 1, justifyContent: 'center' },
  recentTitle: { fontSize: 16, fontWeight: '600', color: '#FDFDF6', fontFamily: 'Inter', lineHeight: 20 },
  recentRight: { flexDirection: 'row', alignItems: 'center' },
  newBadge: { backgroundColor: 'rgba(52,199,89,0.1)', borderColor: 'rgba(52,199,89,0.23)', borderWidth: 1, borderRadius: 9999, paddingHorizontal: 16, paddingVertical: 4 },
  newBadgeText: { fontSize: 10.5, fontWeight: '700', color: '#6FFB85', textTransform: 'uppercase', fontFamily: 'Inter' },
  syncedBadge: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  syncDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#6FFB85' },
  syncedText: { fontSize: 10.5, fontWeight: '700', color: '#999D93', letterSpacing: 0.5, textTransform: 'uppercase', fontFamily: 'Inter' },

  vaultCard: { marginHorizontal: CARD_H_PAD, borderRadius: 33, backgroundColor: 'rgba(23,23,23,0.4)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1, paddingHorizontal: 32, paddingVertical: 20, marginBottom: 40 },
  vaultRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 },
  vaultLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5, textTransform: 'uppercase', color: '#DEE5D8', fontFamily: 'Inter' },
  vaultPercent: { fontSize: 24, fontWeight: '300', color: '#FC8B00', fontFamily: 'Inter' },
  vaultBarTrack: { height: 3, borderRadius: 9999, backgroundColor: '#121410', overflow: 'hidden', marginBottom: 16 },
  vaultBarFill: { width: '64%', height: '100%', borderRadius: 9999, backgroundColor: '#FC8B00' },
  vaultSub: { fontSize: 12, color: '#ABACA5', fontFamily: 'Inter' },
});

