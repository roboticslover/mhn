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

export default function MedicalConditionsEmptyScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

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

        {/* Content Section */}
        <View style={styles.contentSection}>
          <View style={styles.illustrationContainer}>
            <Ionicons name="medical-outline" size={100} color={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
          </View>

          <Text style={[styles.title, { color: isDark ? '#E2E2E2' : c.text }]}>
            No Conditions Found
          </Text>
          <Text style={[styles.subtitle, { color: isDark ? '#BCCBB7' : c.textSecondary }]}>
            Keep track of any medical conditions or illnesses to help doctors better understand your health profile.
          </Text>

          <TouchableOpacity 
            style={[styles.addButton, { backgroundColor: c.primary }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('MedicalConditionsAdd')}
          >
            <Text style={styles.addButtonText}>ADD NEW RECORD</Text>
          </TouchableOpacity>
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
    marginBottom: 40,
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
  contentSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 36,
    marginTop: 60,
  },
  illustrationContainer: {
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  addButton: {
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 33,
    width: '100%',
    alignItems: 'center',
    shadowColor: 'rgba(0,110,40,0.3)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 6,
  },
  addButtonText: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 16,
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
