import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from '../../../components/BottomNavBar';

const IMG_PROFILE = "https://images.unsplash.com/photo-1584308666744-24d5e4b6c310?q=80&w=896&auto=format&fit=crop";

interface AllergyRecord {
  id: string;
  name: string;
  description: string;
  severity: 'Severe' | 'Moderate' | 'Mild';
  risk?: string;
  icon?: string;
  iconBg?: string;
}

const FOOD_ALLERGIES: AllergyRecord[] = [
  {
    id: '1',
    name: 'Seeds',
    description: 'Common reactions: Hives,\nswelling',
    severity: 'Severe',
    risk: 'Anaphylaxis Risk',
  },
  {
    id: '2',
    name: 'Sea Food',
    description: 'Shellfish and crustaceans.\nReaction: Digestive distress',
    severity: 'Moderate',
    risk: 'Avoid cross-contamination',
  },
];

const ENVIRONMENTAL_ALLERGIES: AllergyRecord[] = [
  {
    id: '3',
    name: 'Pollen (Spring)',
    description: 'Seasonal rhinitis',
    severity: 'Mild',
    icon: 'leaf',
    iconBg: 'rgba(14,85,31,0.2)',
  },
];

export default function AllergiesListScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const [activeFilter, setActiveFilter] = useState('All Procedures');

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'Severe':
        return {
          text: '#FFB4AB',
          bg: 'rgba(147,0,10,0.2)',
          border: 'rgba(255,180,171,0.2)',
        };
      case 'Moderate':
        return {
          text: '#FFC4BA',
          bg: 'rgba(255,156,140,0.1)',
          border: 'rgba(255,196,186,0.2)',
        };
      case 'Mild':
        return {
          text: '#BCCBB7',
          bg: '#353535',
          border: 'transparent',
        };
      default:
        return {
          text: '#BCCBB7',
          bg: '#353535',
          border: 'transparent',
        };
    }
  };

  const renderCard = (allergy: AllergyRecord) => {
    const sevStyle = getSeverityStyle(allergy.severity);
    
    if (allergy.icon) {
      // Small card style (Environmental)
      return (
        <TouchableOpacity 
          key={allergy.id} 
          style={[styles.smallCard, { backgroundColor: '#1F1F1F' }]}
          onPress={() => navigation.navigate('AllergiesDetail', { allergy })}
        >
          <View style={styles.smallCardLeft}>
            <View style={[styles.iconOverlay, { backgroundColor: allergy.iconBg }]}>
              <Ionicons name={allergy.icon as any} size={17} color="#55EE71" />
            </View>
            <View>
              <Text style={styles.smallCardTitle}>{allergy.name}</Text>
              <Text style={styles.smallCardSub}>{allergy.description}</Text>
            </View>
          </View>
          <View style={[styles.smallSeverityBadge, { backgroundColor: sevStyle.bg }]}>
            <Text style={[styles.smallSeverityText, { color: sevStyle.text }]}>{allergy.severity}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity 
        key={allergy.id} 
        style={[styles.allergyCard, { backgroundColor: '#1F1F1F' }]}
        onPress={() => {
          if (allergy.name !== 'Seeds' && allergy.name !== 'Sea Food') {
            navigation.navigate('AllergiesDetail', { allergy });
          }
        }}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleContainer}>
            <Text style={styles.cardTitle}>{allergy.name}</Text>
            <Text style={styles.cardDescription}>{allergy.description}</Text>
          </View>
          <View 
            style={[
              styles.severityBadge, 
              { 
                backgroundColor: sevStyle.bg,
                borderColor: sevStyle.border,
                borderWidth: sevStyle.border !== 'transparent' ? 1 : 0
              }
            ]}
          >
            <Text style={[styles.severityText, { color: sevStyle.text }]}>
              {allergy.severity}
            </Text>
          </View>
        </View>
        {allergy.risk && (
          <View style={styles.riskContainer}>
            <Ionicons 
              name={allergy.severity === 'Severe' ? "shield-checkmark" : "warning-outline"} 
              size={12} 
              color={allergy.severity === 'Severe' ? "#55EE71" : "#BCCBB7"} 
            />
            <Text style={[styles.riskText, { color: allergy.severity === 'Severe' ? "#55EE71" : "#BCCBB7" }]}>
              {allergy.risk}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: '#000000' }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Top Header */}
        <View style={[styles.header, { marginTop: insets.top + 20 }]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Allergies</Text>
          <Image source={{ uri: IMG_PROFILE }} style={styles.profileImage} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <Ionicons name="search" size={20} color="rgba(255,255,255,0.2)" style={styles.searchIcon} />
            <TextInput
              placeholder="SEARCH 128 PARAMETERS..."
              placeholderTextColor="rgba(255,255,255,0.2)"
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.topActionContainer}>
          <TouchableOpacity style={styles.topFilterButton}>
            <Ionicons name="options-outline" size={16} color="#E2E2E2" />
            <Text style={styles.topFilterText}>FILTERS</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.topAddButton}
            onPress={() => navigation.navigate('AllergiesAdd')}
          >
            <Text style={styles.topAddText}>ADD</Text>
          </TouchableOpacity>
        </View>

        {/* Filters Chips */}
        <View style={styles.filtersWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContainer}>
            {['All Procedures', 'SEVERE', 'MODERATE', 'MILD'].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterBadge,
                  { backgroundColor: activeFilter === filter ? '#55EE71' : '#353535' }
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[
                  styles.filterText,
                  { color: activeFilter === filter ? '#003910' : '#BCCBB7' }
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Food Sensitivity Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: '#55EE71' }]}>FOOD SENSITIVITY</Text>
            <Text style={styles.sectionCount}>2 Records</Text>
          </View>
          <View style={styles.cardsGrid}>
            {FOOD_ALLERGIES.map(renderCard)}
          </View>
        </View>

        {/* Environmental Section */}
        <View style={[styles.section, { marginTop: 40 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>ENVIRONMENTAL</Text>
            <Text style={styles.sectionCount}>1 Record</Text>
          </View>
          <View style={styles.cardsGrid}>
            {ENVIRONMENTAL_ALLERGIES.map(renderCard)}
          </View>
        </View>
      </ScrollView>

      <BottomNavBar activeTab="home" navigation={navigation} />
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
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 35,
  },
  backButton: {
    padding: 4,
    marginLeft: -4,
  },
  headerTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 28,
    color: '#FFFFFF',
    position: 'absolute',
    left: 64,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchWrapper: {
    height: 56,
    backgroundColor: 'rgba(31,31,31,0.4)',
    borderRadius: 48,
    borderWidth: 1,
    borderColor: 'rgba(143,147,120,0.15)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 14,
    color: '#FFFFFF',
    letterSpacing: 1.4,
  },
  topActionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  topFilterButton: {
    flex: 1,
    height: 56,
    backgroundColor: 'rgba(31,31,31,0.4)',
    borderRadius: 48,
    borderWidth: 1,
    borderColor: 'rgba(143,147,120,0.15)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  topFilterText: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 10,
    color: '#E2E2E2',
    letterSpacing: 1,
  },
  topAddButton: {
    flex: 1,
    height: 56,
    backgroundColor: '#34C759',
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topAddText: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 18,
    color: '#000000',
    letterSpacing: 1,
  },
  filtersWrapper: {
    marginBottom: 40,
  },
  filtersContainer: {
    paddingHorizontal: 21,
    gap: 11,
  },
  filterBadge: {
    height: 28,
    paddingHorizontal: 16,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(61,74,59,0.1)',
    paddingBottom: 9,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: '#BCCBB7',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  sectionCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#BCCBB7',
  },
  cardsGrid: {
    gap: 16,
  },
  allergyCard: {
    borderRadius: 12,
    padding: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#E2E2E2',
    marginBottom: 4,
  },
  cardDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#BCCBB7',
    lineHeight: 20,
  },
  severityBadge: {
    paddingHorizontal: 13,
    paddingVertical: 5,
    borderRadius: 9999,
  },
  severityText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  riskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  riskText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  smallCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    borderRadius: 12,
  },
  smallCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconOverlay: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallCardTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#E2E2E2',
  },
  smallCardSub: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#BCCBB7',
  },
  smallSeverityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  smallSeverityText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    textTransform: 'uppercase',
  },
});
