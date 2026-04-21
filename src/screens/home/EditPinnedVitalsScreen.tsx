import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import BottomNavBar from '../../components/BottomNavBar';
import { useTheme } from '../../theme/ThemeProvider';

interface VitalItem {
  id: string;
  label: string;
  pinned: boolean;
}

interface VitalCategory {
  title: string;
  items: VitalItem[];
}

const INITIAL_DATA: VitalCategory[] = [
  {
    title: 'Pinned',
    items: [
      { id: 'weight', label: 'Weight', pinned: true },
      { id: 'period', label: 'Period Tracking', pinned: true },
      { id: 'caffeine', label: 'Caffeine', pinned: true },
      { id: 'water', label: 'Water', pinned: true },
    ],
  },
  {
    title: 'Activity',
    items: [
      { id: 'steps', label: 'Steps', pinned: false },
      { id: 'active-energy', label: 'Active Energy', pinned: false },
      { id: 'floors', label: 'Floors Climbed', pinned: false },
    ],
  },
  {
    title: 'Heart',
    items: [
      { id: 'heart-rate', label: 'Heart Rate', pinned: false },
      { id: 'blood-pressure', label: 'Blood Pressure', pinned: false },
      { id: 'spo2', label: 'SpO2', pinned: false },
      { id: 'vo2-max', label: 'VO2 Max', pinned: false },
    ],
  },
  {
    title: 'Lifestyle',
    items: [
      { id: 'sleep', label: 'Sleep', pinned: false },
      { id: 'medication', label: 'Medication', pinned: false },
      { id: 'alcohol', label: 'Alcohol Consumption', pinned: false },
      { id: 'smoking', label: 'Smoking', pinned: false },
    ],
  },
];

function MinusIcon({ color }: { color: string }) {
  return <View style={{ width: 12, height: 2, borderRadius: 1, backgroundColor: color }} />;
}

function PlusIcon({ color }: { color: string }) {
  return (
    <Svg width={12} height={12} viewBox="0 0 13 13" fill="none">
      <Path fillRule="evenodd" clipRule="evenodd" d="M6.32798 0C6.93383 0 7.42501 0.491146 7.42501 1.09703V11.553C7.42501 12.159 6.93383 12.65 6.32798 12.65C5.72213 12.65 5.23096 12.159 5.23096 11.553V1.09703C5.23096 0.491146 5.72213 0 6.32798 0Z" fill={color} />
      <Path fillRule="evenodd" clipRule="evenodd" d="M0 6.32164C0 5.71578 0.491161 5.22461 1.09703 5.22461H11.5639C12.1697 5.22461 12.6609 5.71578 12.6609 6.32164C12.6609 6.92749 12.1697 7.41866 11.5639 7.41866H1.09703C0.491161 7.41866 0 6.92749 0 6.32164Z" fill={color} />
    </Svg>
  );
}

export default function EditPinnedVitalsScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [search, setSearch] = useState('');
  const [data, setData] = useState<VitalCategory[]>(INITIAL_DATA);

  const togglePin = (catIdx: number, itemIdx: number) => {
    setData(prev =>
      prev.map((cat, ci) => ({
        ...cat,
        items: cat.items.map((item, ii) =>
          ci === catIdx && ii === itemIdx ? { ...item, pinned: !item.pinned } : item
        ),
      }))
    );
  };

  const filteredData = search.trim()
    ? data.map(cat => ({
        ...cat,
        items: cat.items.filter(i => i.label.toLowerCase().includes(search.toLowerCase())),
      })).filter(cat => cat.items.length > 0)
    : data;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      {/* ── Header ── */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={[styles.closeBtn, { color: c.primary, fontFamily: 'Inter' }]}>✕</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text, fontFamily: 'Inter' }]}>Edit List</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.doneBtn, { color: c.primary, fontFamily: 'Inter' }]}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* ── Search ── */}
      <View style={[styles.searchBar, { backgroundColor: c.inputBackground, borderColor: c.inputBorder }]}>
        <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
          <Path d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke={c.textSecondary} strokeWidth={1.5} strokeLinecap="round" />
        </Svg>
        <TextInput
          style={[styles.searchInput, { color: c.text, fontFamily: 'Inter' }]}
          placeholder="Search categories"
          placeholderTextColor={c.inputPlaceholder}
          value={search}
          onChangeText={setSearch}
          selectionColor={c.primary}
        />
      </View>

      {/* ── List ── */}
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 }]}
        showsVerticalScrollIndicator={false}
      >
        {filteredData.map((category, catIdx) => (
          <View key={category.title} style={styles.categoryWrap}>
            <Text style={[styles.categoryTitle, { color: c.text, fontFamily: 'Inter' }]}>{category.title}</Text>
            <View style={styles.itemsGap}>
              {category.items.map((item, itemIdx) => (
                <View key={item.id} style={[styles.listItem, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
                  <TouchableOpacity
                    style={[styles.actionCircle, { backgroundColor: item.pinned ? c.errorSoft : c.accentSoft }]}
                    onPress={() => togglePin(catIdx, itemIdx)}
                  >
                    {item.pinned ? <MinusIcon color={c.error} /> : <PlusIcon color={c.primary} />}
                  </TouchableOpacity>
                  <Text style={[styles.itemLabel, { color: c.text, fontFamily: 'Inter' }, item.pinned && { fontWeight: '700' }]}>
                    {item.label}
                  </Text>
                  {item.pinned && (
                    <View style={styles.dragHandle}>
                      <View style={[styles.dragLine, { backgroundColor: c.textMuted }]} />
                      <View style={[styles.dragLine, { backgroundColor: c.textMuted }]} />
                      <View style={[styles.dragLine, { backgroundColor: c.textMuted }]} />
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <BottomNavBar activeTab="home" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingBottom: 16 },
  closeBtn: { fontSize: 18, fontWeight: '400' },
  headerTitle: { fontSize: 24, fontWeight: '700', letterSpacing: -0.6 },
  doneBtn: { fontSize: 16, fontWeight: '700' },
  searchBar: { marginHorizontal: 24, height: 58, borderRadius: 33, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 17, gap: 12, marginBottom: 8 },
  searchInput: { flex: 1, fontSize: 16, fontWeight: '500', paddingVertical: 0 },
  scrollContent: { paddingHorizontal: 24 },
  categoryWrap: { marginTop: 20 },
  categoryTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  itemsGap: { gap: 12 },
  listItem: { borderRadius: 33, borderWidth: 1, flexDirection: 'row', alignItems: 'center', padding: 17, gap: 16 },
  actionCircle: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  itemLabel: { flex: 1, fontSize: 16, fontWeight: '500' },
  dragHandle: { gap: 3 },
  dragLine: { width: 18, height: 2, borderRadius: 1 },
});
