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
import { useTheme } from '../../theme/ThemeProvider';

interface BiomarkerItem {
  id: string;
  label: string;
  value: string;
  unit: string;
  status: string;
  statusColor: string;
  pinned: boolean;
}

const SUCCESS_COLOR = '#6FFB85';
const ERROR_COLOR = '#DB5034';

const PINNED_INITIAL: BiomarkerItem[] = [
  { id: 'bg-p1', label: 'BLOOD GLUCOSE', value: '88', unit: 'mg/dL', status: 'STABLE', statusColor: SUCCESS_COLOR, pinned: true },
  { id: 'ch-p1', label: 'CHOLESTROL', value: '100', unit: 'mg/dL', status: 'RISK', statusColor: ERROR_COLOR, pinned: true },
  { id: 'bg-p2', label: 'BLOOD GLUCOSE', value: '88', unit: 'mg/dL', status: 'STABLE', statusColor: SUCCESS_COLOR, pinned: true },
];

const ALL_INITIAL: BiomarkerItem[] = [
  { id: 'ch-a1', label: 'CHOLESTROL', value: '100', unit: 'mg/dL', status: 'RISK', statusColor: ERROR_COLOR, pinned: false },
  { id: 'bg-a1', label: 'BLOOD GLUCOSE', value: '88', unit: 'mg/dL', status: 'STABLE', statusColor: SUCCESS_COLOR, pinned: false },
  { id: 'ch-a2', label: 'CHOLESTROL', value: '100', unit: 'mg/dL', status: 'RISK', statusColor: ERROR_COLOR, pinned: false },
  { id: 'bg-a2', label: 'BLOOD GLUCOSE', value: '88', unit: 'mg/dL', status: 'STABLE', statusColor: SUCCESS_COLOR, pinned: false },
  { id: 'ch-a3', label: 'CHOLESTROL', value: '100', unit: 'mg/dL', status: 'RISK', statusColor: ERROR_COLOR, pinned: false },
  { id: 'bg-a3', label: 'BLOOD GLUCOSE', value: '88', unit: 'mg/dL', status: 'STABLE', statusColor: SUCCESS_COLOR, pinned: false },
  { id: 'ch-a4', label: 'CHOLESTROL', value: '100', unit: 'mg/dL', status: 'RISK', statusColor: ERROR_COLOR, pinned: false },
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

function BiomarkerRow({ item, onToggle, colors }: { item: BiomarkerItem; onToggle: () => void; colors: any }) {
  const badgeBg = item.statusColor + '15';
  return (
    <View style={[styles.bioRow, { backgroundColor: colors.card, borderColor: colors.cardGlassBorder }]}>
      <TouchableOpacity
        style={[styles.actionCircle, { backgroundColor: item.pinned ? colors.errorSoft : colors.accentSoft }]}
        onPress={onToggle}
      >
        {item.pinned ? <MinusIcon color={colors.error} /> : <PlusIcon color={colors.primary} />}
      </TouchableOpacity>
      
      <View style={styles.bioRowContent}>
        <View style={styles.bioRowTop}>
          <Text style={[styles.bioLabel, { color: colors.text, fontFamily: 'Inter' }, item.pinned && { fontWeight: '700' }]}>{item.label}</Text>
          <View style={[styles.bioBadge, { backgroundColor: badgeBg }]}>
            <Text style={[styles.bioBadgeText, { color: item.statusColor, fontFamily: 'Inter' }]}>{item.status}</Text>
          </View>
        </View>
        <View style={styles.bioRowBottom}>
          <Text style={[styles.bioValue, { color: item.statusColor, fontFamily: 'Inter' }]}>{item.value}</Text>
          <Text style={[styles.bioUnit, { color: item.statusColor, fontFamily: 'Inter' }]}>{item.unit}</Text>
        </View>
      </View>

      {item.pinned && (
        <View style={styles.dragHandle}>
          <View style={[styles.dragLine, { backgroundColor: colors.textSecondary }]} />
          <View style={[styles.dragLine, { backgroundColor: colors.textSecondary }]} />
          <View style={[styles.dragLine, { backgroundColor: colors.textSecondary }]} />
        </View>
      )}
    </View>
  );
}

export default function EditPinnedBiomarkersScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [search, setSearch] = useState('');
  const [pinned, setPinned] = useState(PINNED_INITIAL);
  const [all, setAll] = useState(ALL_INITIAL);

  const unpin = (idx: number) => setPinned(prev => prev.filter((_, i) => i !== idx));
  const pin = (idx: number) => {
    const item = all[idx];
    setPinned(prev => [...prev, { ...item, pinned: true }]);
  };

  const filteredAll = search.trim()
    ? all.filter(i => i.label.toLowerCase().includes(search.toLowerCase()))
    : all;

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

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 }]}
        showsVerticalScrollIndicator={false}
      >
        {pinned.length > 0 && (
          <View style={styles.sectionWrap}>
            <Text style={[styles.sectionTitle, { color: c.text, fontFamily: 'Inter' }]}>Pinned</Text>
            <View style={styles.itemsGap}>
              {pinned.map((item, idx) => (
                <BiomarkerRow key={item.id} item={item} onToggle={() => unpin(idx)} colors={c} />
              ))}
            </View>
          </View>
        )}

        <View style={styles.sectionWrap}>
          <Text style={[styles.sectionTitle, { color: c.text, fontFamily: 'Inter' }]}>All Biomarkers</Text>
          <View style={styles.itemsGap}>
            {filteredAll.map((item, idx) => (
              <BiomarkerRow key={item.id} item={{ ...item, pinned: false }} onToggle={() => pin(idx)} colors={c} />
            ))}
          </View>
        </View>
      </ScrollView>
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
  sectionWrap: { marginTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  itemsGap: { gap: 12 },
  bioRow: { borderRadius: 33, borderWidth: 1, padding: 20, flexDirection: 'row', alignItems: 'center', gap: 16 },
  bioRowContent: { flex: 1 },
  bioRowTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  bioLabel: { fontSize: 14, fontWeight: '500', letterSpacing: 0.5 },
  bioBadge: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  bioBadgeText: { fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  bioRowBottom: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  bioValue: { fontSize: 32, fontWeight: '300', letterSpacing: -0.5 },
  bioUnit: { fontSize: 13, fontWeight: '500' },
  actionCircle: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  dragHandle: { gap: 3 },
  dragLine: { width: 18, height: 2, borderRadius: 1 },
});
