import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../../components/ScreenHeader';

export default function MedicalConditionsDetailScreen({ navigation, route }: { navigation: any; route: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  // Using the new field structure from the user's manual update
  const condition = route?.params?.condition ?? {
    id: '1',
    name: 'High Blood Pressure',
    status: 'Active',
    diagnosed: '3 years and 1 month ago',
    treatments: [
      { id: '1', name: 'Vitamin Supplements', dosage: 'Daily Dosage • morning', type: 'medication' },
      { id: '2', name: 'Lifestyle Modification', dosage: 'Cardio & Reduced Sodium', type: 'lifestyle' }
    ]
  };

  const isResolved = condition.status === 'Resolved' || condition.status === 'Recovered';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F8F9FA' }]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Header Image Background */}
      <View style={styles.headerBackground}>
        <Image 
          source={{ uri: "https://www.figma.com/api/mcp/asset/0a30a913-f5f1-4a0d-92ee-885c9497e148" }} 
          style={styles.headerImage} 
        />
        <View style={styles.headerOverlay} />
      </View>

      {/* Status Bar Header Area */}
      <View style={[styles.customHeader, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Medical Conditi...
        </Text>
        <TouchableOpacity 
          style={styles.backBtn} 
          onPress={() => navigation.navigate('MedicalConditionsAdd', { condition })}
        >
          <Ionicons name="create-outline" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={[styles.heroSubtitle, { color: c.primary }]}>CHRONIC CONDITION</Text>
          <Text style={styles.heroTitle}>{condition.name}</Text>
          
          <View style={[styles.statusPill, { backgroundColor: isResolved ? 'rgba(255,255,255,0.1)' : 'rgba(48,209,88,0.1)' }]}>
            <Text style={[styles.statusText, { color: isResolved ? '#BCCBB7' : '#30D158' }]}>
              {condition.status?.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Diagnosed Info */}
        <View style={styles.diagnosedContainer}>
          <View style={styles.diagnosedCard}>
            <View style={styles.diagnosedIconWrap}>
              <Image 
                source={{ uri: "https://www.figma.com/api/mcp/asset/05842656-769e-427a-afb3-321628d17d24" }} 
                style={styles.diagnosedIcon} 
              />
            </View>
            <View style={styles.diagnosedTextWrap}>
              <Text style={styles.diagnosedLabel}>DIAGNOSED</Text>
              <Text style={styles.diagnosedValue}>{condition.diagnosed}</Text>
            </View>
          </View>
        </View>

        {/* Treatment Timeline */}
        <View style={styles.timelineSection}>
          <Text style={styles.sectionLabel}>TREATMENT TIMELINE</Text>
          
          <View style={styles.timelineCards}>
            {condition.treatments?.map((treatment: any) => (
              <View key={treatment.id} style={styles.treatmentCard}>
                <View style={styles.treatmentIconWrap}>
                  {treatment.type === 'medication' ? (
                    <Image 
                      source={{ uri: "https://www.figma.com/api/mcp/asset/40d19938-ca41-457e-bb11-8b4c30aa2991" }} 
                      style={{ width: 14, height: 18 }} 
                      resizeMode="contain"
                    />
                  ) : (
                    <Image 
                      source={{ uri: "https://www.figma.com/api/mcp/asset/ee622461-a81e-4139-ab67-17b498572597" }} 
                      style={{ width: 20, height: 20 }} 
                      resizeMode="contain"
                    />
                  )}
                </View>
                <View style={styles.treatmentTextWrap}>
                  <Text style={styles.treatmentTitle}>{treatment.name}</Text>
                  <Text style={styles.treatmentSubtitle}>{treatment.dosage}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={[styles.bottomBtnContainer, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        <TouchableOpacity
          style={[styles.updateBtn, { backgroundColor: c.primary }]}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('MedicalConditionsAdd', { condition })}
        >
          <Text style={styles.updateBtnText}>Update Metrics</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    zIndex: 0,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  backBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  heroSection: {
    paddingHorizontal: 24,
    marginTop: 20,
    position: 'relative',
    zIndex: 10,
  },
  heroSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 36,
    fontFamily: 'Inter-ExtraBold',
    color: '#E2E2E2',
    lineHeight: 45,
    letterSpacing: -1.8,
    marginBottom: 20,
  },
  statusPill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 10,
  },
  statusText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  diagnosedContainer: {
    paddingHorizontal: 24,
    marginTop: 40,
    marginBottom: 30,
  },
  diagnosedCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 33,
    paddingHorizontal: 24,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  diagnosedIconWrap: {
    width: 42,
    height: 44,
  },
  diagnosedIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  diagnosedTextWrap: {
    flex: 1,
    gap: 4,
  },
  diagnosedLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#BCCBB7',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  diagnosedValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#E2E2E2',
    lineHeight: 28,
  },
  timelineSection: {
    paddingHorizontal: 24,
  },
  sectionLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#BCCBB7',
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    marginBottom: 16,
    marginLeft: 4,
  },
  timelineCards: {
    gap: 12,
  },
  treatmentCard: {
    backgroundColor: '#1F1F1F',
    borderRadius: 33,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  treatmentIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#353535',
    alignItems: 'center',
    justifyContent: 'center',
  },
  treatmentTextWrap: {
    flex: 1,
  },
  treatmentTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#E2E2E2',
    marginBottom: 2,
  },
  treatmentSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#BCCBB7',
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
  updateBtn: {
    height: 56,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(85, 238, 113, 0.4)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
  updateBtnText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#003910',
  },
});

