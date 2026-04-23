import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';

export default function AddAddressScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const [addressType, setAddressType] = useState('Home');
  const [completeAddress, setCompleteAddress] = useState('Flat, House no., Building, Apartment');
  const [landmark, setLandmark] = useState('near green park');
  const [floor, setFloor] = useState('');
  const [pincode, setPincode] = useState('000000');
  const [isDefault, setIsDefault] = useState(false);

  const cardBg = isDark ? 'rgba(23,23,23,0.4)' : c.card;
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder;

  return (
    <View style={[styles.container, { backgroundColor: c.background, paddingTop: insets.top }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      
      <ScreenHeader title="Select Address" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false}>
        {/* Map Preview Placeholder */}
        <View style={styles.mapContainer}>
          <View style={[styles.mapPlaceholder, { backgroundColor: isDark ? '#1A1A1A' : '#E5E5E5' }]}>
            <Ionicons name="map-outline" size={48} color={c.textSecondary} />
            <Text style={{ color: c.textSecondary, marginTop: 10 }}>Map View</Text>
          </View>
          <View style={styles.mapOverlay}>
            <View style={[styles.mapBadge, { backgroundColor: cardBg, borderColor: cardBorder }]}>
              <Ionicons name="location" size={14} color={c.primary} />
              <Text style={[styles.mapBadgeText, { color: c.text }]}>Current Location pinned</Text>
            </View>
          </View>
        </View>

        {/* Search Bar overlay-like */}
        <View style={[styles.searchBar, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <Ionicons name="search-outline" size={20} color={c.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: c.text, fontFamily: 'Inter-Regular' }]}
            placeholder="Search for area, street name..."
            placeholderTextColor={c.textSecondary}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={[styles.sectionTitle, { color: c.textSecondary }]}>Save address as</Text>
          <View style={styles.chipRow}>
            {['Home', 'Work', 'Others'].map((type) => {
              const selected = addressType === type;
              return (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: selected ? 'rgba(34,197,94,0.1)' : cardBg,
                      borderColor: selected ? 'rgba(34,197,94,0.3)' : cardBorder,
                    }
                  ]}
                  onPress={() => setAddressType(type)}
                >
                  <Ionicons 
                    name={type === 'Home' ? 'home-outline' : type === 'Work' ? 'briefcase-outline' : 'location-outline'} 
                    size={16} 
                    color={selected ? c.primary : c.textSecondary} 
                  />
                  <Text style={[styles.chipText, { color: selected ? c.primary : c.textSecondary }]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={[styles.inputLabel, { color: c.primary }]}>Complete Address</Text>
          <View style={[styles.inputWrapper, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <TextInput
              style={[styles.inputField, { color: c.text }]}
              value={completeAddress}
              onChangeText={setCompleteAddress}
              multiline
            />
          </View>

          <View style={styles.rowInputs}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.inputLabel, { color: c.primary }]}>Floor</Text>
              <View style={[styles.inputWrapper, { backgroundColor: cardBg, borderColor: cardBorder }]}>
                <TextInput
                  style={[styles.inputField, { color: c.text }]}
                  placeholder="Floor number"
                  placeholderTextColor={c.textSecondary}
                  value={floor}
                  onChangeText={setFloor}
                />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.inputLabel, { color: c.primary }]}>Pincode</Text>
              <View style={[styles.inputWrapper, { backgroundColor: cardBg, borderColor: cardBorder }]}>
                <TextInput
                  style={[styles.inputField, { color: c.text }]}
                  placeholder="000000"
                  placeholderTextColor={c.textSecondary}
                  value={pincode}
                  onChangeText={setPincode}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          <Text style={[styles.inputLabel, { color: c.primary }]}>Landmark</Text>
          <View style={[styles.inputWrapper, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <TextInput
              style={[styles.inputField, { color: c.text }]}
              value={landmark}
              onChangeText={setLandmark}
            />
          </View>

          <View style={styles.switchRow}>
            <View style={styles.switchIcon}>
              <Ionicons name="information-circle-outline" size={20} color={c.textSecondary} />
            </View>
            <Text style={[styles.switchLabel, { color: c.text }]}>Is this where you stay?</Text>
            <Switch
              value={isDefault}
              onValueChange={setIsDefault}
              trackColor={{ false: '#3F3F46', true: c.primary }}
              thumbColor={isDefault ? c.textOnPrimary : '#FFF'}
            />
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={[styles.bottomBtnContainer, { paddingBottom: insets.bottom || 24 }]}>
        <TouchableOpacity style={[styles.saveBtn, { backgroundColor: c.primary }]} onPress={() => navigation.goBack()}>
          <Ionicons name="checkmark" size={20} color={c.textOnPrimary} />
          <Text style={[styles.saveBtnText, { color: c.textOnPrimary }]}>Save Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapContainer: {
    height: 192,
    marginHorizontal: 24,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    marginTop: 16,
  },
  mapPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  mapBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
  },
  mapBadgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  searchBar: {
    marginHorizontal: 24,
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
    marginTop: -170, // Overlap onto map
    marginBottom: 130,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  formContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  sectionTitle: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 16,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 33,
    borderWidth: 1,
    gap: 8,
  },
  chipText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  inputLabel: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 14,
    marginBottom: -8,
    zIndex: 1,
    marginLeft: 8,
  },
  inputWrapper: {
    borderRadius: 33,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    minHeight: 58,
  },
  inputField: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 14,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 12,
  },
  switchIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchLabel: {
    flex: 1,
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 14,
  },
  bottomBtnContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  saveBtn: {
    height: 56,
    borderRadius: 33,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveBtnText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
});
