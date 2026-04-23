import React from 'react';
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
import { useTheme } from '../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';

export default function SelectAddressScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const cardBg = isDark ? 'rgba(23,23,23,0.4)' : c.card;
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder;

  return (
    <View style={[styles.container, { backgroundColor: c.background, paddingTop: insets.top }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      
      <ScreenHeader title="Select Address" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={{ paddingTop: 16, paddingBottom: insets.bottom + 40 }} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={[styles.searchBar, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <Ionicons name="search-outline" size={20} color={c.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: c.text, fontFamily: 'Inter-Medium' }]}
            placeholder="Search for area, street name..."
            placeholderTextColor={c.textSecondary}
          />
          <Ionicons name="mic-outline" size={20} color={c.text} />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={[styles.quickBtn, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(34,197,94,0.1)' }]}>
              <Ionicons name="location-outline" size={20} color={c.primary} />
            </View>
            <Text style={[styles.quickBtnText, { color: c.textSecondary, fontFamily: 'Inter' }]}>
              Use Current Location
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.quickBtn, { backgroundColor: cardBg, borderColor: cardBorder }]}
            onPress={() => navigation.navigate('AddAddress')}
          >
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(34,197,94,0.1)' }]}>
              <Ionicons name="add" size={24} color={c.primary} />
            </View>
            <Text style={[styles.quickBtnText, { color: c.textSecondary, fontFamily: 'Inter' }]}>
              Add New Address
            </Text>
          </TouchableOpacity>
        </View>

        {/* Saved Addresses */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#E5E5E5' : c.text }]}>SAVED ADDRESSES</Text>
          <View style={[styles.cardGroup, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            {/* Address 1 */}
            <TouchableOpacity style={styles.addressRow}>
              <View style={[styles.addressIconWrapper, { backgroundColor: isDark ? '#292524' : '#E0E0E0' }]}>
                <Ionicons name="home-outline" size={18} color={c.text} />
              </View>
              <View style={styles.addressContent}>
                <View style={styles.addressHeaderRow}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={[styles.addressTitle, { color: c.text }]}>Home</Text>
                    <View style={[styles.badge, { backgroundColor: 'rgba(34,197,94,0.2)' }]}>
                      <Text style={[styles.badgeText, { color: c.primary }]}>SELECTED</Text>
                    </View>
                  </View>
                  <Text style={[styles.distance, { color: c.textSecondary }]}>0.8 km</Text>
                </View>
                <Text style={[styles.addressDetail, { color: c.textSecondary }]} numberOfLines={1}>
                  24th Evergreen Terrace, S...
                </Text>
              </View>
              <Ionicons name="ellipsis-vertical" size={20} color={c.textSecondary} />
            </TouchableOpacity>

            <View style={[styles.divider, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : c.divider }]} />

            {/* Address 2 */}
            <TouchableOpacity style={styles.addressRow}>
              <View style={[styles.addressIconWrapper, { backgroundColor: isDark ? '#292524' : '#E0E0E0' }]}>
                <Ionicons name="briefcase-outline" size={18} color={c.text} />
              </View>
              <View style={styles.addressContent}>
                <View style={styles.addressHeaderRow}>
                  <Text style={[styles.addressTitle, { color: c.text }]}>Work</Text>
                  <Text style={[styles.distance, { color: c.textSecondary }]}>12.4 km</Text>
                </View>
                <Text style={[styles.addressDetail, { color: c.textSecondary }]} numberOfLines={1}>
                  Financial District, Tower B,...
                </Text>
              </View>
              <Ionicons name="ellipsis-vertical" size={20} color={c.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Recently Searched */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#E5E5E5' : c.text }]}>RECENTLY SEARCHED</Text>
          <View style={[styles.cardGroup, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <TouchableOpacity style={styles.addressRow}>
              <View style={[styles.addressIconWrapper, { backgroundColor: isDark ? '#292524' : '#E0E0E0' }]}>
                <Ionicons name="time-outline" size={18} color={c.text} />
              </View>
              <View style={styles.addressContent}>
                <Text style={[styles.addressTitle, { color: c.text }]}>CIB Quarters</Text>
                <Text style={[styles.addressDetail, { color: c.textSecondary }]} numberOfLines={1}>
                  Commercial International Ban...
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={c.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchBar: {
    marginHorizontal: 24,
    height: 56,
    borderRadius: 33,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  quickActions: {
    flexDirection: 'row',
    marginHorizontal: 24,
    gap: 12,
    marginBottom: 32,
  },
  quickBtn: {
    flex: 1,
    borderRadius: 33,
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickBtnText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  section: {
    marginHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 16,
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  cardGroup: {
    borderRadius: 33,
    borderWidth: 1,
    overflow: 'hidden',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  addressIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressContent: {
    flex: 1,
    gap: 4,
  },
  addressHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addressTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgeText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
  },
  distance: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  addressDetail: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  divider: {
    height: 1,
    marginLeft: 76,
    marginRight: 20,
  },
});
