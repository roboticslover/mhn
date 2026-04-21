import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import BottomNavBar from '../../../components/BottomNavBar';

function InsuranceCard({ provider, policyNo, type, status, statusColor, onPress, colors }: {
  provider: string; policyNo: string; type: string; status: string; statusColor: string; onPress?: () => void; colors: any;
}) {
  const badgeBg = statusColor + '22';
  return (
    <TouchableOpacity style={[styles.insuranceCard, { backgroundColor: colors.card, borderColor: colors.cardGlassBorder }]} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.cardHeader}>
        <View style={styles.providerRow}>
          <View style={[styles.providerIcon, { backgroundColor: colors.accentSoft }]}>
            <Ionicons name="shield-checkmark" size={18} color={colors.primary} />
          </View>
          <Text style={[styles.providerName, { color: colors.text, fontFamily: 'Inter' }]}>{provider}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: badgeBg }]}>
          <Text style={[styles.statusText, { color: statusColor, fontFamily: 'Inter' }]}>{status}</Text>
        </View>
      </View>
      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: colors.textSecondary, fontFamily: 'Inter' }]}>Policy No.</Text>
          <Text style={[styles.detailValue, { color: colors.text, fontFamily: 'Inter' }]}>{policyNo}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: colors.textSecondary, fontFamily: 'Inter' }]}>Type</Text>
          <Text style={[styles.detailValue, { color: colors.text, fontFamily: 'Inter' }]}>{type}</Text>
        </View>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity style={[styles.viewBtn, { backgroundColor: colors.primary }]}>
          <Text style={[styles.viewBtnText, { color: colors.textOnPrimary, fontFamily: 'Inter' }]}>VIEW DETAILS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.downloadBtn, { backgroundColor: colors.card, borderColor: colors.cardGlassBorder }]}>
          <Text style={[styles.downloadBtnText, { color: colors.text, fontFamily: 'Inter' }]}>DOWNLOAD</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default function InsuranceListScreen({ navigation }: { navigation: any }) {
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
          <Text style={[styles.headerTitle, { color: c.text, fontFamily: 'Inter' }]}>Health Insurance</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.searchSection}>
          <View style={[styles.searchBar, { backgroundColor: c.inputBackground, borderColor: c.inputBorder }]}>
            <Ionicons name="search" size={20} color={c.textSecondary} />
            <Text style={[styles.searchPlaceholder, { color: c.inputPlaceholder, fontFamily: 'Inter' }]}>SEARCH POLICIES</Text>
          </View>
          <View style={styles.filterRow}>
            <TouchableOpacity style={[styles.filterBtn, { backgroundColor: c.cardElevated, borderColor: c.cardGlassBorder }]}>
              <Ionicons name="options-outline" size={12} color={c.text} />
              <Text style={[styles.filterBtnText, { color: c.text, fontFamily: 'Inter' }]}>FILTERS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.addBtn, { backgroundColor: c.primary }]}>
              <Text style={[styles.addBtnText, { color: c.textOnPrimary, fontFamily: 'Inter' }]}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: c.text, fontFamily: 'Inter' }]}>Active Policies</Text>
        <View style={styles.cardsList}>
          <InsuranceCard provider="Star Health" policyNo="SH-2024-9928" type="Individual" status="ACTIVE" statusColor={c.primary} onPress={() => navigation.navigate('InsuranceDetail')} colors={c} />
          <InsuranceCard provider="HDFC Ergo" policyNo="HE-2023-4521" type="Family Floater" status="ACTIVE" statusColor={c.primary} onPress={() => navigation.navigate('InsuranceDetail')} colors={c} />
        </View>

        <Text style={[styles.sectionTitle, { color: c.text, fontFamily: 'Inter', marginTop: 24 }]}>Expired Policies</Text>
        <View style={styles.cardsList}>
          <InsuranceCard provider="ICICI Lombard" policyNo="IL-2022-1234" type="Individual" status="EXPIRED" statusColor={c.warning} onPress={() => navigation.navigate('InsuranceDetail')} colors={c} />
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
  searchPlaceholder: { fontSize: 16, fontWeight: '500' },
  filterRow: { flexDirection: 'row', gap: 8 },
  filterBtn: { height: 48, borderRadius: 33, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 25, gap: 8 },
  filterBtnText: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  addBtn: { height: 48, borderRadius: 33, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  addBtnText: { fontSize: 18, fontWeight: '800', textTransform: 'uppercase' },
  sectionTitle: { fontSize: 24, fontWeight: '700', letterSpacing: -0.6, paddingHorizontal: 25, marginBottom: 16 },
  cardsList: { paddingHorizontal: 20, gap: 12 },
  insuranceCard: { borderRadius: 33, borderWidth: 1, padding: 24, gap: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  providerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  providerIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  providerName: { fontSize: 18, fontWeight: '700' },
  statusBadge: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  statusText: { fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  cardDetails: { gap: 8 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between' },
  detailLabel: { fontSize: 12 },
  detailValue: { fontSize: 14, fontWeight: '500' },
  cardActions: { flexDirection: 'row', gap: 12 },
  viewBtn: { borderRadius: 33, paddingHorizontal: 16, paddingVertical: 10 },
  viewBtnText: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  downloadBtn: { borderRadius: 33, borderWidth: 1, paddingHorizontal: 20, paddingVertical: 10, justifyContent: 'center' },
  downloadBtnText: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
});
