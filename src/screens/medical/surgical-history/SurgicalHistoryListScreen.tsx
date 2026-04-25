import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle } from 'react-native-svg';

const AVATAR_URI = 'https://i.pravatar.cc/150?img=47';

// ─── Icons (matching Figma exactly) ───
function SearchIcon({ color = 'rgba(255,255,255,0.2)', size = 20 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Circle cx={9} cy={9} r={7} stroke={color} strokeWidth={2} />
      <Path d="M14 14L18 18" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function HeartIcon({ size = 20, color = '#FF4D4D' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path d="M10 17.5S2.5 13 2.5 7.5C2.5 4.5 5 2.5 7.5 2.5C8.9 2.5 10 3.3 10 3.3S11.1 2.5 12.5 2.5C15 2.5 17.5 4.5 17.5 7.5C17.5 13 10 17.5 10 17.5Z" fill={color} />
    </Svg>
  );
}

function EyeIcon({ size = 22, color = '#55EE71' }) {
  return (
    <Svg width={size} height={15} viewBox="0 0 22 15" fill="none">
      <Path d="M11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0ZM11 12.5C8.24 12.5 6 10.26 6 7.5C6 4.74 8.24 2.5 11 2.5C13.76 2.5 16 4.74 16 7.5C16 10.26 13.76 12.5 11 12.5ZM11 4.5C9.34 4.5 8 5.84 8 7.5C8 9.16 9.34 10.5 11 10.5C12.66 10.5 14 9.16 14 7.5C14 5.84 12.66 4.5 11 4.5Z" fill={color} />
    </Svg>
  );
}

function ScissorsIcon({ size = 20, color = '#55EE71' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Circle cx={5} cy={5} r={3} stroke={color} strokeWidth={1.5} />
      <Circle cx={5} cy={15} r={3} stroke={color} strokeWidth={1.5} />
      <Path d="M7.5 7L15 15M7.5 13L15 5" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function KneeIcon({ size = 19, color = '#55EE71' }) {
  return (
    <Svg width={size} height={20} viewBox="0 0 19 20" fill="none">
      <Path d="M9.5 2C6.5 2 4 5 4 8C4 11 6 14 9.5 18C13 14 15 11 15 8C15 5 12.5 2 9.5 2Z" stroke={color} strokeWidth={1.5} />
      <Circle cx={9.5} cy={8} r={2.5} stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}

function ChevronRight({ color = '#555', size = 7 }) {
  return (
    <Svg width={size} height={12} viewBox="0 0 7 12" fill="none">
      <Path d="M1 1L6 6L1 11" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function FilterIcon({ color = '#E2E2E2', size = 9 }) {
  return (
    <Svg width={size} height={6} viewBox="0 0 9 6" fill="none">
      <Path d="M0 0.5H9M2 2.75H7M3.5 5H5.5" stroke={color} strokeWidth={1} strokeLinecap="round" />
    </Svg>
  );
}

interface SurgicalRecord {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  status: 'Still going' | 'Completed';
  iconType: 'heart' | 'eye' | 'scissors' | 'knee';
}

const SAMPLE_RECORDS: SurgicalRecord[] = [
  {
    id: '1',
    title: 'Heart Bypass Surgery',
    startDate: '12 Apr 2026',
    endDate: '-- --- ----',
    status: 'Still going',
    iconType: 'heart',
  },
  {
    id: '2',
    title: 'Eye Replacement Surgery',
    startDate: '12 Aug 2023',
    endDate: '5 oct 2025',
    status: 'Completed',
    iconType: 'eye',
  },
  {
    id: '3',
    title: 'Appendectomy',
    startDate: '12 Aug 2023',
    endDate: '5 oct 2025',
    status: 'Completed',
    iconType: 'scissors',
  },
  {
    id: '4',
    title: 'Knee Arthroscopy',
    startDate: '12 Aug 2023',
    endDate: '5 oct 2025',
    status: 'Completed',
    iconType: 'knee',
  },
];

const FILTERS = ['All Procedures', 'Major', 'Minor'];

function RecordIcon({ type, isDark }: { type: string; isDark: boolean }) {
  const bgColor = type === 'heart' ? 'rgba(255,77,77,0.1)' : 'rgba(85,238,113,0.1)';
  const icons: Record<string, React.ReactNode> = {
    heart: <HeartIcon />,
    eye: <EyeIcon />,
    scissors: <ScissorsIcon />,
    knee: <KneeIcon />,
  };
  return (
    <View style={[styles.recordIconCircle, { backgroundColor: isDark ? bgColor : bgColor }]}>
      {icons[type]}
    </View>
  );
}

export default function SurgicalHistoryListScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 14, paddingBottom: 42 }} showsVerticalScrollIndicator={false}>
        {/* Header row */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="chevron-back" size={20} color={c.text} />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <Image source={{ uri: AVATAR_URI }} style={styles.avatarImage} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View
            style={[
              styles.searchBar,
              {
                backgroundColor: isDark ? 'rgba(31,31,31,0.4)' : '#F2F4F6',
                borderColor: isDark ? 'rgba(143,147,120,0.15)' : 'rgba(0,0,0,0.08)',
              },
            ]}
          >
            <SearchIcon color={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.3)'} />
            <Text style={[styles.searchPlaceholder, { color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.3)' }]}>SEARCH 128 PARAMETERS...</Text>
          </View>

          {/* Filters + ADD */}
          <View style={styles.filterRow}>
            <TouchableOpacity
              style={[
                styles.filterBtn,
                {
                  backgroundColor: isDark ? 'rgba(31,31,31,0.4)' : '#F2F4F6',
                  borderColor: isDark ? 'rgba(143,147,120,0.15)' : 'rgba(0,0,0,0.08)',
                },
              ]}
            >
              <FilterIcon color={isDark ? '#E2E2E2' : '#333'} />
              <Text style={[styles.filterBtnText, { color: isDark ? '#E2E2E2' : '#333' }]}>FILTERS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addBtn, { backgroundColor: isDark ? '#34C759' : c.primary }]}
              onPress={() => navigation.navigate('SurgicalHistoryAdd')}
            >
              <Text style={styles.addBtnText}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Category chips */}
        <View style={styles.chipsRow}>
          {FILTERS.map((f, i) => (
            <TouchableOpacity
              key={f}
              style={[
                styles.chip,
                {
                  backgroundColor: activeFilter === i ? (isDark ? '#55EE71' : c.primary) : isDark ? '#353535' : '#E8E8E8',
                },
              ]}
              onPress={() => setActiveFilter(i)}
            >
              <Text
                style={[
                  styles.chipText,
                  {
                    color: activeFilter === i ? (isDark ? '#003910' : '#FFFFFF') : isDark ? '#BCCBB7' : '#707070',
                  },
                ]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Record Cards */}
        <View style={styles.cardsContainer}>
          {SAMPLE_RECORDS.map((record) => (
            <TouchableOpacity
              key={record.id}
              style={[
                styles.card,
                {
                  backgroundColor: isDark ? '#1F1F1F' : c.card,
                  borderColor: isDark ? 'rgba(255,255,255,0.06)' : c.cardBorder,
                },
              ]}
              activeOpacity={0.75}
              onPress={() => navigation.navigate('SurgicalHistoryDetail', { record })}
            >
              <RecordIcon type={record.iconType} isDark={isDark} />
              <View style={styles.cardContent}>
                <Text style={[styles.cardTitle, { color: isDark ? '#E2E2E2' : c.text }]}>{record.title}</Text>
                <Text style={[styles.cardDate, { color: isDark ? '#BCCBB7' : c.textSecondary }]}>
                  Start: {record.startDate} • End: {record.endDate}
                </Text>
                <Text style={[
                  styles.cardStatus,
                  { color: record.status === 'Still going' ? '#FF4D4D' : '#30D158' },
                ]}>
                  {record.status.toUpperCase()}
                </Text>
              </View>
              <ChevronRight color={isDark ? '#555' : '#AAA'} />
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={[
            styles.vaultCard,
            {
              backgroundColor: isDark ? '#202020' : '#FFFFFF',
              borderColor: isDark ? 'transparent' : 'rgba(0,0,0,0.08)',
            },
          ]}
        >
          <View style={styles.vaultTopRow}>
            <Text style={[styles.vaultLabel, { color: isDark ? '#DEE5D8' : '#6A7567' }]}>VAULT CAPACITY</Text>
            <Text style={[styles.vaultValue, { color: '#FC8B00' }]}>64%</Text>
          </View>

          <View style={[styles.vaultTrack, { backgroundColor: isDark ? '#121410' : '#E9ECE7' }]}> 
            <View style={styles.vaultFill} />
          </View>

          <Text style={[styles.vaultSub, { color: isDark ? '#ABACA5' : '#707070' }]}>1.2 GB of 2.0 GB used</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 29,
    marginBottom: 20,
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  searchSection: {
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 16,
  },
  searchBar: {
    height: 62,
    borderRadius: 48,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 16,
  },
  searchPlaceholder: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.4,
    lineHeight: 14,
    textTransform: 'uppercase',
    fontFamily: 'Manrope-ExtraBold',
    flex: 1,
    padding: 0,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 25,
    paddingVertical: 21,
    borderRadius: 70,
    borderWidth: 1,
  },
  filterBtnText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    fontFamily: 'Manrope-ExtraBold',
  },
  addBtn: {
    paddingHorizontal: 32,
    paddingVertical: 21,
    borderRadius: 108,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
    textTransform: 'uppercase',
    fontFamily: 'Manrope-ExtraBold',
  },
  chipsRow: {
    flexDirection: 'row',
    paddingHorizontal: 26,
    gap: 8,
    marginBottom: 22,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  cardsContainer: {
    paddingHorizontal: 26,
    gap: 13,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 33,
    borderWidth: 1,
  },
  recordIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    fontFamily: 'Inter-SemiBold',
  },
  cardDate: {
    fontSize: 8,
    fontWeight: '400',
    lineHeight: 16,
    fontFamily: 'Inter',
  },
  cardStatus: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    fontFamily: 'Inter-Medium',
  },
  vaultCard: {
    marginTop: 22,
    marginHorizontal: 21,
    borderRadius: 40,
    paddingHorizontal: 32,
    paddingVertical: 20,
    borderWidth: 1,
  },
  vaultTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  vaultLabel: {
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontFamily: 'Manrope-Bold',
  },
  vaultValue: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '300',
    fontFamily: 'Manrope-Light',
  },
  vaultTrack: {
    height: 3,
    borderRadius: 999,
    overflow: 'hidden',
  },
  vaultFill: {
    height: '100%',
    width: '64%',
    borderRadius: 999,
    backgroundColor: '#FC8B00',
    shadowColor: '#D1FC00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  vaultSub: {
    marginTop: 16,
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
});
