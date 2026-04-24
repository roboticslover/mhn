import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';

const { width: SCREEN_W } = Dimensions.get('window');
const H_PAD = 20;

// ─── CATEGORY CARD ───────────────────────────────────────────────────────────
function CategoryCard({
  iconType,
  iconName,
  label,
  count,
  onPress,
}: {
  iconType: any;
  iconName: string;
  label: string;
  count: string;
  onPress?: () => void;
}) {
  const IconComponent = iconType;
  const { isDark } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        {
          backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : '#FFFFFF',
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(188,203,183,0.24)',
        },
      ]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.categoryIconRow}>
        {/* Dark: circular green bg | Light: square with border radius 10, soft green bg */}
        <View
          style={[
            styles.categoryIconWrap,
            isDark
              ? { borderRadius: 22.5, backgroundColor: '#1C3220' }
              : { borderRadius: 10, backgroundColor: 'rgba(56,166,47,0.08)', borderWidth: 1, borderColor: 'rgba(56,166,47,0.15)' },
          ]}
        >
          <IconComponent name={iconName} size={22} color={isDark ? '#6FFB85' : '#38A62F'} />
        </View>
        <Feather
          name="arrow-up-right"
          size={16}
          color={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(20,20,20,0.3)'}
        />
      </View>
      <View>
        <Text style={[styles.categoryLabel, { color: isDark ? '#FDFDF6' : '#141414' }]}>{label}</Text>
        <Text style={[styles.categoryCount, { color: isDark ? 'rgba(255,255,255,0.4)' : '#757575' }]}>{count}</Text>
      </View>
    </TouchableOpacity>
  );
}

// ─── WIDE ROW ─────────────────────────────────────────────────────────────────
function WideRow({
  iconName,
  label,
  subtitle,
  onPress,
}: {
  iconName: string;
  label: string;
  subtitle?: string;
  onPress?: () => void;
}) {
  const { isDark } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.wideRow,
        {
          backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : '#FFFFFF',
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(188,203,183,0.24)',
        },
      ]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.wideRowLeft}>
        <View
          style={[
            styles.wideRowIcon,
            isDark
              ? { backgroundColor: '#1C3220' }
              : { backgroundColor: 'rgba(56,166,47,0.08)', borderWidth: 1, borderColor: 'rgba(56,166,47,0.15)' },
          ]}
        >
          <Ionicons name={iconName as any} size={22} color={isDark ? '#6FFB85' : '#38A62F'} />
        </View>
        <View>
          <Text style={[styles.wideRowLabel, { color: isDark ? '#FFFFFF' : '#141414' }]}>{label}</Text>
          {subtitle ? (
            <Text style={[styles.wideRowSub, { color: isDark ? 'rgba(255,255,255,0.45)' : '#757575' }]}>{subtitle}</Text>
          ) : null}
        </View>
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(20,20,20,0.3)'}
      />
    </TouchableOpacity>
  );
}

// ─── RECENT UPLOAD ITEM ───────────────────────────────────────────────────────
function RecentUploadItem({
  date,
  title,
  isNew,
  isSynced,
  iconType,
  iconName,
}: {
  date: string;
  title: string;
  isNew?: boolean;
  isSynced?: boolean;
  iconType: any;
  iconName: string;
}) {
  const { isDark } = useTheme();
  const IconComponent = iconType;
  const iconColor = isDark ? '#6FFB85' : '#38A62F';

  return (
    <View
      style={[
        styles.recentItem,
        {
          backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : '#FFFFFF',
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(188,203,183,0.24)',
        },
      ]}
    >
      {/* Date column */}
      <View style={styles.recentDateCol}>
        <Text style={[styles.recentDate, { color: isDark ? '#474944' : '#757575' }]}>{date}</Text>
      </View>

      {/* Icon */}
      <IconComponent name={iconName} size={22} color={iconColor} style={styles.recentIcon} />

      {/* Title */}
      <View style={styles.recentTextWrap}>
        <Text style={[styles.recentTitle, { color: isDark ? '#FDFDF6' : '#141414' }]} numberOfLines={3}>
          {title}
        </Text>
      </View>

      {/* Right side: badge + download */}
      <View style={styles.recentRight}>
        {isNew && (
          <View
            style={[
              styles.newBadge,
              {
                backgroundColor: isDark ? 'rgba(52,199,89,0.1)' : '#D0EBCD',
                borderColor: isDark ? 'rgba(52,199,89,0.23)' : '#38A62F',
              },
            ]}
          >
            <Text style={[styles.newBadgeText, { color: isDark ? '#6FFB85' : '#38A62F' }]}>NEW</Text>
          </View>
        )}
        {isSynced && (
          <View style={styles.syncedBadge}>
            <View style={[styles.syncDot, { backgroundColor: isDark ? '#6FFB85' : '#38A62F' }]} />
            <Text style={[styles.syncedText, { color: isDark ? 'rgba(255,255,255,0.55)' : '#757575' }]}>SYNCED</Text>
          </View>
        )}
        <Feather
          name="download"
          size={16}
          color={isDark ? 'rgba(255,255,255,0.4)' : 'rgba(20,20,20,0.35)'}
          style={styles.downloadIcon}
        />
      </View>
    </View>
  );
}

