import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import BottomNavBar from '../../../components/BottomNavBar';

function ScanCard({ name, date, type, onPress, colors }: { name: string; date: string; type: string; onPress?: () => void; colors: any }) {
  return (
    <TouchableOpacity style={[styles.scanCard, { backgroundColor: colors.card, borderColor: colors.cardGlassBorder }]} activeOpacity={0.7} onPress={onPress}>
      <View style={[styles.scanIconWrap, { backgroundColor: colors.accentSoft }]}>
        <Ionicons name="scan-outline" size={20} color={colors.primary} />
      </View>
      <View style={styles.scanInfo}>
        <Text style={[styles.scanName, { color: colors.text, fontFamily: 'Inter' }]}>{name}</Text>
        <Text style={[styles.scanMeta, { color: colors.textSecondary, fontFamily: 'Inter' }]}>Date: {date}  •  {type}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
    </TouchableOpacity>
  );
}

export default function ScansListScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16, paddingBottom: 120 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text, fontFamily: 'Inter' }]}>Scans</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.searchSection}>
          <View style={[styles.searchBar, { backgroundColor: c.inputBackground, borderColor: c.inputBorder }]}>
            <Ionicons name="search" size={20} color={c.textSecondary} />
            <TextInput style={[styles.searchInput, { color: c.text, fontFamily: 'Inter' }]} placeholder="SEARCH SCANS" placeholderTextColor={c.inputPlaceholder} />
          </View>
          <View style={styles.filterRow}>
            <TouchableOpacity style={[styles.filterBtn, { backgroundColor: c.cardElevated, borderColor: c.cardGlassBorder }]}>
              <Ionicons name="options-outline" size={12} color={c.text} />
              <Text style={[styles.filterBtnText, { color: c.text, fontFamily: 'Inter' }]}>FILTERS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.addBtn, { backgroundColor: c.primary }]} onPress={() => navigation.navigate('ScanUpload')}>
              <Text style={[styles.addBtnText, { color: c.textOnPrimary, fontFamily: 'Inter' }]}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: c.text, fontFamily: 'Inter' }]}>Recent Scans</Text>
        <View style={styles.scansList}>
          <ScanCard name="MRI Brain Scan" date="23 March" type="MRI" onPress={() => navigation.navigate('ScanDetail')} colors={c} />
          <ScanCard name="X-Ray Chest" date="15 March" type="X-Ray" onPress={() => navigation.navigate('ScanDetail')} colors={c} />
          <ScanCard name="CT Scan Abdomen" date="02 Feb" type="CT" onPress={() => navigation.navigate('ScanDetail')} colors={c} />
          <ScanCard name="Ultrasound" date="10 Jan" type="USG" onPress={() => navigation.navigate('ScanDetail')} colors={c} />
        </View>
      </ScrollView>
      <BottomNavBar activeTab="card" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 0 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 16 },
  backBtn: { width: 24, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '600' },
  searchSection: { paddingHorizontal: 20, gap: 16, marginBottom: 24 },
  searchBar: { height: 58, borderRadius: 33, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, gap: 12 },
  searchInput: { flex: 1, fontSize: 16, fontWeight: '500' },
  filterRow: { flexDirection: 'row', gap: 8 },
  filterBtn: { height: 48, borderRadius: 33, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 25, gap: 8 },
  filterBtnText: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  addBtn: { height: 48, borderRadius: 33, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  addBtnText: { fontSize: 18, fontWeight: '800', textTransform: 'uppercase' },
  sectionTitle: { fontSize: 24, fontWeight: '700', letterSpacing: -0.6, paddingHorizontal: 25, marginBottom: 16 },
  scansList: { paddingHorizontal: 20, gap: 12 },
  scanCard: { borderRadius: 33, borderWidth: 1, flexDirection: 'row', alignItems: 'center', padding: 20, gap: 14 },
  scanIconWrap: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  scanInfo: { flex: 1 },
  scanName: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  scanMeta: { fontSize: 12 },
});
