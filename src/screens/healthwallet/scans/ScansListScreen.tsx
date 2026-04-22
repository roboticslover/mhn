import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, StatusBar,
  TouchableOpacity, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import BottomNavBar from '../../../components/BottomNavBar';

type ScanStatus = 'NORMAL' | 'WARNING';

interface ScanItem {
  id: string;
  name: string;
  date: string;
  bodyPart: string;
  status: ScanStatus;
}

const MOCK_SCANS: ScanItem[] = [
  { id: '1', name: 'Neuro_MRI_V4', date: 'OCT 14, 2024', bodyPart: 'Part of the Body', status: 'NORMAL' },
  { id: '2', name: 'Torso_CT_Scan', date: 'OCT 14, 2024', bodyPart: 'Part of the Body', status: 'WARNING' },
];

function ScanCard({ item, onPress, onEdit, colors }: { item: ScanItem; onPress: () => void; onEdit: () => void; colors: any }) {
  const isWarning = item.status === 'WARNING';
  return (
    <TouchableOpacity
      style={[styles.scanCard, { backgroundColor: 'rgba(23,23,23,0.4)', borderColor: 'rgba(255,255,255,0.08)' }]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {/* Status + Title row */}
      <View style={styles.cardTopRow}>
        <View style={styles.cardTitleGroup}>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: isWarning ? '#DB5034' : '#34C759' }]} />
            <Text style={[styles.statusText, { color: isWarning ? '#DB5034' : '#34C759' }]}>
              {item.status}
            </Text>
          </View>
          <Text style={styles.cardName}>{item.name}</Text>
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity onPress={onEdit} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="create-outline" size={18} color="rgba(255,255,255,0.74)" />
          </TouchableOpacity>
          <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="ellipsis-vertical" size={14} color="rgba(255,255,255,0.5)" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scan image area */}
      <View style={styles.scanImageArea}>
        <View style={styles.scanImagePlaceholder}>
          <Ionicons name="scan-outline" size={40} color="rgba(255,255,255,0.15)" />
        </View>
        <View style={styles.latestBadge}>
          <Text style={styles.latestText}>LATEST</Text>
        </View>
      </View>

      {/* Meta row */}
      <View style={styles.cardMetaRow}>
        <View>
          <Text style={styles.metaLabel}>TIMESTAMP</Text>
          <Text style={styles.metaValue}>{item.date}</Text>
        </View>
        <Text style={styles.metaValue}>{item.bodyPart}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function ScansListScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = theme.colors;
  const [searchText, setSearchText] = useState('');

  const filtered = MOCK_SCANS.filter(s =>
    s.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16, paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text }]}>Scans</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Search + filters */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="rgba(170,170,170,0.8)" style={{ marginRight: 4 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="SEARCH 128 PARAMETERS..."
              placeholderTextColor="rgba(170,170,170,0.5)"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <View style={styles.filterRow}>
            <TouchableOpacity style={styles.filterBtn}>
              <Ionicons name="options-outline" size={10} color="rgba(255,255,255,0.6)" />
              <Text style={styles.filterBtnText}>FILTERS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => navigation.navigate('ScanUpload')}
            >
              <Text style={styles.addBtnText}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Scan cards */}
        <View style={styles.cardsList}>
          {filtered.map(item => (
            <ScanCard
              key={item.id}
              item={item}
              onPress={() => navigation.navigate('ScanDetail', { scan: item })}
              onEdit={() => navigation.navigate('ScanEdit', { scan: item })}
              colors={c}
            />
          ))}
        </View>

        {/* Load previous records */}
        <TouchableOpacity style={styles.loadMoreBtn} activeOpacity={0.6}>
          <Ionicons name="time-outline" size={20} color="rgba(229,229,229,0.5)" />
          <Text style={styles.loadMoreText}>LOAD PREVIOUS RECORDS</Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomNavBar activeTab="card" navigation={navigation} />
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
  searchSection: { paddingHorizontal: 20, gap: 16, marginBottom: 20 },
  searchBar: {
    height: 58,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(23,23,23,0.4)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#AAAAAA',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  filterRow: { flexDirection: 'row', gap: 8 },
  filterBtn: {
    height: 48,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(23,23,23,0.4)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    gap: 8,
  },
  filterBtnText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  addBtn: {
    height: 48,
    borderRadius: 33,
    backgroundColor: '#6FFB85',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  addBtnText: {
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#141414',
    textTransform: 'uppercase',
  },
  cardsList: { paddingHorizontal: 20, gap: 16 },
  scanCard: {
    borderRadius: 33,
    borderWidth: 1,
    padding: 24,
    gap: 16,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  cardTitleGroup: { gap: 4 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 12, fontWeight: '400', fontFamily: 'Inter', lineHeight: 16 },
  cardName: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#FFFFFF',
    letterSpacing: -0.6,
    lineHeight: 32,
  },
  cardActions: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  scanImageArea: {
    height: 164,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: '#000000',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanImagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    opacity: 0.6,
  },
  latestBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: '#34C759',
    borderRadius: 33,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  latestText: {
    fontSize: 9,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#000000',
    textTransform: 'uppercase',
  },
  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  metaLabel: {
    fontSize: 9,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  metaValue: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 16,
  },
  loadMoreBtn: {
    marginTop: 24,
    marginHorizontal: 25,
    borderRadius: 33,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(23,23,23,0.4)',
    height: 113,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    opacity: 0.3,
  },
  loadMoreText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#E5E5E5',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
