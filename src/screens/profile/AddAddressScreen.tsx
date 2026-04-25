import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Dimensions,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DARK_MAP = "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066&auto=format&fit=crop";
const LIGHT_MAP = "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop";

export default function AddAddressScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');

  const textColor = isDark ? '#FFF' : '#000';
  const subTextColor = isDark ? '#AAA' : '#666';
  const cardBg = isDark ? 'rgba(23,23,23,0.85)' : 'rgba(255,255,255,0.95)';
  const borderCol = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)';
  const overlayCol = isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.1)';

  const renderHeader = () => {
    if (isSearching) {
      return (
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setIsSearching(false)}
          >
            <Ionicons name="chevron-back" size={24} color={textColor} />
          </TouchableOpacity>
          <View style={[styles.searchBarContainer, { backgroundColor: cardBg, borderColor: borderCol }]}>
            <Ionicons name="search" size={20} color="#55EE71" style={{ marginLeft: 16 }} />
            <TextInput
              style={[styles.searchInput, { color: textColor }]}
              placeholder="Search for area, street..."
              placeholderTextColor={isDark ? '#666' : '#999'}
              value={searchText}
              onChangeText={setSearchText}
              autoFocus
            />
            {searchText !== '' && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Ionicons name="close" size={20} color={isDark ? '#666' : '#999'} style={{ marginRight: 16 }} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      );
    }

    return (
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={textColor} />
        </TouchableOpacity>
        
        <Text style={[styles.headerTitle, { color: textColor }]}>Address</Text>

        <TouchableOpacity 
          style={[styles.searchButtonAbsolute, { 
            backgroundColor: cardBg, 
            borderColor: borderCol,
            top: insets.top + 4 
          }]}
          onPress={() => setIsSearching(true)}
        >
          <Ionicons name="search" size={24} color="#55EE71" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderCard = () => {
    const isSearchingState = isSearching;
    return (
      <View style={[styles.bottomCard, { 
        paddingBottom: insets.bottom + 20,
        backgroundColor: cardBg,
        borderColor: borderCol
      }]}>
        <View style={styles.cardContent}>
          {!isSearchingState && (
            <View style={styles.tagRow}>
              <View style={styles.tagBadge}>
                <View style={styles.checkmarkWrap}>
                  <Ionicons name="checkmark" size={8} color="#55EE71" />
                </View>
                <Text style={styles.tagText}>HOME</Text>
              </View>
            </View>
          )}
          
          <Text style={[styles.addressLine1, { color: textColor }]}>
            {isSearchingState ? "Umendra Shelters" : "1-2-39/1/C"}
          </Text>
          <Text style={[styles.addressLine2, { color: subTextColor }]}>
            Hyderabad Telangana, India
          </Text>

          <TouchableOpacity 
            style={styles.actionBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.actionBtnText}>
              {isSearchingState ? "Add Address" : "Edit Address"}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#141414" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#F5F5F5' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      
      <ImageBackground 
        source={{ uri: isDark ? DARK_MAP : LIGHT_MAP }} 
        style={StyleSheet.absoluteFill}
        imageStyle={{ opacity: isDark ? 0.8 : 1 }}
      >
        <View style={[StyleSheet.absoluteFill, { backgroundColor: overlayCol }]} />

        {renderHeader()}

        {/* Map Marker */}
        <View style={styles.markerContainer}>
          <View style={[styles.markerCircle, { shadowColor: isDark ? '#000' : '#FF4D4D' }]}>
            <View style={styles.markerLogo}>
              <Ionicons name="medical" size={24} color="#55EE71" />
            </View>
          </View>
          <View style={[styles.markerDot, { backgroundColor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)' }]} />
        </View>

        {/* Use Current Location Button */}
        <TouchableOpacity style={[styles.currentLocationBtn, { backgroundColor: cardBg, borderColor: borderCol }]}>
          <Ionicons name="locate-outline" size={20} color="#55EE71" />
          <Text style={[styles.currentLocationText, { color: textColor }]}>Use Current Location</Text>
        </TouchableOpacity>

        {renderCard()}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 28,
  },
  searchButtonAbsolute: {
    position: 'absolute',
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  searchBarContainer: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    paddingHorizontal: 12,
  },
  markerContainer: {
    position: 'absolute',
    top: '45%',
    left: '50%',
    marginLeft: -32,
    alignItems: 'center',
  },
  markerCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FF4D4D',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  markerLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 4,
  },
  currentLocationBtn: {
    position: 'absolute',
    bottom: 260,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
    gap: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  currentLocationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 20,
    width: SCREEN_WIDTH - 40,
    marginHorizontal: 20,
    borderRadius: 33,
    padding: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
  },
  cardContent: {
    width: '100%',
  },
  tagRow: {
    marginBottom: 10,
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkmarkWrap: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(96,254,108,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 6,
    color: '#60FE6C',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  addressLine1: {
    fontFamily: 'Manrope-Bold',
    fontSize: 15,
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  addressLine2: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    lineHeight: 16,
    marginBottom: 20,
  },
  actionBtn: {
    backgroundColor: '#6FFB85',
    height: 48,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  actionBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 10,
    color: '#141414',
  },
});
