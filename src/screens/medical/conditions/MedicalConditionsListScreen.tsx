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
import BottomNavBar from '../../../components/BottomNavBar';

const IMG_HEADER = "https://images.unsplash.com/photo-1584308666744-24d5e4b6c310?q=80&w=896&auto=format&fit=crop";

interface ConditionRecord {
  id: string;
  name: string;
  status: 'ACTIVE' | 'RESOLVED';
}

const CONDITIONS: ConditionRecord[] = [
  {
    id: '1',
    name: 'Diabetes Type II',
    status: 'ACTIVE',
  },
  {
    id: '2',
    name: 'Hypertension',
    status: 'RESOLVED',
  },
  {
    id: '3',
    name: 'Seasonal Allergies',
    status: 'RESOLVED',
  },
];

export default function MedicalConditionsListScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const getStatusStyle = (status: string) => {
    if (status === 'ACTIVE') {
      return {
        text: '#55EE71',
        bg: 'rgba(85,238,113,0.1)',
        border: 'rgba(85,238,113,0.2)',
      };
    }
    return {
      text: isDark ? '#BCCBB7' : '#666666',
      bg: isDark ? 'rgba(53,53,53,0.2)' : 'rgba(0,0,0,0.05)',
      border: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.1)',
    };
  };

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Header Section */}
        <View style={[styles.headerSection, { marginTop: insets.top + 20 }]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color={isDark ? '#FFFFFF' : '#000000'} />
          </TouchableOpacity>
          
          <View style={styles.headerImageContainer}>
            <Image source={{ uri: IMG_HEADER }} style={styles.headerImage} />
            <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
              Conditions
            </Text>
            <View style={styles.headerIcon}>
              <Ionicons name="alert" size={12} color={isDark ? '#FFFFFF' : '#000000'} />
            </View>
          </View>
        </View>

        {/* Editorial Header Section */}
        <View style={styles.editorialHeader}>
          <View style={[styles.liveStatusBadge, { backgroundColor: isDark ? '#353535' : '#E5E5E5' }]}>
            <Text style={[styles.liveStatusText, { color: '#55EE71' }]}>LIVE STATUS</Text>
          </View>
          <Text style={[styles.heroTitle, { color: isDark ? '#E2E2E2' : '#111111' }]}>
            Medical Conditions
          </Text>
          <Text style={[styles.heroSubtitle, { color: isDark ? '#BCCBB7' : '#666666' }]}>
            An overview of your diagnosed{'\n'}pathologies and their current{'\n'}clinical management status.
          </Text>
        </View>

        {/* Cards Section */}
        <View style={styles.contentSection}>
          <Text style={[styles.sectionTitle, { color: isDark ? 'rgba(188,203,183,0.5)' : '#999999' }]}>
            CURRENT PROFILES
          </Text>

          <View style={styles.cardsContainer}>
            {CONDITIONS.map((condition) => {
              const statusStyle = getStatusStyle(condition.status);
              return (
                <View 
                  key={condition.id} 
                  style={[
                    styles.conditionCard, 
                    { backgroundColor: isDark ? '#1F1F1F' : '#F8F9FA' }
                  ]}
                >
                  <Text style={[styles.cardTitle, { color: isDark ? '#FFFFFF' : '#111111' }]}>
                    {condition.name}
                  </Text>
                  <View 
                    style={[
                      styles.statusBadge, 
                      { 
                        backgroundColor: statusStyle.bg,
                        borderColor: statusStyle.border
                      }
                    ]}
                  >
                    <Text style={[styles.statusText, { color: statusStyle.text }]}>
                      {condition.status}
                    </Text>
                  </View>
                </View>
              );
            })}
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
  headerSection: {
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 24,
    top: 12,
    zIndex: 10,
    padding: 8,
  },
  headerImageContainer: {
    alignItems: 'center',
    position: 'relative',
    marginTop: 20,
  },
  headerImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginLeft: 150,
  },
  headerTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 28,
    textAlign: 'center',
    marginTop: 13,
  },
  headerIcon: {
    position: 'absolute',
    left: -20,
    top: 60,
    transform: [{ rotate: '180deg' }],
  },
  editorialHeader: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  liveStatusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    marginBottom: 8,
  },
  liveStatusText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 28,
    letterSpacing: -1.8,
    marginBottom: 8,
    lineHeight: 45,
  },
  heroSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  contentSection: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Black',
    fontSize: 12,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  cardsContainer: {
    gap: 16,
  },
  conditionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 24,
    borderRadius: 33,
  },
  cardTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    letterSpacing: -0.5,
    flex: 1,
    marginRight: 16,
    lineHeight: 28,
  },
  statusBadge: {
    borderWidth: 1,
    paddingHorizontal: 13,
    paddingVertical: 5,
    borderRadius: 9999,
  },
  statusText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
  },
});
