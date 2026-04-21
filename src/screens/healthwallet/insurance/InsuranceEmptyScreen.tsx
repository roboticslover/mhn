import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import BottomNavBar from '../../../components/BottomNavBar';

export default function InsuranceEmptyScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text, fontFamily: 'Inter' }]}>Health Insurance</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={[styles.centralCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
        <View style={styles.illustrationArea}>
          <View style={[styles.mainGlassCircle, { backgroundColor: c.cardElevated, borderColor: c.cardGlassBorder }]}>
            <View style={[styles.centerElement, { backgroundColor: c.accentSoft, borderColor: c.primary + '60' }]}>
              <Ionicons name="shield-checkmark-outline" size={32} color={c.primary} />
            </View>
          </View>
        </View>
        <Text style={[styles.emptyTitle, { color: c.text, fontFamily: 'Inter' }]}>No Insurance{'\n'}Policies Found</Text>
        <Text style={[styles.emptySubtitle, { color: c.textSecondary, fontFamily: 'Inter' }]}>
          Keep all your insurance documents{'\n'}in one secure place. Add your first{'\n'}policy to get started.
        </Text>
        <TouchableOpacity style={[styles.addButton, { backgroundColor: c.accentSoft }]} activeOpacity={0.7} onPress={() => navigation.navigate('InsuranceList')}>
          <Text style={[styles.addButtonText, { color: c.primary, fontFamily: 'Inter' }]}>ADD INSURANCE</Text>
        </TouchableOpacity>
      </View>

      <BottomNavBar activeTab="card" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 12 },
  backBtn: { width: 24, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '600' },
  centralCard: { flex: 1, borderRadius: 33, borderWidth: 1, alignItems: 'center', paddingVertical: 20, paddingHorizontal: 49, marginBottom: 100 },
  illustrationArea: { width: 230, height: 230, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  mainGlassCircle: { width: 180, height: 180, borderRadius: 90, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  centerElement: { width: 100, height: 100, borderRadius: 16, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: 34, fontWeight: '700', textAlign: 'center', lineHeight: 40, letterSpacing: -0.68, marginBottom: 20 },
  emptySubtitle: { fontSize: 16, fontWeight: '500', textAlign: 'center', lineHeight: 24, opacity: 0.8, marginBottom: 24 },
  addButton: { borderRadius: 40, height: 58, alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch' },
  addButtonText: { fontSize: 18, fontWeight: '700' },
});