// ─── MAIN SCREEN ──────────────────────────────────────────────────────────────
export default function HealthWalletScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  // Theme-specific tokens
  const cardBg = isDark ? 'rgba(23,23,23,0.4)' : '#FFFFFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(188,203,183,0.24)';
  const primaryGreen = isDark ? '#6FFB85' : '#38A62F';
  const vaultColor = '#FF9500'; // orange for vault in both themes (matches Figma)

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F5F7F4' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top, paddingBottom: 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ═══ HEADER ═══ */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="chevron-back" size={26} color={isDark ? '#FFFFFF' : '#141414'} />
            </TouchableOpacity>
            <Text style={[styles.pageTitle, { color: isDark ? '#FFFFFF' : '#141414' }]}>Health Wallet</Text>
          </View>
          <TouchableOpacity style={styles.avatarBtn}>
            <Image source={{ uri: 'https://i.pravatar.cc/150?img=47' }} style={styles.avatarImage} />
          </TouchableOpacity>
        </View>

        {/* ═══ SEARCH BAR ═══ */}
        <TouchableOpacity
          style={[styles.searchBar, { backgroundColor: cardBg, borderColor: cardBorder }]}
          activeOpacity={0.7}
        >
          <Ionicons name="search-outline" size={18} color={isDark ? '#6FFB85' : '#38A62F'} />
          <Text style={[styles.searchPlaceholder, { color: isDark ? 'rgba(255,255,255,0.35)' : '#BEBEBE' }]}>
            Search for Documents
          </Text>
        </TouchableOpacity>

        {/* ═══ INSIGHTS BANNER ═══ */}
        <TouchableOpacity
          style={[styles.insightsBanner, { backgroundColor: cardBg, borderColor: cardBorder }]}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('AnalyticsList')}
        >
          <Text style={[styles.insightsBannerText, { color: isDark ? '#FFFFFF' : '#141414' }]}>
            Check Insights and Analytics
          </Text>
          <Ionicons name="chevron-forward" size={18} color={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(20,20,20,0.4)'} />
        </TouchableOpacity>

        {/* ═══ HEALTH CARD ═══ */}
        <View
          style={[
            styles.healthCard,
            isDark
              ? { backgroundColor: '#0f0f0f' }
              : { backgroundColor: '#EBEBEB' },
          ]}
        >
          {/* Top row: brand label + watermark icon */}
          <View style={styles.healthCardHeader}>
            <Text
              style={[
                styles.healthCardBrandLabel,
                { color: isDark ? 'rgba(255,255,255,0.6)' : '#38A62F' },
              ]}
            >
              MY HEALTH NOTION
            </Text>
            <Image
              source={require('../../../assets/health-card-icon.png')}
              style={[
                styles.healthCardWatermark,
                { opacity: isDark ? 0.25 : 0.55 },
              ]}
            />
          </View>

          {/* Member ID section */}
          <View style={styles.healthCardSection}>
            <Text
              style={[
                styles.healthCardSectionLabel,
                { color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(20,20,20,0.55)' },
              ]}
            >
              MEMBER ID
            </Text>
            <Text
              style={[
                styles.healthCardId,
                { color: isDark ? '#FFFFFF' : '#111111' },
              ]}
            >
              4829  1042  9928
            </Text>
          </View>

          {/* Card Holder + HEALTH CARD badge */}
          <View style={styles.healthCardBottom}>
            <View>
              <Text
                style={[
                  styles.healthCardSectionLabel,
                  { color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(20,20,20,0.55)' },
                ]}
              >
                CARD HOLDER
              </Text>
              <Text
                style={[
                  styles.healthCardName,
                  { color: isDark ? '#FFFFFF' : '#141414' },
                ]}
              >
                Kajal
              </Text>
            </View>
            <View
              style={[
                styles.healthCardBadge,
                { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(20,20,20,0.08)' },
              ]}
            >
              <Text
                style={[
                  styles.healthCardBadgeText,
                  { color: isDark ? '#FFFFFF' : '#141414' },
                ]}
              >
                HEALTH CARD
              </Text>
            </View>
          </View>
        </View>

        {/* ═══ CATEGORIES GRID ═══ */}
        <View style={styles.categoriesGrid}>
          <CategoryCard
            iconType={MaterialCommunityIcons}
            iconName="flask-outline"
            label="Lab/Health Reports"
            count="12 Files Found"
            onPress={() => navigation.navigate('AllHealthReports')}
          />
          <CategoryCard
            iconType={Ionicons}
            iconName="receipt-outline"
            label="Prescriptions"
            count="12 Files Found"
            onPress={() => navigation.navigate('AllPrescriptions')}
          />
          <CategoryCard
            iconType={Ionicons}
            iconName="scan-outline"
            label="Scans"
            count="12 Files Found"
            onPress={() => navigation.navigate('ScansList')}
          />
          <CategoryCard
            iconType={MaterialCommunityIcons}
            iconName="needle"
            label="Vaccinations"
            count="12 Files Found"
            onPress={() => navigation.navigate('AllVaccines')}
          />
        </View>

        {/* ═══ WIDE ROWS ═══ */}
        <WideRow
          iconName="document-text-outline"
          label="Health Insurance"
          subtitle="4 Activa"
          onPress={() => navigation.navigate('InsuranceList')}
        />
        <WideRow
          iconName="information-circle-outline"
          label="Medical Information"
          onPress={() => navigation.navigate('MedicalInformation')}
        />

        {/* ═══ BLOOD GROUP ═══ */}
        <View style={styles.bloodGroupWrapper}>
          {/* Main pill — extends full width */}
          <View
            style={[
              styles.bloodGroupPill,
              { backgroundColor: cardBg, borderColor: cardBorder },
            ]}
          >
            <Text style={[styles.bloodGroupLabel, { color: isDark ? '#FFFFFF' : '#141414' }]}>
              Blood Group
            </Text>
          </View>
          {/* Badge capsule overlaid on right */}
          <View
            style={[
              styles.bloodGroupBadge,
              {
                backgroundColor: isDark ? 'rgba(52,199,89,0.32)' : '#D0EBCD',
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(188,203,183,0.24)',
              },
            ]}
          >
            <Text
              style={[
                styles.bloodGroupValue,
                { color: isDark ? '#FFFFFF' : '#38A62F' },
              ]}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              O+
            </Text>
          </View>
        </View>

        {/* ═══ RECENTLY UPLOADED ═══ */}
        <View style={styles.recentSection}>
          <View style={styles.recentHeader}>
            <Text style={[styles.recentSectionTitle, { color: isDark ? '#FFFFFF' : '#141414' }]}>
              Recently Uploaded
            </Text>
            <TouchableOpacity style={styles.viewMoreBtn}>
              <Text style={[styles.viewMoreText, { color: primaryGreen }]}>View More </Text>
              <Feather name="arrow-right" size={15} color={primaryGreen} />
            </TouchableOpacity>
          </View>

          <View style={styles.recentList}>
            <RecentUploadItem
              date="24 OCT"
              title={'Blood\nPanel\n(Metabolic)'}
              isNew
              iconType={Ionicons}
              iconName="document-text-outline"
            />
            <RecentUploadItem
              date="21 OCT"
              title={'ECG\nSummary'}
              isSynced
              iconType={MaterialCommunityIcons}
              iconName="heart-pulse"
            />
            <RecentUploadItem
              date="15 OCT"
              title={'Annual\nImmuniz...'}
              isSynced
              iconType={MaterialCommunityIcons}
              iconName="needle"
            />
          </View>
        </View>

        {/* ═══ VAULT CAPACITY ═══ */}
        <View
          style={[
            styles.vaultCard,
            { backgroundColor: cardBg, borderColor: cardBorder },
          ]}
        >
          <View style={styles.vaultRow}>
            <Text style={[styles.vaultLabel, { color: isDark ? 'rgba(255,255,255,0.4)' : '#757575' }]}>
              VAULT CAPACITY
            </Text>
            <Text style={[styles.vaultPercent, { color: vaultColor }]}>64%</Text>
          </View>
          <View
            style={[
              styles.vaultBarTrack,
              { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#E8EAED' },
            ]}
          >
            <View style={[styles.vaultBarFill, { backgroundColor: vaultColor }]} />
          </View>
          <Text style={[styles.vaultSub, { color: isDark ? 'rgba(255,255,255,0.35)' : '#757575' }]}>
            1.2 GB of 2.0 GB used
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const CARD_W = SCREEN_W - H_PAD * 2;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 0 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: H_PAD,
    paddingVertical: 14,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pageTitle: { fontSize: 28, fontWeight: '600', fontFamily: 'Inter' },
  avatarBtn: { width: 48, height: 48, borderRadius: 24, overflow: 'hidden' },
  avatarImage: { width: '100%', height: '100%' },

  // Search bar
  searchBar: {
    marginHorizontal: H_PAD,
    height: 58,
    borderRadius: 33,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 10,
  },
  searchPlaceholder: { fontSize: 16, fontWeight: '500', fontFamily: 'Inter' },

  // Insights banner
  insightsBanner: {
    marginHorizontal: H_PAD,
    height: 58,
    borderRadius: 33,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  insightsBannerText: { fontSize: 18, fontWeight: '400', fontFamily: 'Inter' },

  // Health card
  healthCard: {
    marginHorizontal: H_PAD,
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 28,
    marginBottom: 22,
    overflow: 'hidden',
    position: 'relative',
  },
  healthCardBlob: {
    position: 'absolute',
    width: 256,
    height: 256,
    borderRadius: 128,
    top: -80,
    right: -60,
  },
  healthCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  healthCardWatermark: {
    width: 22,
    height: 36,
    resizeMode: 'contain',
  },
  healthCardBrandLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontFamily: 'Inter',
    lineHeight: 15,
  },
  healthCardSection: { marginBottom: 24 },
  healthCardSectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontFamily: 'Inter',
    lineHeight: 15,
    marginBottom: 4,
  },
  healthCardId: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: 28,
    letterSpacing: 2,
  },
  healthCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  healthCardName: { fontSize: 18, fontWeight: '600', fontFamily: 'Inter', lineHeight: 28 },
  healthCardBadge: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  healthCardBadgeText: { fontSize: 10, fontWeight: '700', fontFamily: 'Inter', lineHeight: 15 },

  // Categories grid
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: H_PAD,
    gap: 16,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (CARD_W - 16) / 2,
    borderRadius: 33,
    borderWidth: 1,
    padding: 22,
    height: 155,
    justifyContent: 'space-between',
  },
  categoryIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  categoryIconWrap: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryLabel: { fontSize: 16, fontWeight: '600', marginBottom: 3, fontFamily: 'Inter' },
  categoryCount: { fontSize: 10, fontFamily: 'Inter' },

  // Wide rows
  wideRow: {
    marginHorizontal: H_PAD,
    height: 70,
    borderRadius: 33,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 22,
    marginBottom: 10,
  },
  wideRowLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  wideRowIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wideRowLabel: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter' },
  wideRowSub: { fontSize: 12, marginTop: 2, fontFamily: 'Inter' },

  // Blood group
  bloodGroupWrapper: {
    marginHorizontal: H_PAD,
    height: 73,
    marginTop: 10,
    marginBottom: 22,
    position: 'relative',
  },
  bloodGroupPill: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 73,
    borderRadius: 33,
    borderWidth: 1,
    justifyContent: 'center',
    paddingLeft: 23,
    paddingRight: 110,
  },
  bloodGroupLabel: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter' },
  bloodGroupBadge: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 99,
    height: 73,
    borderRadius: 40,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  bloodGroupValue: {
    fontSize: 30,
    fontWeight: '600',
    fontFamily: 'Inter',
    textAlign: 'center',
  },

  // Recently uploaded
  recentSection: { marginBottom: 22 },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingHorizontal: H_PAD,
  },
  recentSectionTitle: { fontSize: 24, fontWeight: '700', letterSpacing: -0.6, fontFamily: 'Inter' },
  viewMoreBtn: { flexDirection: 'row', alignItems: 'center' },
  viewMoreText: { fontSize: 15, fontWeight: '600', fontFamily: 'Inter' },
  recentList: { paddingHorizontal: H_PAD },
  recentItem: {
    borderWidth: 1,
    borderRadius: 33,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 16,
    height: 110,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  recentDateCol: { width: 36, marginRight: 14 },
  recentDate: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    fontFamily: 'Manrope',
    lineHeight: 14,
  },
  recentIcon: { marginRight: 12, width: 26, textAlign: 'center' },
  recentTextWrap: { flex: 1, justifyContent: 'center' },
  recentTitle: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Inter',
    lineHeight: 20,
  },
  recentRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  newBadge: {
    borderWidth: 1,
    borderRadius: 9999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    fontFamily: 'Manrope',
  },
  syncedBadge: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  syncDot: { width: 6, height: 6, borderRadius: 3 },
  syncedText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    fontFamily: 'Manrope',
    letterSpacing: 0.3,
  },
  downloadIcon: { marginLeft: 4 },

  // Vault capacity
  vaultCard: {
    marginHorizontal: H_PAD,
    borderRadius: 33,
    borderWidth: 1,
    paddingHorizontal: 28,
    paddingTop: 18,
    paddingBottom: 18,
    marginBottom: 40,
  },
  vaultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 14,
  },
  vaultLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    fontFamily: 'Inter',
  },
  vaultPercent: { fontSize: 24, fontWeight: '300', fontFamily: 'Inter' },
  vaultBarTrack: {
    height: 3,
    borderRadius: 9999,
    overflow: 'hidden',
    marginBottom: 14,
  },
  vaultBarFill: { width: '64%', height: '100%', borderRadius: 9999 },
  vaultSub: { fontSize: 12, fontFamily: 'Inter' },
});

